import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { contactFormLimiter, getClientIP } from '@/lib/rate-limit';

const Body = z.object({
  auditId: z.string().cuid(),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120).optional(),
  followUpAnswers: z
    .array(z.object({ id: z.string(), answer: z.string().max(200) }))
    .max(5)
    .optional()
    .default([]),
});

/** Derive a short tag from industry or follow-up answers. */
function deriveTag(industry?: string | null, answers?: { id: string; answer: string }[]): string {
  if (industry) {
    const map: Record<string, string> = {
      finance: 'Finanzen',
      health: 'Gesundheit',
      tech: 'Tech',
      legal: 'Recht',
      retail: 'Handel',
      marketing: 'Marketing',
      consulting: 'Beratung',
      handwerk: 'Handwerk',
      manufacturing: 'Produktion',
      logistics: 'Logistik',
    };
    for (const [key, label] of Object.entries(map)) {
      if (industry.toLowerCase().includes(key)) return label;
    }
    // First word of the industry string (capitalised)
    const first = industry.split(/[\s,/]/)[0];
    if (first && first.length > 1) return first.charAt(0).toUpperCase() + first.slice(1);
  }
  return 'Unternehmen';
}

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

    const { auditId, name, company, followUpAnswers } = parsed.data;

    // Fetch the audit
    const audit = await prisma.securityAudit.findUnique({ where: { id: auditId } });
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    // One wall entry per audit
    const existing = await prisma.wallEntry.findUnique({ where: { auditId } });
    if (existing) {
      return NextResponse.json({ entry: existing, alreadyExists: true });
    }

    // Persist answers back to audit
    if (followUpAnswers.length > 0) {
      await prisma.securityAudit.update({
        where: { id: auditId },
        data: { followUpAnswers: followUpAnswers as any },
      });
    }

    const tag = deriveTag(audit.industry, followUpAnswers);

    const entry = await prisma.wallEntry.create({
      data: {
        auditId,
        name,
        company: company || null,
        tag,
        domain: audit.domain || null,
        score: audit.score,
      },
    });

    return NextResponse.json({ entry, alreadyExists: false });
  } catch (error) {
    console.error('[Wall Entry Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
