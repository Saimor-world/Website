import { NextRequest, NextResponse } from 'next/server';
import { getClientWorld } from '@/lib/client-world';
import {
  createWorldSession,
  readWorldSession,
  worldPreviewCookieName,
  worldSessionMaxAge,
} from '@/lib/client-world-session';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DECISIONS = new Set(['yes', 'change']);

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
  if (process.env.VERCEL_ENV === 'production') {
    return NextResponse.json({ error: 'Nicht gefunden.' }, { status: 404 });
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Nicht erlaubt.' }, { status: 403 });
  }

  const { slug } = await context.params;
  const world = getClientWorld(slug);
  if (!world) {
    return NextResponse.json({ error: 'World nicht gefunden.' }, { status: 404 });
  }

  let body: { value?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 1024) {
      return NextResponse.json({ error: 'Anfrage zu groß.' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const value = typeof body.value === 'string' ? body.value.trim() : '';
  if (!DECISIONS.has(value)) {
    return NextResponse.json({ error: 'Ungültige Entscheidung.' }, { status: 400 });
  }

  const cookieName = worldPreviewCookieName(slug);
  const existingToken = request.cookies.get(cookieName)?.value;
  let session = readWorldSession(existingToken, slug);
  let newToken: string | null = null;

  if (!session) {
    newToken = createWorldSession(slug);
    session = readWorldSession(newToken, slug);
  }

  if (!session) {
    return NextResponse.json({ error: 'Session konnte nicht erstellt werden.' }, { status: 500 });
  }

  await prisma.websiteEvent.create({
    data: {
      event: 'client_world.preview_decision',
      path: `/world/${slug}/preview`,
      sessionId: `world-preview:${slug}`,
      visitorId: session.sid,
      payload: {
        slug,
        value,
      },
    },
  });

  const response = NextResponse.json(
    { ok: true, value },
    { headers: { 'Cache-Control': 'no-store' } }
  );

  if (newToken) {
    response.cookies.set(cookieName, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: worldSessionMaxAge,
    });
  }

  return response;
}
