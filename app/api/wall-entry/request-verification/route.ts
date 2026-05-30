import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';
import { isRealEmail } from '@/lib/wall-entry-service';
import { createWallVerificationToken } from '@/lib/wall-verification';
import { emitNightwatchSignal, nightwatchSignalId } from '@/lib/nightwatch-signal';

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

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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

    if (!process.env.RESEND_API_KEY) {
      console.error('[Wall Verification] RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = body.locale === 'de'
      ? 'Saimor Wall: E-Mail bestaetigen'
      : 'Saimor Wall: verify your email';

    const htmlBody = body.locale === 'de'
      ? `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Bestaetige, dass dein Nightwatch Security Signal in die Saimor Wall-Freigabe darf.
          </p>
          <a href="${escapeHtml(verifyUrl)}"
             style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 24px;
                    border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px;">
            Wall-Eintrag bestaetigen
          </a>
          <p style="margin-top: 28px; font-size: 13px; color: #666; line-height: 1.6;">
            Sichtbarkeit: ${escapeHtml(body.visibility)}<br>
            Typ: ${escapeHtml(body.kind)}<br>
            Der Link ist 30 Minuten gueltig. Ohne Klick wird nichts veroeffentlicht.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 12px; color: #aaa;">Saimor Nightwatch &middot; <a href="https://saimor.world" style="color:#aaa;">saimor.world</a></p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Confirm that your Nightwatch security signal may enter Saimor Wall review.
          </p>
          <a href="${escapeHtml(verifyUrl)}"
             style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 24px;
                    border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px;">
            Confirm Wall entry
          </a>
          <p style="margin-top: 28px; font-size: 13px; color: #666; line-height: 1.6;">
            Visibility: ${escapeHtml(body.visibility)}<br>
            Type: ${escapeHtml(body.kind)}<br>
            This link is valid for 30 minutes. Nothing is published without clicking it.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 12px; color: #aaa;">Saimor Nightwatch &middot; <a href="https://saimor.world" style="color:#aaa;">saimor.world</a></p>
        </div>
      `;

    const { error: mailError } = await resend.emails.send({
      from: 'Saimor <contact@saimor.world>',
      to: audit.email,
      subject,
      html: htmlBody,
    });

    if (mailError) {
      console.error('[Wall Verification Resend Error]', mailError);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    const signalResult = await emitNightwatchSignal({
      event: 'wall_verification_email_sent',
      signalId: nightwatchSignalId(audit.id, audit.email, audit.targetDomain || audit.domain),
      auditId: audit.id,
      companyName: body.company || audit.name,
      contactName: body.name,
      email: audit.email,
      domain: audit.targetDomain || audit.domain || null,
      score: audit.score,
      level: audit.level,
      emailStatus: 'wall_verification_sent',
      wallStatus: 'verification_sent',
      metadata: {
        provider: 'resend',
        visibility: body.visibility,
        kind: body.kind,
      },
    });
    if (!signalResult.sent && signalResult.reason !== 'not_configured') {
      console.warn('[Nightwatch Signal] wall_verification_email_sent failed:', signalResult);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Wall Verification Request Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
