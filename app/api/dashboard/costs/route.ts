import { NextRequest, NextResponse } from 'next/server';

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

    const response = await fetch(`${DASHBOARD_API}/costs/today`, {
      headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      // Demo data for public mode
      if (response.status === 401 || !token) {
        return NextResponse.json({
          today_usd: 2.34,
          yesterday_usd: 1.87,
          trend: '+25%',
          breakdown: {
            anthropic_usd: 1.84,
            openai_usd: 0.50
          },
          isDemo: true
        });
      }

      return NextResponse.json(
        { error: 'Dashboard API error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ...data, isDemo: false });

  } catch (error) {
    console.error('Dashboard costs API error:', error);
    return NextResponse.json({
      today_usd: 2.34,
      yesterday_usd: 1.87,
      trend: '+25%',
      breakdown: {
        anthropic_usd: 1.84,
        openai_usd: 0.50
      },
      isDemo: true
    });
  }
}
