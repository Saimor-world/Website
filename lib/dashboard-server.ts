import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

type DashboardPath = '/activity' | '/costs/today' | '/stats/overview' | '/status';

export async function proxyOwnerDashboard(
  request: NextRequest,
  path: DashboardPath
) {
  if (!(await isOwnerRequest())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  const baseUrl = process.env.BACKEND_BASE_URL;
  const token = dashboardToken(request);

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: 'Dashboard backend is not configured' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Dashboard backend unavailable' },
        {
          status: 502,
          headers: { 'Cache-Control': 'no-store' },
        }
      );
    }

    return NextResponse.json(await response.json(), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error(`[dashboard${path}] backend request failed`, error);
    return NextResponse.json(
      { error: 'Dashboard backend unavailable' },
      {
        status: 502,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
}

async function isOwnerRequest() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user?.role === 'owner';
  } catch (error) {
    console.error('[dashboard] owner session validation failed', error);
    return false;
  }
}

function dashboardToken(request: NextRequest): string | undefined {
  const authorization = request.headers.get('authorization');
  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim() || undefined;
  }
  return process.env.DASHBOARD_API_TOKEN;
}