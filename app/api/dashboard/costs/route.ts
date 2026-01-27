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
        const response = await fetch(`${DASHBOARD_API}/costs/today`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store',
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ ...data, isDemo: false });
        }
      } catch (e) {
        console.warn('External costs API failed, falling back to local DB:', e);
      }
    }

    // 2. Fetch from local database
    let stats = await prisma.dashboardStats.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

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
      today_usd: stats.costsToday,
      yesterday_usd: stats.costsToday * 0.8, // Simulated yesterday
      trend: '+25%',
      breakdown: {
        anthropic_usd: stats.costsToday * 0.75,
        openai_usd: stats.costsToday * 0.25
      },
      isDemo: true,
      lastUpdate: stats.updatedAt
    });

  } catch (error) {
    console.error('Dashboard costs API error:', error);
    return NextResponse.json({
      today_usd: 2.34,
      yesterday_usd: 1.87,
      trend: '+25%',
      breakdown: { anthropic_usd: 1.84, openai_usd: 0.50 },
      isDemo: true
    });
  }
}
