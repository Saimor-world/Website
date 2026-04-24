import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const startedAt = Date.now();
  let db = { ok: false, users: 0, error: '' as string | null };

  try {
    const users = await prisma.user.count();
    db = { ok: true, users, error: null };
  } catch (error: any) {
    db = {
      ok: false,
      users: 0,
      error: error?.message || 'db check failed',
    };
  }

  const providerIds = (authOptions.providers || [])
    .map((provider: any) => provider?.id)
    .filter(Boolean);

  const payload = {
    ok: db.ok,
    timestamp: new Date().toISOString(),
    elapsedMs: Date.now() - startedAt,
    runtime: {
      node: process.version,
      env: process.env.NODE_ENV || 'unknown',
    },
    auth: {
      providers: providerIds,
      hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET),
      nextAuthUrl: process.env.NEXTAUTH_URL || null,
    },
    smtp: {
      configured: Boolean(
        process.env.SMTP_HOST &&
          process.env.SMTP_USER &&
          process.env.SMTP_PASS
      ),
      host: process.env.SMTP_HOST || null,
      from: process.env.SMTP_FROM || process.env.SMTP_USER || null,
    },
    db,
  };

  return NextResponse.json(payload, {
    status: db.ok ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
