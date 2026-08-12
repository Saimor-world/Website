import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  let ok = false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    ok = true;
  } catch {
    console.warn('[health] database check failed');
  }

  return NextResponse.json(
    { ok },
    {
      status: ok ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}