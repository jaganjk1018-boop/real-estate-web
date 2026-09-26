import { NextResponse } from 'next/server';

const MAX_STORED_INQUIRIES = 500;
const INQUIRIES_STORE = [];

export async function GET() {
  return NextResponse.json({
    count: INQUIRIES_STORE.length,
    inquiries: INQUIRIES_STORE.slice(0, 100)
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'private, no-cache, no-store, must-revalidate'
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const entropy = Math.random().toString(36).substring(2, 8);
    const newInquiry = {
      id: `inq-${Date.now()}-${entropy}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...body
    };

    INQUIRIES_STORE.unshift(newInquiry);
    if (INQUIRIES_STORE.length > MAX_STORED_INQUIRIES) {
      INQUIRIES_STORE.length = MAX_STORED_INQUIRIES;
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry and site visit lead recorded successfully',
      inquiry: newInquiry
    }, { 
      status: 201,
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: 'Failed to record inquiry'
    }, { status: 400 });
  }
}
