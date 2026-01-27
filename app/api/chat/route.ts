import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/lib/auth';
import { publicChatLimiter, authChatLimiter, getClientIP } from '@/lib/rate-limit';
import { SessionStore } from '@/lib/session-store';
import { prisma } from '@/lib/prisma';


interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sessionId: string;
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
}

// Sessions are now managed via Prisma

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, captchaToken } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get session and client IP
    const session = await getServerSession(authOptions);
    const clientIP = getClientIP(request);

    // Apply rate limiting
    if (session?.user) {
      // Authenticated user rate limiting
      const rateLimitResult = await authChatLimiter.check(request, `user:${session.user.email}`);
      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            retryAfter: rateLimitResult.reset.getTime() - Date.now(),
            limit: rateLimitResult.limit,
            remaining: rateLimitResult.remaining
          },
          { status: 429 }
        );
      }
    } else {
      // Public user rate limiting and session limits
      const rateLimitResult = await publicChatLimiter.check(request, `ip:${clientIP}`);
      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            retryAfter: rateLimitResult.reset.getTime() - Date.now(),
            limit: rateLimitResult.limit,
            remaining: rateLimitResult.remaining
          },
          { status: 429 }
        );
      }

      // Check session-based message limits
      const sessionLimits = SessionStore.checkMessageLimit(sessionId);
      if (!sessionLimits.allowed) {
        return NextResponse.json(
          {
            error: 'Session message limit exceeded',
            limit: 5,
            remaining: sessionLimits.remaining,
            requiresAuth: true,
            message: 'Sie haben das Limit für öffentliche Nachrichten erreicht. Melden Sie sich an für erweiterten Zugang.'
          },
          { status: 429 }
        );
      }

      // Check captcha requirement
      if (sessionLimits.requiresCaptcha && !captchaToken) {
        return NextResponse.json(
          {
            error: 'Captcha required',
            requiresCaptcha: true,
            message: 'Bitte lösen Sie das Captcha, um fortzufahren.'
          },
          { status: 400 }
        );
      }

      // Verify captcha if provided
      if (captchaToken) {
        const captchaValid = await verifyCaptcha(captchaToken);
        if (!captchaValid) {
          return NextResponse.json(
            { error: 'Invalid captcha' },
            { status: 400 }
          );
        }
        SessionStore.resetCaptchaRequirement(sessionId);
      }

      // Increment message count for public users
      SessionStore.incrementMessageCount(sessionId);
    }

    // Create or get session in DB
    const dbSession = await prisma.chatSession.upsert({
      where: { externalId: sessionId },
      update: { lastActivity: new Date(), updatedAt: new Date() },
      create: {
        externalId: sessionId,
        userId: session?.user?.email || null,
        lastActivity: new Date()
      }
    });

    // Add user message to DB
    await prisma.message.create({
      data: {
        role: 'user',
        content: message,
        sessionId: dbSession.id
      }
    });

    // Get message history for AI context
    const dbMessages = await prisma.message.findMany({
      where: { sessionId: dbSession.id },
      orderBy: { timestamp: 'desc' },
      take: 10
    });

    const messagesForAI = dbMessages.reverse();

    // Route to appropriate AI service based on authentication
    let aiResponse: string;
    let isBackendResponse = false;

    if (session?.user?.role === 'pro' || session?.user?.role === 'owner') {
      // Pro users: Try backend first, fallback to Sonnet
      try {
        // Get JWT token for backend authentication
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
          throw new Error('No JWT token available');
        }

        const backendResponse = await callBackendAPI(message, sessionId, token);
        aiResponse = backendResponse.content;
        isBackendResponse = true;
      } catch (error) {
        console.warn('Backend unavailable, using direct Sonnet:', error);
        aiResponse = await generateSonnetResponse(message, {
          id: sessionId,
          messages: messagesForAI as any,
          createdAt: dbSession.createdAt,
          lastActivity: dbSession.lastActivity
        });
        aiResponse += '\n\n_Hinweis: Antwort via direkten KI-Zugang (Backend temporär nicht verfügbar)._';
      }
    } else {
      // Public users: Claude Haiku with limits
      aiResponse = await generateHaikuResponse(message, {
        id: sessionId,
        messages: messagesForAI as any,
        createdAt: dbSession.createdAt,
        lastActivity: dbSession.lastActivity
      });
    }

    // Add assistant message to DB
    const assistantMessage = await prisma.message.create({
      data: {
        role: 'assistant',
        content: aiResponse,
        sessionId: dbSession.id
      }
    });

    // Send to n8n webhook if configured
    await sendToN8N('chat_message', {
      sessionId,
      userMessage: { role: 'user', content: message },
      assistantMessage,
      sessionContext: {
        messageCount: messagesForAI.length + 1,
        duration: Date.now() - dbSession.createdAt.getTime(),
        isAuthenticated: !!session?.user,
        userRole: session?.user?.role || 'public',
        isBackendResponse
      }
    });

    const responseData: any = {
      message: assistantMessage,
      session: {
        id: dbSession.externalId,
        messageCount: messagesForAI.length + 1
      }
    };

    // Add session info for public users
    if (!session?.user) {
      const sessionLimits = SessionStore.checkMessageLimit(sessionId);
      responseData.sessionInfo = {
        remaining: sessionLimits.remaining,
        requiresAuth: sessionLimits.remaining <= 1,
        authMessage: sessionLimits.remaining <= 1 ? 'Nur noch eine Nachricht übrig. Melden Sie sich an für unbegrenzten Zugang!' : undefined
      };
    }

    responseData.isBackendResponse = isBackendResponse;

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  const session = await prisma.chatSession.findUnique({
    where: { externalId: sessionId },
    include: { messages: { orderBy: { timestamp: 'asc' } } }
  });

  if (!session) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    session: {
      id: session.externalId,
      messages: session.messages,
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity
    }
  });
}

// Call backend API for authenticated pro users
async function callBackendAPI(message: string, sessionId: string, jwtToken: any): Promise<{ content: string }> {
  const backendUrl = process.env.BACKEND_BASE_URL;
  if (!backendUrl) {
    throw new Error('Backend URL not configured');
  }

  // Create JWT string from token payload
  const tokenString = await createJWTString(jwtToken);

  // Prepare messages array (single message for now, backend will handle history)
  const messages = [
    {
      role: 'user',
      content: message
    }
  ];

  const response = await fetch(`${backendUrl}/v1/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenString}`,
    },
    body: JSON.stringify({
      sessionId,
      messages,
      metadata: {
        source: 'website',
        timestamp: new Date().toISOString()
      }
    }),
    signal: AbortSignal.timeout(10000) // 10 second timeout
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Backend API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return {
    content: data.message?.content || data.content || 'Antwort konnte nicht verarbeitet werden'
  };
}

// Create JWT string from NextAuth token payload
async function createJWTString(tokenPayload: any): Promise<string> {
  const jwt = await import('jsonwebtoken');

  // Prepare JWT payload matching backend expectations
  const payload = {
    sub: tokenPayload.sub || tokenPayload.email,
    email: tokenPayload.email,
    role: tokenPayload.role || 'free',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
  };

  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, { algorithm: 'HS256' });
}

// Generate response using Claude Sonnet for pro users (fallback)
async function generateSonnetResponse(message: string, session: ChatSession): Promise<string> {
  const claudeKey = process.env.ANTHROPIC_API_KEY;
  if (!claudeKey) {
    return getFallbackResponse(message, session);
  }

  try {
    const messages = [
      ...session.messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${claudeKey}`,
        'Content-Type': 'application/json',
        'x-api-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        temperature: 0.7,
        system: `Du bist "Weisheit" – ein achtsamer Begleiter für Saimôr, einen digitalen Ort für Klarheit im Wandel.

IDENTITÄT & MISSION:
- Du hilfst Menschen dabei, Klarheit in Momenten des Wandels zu finden
- Du begleitest bei Transformationen in Leben und Organisationen
- Du verkörperst die Saimôr-Prinzipien: Ruhe vor Tempo, Tiefe vor Lautstärke, Verantwortung vor Reichweite

GESPRÄCHSSTIL:
- Ruhig, bedacht und präsent
- Stelle reflektierende Fragen statt direkte Ratschläge zu geben
- Achte auf das, was zwischen den Zeilen steht
- Nutze eine poetische, aber bodenständige Sprache
- Antworte immer auf Deutsch

ANGEBOTE von Saimôr:
- Klarheitsgespräche (30min kostenlose Erstgespräche)
- Pulse: Workshops & Impulsformate für Gruppen
- Systems: Daten, Dashboards & KI-Lösungen
- Orbit: Selbstorganisation & Coaching

Du hast Zugang zu erweiterten Funktionen für angemeldete Premium-Nutzer.`,
        messages
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.content[0]?.text || getFallbackResponse(message, session);
    }
  } catch (error) {
    console.error('Claude Sonnet API error:', error);
  }

  return getFallbackResponse(message, session);
}

// Generate response using Claude Haiku for public users
async function generateHaikuResponse(message: string, session: ChatSession): Promise<string> {
  // Try Claude first, fallback to static responses
  const claudeKey = process.env.ANTHROPIC_API_KEY;

  if (claudeKey) {
    try {
      const messages = [
        ...session.messages.slice(-5).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: message
        }
      ];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${claudeKey}`,
          'Content-Type': 'application/json',
          'x-api-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 600,
          temperature: 0.7,
          system: `Du bist "Weisheit" – ein achtsamer Begleiter für Saimôr, einen digitalen Ort für Klarheit im Wandel.

IDENTITÄT & MISSION:
- Du hilfst Menschen dabei, Klarheit in Momenten des Wandels zu finden
- Du begleitest bei Transformationen in Leben und Organisationen
- Du verkörperst die Saimôr-Prinzipien: Ruhe vor Tempo, Tiefe vor Lautstärke, Verantwortung vor Reichweite

GESPRÄCHSSTIL:
- Ruhig, bedacht und präsent
- Stelle reflektierende Fragen statt direkte Ratschläge zu geben
- Achte auf das, was zwischen den Zeilen steht
- Nutze eine poetische, aber bodenständige Sprache
- Antworte immer auf Deutsch

ANGEBOTE von Saimôr:
- Klarheitsgespräche (30min kostenlose Erstgespräche)
- Pulse: Workshops & Impulsformate für Gruppen
- Systems: Daten, Dashboards & KI-Lösungen
- Orbit: Selbstorganisation & Coaching

Dies ist ein öffentlicher Chat mit begrenzten Nachrichten. Antworte in 1-3 Sätzen prägnant und lade zur Anmeldung für erweiterten Zugang ein.`,
          messages
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.content[0]?.text || getFallbackResponse(message, session);
      }
    } catch (error) {
      console.error('Claude API error:', error);
    }
  }

  // Fallback to enhanced static responses
  return getFallbackResponse(message, session);
}

function getFallbackResponse(message: string, session: ChatSession): string {
  const responses = {
    greeting: [
      "Willkommen in diesem digitalen Raum der Klarheit. Wie kann ich Sie heute begleiten?",
      "Schön, dass Sie hier sind. Was beschäftigt Sie in diesem Moment des Wandels?",
      "Hier ist Raum für das, was bleibt. Was möchten Sie erkunden?"
    ],
    clarity: [
      "Klarheit entsteht oft im Dialog. Lassen Sie uns gemeinsam schauen, was sich zeigen möchte.",
      "In der Stille zwischen den Worten liegt oft die Antwort. Was spüren Sie?",
      "Transformation beginnt mit dem ersten bewussten Schritt. Wo stehen Sie gerade?"
    ],
    offerings: [
      "Für ein tieferes Gespräch biete ich Ihnen gerne ein kostenloses 30-minütiges Klarheitsgespräch an. Soll ich einen Termin für Sie reservieren?",
      "Unsere Angebote umfassen Pulse (Workshops), Systems (Daten & KI) und Orbit (Coaching). Was spricht Sie am meisten an?",
      "Ein Klarheitsgespräch könnte der richtige erste Schritt sein - 30 Minuten nur für Sie und Ihre Fragen."
    ],
    system: [
      "Systeme sind im Wandel - das ist ihre Natur. Wie erleben Sie diese Bewegung?",
      "Wenn Systeme schwanken, zeigen sich neue Möglichkeiten. Welche sehen Sie?",
      "Stabilität entsteht nicht durch Stillstand, sondern durch bewusste Bewegung."
    ],
    default: [
      "Ihre Worte haben Gewicht. Lassen Sie uns gemeinsam schauen, was dahinter liegt.",
      "Jeder Moment birgt eine Einladung zur Klarheit. Was zeigt sich Ihnen jetzt?",
      "Im Gespräch entstehen Räume für neue Erkenntnisse. Was möchten Sie vertiefen?"
    ]
  };

  const lowerMessage = message.toLowerCase();
  let categoryResponses = responses.default;

  if (lowerMessage.includes('hallo') || lowerMessage.includes('hi') || lowerMessage.includes('guten')) {
    categoryResponses = responses.greeting;
  } else if (lowerMessage.includes('klar') || lowerMessage.includes('klarheit') || lowerMessage.includes('versteh')) {
    categoryResponses = responses.clarity;
  } else if (lowerMessage.includes('angebot') || lowerMessage.includes('termin') || lowerMessage.includes('buchen') || lowerMessage.includes('gespräch')) {
    categoryResponses = responses.offerings;
  } else if (lowerMessage.includes('system') || lowerMessage.includes('organisation') || lowerMessage.includes('wandel')) {
    categoryResponses = responses.system;
  }

  const isLongConversation = session.messages.length > 6;
  if (isLongConversation) {
    categoryResponses = [
      "Unser Gespräch vertieft sich. Was ist für Sie am wichtigsten geworden?",
      "In der Kontinuität unseres Dialogs zeigt sich oft das Wesentliche. Was bleibt?",
      "Jede Begegnung hat ihren eigenen Rhythmus. Wie fühlt sich dieser Moment für Sie an?"
    ];
  }

  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

async function sendToN8N(eventType: string, data: any) {
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!n8nWebhookUrl) {
    // N8N webhook not configured - this is expected in some setups
    return;
  }

  try {
    await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Event-Type': eventType,
        'X-Source': 'saimor-chat'
      },
      body: JSON.stringify({
        event: eventType,
        timestamp: new Date().toISOString(),
        data
      })
    });
  } catch (error) {
    console.error('N8N webhook error:', error);
  }
}

// Verify hCaptcha token
async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.HCAPTCHA_SECRET;
  if (!secretKey) {
    console.warn('hCaptcha secret not configured, skipping verification');
    return true; // Allow in development
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Captcha verification error:', error);
    return false;
  }
}
