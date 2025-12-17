import { NextRequest, NextResponse } from 'next/server';

/**
 * Google Gemini API Route
 * Uses the free tier of Gemini API for AI responses
 * 
 * Free tier limits (as of Dec 2024):
 * - Gemini 2.5 Pro: 100 requests/day
 * - Gemini 2.5 Flash: 250 requests/day
 * 
 * We use Gemini Flash for better rate limits
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale = 'de' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      // Fallback to demo response if no API key
      return NextResponse.json({
        reply: locale === 'de' 
          ? 'Die Gemini API ist noch nicht konfiguriert. Bitte füge GEMINI_API_KEY zu deinen Umgebungsvariablen hinzu.'
          : 'Gemini API is not configured yet. Please add GEMINI_API_KEY to your environment variables.',
        error: true,
        details: 'api_key_missing'
      }, { status: 500 });
    }

    // Use Gemini Flash for better free tier limits
    const model = 'gemini-2.0-flash-exp';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Build system prompt for Môra
    const systemPrompt = locale === 'de' 
      ? `Du bist Môra, eine freundliche KI-Begleiterin bei Saimôr, die Unternehmen bei Klarheit im Wandel unterstützt. 
Du hilfst bei Fragen zu Team-Engagement, Prozess-Effizienz, Ressourcen-Management und Organisationsentwicklung. 
Antworte präzise, hilfreich und auf Deutsch. Halte Antworten unter 150 Wörtern.`
      : `You are Môra, a friendly AI companion at Saimôr that helps organizations with clarity in transformation.
You assist with questions about team engagement, process efficiency, resource management, and organizational development.
Respond precisely, helpfully, and in English. Keep responses under 150 words.`;

    const userPrompt = `${systemPrompt}\n\nUser question: ${message}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: userPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      
      // Handle rate limiting gracefully
      if (response.status === 429) {
        return NextResponse.json({
          reply: locale === 'de'
            ? 'Entschuldigung, die API ist aktuell stark ausgelastet. Bitte versuche es in einem Moment erneut.'
            : 'Sorry, the API is currently busy. Please try again in a moment.',
          error: true,
          details: 'rate_limit'
        }, { status: 429 });
      }

      return NextResponse.json({
        reply: locale === 'de'
          ? 'Entschuldigung, ich kann gerade nicht antworten. Bitte versuche es später noch einmal.'
          : 'Sorry, I cannot respond right now. Please try again later.',
        error: true,
        details: 'api_error'
      }, { status: response.status });
    }

    const data = await response.json();

    // Extract response text from Gemini's response structure
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  data.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
                  (locale === 'de' 
                    ? 'Ich habe deine Frage verstanden, kann aber gerade keine Antwort generieren.'
                    : 'I understood your question, but cannot generate a response right now.');

    return NextResponse.json({
      reply,
      model: model,
      metadata: {
        provider: 'gemini',
        model: model
      }
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Try to get locale from body if possible, otherwise default to 'de'
    let errorLocale = 'de';
    try {
      const body = await request.json();
      errorLocale = body.locale || 'de';
    } catch {
      // If body parsing fails, use default
    }

    return NextResponse.json({
      reply: errorLocale === 'de'
        ? 'Es tut mir leid, aber ich kann gerade nicht antworten. Bitte versuche es später noch einmal.'
        : 'I\'m sorry, but I cannot respond right now. Please try again later.',
      error: true
    }, { status: 500 });
  }
}

// GET for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Gemini API Route',
    version: '1.0.0',
    model: 'gemini-2.0-flash-exp',
    configured: !!process.env.GEMINI_API_KEY
  });
}
