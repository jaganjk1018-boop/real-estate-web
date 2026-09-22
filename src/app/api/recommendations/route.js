import { NextResponse } from 'next/server';
import { PROPERTIES_DATA } from '../../../data/properties';

export async function POST(request) {
  try {
    const { budget, lifestyle, amenityPriority, preferredLocation } = await request.json();

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

    return NextResponse.json({
      success: true,
      recommendations: scored.slice(0, 3)
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: 'Calculation failed'
    }, { status: 400 });
  }
}
