import { NextRequest, NextResponse } from 'next/server';
import { emitNightwatchSignal, nightwatchSignalId } from '@/lib/nightwatch-signal';

export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest) {
  const expected = process.env.RESEND_WEBHOOK_SECRET;
  if (!expected) return process.env.NODE_ENV !== 'production';
  const header = req.headers.get('x-resend-webhook-secret') || req.headers.get('x-webhook-secret') || '';
  return header === expected;
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_WEBHOOK_SECRET && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ ok: false, error: 'Webhook secret not configured' }, { status: 503 });
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as any;
  if (!body) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  const event = String(body.type || body.event || 'email.event');
  const data = body.data || body;
  const email = data.to || data.recipient || data.email || null;
  const auditId = data.auditId || data.tags?.auditId || null;

  const signalResult = await emitNightwatchSignal({
    event: 'email_delivery_event',
    signalId: nightwatchSignalId(auditId, Array.isArray(email) ? email[0] : email, null),
    auditId,
    email: Array.isArray(email) ? email[0] : email,
    emailStatus: event,
    metadata: {
      provider: 'resend',
      event,
      messageId: data.email_id || data.id || null,
    },
  });

  return NextResponse.json({ ok: true, nightwatch: signalResult });
}
