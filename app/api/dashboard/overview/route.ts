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

    // 2. Fetch from local database (Real Database Integration)
    let stats = await prisma.dashboardStats.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    // Seed initial data if empty
    if (!stats) {
      stats = await prisma.dashboardStats.create({
        data: {
          facts: 247,
          callsToday: 12,
          costsToday: 2.34
        }
      });
    }

    return NextResponse.json({
      memory: { facts: stats.facts },
      voice: { calls_today: stats.callsToday },
      costs: { today_usd: stats.costsToday },
      isDemo: true,
      lastUpdate: stats.updatedAt
    });

  } catch (error) {
    console.error('Dashboard overview API error:', error);
    return NextResponse.json({
      memory: { facts: 247 },
      voice: { calls_today: 12 },
      costs: { today_usd: 2.34 },
      isDemo: true,
      error: 'Database error'
    });
  }
}
