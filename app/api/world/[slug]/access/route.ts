import { NextRequest, NextResponse } from 'next/server';
import { getClientWorldAccessEnvKey } from '@/lib/client-world';
import {
  accessCodeMatches,
  createWorldSession,
  worldCookieName,
  worldSessionMaxAge,
} from '@/lib/client-world-session';

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
  const envKey = getClientWorldAccessEnvKey(slug);
  if (!envKey) {
    return NextResponse.json({ error: 'World nicht gefunden.' }, { status: 404 });
  }

  let body: { code?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 1024) {
      return NextResponse.json({ error: 'Anfrage zu groß.' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code.trim() : '';
  if (!code || code.length > 128) {
    return NextResponse.json({ error: 'Ungültiger Code.' }, { status: 400 });
  }

  const expected = process.env[envKey];
  if (!expected || expected.length < 10) {
    return NextResponse.json(
      { error: 'Der Zugang ist noch nicht freigeschaltet.' },
      { status: 503 }
    );
  }

  if (!accessCodeMatches(code, expected)) {
    return NextResponse.json({ error: 'Ungültiger Code.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set('Cache-Control', 'no-store');
  response.cookies.set(worldCookieName(slug), createWorldSession(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: worldSessionMaxAge,
  });
  return response;
}
