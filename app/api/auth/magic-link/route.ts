import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';
import { magicLinkPreflight } from '@/lib/env-preflight';
import { safeInternalPath } from '@/lib/safe-redirect';
import { createTrialWindow, DEMO_DAYS } from '@/lib/trial';

const Body = z.object({
  email: z.string().email(),
  callbackUrl: z.string().optional(),
  locale: z.enum(['de', 'en']).default('de'),
});

const DEMO_AUDIT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

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

function hashMagicToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function appBaseUrl(req: NextRequest) {
  return (
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`
  );
}

async function ensureDemoUserFromRecentSecurityCheck(email: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return existingUser;

  const recentAudit = await prisma.securityAudit.findFirst({
    where: {
      email,
      createdAt: { gte: new Date(Date.now() - DEMO_AUDIT_MAX_AGE_MS) },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!recentAudit) return null;

  const { trialStartedAt, trialEndsAt } = createTrialWindow();

  const user = await prisma.user.create({
    data: {
      email,
      name: recentAudit.name || email.split('@')[0],
      role: 'trial',
      trialStartedAt,
      trialEndsAt,
      trialSource: 'security-check',
    },
  });

  await prisma.securityAudit.updateMany({
    where: { email, userId: null },
    data: { userId: user.id },
  });

  return user;
}

export async function POST(req: NextRequest) {
  try {
    magicLinkPreflight();
    const ip = getClientIP(req);
    const limited = await magicLinkLimiter.check(req, `magic-link:${ip}`);
    if (!limited.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const data = parsed.data;
    const email = data.email.toLowerCase().trim();
    const callbackUrl = safeInternalPath(data.callbackUrl, '/account/bridge');

    const user = await ensureDemoUserFromRecentSecurityCheck(email);
    if (!user) {
      return NextResponse.json({ success: true, accepted: true });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashMagicToken(token);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.magicLoginToken.create({
      data: {
        email,
        tokenHash,
        expiresAt,
      },
    });

    const base = appBaseUrl(req);
    const verifyUrl =
      `${base}/auth/magic` +
      `?token=${encodeURIComponent(token)}` +
      `&email=${encodeURIComponent(email)}` +
      `&callbackUrl=${encodeURIComponent(callbackUrl)}`;

    const isDev = process.env.NODE_ENV !== 'production';
    const transporter = createTransporter();
    if (!transporter) {
      if (isDev) {
        return NextResponse.json({
          success: true,
          debugUrl: verifyUrl,
          mode: 'dev-link',
          trialEndsAt: user.trialEndsAt?.toISOString() || null,
        });
      }
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const trialDate = user.trialEndsAt
      ? new Intl.DateTimeFormat(data.locale === 'de' ? 'de-DE' : 'en-GB', { dateStyle: 'long' }).format(user.trialEndsAt)
      : null;

    const subject = data.locale === 'de'
      ? 'Dein Saimôr Demo-Zugang ist bereit'
      : 'Your Saimôr demo access is ready';

    const body = data.locale === 'de'
      ? `Dein Security Check ist abgeschlossen.\n\nWir haben deinen persönlichen Saimôr Demo-Account vorbereitet${trialDate ? ` — freigeschaltet bis ${trialDate}` : ''}.\n\nMit einem Klick meldest du dich an und übernimmst deinen Report in den Workspace:\n\n${verifyUrl}\n\nDer Login-Link ist 15 Minuten gültig. Dein Demo-Zeitraum beträgt ${DEMO_DAYS} Tage.\n\nSaimôr`
      : `Your Security Check is complete.\n\nWe prepared your personal Saimôr demo account${trialDate ? ` — active until ${trialDate}` : ''}.\n\nUse this one-click link to sign in and claim your report inside the workspace:\n\n${verifyUrl}\n\nThe sign-in link is valid for 15 minutes. Your demo period lasts ${DEMO_DAYS} days.\n\nSaimôr`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject,
        text: body,
      });
    } catch (mailError) {
      if (isDev) {
        console.warn('[Magic Link Dev Fallback]', mailError);
        return NextResponse.json({ success: true, debugUrl: verifyUrl, mode: 'dev-link' });
      }
      throw mailError;
    }

    return NextResponse.json({
      success: true,
      trial: user.role === 'trial',
      trialEndsAt: user.trialEndsAt?.toISOString() || null,
    });
  } catch (error) {
    console.error('[Magic Link API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
