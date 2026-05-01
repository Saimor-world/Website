import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';
import { isRealEmail } from '@/lib/wall-entry-service';
import { createWallVerificationToken } from '@/lib/wall-verification';

const Body = z.object({
  auditId: z.string().cuid(),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120).optional(),
  kind: z.enum(['supporter', 'customer', 'pilot', 'partner', 'investor', 'team', 'community', 'security-check']).default('supporter'),
  visibility: z.enum(['named', 'company-anonymous', 'anonymous']).default('named'),
  message: z.string().trim().max(240).optional(),
  consent: z.boolean(),
  followUpAnswers: z
    .array(z.object({ id: z.string(), answer: z.string().max(200) }))
    .max(5)
    .optional()
    .default([]),
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

function appBaseUrl(req: NextRequest) {
  return (
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`
  );
}

function isLocalRequest(req: NextRequest) {
  return ['localhost', '127.0.0.1', '::1'].includes(req.nextUrl.hostname);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const limited = await magicLinkLimiter.check(req, `wall-verify:${ip}`);
    if (!limited.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const body = parsed.data;
    if (!body.consent) {
      return NextResponse.json({ error: 'Consent is required before publishing to the wall' }, { status: 400 });
    }

    const audit = await prisma.securityAudit.findUnique({ where: { id: body.auditId } });
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    const emailValid = await isRealEmail(audit.email);
    if (!emailValid) {
      return NextResponse.json({
        error: 'Eine zustellbare Firmen-E-Mail ist erforderlich, bevor ein Check an die Wall darf.',
      }, { status: 403 });
    }

    const token = createWallVerificationToken({
      auditId: audit.id,
      email: audit.email,
      name: body.name,
      company: body.company || null,
      kind: body.kind,
      visibility: body.visibility,
      message: body.message || null,
      followUpAnswers: body.followUpAnswers,
      consentAt: new Date().toISOString(),
    });

    const verifyUrl = `${appBaseUrl(req)}/de/einstieg/security-check?wall_token=${encodeURIComponent(token)}`;
    if (isLocalRequest(req)) {
      return NextResponse.json({ success: true, mode: 'local-link', debugUrl: verifyUrl });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const subject = body.locale === 'de'
      ? 'Saimor Wall: E-Mail bestaetigen'
      : 'Saimor Wall: verify your email';
    const text = body.locale === 'de'
      ? `Bestaetige, dass dein Eintrag zur Saimor Wall in die Freigabe darf:\n\n${verifyUrl}\n\nSichtbarkeit: ${body.visibility}\nTyp: ${body.kind}\n\nDer Link ist 30 Minuten gueltig. Ohne Klick wird nichts veroeffentlicht.`
      : `Confirm that your Saimor Wall entry may enter review:\n\n${verifyUrl}\n\nVisibility: ${body.visibility}\nType: ${body.kind}\n\nThis link is valid for 30 minutes. Nothing is published without clicking it.`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: audit.email,
        subject,
        text,
      });
    } catch (mailError) {
      console.error('[Wall Verification Mail Error]', mailError);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Wall Verification Request Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
