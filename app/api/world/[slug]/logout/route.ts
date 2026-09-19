import { NextRequest, NextResponse } from 'next/server';
import { getClientWorld } from '@/lib/client-world';
import { worldCookieName } from '@/lib/client-world-session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Nicht erlaubt.' }, { status: 403 });
  }

  const { slug } = await context.params;
  if (!getClientWorld(slug)) {
    return NextResponse.json({ error: 'World nicht gefunden.' }, { status: 404 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set('Cache-Control', 'no-store');
  response.cookies.set(worldCookieName(slug), '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
