import { NextRequest } from 'next/server';
import { proxyOwnerDashboard } from '@/lib/dashboard-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return proxyOwnerDashboard(request, '/activity');
}