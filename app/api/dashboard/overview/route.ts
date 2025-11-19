import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DASHBOARD_API = 'https://voice.saimor.world/api/dashboard';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${DASHBOARD_API}/stats/overview`, {
      headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      // Return mock data in public mode
      if (response.status === 401 || !token) {
        return NextResponse.json({
          memory: { facts: 247 },
          voice: { calls_today: 12 },
          costs: { today_usd: 2.34 },
          isDemo: true
        });
      }

      return NextResponse.json(
        { error: 'Dashboard API error', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ...data, isDemo: false });

  } catch (error) {
    console.error('Dashboard overview API error:', error);
    // Return demo data on error
    return NextResponse.json({
      memory: { facts: 247 },
      voice: { calls_today: 12 },
      costs: { today_usd: 2.34 },
      isDemo: true
    });
  }
}
