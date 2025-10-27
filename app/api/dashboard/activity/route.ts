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

    const response = await fetch(`${DASHBOARD_API}/activity`, {
      headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      // Demo activity data
      if (response.status === 401 || !token) {
        return NextResponse.json({
          activities: [
            {
              id: '1',
              type: 'memory',
              action: 'fact_stored',
              description: 'Neuer Fakt gespeichert: "Claude.ai API Keys"',
              timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
            },
            {
              id: '2',
              type: 'voice',
              action: 'call_completed',
              description: 'Voice-Call erfolgreich: 2:34 Min',
              timestamp: new Date(Date.now() - 23 * 60 * 1000).toISOString()
            },
            {
              id: '3',
              type: 'learning',
              action: 'review_pending',
              description: '3 neue Learnings warten auf Review',
              timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
            }
          ],
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
    console.error('Dashboard activity API error:', error);
    return NextResponse.json({
      activities: [
        {
          id: '1',
          type: 'memory',
          action: 'fact_stored',
          description: 'Neuer Fakt gespeichert',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        }
      ],
      isDemo: true
    });
  }
}
