import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const DASHBOARD_API = process.env.BACKEND_BASE_URL || 'https://voice.saimor.world/api/dashboard';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    // 1. Try real external API first if authorized
    if (token) {
      try {
        const response = await fetch(`${DASHBOARD_API}/stats/overview`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store',
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ ...data, isDemo: false });
        }
      } catch (e) {
        console.warn('External dashboard API failed, falling back to local DB:', e);
      }
    }

    // 2. Real-time KPI Calculation from Database
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [msgCount, sessionsToday, waitlistCount, totalSessions] = await Promise.all([
      prisma.message.count(),
      prisma.chatSession.count({
        where: { createdAt: { gte: startOfToday } }
      }),
      prisma.waitlist.count(),
      prisma.chatSession.count()
    ]);

    // Simulate "Facts" based on message count + waitlist (just for some dynamic movement)
    const dynamicFacts = 247 + msgCount + (waitlistCount * 2);

    // Simulate Costs based on total messages (e.g. $0.015 per message)
    const simulatedCosts = msgCount * 0.015 + 1.20; // Base floor of $1.20

    return NextResponse.json({
      memory: {
        facts: dynamicFacts,
        msgCount // Adding raw counts for more transparency
      },
      voice: {
        calls_today: sessionsToday || 0,
        total_sessions: totalSessions
      },
      costs: {
        today_usd: Number(simulatedCosts.toFixed(2))
      },
      isDemo: true,
      lastUpdate: now
    });

  } catch (error) {
    console.error('Dashboard overview API error:', error);
    return NextResponse.json({
      memory: { facts: 247 },
      voice: { calls_today: 12 },
      costs: { today_usd: 2.34 },
      isDemo: true,
      error: 'Database calculation error'
    });
  }
}

