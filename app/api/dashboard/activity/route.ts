import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const DASHBOARD_API = process.env.BACKEND_BASE_URL || 'https://voice.saimor.world/api/dashboard';

function getDemoActivities() {
  const now = new Date().toISOString();
  return [
    {
      id: 'demo_waitlist',
      type: 'people',
      action: 'waitlist_signup',
      description: 'Warteliste: Demo User (demo@saimor.world)',
      timestamp: now
    },
    {
      id: 'demo_contact',
      type: 'process',
      action: 'contact_message',
      description: 'Nachricht von Demo: "Hallo, ich moechte mehr ueber MA\'ra erfahren..."',
      timestamp: now
    },
    {
      id: 'demo_chat',
      type: 'learning',
      action: 'chat_question',
      description: 'Mora Chat: "Welche Signale sind heute wichtig?"',
      timestamp: now
    }
  ];
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    // 1. Try real external API first if authorized
    if (token) {
      try {
        const response = await fetch(`${DASHBOARD_API}/activity`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store',
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ ...data, isDemo: false });
        }
      } catch (e) {
        console.warn('External activity API failed, falling back to local DB:', e);
      }
    }

    // 2. Fetch real activities from database!
    const [waitlistEntries, contactMessages, messages] = await Promise.all([
      prisma.waitlist.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      prisma.message.findMany({
        where: { role: 'user' },
        take: 5,
        orderBy: { timestamp: 'desc' },
        include: { session: true }
      })
    ]);

    const activities: any[] = [];

    // Map Waitlist
    waitlistEntries.forEach((entry: any) => {
      activities.push({
        id: `waitlist_${entry.id}`,
        type: 'people',
        action: 'waitlist_signup',
        description: `Warteliste: ${entry.name} (${entry.email})`,
        timestamp: entry.createdAt.toISOString()
      });
    });

    // Map Contact
    contactMessages.forEach((msg: any) => {
      activities.push({
        id: `contact_${msg.id}`,
        type: 'process',
        action: 'contact_message',
        description: `Nachricht von ${msg.name}: "${msg.message.substring(0, 30)}..."`,
        timestamp: msg.createdAt.toISOString()
      });
    });

    // Map Chat
    messages.forEach((msg: any) => {
      activities.push({
        id: `chat_${msg.id}`,
        type: 'learning',
        action: 'chat_question',
        description: `Mora Chat: "${msg.content.substring(0, 30)}..."`,
        timestamp: msg.timestamp.toISOString()
      });
    });

    // Add some static demo activities if it's too empty
    if (activities.length < 2) {
      activities.push({
        id: 'system_boot',
        type: 'system',
        action: 'boot',
        description: 'System initialisiert - Real Database ready',
        timestamp: new Date().toISOString()
      });
    }

    // Sort by timestamp
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      activities: activities.slice(0, 10),
      isDemo: true
    });

  } catch (error) {
    console.error('Dashboard activity API error:', error);
    return NextResponse.json({
      activities: getDemoActivities(),
      isDemo: true,
      error: 'Database error'
    });
  }
}
