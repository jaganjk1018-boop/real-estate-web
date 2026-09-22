import { NextResponse } from 'next/server';
import { PROPERTIES_DATA } from '../../../data/properties';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : Infinity;

  let results = [...PROPERTIES_DATA];

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

  return NextResponse.json({
    count: results.length,
    properties: results
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newProperty = {
      id: `prop-${Date.now()}`,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      ...body
    };

    return NextResponse.json({
      success: true,
      message: 'Property created successfully',
      property: newProperty
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: 'Invalid payload'
    }, { status: 400 });
  }
}
