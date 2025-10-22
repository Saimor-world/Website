import { NextRequest, NextResponse } from 'next/server';

// Môra Chat API Route - Proxy to api.saimor.world
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get backend URL from env
    const backendUrl = process.env.BACKEND_API_URL || 'https://api.saimor.world';
    const chatEndpoint = `${backendUrl}/api/v1/chat`;

    // Forward request to backend
    const response = await fetch(chatEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add API key if needed
        ...(process.env.BACKEND_API_KEY && {
          'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
        })
      },
      body: JSON.stringify({
        message,
        conversationId,
        sessionId,
        context: {
          source: 'website',
          page: request.headers.get('referer') || '',
          timestamp: new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);

      // Fallback response
      return NextResponse.json({
        reply: 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es später noch einmal oder kontaktiere uns direkt über Cal.com.',
        error: true
      }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data.reply || data.message || 'Ich habe verstanden. Wie kann ich dir weiterhelfen?',
      conversationId: data.conversationId || conversationId,
      suggestions: data.suggestions || []
    });

  } catch (error) {
    console.error('Môra Chat API error:', error);

    return NextResponse.json({
      reply: 'Es tut mir leid, aber ich kann gerade nicht antworten. Bitte versuche es später noch einmal.',
      error: true
    }, { status: 500 });
  }
}

// GET for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Môra Chat API',
    version: '1.0.0'
  });
}
