import { NextResponse } from 'next/server';
import { sendQuoteEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, moveFrom, moveTo, message } = body;

    // Validate required fields
    if (!fullName || !email || !moveFrom || !moveTo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate dates
    const fromDate = new Date(moveFrom);
    const toDate = new Date(moveTo);
    
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    if (toDate < fromDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Send email
    await sendQuoteEmail({
      fullName: fullName.trim(),
      email: email.trim(),
      moveFrom,
      moveTo,
      message: message ? message.trim() : '',
    });

    return NextResponse.json(
      { message: 'Quote request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Quote email error:', error);
    return NextResponse.json(
      { error: 'Failed to send quote request' },
      { status: 500 }
    );
  }
}
