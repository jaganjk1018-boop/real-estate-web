import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.sellerName || !body.sellerPhone || !body.title) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory seller or property fields (sellerName, sellerPhone, title)' },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingRef = `SELL-2026-${randomSuffix}`;

    const submissionRecord = {
      id: `sell-${Date.now()}`,
      trackingRef,
      createdAt: new Date().toISOString(),
      status: 'Received',
      property: {
        title: body.title,
        category: body.category || 'Luxury Villa',
        price: body.price,
        city: body.city || 'Los Angeles',
        areaSqFt: body.areaSqFt
      },
      seller: {
        name: body.sellerName,
        phone: body.sellerPhone,
        email: body.sellerEmail,
        planTier: body.planTier || 'marketplace'
      }
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Seller mandate registered successfully with JK Realty Global Advisory',
        trackingRef,
        data: submissionRecord
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process seller listing request' },
      { status: 500 }
    );
  }
}
