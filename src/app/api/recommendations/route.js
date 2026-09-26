import { NextResponse } from 'next/server';
import { PROPERTIES_DATA } from '../../../data/properties';

const recommendationsCache = new Map();
const TTL_MS = 120 * 1000; // 2 minutes

export async function POST(request) {
  try {
    const { budget, lifestyle, amenityPriority, preferredLocation } = await request.json();
    const cacheKey = `${budget || ''}|${lifestyle || ''}|${amenityPriority || ''}|${preferredLocation || ''}`;

    const cached = recommendationsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < TTL_MS) {
      return NextResponse.json(cached.data, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
          'X-Cache-Status': 'HIT'
        }
      });
    }

    const scored = PROPERTIES_DATA.map((prop) => {
      let matchScore = 75;

      if (preferredLocation && prop.address.city.toLowerCase().includes(preferredLocation.toLowerCase())) {
        matchScore += 12;
      }
      if (lifestyle && (prop.category.toLowerCase().includes(lifestyle.toLowerCase()) || prop.type.toLowerCase().includes(lifestyle.toLowerCase()))) {
        matchScore += 8;
      }
      if (amenityPriority && prop.amenities.some((a) => a.toLowerCase().includes(amenityPriority.toLowerCase()))) {
        matchScore += 6;
      }

      return {
        ...prop,
        matchScore: Math.min(99, matchScore)
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);

    const payload = {
      success: true,
      recommendations: scored.slice(0, 3)
    };

    if (recommendationsCache.size > 80) {
      const oldest = recommendationsCache.keys().next().value;
      recommendationsCache.delete(oldest);
    }
    recommendationsCache.set(cacheKey, { timestamp: Date.now(), data: payload });

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
        'X-Cache-Status': 'MISS'
      }
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: 'Calculation failed'
    }, { status: 400 });
  }
}
