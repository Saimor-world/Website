import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const startedAt = Date.now();
  let database: 'available' | 'unavailable' = 'unavailable';

  try {
    await prisma.$queryRaw`SELECT 1`;
    database = 'available';
  } catch {
    console.warn('[health] database check failed');
  }

  const payload = {
    ok: database === 'available',
    timestamp: new Date().toISOString(),
    elapsedMs: Date.now() - startedAt,
    checks: {
      database,
    },
  };

  return NextResponse.json(payload, {
    status: payload.ok ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
