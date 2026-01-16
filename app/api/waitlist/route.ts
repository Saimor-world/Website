import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, interests, locale, timestamp } = body;

    // Validation
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // n8n Webhook Integration
    const n8nWebhookUrl = process.env.N8N_WAITLIST_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;

    if (n8nWebhookUrl) {
      // Send to n8n for processing (Mailchimp, Airtable, etc.)
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
    }

    // Fallback: Track via Sentry if no webhook configured
    if (!n8nWebhookUrl && process.env.NODE_ENV === 'production') {
      // In production, this should be logged to Sentry for monitoring
      // In development, this is expected and can be ignored
    }

    // Calculate waitlist position (simplified - can be made more sophisticated)
    const position = Math.floor(Math.random() * 100) + 50; // Placeholder

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
