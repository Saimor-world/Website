import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getClientIP, magicLinkLimiter } from '@/lib/rate-limit';
import { emitNightwatchSignal, nightwatchSignalId, redactedHqUrl } from '@/lib/nightwatch-signal';

const Body = z.object({
  auditId: z.string().cuid().optional(),
  email: z.string().email().optional(),
  hqUrl: z.string().url(),
  locale: z.enum(['de', 'en']).default('de'),
}).refine((d) => d.auditId || d.email, {
  message: 'Either auditId or email must be provided',
});

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
    let auditContext: {
      id: string;
      name: string;
      email: string;
      targetDomain?: string | null;
      domain?: string | null;
      score: number;
      level: string;
    } | null = null;
    if (parsed.data.auditId) {
      const audit = await prisma.securityAudit.findUnique({ where: { id: parsed.data.auditId } });
      if (audit) {
        recipientEmail = audit.email;
        auditContext = audit;
      }
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

    if (!process.env.RESEND_API_KEY) {
      console.error('[HQ Link] RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email delivery not configured' }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const isDE = parsed.data.locale === 'de';
    const subject = isDE
      ? 'Dein Saimor HQ Einstieg ist bereit'
      : 'Your Saimor HQ entry is ready';

    const htmlBody = isDE
      ? `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p style="font-size: 16px; margin-bottom: 24px;">
            Dein Security Check ist fertig — hier ist dein persönlicher HQ-Einstieg:
          </p>
          <a href="${parsed.data.hqUrl}"
             style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 28px;
                    border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px;">
            HQ öffnen →
          </a>
          <p style="margin-top: 32px; font-size: 13px; color: #666;">
            Du siehst dort deinen Workspace mit den Befunden aus dem Check.<br>
            Ein richtiger Account entsteht erst, wenn du dich im HQ aktiv anmeldest.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 12px; color: #aaa;">Saimor · <a href="https://saimor.world" style="color:#aaa;">saimor.world</a></p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p style="font-size: 16px; margin-bottom: 24px;">
            Your security check is done — here is your personal HQ entry:
          </p>
          <a href="${parsed.data.hqUrl}"
             style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 28px;
                    border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px;">
            Open HQ →
          </a>
          <p style="margin-top: 32px; font-size: 13px; color: #666;">
            You will see your workspace with the findings from the check.<br>
            A real account is only created after you actively sign up inside HQ.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 12px; color: #aaa;">Saimor · <a href="https://saimor.world" style="color:#aaa;">saimor.world</a></p>
        </div>
      `;

    const { error } = await resend.emails.send({
      from: 'Saimor <contact@saimor.world>',
      to: recipientEmail,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error('[HQ Link Resend Error]', error);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    const signalResult = await emitNightwatchSignal({
      event: 'hq_link_sent',
      signalId: nightwatchSignalId(parsed.data.auditId, recipientEmail, auditContext?.targetDomain || auditContext?.domain),
      auditId: parsed.data.auditId || null,
      companyName: auditContext?.name || null,
      email: recipientEmail,
      domain: auditContext?.targetDomain || auditContext?.domain || null,
      score: auditContext?.score ?? null,
      level: auditContext?.level || null,
      hqUrl: redactedHqUrl(parsed.data.hqUrl),
      emailStatus: 'hq_link_sent',
      metadata: {
        provider: 'resend',
        target: 'hq_entry',
      },
    });
    if (!signalResult.sent && signalResult.reason !== 'not_configured') {
      console.warn('[Nightwatch Signal] hq_link_sent failed:', signalResult);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[HQ Link Request Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
