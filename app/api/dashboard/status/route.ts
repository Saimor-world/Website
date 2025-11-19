import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DASHBOARD_API = 'https://voice.saimor.world/api/dashboard';

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${DASHBOARD_API}/status`, {
      headers,
      cache: 'no-store' // Always fresh data
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Dashboard API error', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Dashboard status API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard status' },
      { status: 500 }
    );
  }
}
