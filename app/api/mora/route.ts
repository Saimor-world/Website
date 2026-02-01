import { NextRequest, NextResponse } from 'next/server';
import { publicChatLimiter, getClientIP } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting for Public Chat
    const ip = getClientIP(request);
    const { success } = await publicChatLimiter.check(request, ip);

    if (!success) {
      return NextResponse.json(
        {
          reply: 'Ich erhalte gerade sehr viele Nachrichten. Bitte warte einen Moment.',
          error: true,
          rateLimit: true
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, conversationId, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const backendUrl =
      process.env.BACKEND_BASE_URL ||
      process.env.BACKEND_API_URL ||
      'https://voice.saimor.world';
    const chatEndpoint = new URL('/mora/chat', backendUrl).toString();
    const apiToken = process.env.MORA_API_TOKEN || process.env.BACKEND_API_KEY;

    const payload = {
      message,
      session_id: conversationId || sessionId || `web-${Date.now()}`,
      context: {
        source: 'website',
        page: request.headers.get('referer') || ''
      }
    };

    const response = await fetch(chatEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiToken && {
          'Authorization': `Bearer ${apiToken}`
        })
      },
      cache: 'no-store',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      let errorDetails: any = null;
      try {
        errorDetails = await response.json();
      } catch (err) {
        errorDetails = null;
      }

      return NextResponse.json({
        reply: 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es spaeter noch einmal oder kontaktiere uns direkt ueber Cal.com.',
        error: true,
        details: errorDetails?.error || 'backend_unavailable'
      }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data.response || data.reply || 'Ich habe verstanden. Wie kann ich dir weiterhelfen?',
      conversationId: data.session_id || payload.session_id,
      suggestions: data.suggestions || [],
      metadata: data.metadata || {}
    });

  } catch (error) {
    console.error('Mora Chat API error:', error);

    return NextResponse.json({
      reply: 'Es tut mir leid, aber ich kann gerade nicht antworten. Bitte versuche es spaeter noch einmal.',
      error: true
    }, { status: 500 });
  }
}

// GET for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Mora Chat API',
    version: '1.0.0'
  });
}
