import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';
import { emitNightwatchSignal, nightwatchSignalId, redactedHqUrl } from '@/lib/nightwatch-signal';
import { createTrialWindow } from '@/lib/trial';

const Body = z.object({
  auditId: z.string().cuid().optional(),
  email: z.string().email().optional(),
  hqUrl: z.string().url(),
  locale: z.enum(['de', 'en']).default('de'),
}).refine((d) => d.auditId || d.email, {
  message: 'Either auditId or email must be provided',
});

const RECENT_AUDIT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

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

function hashMagicToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function appBaseUrl(req: NextRequest) {
  if (process.env.VERCEL_ENV === 'preview') {
    return `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  }
  return (
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`
  );
}

function buildMagicLoginUrl(req: NextRequest, email: string, token: string, auditId: string) {
  const callbackUrl = `/account/bridge?claimType=audit&claimId=${encodeURIComponent(auditId)}&next=${encodeURIComponent(`/account/dashboard/audit/${auditId}`)}`;
  const base = appBaseUrl(req);
  return (
    `${base}/auth/magic` +
    `?token=${encodeURIComponent(token)}` +
    `&email=${encodeURIComponent(email)}` +
    `&callbackUrl=${encodeURIComponent(callbackUrl)}`
  );
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

    const requestedEmail = parsed.data.email?.trim().toLowerCase() || null;
    let audit = parsed.data.auditId
      ? await prisma.securityAudit.findUnique({ where: { id: parsed.data.auditId } })
      : null;

    if (!audit && requestedEmail) {
      audit = await prisma.securityAudit.findFirst({
        where: {
          email: requestedEmail,
          createdAt: { gte: new Date(Date.now() - RECENT_AUDIT_MAX_AGE_MS) },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!audit) {
      return NextResponse.json({ error: 'A completed Security Check is required' }, { status: 404 });
    }

    const recipientEmail = audit.email.trim().toLowerCase();
    if (requestedEmail && requestedEmail !== recipientEmail) {
      return NextResponse.json({ error: 'Email does not match audit' }, { status: 400 });
    }

    const { trialStartedAt, trialEndsAt } = createTrialWindow();
    const user = await prisma.user.upsert({
      where: { email: recipientEmail },
      update: {},
      create: {
        email: recipientEmail,
        name: audit.name || recipientEmail.split('@')[0],
        role: 'trial',
        trialStartedAt,
        trialEndsAt,
        trialSource: 'security-check',
      },
      select: {
        id: true,
        email: true,
        role: true,
        trialEndsAt: true,
      },
    });

    await prisma.securityAudit.updateMany({
      where: { email: recipientEmail, userId: null },
      data: { userId: user.id },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashMagicToken(token);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.magicLoginToken.create({
      data: {
        email: recipientEmail,
        tokenHash,
        expiresAt,
      },
    });

    const verifyUrl = buildMagicLoginUrl(req, recipientEmail, token, audit.id);
    const activeTrialEndsAt = user.role === 'trial' ? user.trialEndsAt : null;

    if (isLocalRequest(req)) {
      return NextResponse.json({
        success: true,
        mode: 'local-link',
        debugUrl: verifyUrl,
        trial: user.role === 'trial',
        trialEndsAt: activeTrialEndsAt?.toISOString() || null,
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[Demo Access] RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const isDE = parsed.data.locale === 'de';
    const formattedTrialEnd = activeTrialEndsAt
      ? new Intl.DateTimeFormat(isDE ? 'de-DE' : 'en-GB', { dateStyle: 'long' }).format(activeTrialEndsAt)
      : null;

    const subject = isDE
      ? 'Dein Saimôr Demo-Zugang ist bereit'
      : 'Your Saimôr demo access is ready';

    const htmlBody = isDE
      ? `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #102019; line-height: 1.55;">
          <p style="font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: #708078; margin-bottom: 18px;">Saimôr · Security Check abgeschlossen</p>
          <h1 style="font-family: Georgia, serif; font-weight: 400; font-size: 34px; line-height: 1.1; margin: 0 0 20px;">Dein Raum ist vorbereitet.</h1>
          <p style="font-size: 16px; margin-bottom: 24px; color: #34463e;">
            Dein Security Check für <strong>${audit.targetDomain || audit.domain || audit.name}</strong> ist fertig.
            Wir haben den Report mit deinem persönlichen Saimôr-Zugang verbunden${formattedTrialEnd ? ` und deine Demo bis <strong>${formattedTrialEnd}</strong> freigeschaltet` : ''}.
          </p>
          <a href="${verifyUrl}"
             style="display: inline-block; background: #102019; color: #fff; padding: 14px 26px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;">
            Einloggen &amp; Report öffnen →
          </a>
          <p style="margin-top: 24px; font-size: 13px; color: #6f7e76;">
            Der Login-Link ist 15 Minuten gültig. Du brauchst kein Passwort. Nach dem Klick landet dein Security Report direkt in deinem eigenen Workspace.
          </p>
          <hr style="border: none; border-top: 1px solid #e5ebe8; margin: 32px 0;" />
          <p style="font-size: 12px; color: #95a19b;">Saimôr · saimor.world</p>
        </div>
      `
      : `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #102019; line-height: 1.55;">
          <p style="font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: #708078; margin-bottom: 18px;">Saimôr · Security Check complete</p>
          <h1 style="font-family: Georgia, serif; font-weight: 400; font-size: 34px; line-height: 1.1; margin: 0 0 20px;">Your space is ready.</h1>
          <p style="font-size: 16px; margin-bottom: 24px; color: #34463e;">
            Your Security Check for <strong>${audit.targetDomain || audit.domain || audit.name}</strong> is complete.
            We connected the report to your personal Saimôr access${formattedTrialEnd ? ` and activated your demo until <strong>${formattedTrialEnd}</strong>` : ''}.
          </p>
          <a href="${verifyUrl}"
             style="display: inline-block; background: #102019; color: #fff; padding: 14px 26px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;">
            Sign in &amp; open report →
          </a>
          <p style="margin-top: 24px; font-size: 13px; color: #6f7e76;">
            The sign-in link is valid for 15 minutes. No password is required. After the click, your Security Report opens inside your own workspace.
          </p>
          <hr style="border: none; border-top: 1px solid #e5ebe8; margin: 32px 0;" />
          <p style="font-size: 12px; color: #95a19b;">Saimôr · saimor.world</p>
        </div>
      `;

    const { error } = await resend.emails.send({
      from: 'Saimôr <contact@saimor.world>',
      to: recipientEmail,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error('[Demo Access Resend Error]', error);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    const signalResult = await emitNightwatchSignal({
      event: 'hq_link_sent',
      signalId: nightwatchSignalId(audit.id, recipientEmail, audit.targetDomain || audit.domain),
      auditId: audit.id,
      companyName: audit.name || null,
      email: recipientEmail,
      domain: audit.targetDomain || audit.domain || null,
      score: audit.score,
      level: audit.level,
      hqUrl: redactedHqUrl(parsed.data.hqUrl),
      emailStatus: 'demo_access_sent',
      metadata: {
        provider: 'resend',
        target: 'demo_magic_login',
        role: user.role,
      },
    });
    if (!signalResult.sent && signalResult.reason !== 'not_configured') {
      console.warn('[Nightwatch Signal] demo_access_sent failed:', signalResult);
    }

    return NextResponse.json({
      success: true,
      trial: user.role === 'trial',
      trialEndsAt: activeTrialEndsAt?.toISOString() || null,
    });
  } catch (error) {
    console.error('[Demo Access Request Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}