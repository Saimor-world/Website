import { NextRequest, NextResponse } from 'next/server';
import { getClientWorld, getClientWorldNoteIds } from '@/lib/client-world';
import { readWorldSession, worldCookieName } from '@/lib/client-world-session';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REACTIONS = new Set(['interesting', 'later', 'disagree']);

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
  const world = getClientWorld(slug);
  if (!world) {
    return NextResponse.json({ error: 'World nicht gefunden.' }, { status: 404 });
  }

  const token = request.cookies.get(worldCookieName(slug))?.value;
  const session = readWorldSession(token, slug);
  if (!session) {
    return NextResponse.json({ error: 'Zugang abgelaufen.' }, { status: 401 });
  }

  let body: { kind?: unknown; itemId?: unknown; value?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 4096) {
      return NextResponse.json({ error: 'Anfrage zu groß.' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const kind = typeof body.kind === 'string' ? body.kind : '';
  const itemId = typeof body.itemId === 'string' ? body.itemId : undefined;
  const value = typeof body.value === 'string' ? body.value.trim() : '';

  let event: string;
  if (kind === 'idea_reaction') {
    if (!itemId || !getClientWorldNoteIds(world).includes(itemId) || !REACTIONS.has(value)) {
      return NextResponse.json({ error: 'Ungültige Reaktion.' }, { status: 400 });
    }
    event = 'client_world.idea_reaction';
  } else if (kind === 'feedback') {
    if (!value || value.length > 1200) {
      return NextResponse.json({ error: 'Feedback muss zwischen 1 und 1200 Zeichen lang sein.' }, { status: 400 });
    }
    event = 'client_world.feedback';
  } else {
    return NextResponse.json({ error: 'Unbekannte Aktion.' }, { status: 400 });
  }

  await prisma.websiteEvent.create({
    data: {
      event,
      path: `/world/${slug}`,
      sessionId: `world:${slug}`,
      visitorId: session.sid,
      payload: {
        slug,
        ...(itemId ? { itemId } : {}),
        value,
      },
    },
  });

  return NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
