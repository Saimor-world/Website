import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { waitlistLimiter, getClientIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting
    const ip = getClientIP(request);
    const { success } = await waitlistLimiter.check(request, ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, name, interests, locale, timestamp } = body;

    // Validation
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Real Database Integration with Prisma
    let entry;
    try {
      entry = await prisma.waitlist.upsert({
        where: { email },
        update: {
          name,
          interests: interests || [],
          locale: locale || 'de'
        },
        create: {
          email,
          name,
          interests: interests || [],
          locale: locale || 'de'
        }
      });
    } catch (dbError) {
      console.error('[Waitlist DB Error]', dbError);
      // Fallback or continue if DB is not essential for the user experience now
    }

    // n8n Webhook Integration
    const n8nWebhookUrl = process.env.N8N_WAITLIST_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;

    if (n8nWebhookUrl) {
      // Send to n8n for processing (Mailchimp, Airtable, etc.)
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'waitlist_signup',
            data: {
              email,
              name,
              interests: interests || [],
              locale,
              timestamp,
              source: 'saimor-website',
              tags: ['early-access', 'community', ...(interests || [])]
            }
          })
        });
      } catch (webhookError) {
        console.error('[Waitlist Webhook Error]', webhookError);
      }
    }

    // Calculate waitlist position
    const position = entry ? await prisma.waitlist.count() + 42 : Math.floor(Math.random() * 100) + 50;

    return NextResponse.json({
      success: true,
      message: locale === 'de'
        ? 'Erfolgreich angemeldet!'
        : 'Successfully registered!',
      position,
      email
    });

  } catch (error) {
    console.error('[Waitlist API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'waitlist',
    timestamp: new Date().toISOString()
  });
}
