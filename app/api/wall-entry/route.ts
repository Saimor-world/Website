import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { contactFormLimiter, getClientIP } from '@/lib/rate-limit';
import { createWallEntryFromVerifiedIntent } from '@/lib/wall-entry-service';
import { verifyWallVerificationToken } from '@/lib/wall-verification';

const Body = z.object({
  auditId: z.string().cuid(),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120).optional(),
  verificationToken: z.string().min(20).optional(),
  followUpAnswers: z
    .array(z.object({ id: z.string(), answer: z.string().max(200) }))
    .max(5)
    .optional()
    .default([]),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const limit = await contactFormLimiter.check(req, ip);
    if (!limit.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (!parsed.data.verificationToken) {
      return NextResponse.json({
        error: 'E-Mail-Verifizierung erforderlich. Bitte fordere zuerst den Wall-Bestaetigungslink an.',
        requiresVerification: true,
      }, { status: 403 });
    }

    const intent = verifyWallVerificationToken(parsed.data.verificationToken);
    if (intent.auditId !== parsed.data.auditId) {
      return NextResponse.json({ error: 'Verification token does not match audit' }, { status: 403 });
    }

    const result = await createWallEntryFromVerifiedIntent({
      ...intent,
      name: parsed.data.name,
      company: parsed.data.company || intent.company || null,
      followUpAnswers: parsed.data.followUpAnswers.length > 0
        ? parsed.data.followUpAnswers
        : intent.followUpAnswers,
    });
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('[Wall Entry Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
