import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, locale = 'de' } = await request.json();

    // Basic validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Mock KI-Agent responses for now
    const responses = {
      de: {
        greeting: 'Hallo! Ich bin der Saimôr Klarheits-Assistent. Wie kann ich Ihnen heute zu mehr Klarheit verhelfen?',
        booking: 'Gerne helfe ich Ihnen bei der Terminbuchung. Ein Lichtgespräch dauert 30 Minuten und ist kostenfrei. Soll ich Sie direkt zu Cal.com weiterleiten?',
        services: 'Saimôr bietet drei Hauptbereiche: Pulse (Workshops), Systems (Daten & KI) und Orbit (Coaching). Welcher Bereich interessiert Sie am meisten?',
        contact: 'Sie können uns über das Kontaktformular erreichen oder direkt ein Lichtgespräch buchen. Was wäre für Sie passender?',
        default: 'Das ist eine interessante Frage. Für eine detaillierte Antwort empfehle ich Ihnen ein persönliches Lichtgespräch. Soll ich einen Termin für Sie arrangieren?'
      },
      en: {
        greeting: 'Hello! I am the Saimôr Clarity Assistant. How can I help you gain more clarity today?',
        booking: 'I\'d be happy to help you with booking. A Light Conversation takes 30 minutes and is free. Should I redirect you directly to Cal.com?',
        services: 'Saimôr offers three main areas: Pulse (Workshops), Systems (Data & AI) and Orbit (Coaching). Which area interests you most?',
        contact: 'You can reach us via the contact form or book a Light Conversation directly. What would suit you better?',
        default: 'That\'s an interesting question. For a detailed answer, I recommend a personal Light Conversation. Should I arrange an appointment for you?'
      }
    };

    const msgs = responses[locale as keyof typeof responses] || responses.de;

    // Simple keyword matching for demo
    const lowerMessage = message.toLowerCase();
    let response = msgs.default;

    if (lowerMessage.includes('hallo') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = msgs.greeting;
    } else if (lowerMessage.includes('termin') || lowerMessage.includes('buch') || lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
      response = msgs.booking;
    } else if (lowerMessage.includes('leistung') || lowerMessage.includes('service') || lowerMessage.includes('angebot')) {
      response = msgs.services;
    } else if (lowerMessage.includes('kontakt') || lowerMessage.includes('contact') || lowerMessage.includes('erreichen')) {
      response = msgs.contact;
    }

    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      suggestions: locale === 'de'
        ? ['Lichtgespräch buchen', 'Über Services erfahren', 'Kontakt aufnehmen']
        : ['Book Light Conversation', 'Learn about Services', 'Get in Contact']
    });

  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}