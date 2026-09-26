import { NextResponse } from 'next/server';
import { PROPERTIES_DATA } from '../../../data/properties';

// Fast server-side in-memory cache for concurrent requests
const cache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function getCachedResult(key) {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_TTL_MS) {
    return item.data;
  }
  return null;
}

function setCachedResult(key, data) {
  // Cap cache size to 100 entries to prevent memory bloat
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
  cache.set(key, { timestamp: Date.now(), data });
}

function clearPropertiesCache() {
  cache.clear();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cacheKey = searchParams.toString() || 'all';

  const cached = getCachedResult(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'X-Cache-Status': 'HIT'
      }
    });
  }

  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : Infinity;

  let results = PROPERTIES_DATA;

  if (type && type !== 'all') {
    results = results.filter((p) => p.type === type);
  }
  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }
  if (minPrice > 0) {
    results = results.filter((p) => p.price >= minPrice);
  }
  if (maxPrice < Infinity) {
    results = results.filter((p) => p.price <= maxPrice);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter((p) => 
      p.title.toLowerCase().includes(q) ||
      p.address.city.toLowerCase().includes(q) ||
      p.address.neighborhood.toLowerCase().includes(q)
    );
  }

  const responsePayload = {
    count: results.length,
    properties: results
  };

  setCachedResult(cacheKey, responsePayload);

  return NextResponse.json(responsePayload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      'X-Cache-Status': 'MISS'
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const entropy = Math.random().toString(36).substring(2, 7);
    const newProperty = {
      id: `prop-${Date.now()}-${entropy}`,
      slug: (body.title || 'luxury-property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      ...body
    };

    // Invalidate cached query results on mutation
    clearPropertiesCache();

    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      property: newProperty
    }, { 
      status: 201,
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: 'Invalid payload'
    }, { status: 400 });
  }
}
