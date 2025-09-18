import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

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

// In-memory storage for demo (replace with database in production)
const chatSessions = new Map<string, ChatSession>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Create or get session
    let session = chatSessions.get(sessionId);
    if (!session) {
      session = {
        id: sessionId,
        messages: [],
        createdAt: new Date(),
        lastActivity: new Date()
      };
      chatSessions.set(sessionId, session);
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      content: message,
      role: 'user',
      timestamp: new Date(),
      sessionId
    };
    session.messages.push(userMessage);

    // Simulate AI response (replace with actual AI service)
    const aiResponse = await generateAIResponse(message, session);

    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}_assistant`,
      content: aiResponse,
      role: 'assistant',
      timestamp: new Date(),
      sessionId
    };
    session.messages.push(assistantMessage);
    session.lastActivity = new Date();

    // Send to n8n webhook if configured
    await sendToN8N('chat_message', {
      sessionId,
      userMessage,
      assistantMessage,
      sessionContext: {
        messageCount: session.messages.length,
        duration: Date.now() - session.createdAt.getTime()
      }
    });

    return NextResponse.json({
      message: assistantMessage,
      session: {
        id: session.id,
        messageCount: session.messages.length
      }
    });

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

  const session = chatSessions.get(sessionId);
  if (!session) {
    return NextResponse.json(
      { error: 'Session not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    session: {
      id: session.id,
      messages: session.messages,
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity
    }
  });
}

async function generateAIResponse(message: string, session: ChatSession): Promise<string> {
  // Saimôr-specific responses with context awareness
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

  // Simple keyword matching for demo
  const lowerMessage = message.toLowerCase();
  let categoryResponses = responses.default;

  if (lowerMessage.includes('hallo') || lowerMessage.includes('hi') || lowerMessage.includes('guten')) {
    categoryResponses = responses.greeting;
  } else if (lowerMessage.includes('klar') || lowerMessage.includes('klarheit') || lowerMessage.includes('versteh')) {
    categoryResponses = responses.clarity;
  } else if (lowerMessage.includes('system') || lowerMessage.includes('organisation') || lowerMessage.includes('wandel')) {
    categoryResponses = responses.system;
  }

  // Add context from session length
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
    console.log('N8N webhook URL not configured');
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