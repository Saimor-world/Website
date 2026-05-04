import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';

const Body = z.object({
  auditId: z.string().cuid().optional(),
  email: z.string().email().optional(),
  hqUrl: z.string().url(),
  locale: z.enum(['de', 'en']).default('de'),
}).refine((d) => d.auditId || d.email, {
  message: 'Either auditId or email must be provided',
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

    // Resolve recipient email: prefer DB lookup (audit ID), fall back to direct email param
    let recipientEmail: string | null = null;
    if (parsed.data.auditId) {
      const audit = await prisma.securityAudit.findUnique({ where: { id: parsed.data.auditId } });
      if (audit) recipientEmail = audit.email;
    }
    if (!recipientEmail && parsed.data.email) {
      recipientEmail = parsed.data.email;
    }
    if (!recipientEmail) {
      return NextResponse.json({ error: 'Recipient email could not be resolved' }, { status: 404 });
    }

    if (isLocalRequest(req)) {
      return NextResponse.json({ success: true, mode: 'local-link', debugUrl: parsed.data.hqUrl });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const subject = parsed.data.locale === 'de'
      ? 'Dein Saimor HQ Einstieg ist bereit'
      : 'Your Saimor HQ entry is ready';
    const text = parsed.data.locale === 'de'
      ? `Dein Security Check ist fertig — hier ist dein persönlicher HQ-Einstieg:\n\n${parsed.data.hqUrl}\n\nDu siehst dort deinen Workspace mit den Befunden aus dem Check. Ein richtiger Account entsteht erst, wenn du dich im HQ aktiv anmeldest.`
      : `Your security check is done — here is your personal HQ entry:\n\n${parsed.data.hqUrl}\n\nYou will see your workspace with the findings from the check. A real account is only created after you actively sign up inside HQ.`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: recipientEmail,
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
