import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';

const Body = z.object({
  auditId: z.string().cuid(),
  hqUrl: z.string().url(),
  locale: z.enum(['de', 'en']).default('de'),
});

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
    },
  });
}

function isAllowedHqUrl(value: string, req: NextRequest) {
  try {
    const url = new URL(value);
    const configured = process.env.NEXT_PUBLIC_OS_HOME_URL || 'https://hq.saimor.world';
    const allowed = new URL(configured);
    const localAllowed = isLocalRequest(req) && ['localhost', '127.0.0.1'].includes(url.hostname);
    return localAllowed || url.origin === allowed.origin || url.hostname === 'hq.saimor.world';
  } catch {
    return false;
  }
}

function isLocalRequest(req: NextRequest) {
  return ['localhost', '127.0.0.1', '::1'].includes(req.nextUrl.hostname);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const limited = await magicLinkLimiter.check(req, `hq-link:${ip}`);
    if (!limited.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    if (!isAllowedHqUrl(parsed.data.hqUrl, req)) {
      return NextResponse.json({ error: 'Invalid HQ target' }, { status: 400 });
    }

    const audit = await prisma.securityAudit.findUnique({ where: { id: parsed.data.auditId } });
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    if (isLocalRequest(req)) {
      return NextResponse.json({ success: true, mode: 'local-link', debugUrl: parsed.data.hqUrl });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const subject = parsed.data.locale === 'de'
      ? 'Dein verifizierter Saimor HQ Einstieg'
      : 'Your verified Saimor HQ entry';
    const text = parsed.data.locale === 'de'
      ? `Oeffne deinen Security Check im HQ:\n\n${parsed.data.hqUrl}\n\nDieser Link wurde an die E-Mail-Adresse geschickt, die den Check angefordert hat. Ein Account entsteht erst, wenn du ihn im HQ aktiv verbindest.`
      : `Open your security check in HQ:\n\n${parsed.data.hqUrl}\n\nThis link was sent to the email address that requested the check. An account is only created after you actively connect it in HQ.`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: audit.email,
        subject,
        text,
      });
    } catch (mailError) {
      console.error('[HQ Link Mail Error]', mailError);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[HQ Link Request Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
