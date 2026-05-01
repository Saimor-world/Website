import { promises as dns } from 'dns';
import { prisma } from '@/lib/prisma';
import type { WallFollowUpAnswer, WallIntentPayload } from '@/lib/wall-verification';

export async function isRealEmail(email: string): Promise<boolean> {
  if (!email || email.includes('anon.saimor.world')) return false;
  const domain = email.split('@')[1];
  if (!domain) return false;

  try {
    const mx = await dns.resolveMx(domain);
    return mx.length > 0;
  } catch {
    return false;
  }
}

export function deriveWallTag(industry?: string | null): string {
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
    const first = industry.split(/[\s,/]/)[0];
    if (first && first.length > 1) return first.charAt(0).toUpperCase() + first.slice(1);
  }
  return 'Unternehmen';
}

export async function createWallEntryFromVerifiedIntent(intent: WallIntentPayload) {
  const audit = await prisma.securityAudit.findUnique({ where: { id: intent.auditId } });
  if (!audit) {
    return { status: 404 as const, body: { error: 'Audit not found' } };
  }

  if (audit.email.trim().toLowerCase() !== intent.email.trim().toLowerCase()) {
    return { status: 403 as const, body: { error: 'Verified email does not match audit email' } };
  }

  const existing = await prisma.wallEntry.findUnique({ where: { auditId: intent.auditId } });
  if (existing) {
    return { status: 200 as const, body: { entry: existing, alreadyExists: true } };
  }

  const followUpAnswers = normalizeFollowUpAnswers(intent.followUpAnswers);
  const message = (intent.message || followUpAnswers[0]?.answer || '').trim().slice(0, 240);
  if (followUpAnswers.length > 0) {
    await prisma.securityAudit.update({
      where: { id: intent.auditId },
      data: { followUpAnswers: followUpAnswers as any },
    });
  }

  const entry = await prisma.wallEntry.create({
    data: {
      auditId: intent.auditId,
      name: intent.name,
      company: intent.company || null,
      tag: deriveWallTag(audit.industry),
      domain: audit.domain || audit.targetDomain || null,
      score: audit.score,
      kind: intent.kind || 'supporter',
      visibility: intent.visibility || 'named',
      message: message || null,
      status: 'pending_review',
    },
  });

  return { status: 200 as const, body: { entry, alreadyExists: false } };
}

function normalizeFollowUpAnswers(answers: WallFollowUpAnswer[]) {
  return answers
    .filter((item) => item.id && item.answer?.trim())
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      answer: item.answer.trim().slice(0, 200),
    }));
}
