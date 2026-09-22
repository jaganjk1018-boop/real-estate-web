import { NextResponse } from 'next/server';

const INQUIRIES_STORE = [];

export async function GET() {
  return NextResponse.json({
    count: INQUIRIES_STORE.length,
    inquiries: INQUIRIES_STORE
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...body
    };

    INQUIRIES_STORE.unshift(newInquiry);

    return NextResponse.json({
      success: true,
      message: 'Inquiry and site visit lead recorded',
      inquiry: newInquiry
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: 'Failed to record inquiry'
    }, { status: 400 });
  }
}
