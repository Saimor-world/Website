import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';
import { magicLinkPreflight } from '@/lib/env-preflight';
import { safeInternalPath } from '@/lib/safe-redirect';

const Body = z.object({
  email: z.string().email(),
  callbackUrl: z.string().optional(),
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

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: email.split('@')[0],
        role: 'free',
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
        return NextResponse.json({ success: true, debugUrl: verifyUrl, mode: 'dev-link' });
      }
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const subject =
      data.locale === 'de'
        ? 'Dein Saimor Magic Link'
        : 'Your Saimor Magic Link';
    const body =
      data.locale === 'de'
        ? `Ein Klick zum Login (gueltig fuer 15 Minuten):\n\n${verifyUrl}`
        : `One-click login (valid for 15 minutes):\n\n${verifyUrl}`;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Magic Link API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
