import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function isLegacyFixture(entry: {
  name: string;
  company: string | null;
  domain: string | null;
  tag: string | null;
  message: string | null;
}) {
  const normalized = (value?: string | null) => value?.trim().toLowerCase() || '';

  // Two records predate moderation statuses. Keep them in the database as
  // history, but never treat them as public proof. New records are controlled
  // exclusively through `status` in the owner dashboard.
  const firstFixture =
    normalized(entry.domain) === 'dash.saimor.world' &&
    normalized(entry.message) === 'beispiel 1';
  const secondFixture =
    normalized(entry.tag) === 'nicht' &&
    !normalized(entry.company) &&
    !normalized(entry.domain);

  return firstFixture || secondFixture;
}

function publicName(entry: { name: string; company: string | null; tag: string | null; visibility?: string | null }) {
  if (entry.visibility === 'anonymous') return `${entry.tag || 'Saimor'} Signal`;
  if (entry.visibility === 'company-anonymous') return entry.tag ? `${entry.tag}-Unternehmen` : 'Verifiziertes Unternehmen';
  return entry.name;
}

function publicCompany(entry: { company: string | null; domain: string | null; visibility?: string | null }) {
  if (entry.visibility === 'anonymous') return null;
  if (entry.visibility === 'company-anonymous') return null;
  return entry.company || entry.domain || null;
}

function publicDomain(entry: { domain: string | null; visibility?: string | null }) {
  return entry.visibility === 'named' ? entry.domain : null;
}

function pickPublicNote(followUpAnswers: unknown, message?: string | null) {
  if (message && message.trim().length >= 8 && !/^test$/i.test(message.trim())) {
    return message.trim().slice(0, 180);
  }
  if (!Array.isArray(followUpAnswers)) return null;

  const answers = followUpAnswers
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const answer = 'answer' in item ? String((item as { answer?: unknown }).answer || '').trim() : '';
      const id = 'id' in item ? String((item as { id?: unknown }).id || '').toLowerCase() : '';
      if (!answer || answer.length < 8 || /^test$/i.test(answer)) return null;
      return { id, answer };
    })
    .filter(Boolean) as Array<{ id: string; answer: string }>;

  const preferred = answers.find(({ id }) => id.includes('note') || id.includes('message') || id.includes('support'));
  return (preferred?.answer || answers[0]?.answer || null)?.slice(0, 180) || null;
}

export async function GET() {
  try {
    const rawEntries = await prisma.wallEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        company: true,
        tag: true,
        domain: true,
        score: true,
        kind: true,
        visibility: true,
        message: true,
        status: true,
        approvedAt: true,
        createdAt: true,
        audit: {
          select: {
            followUpAnswers: true,
            userId: true,
          },
        },
      },
    });

    const entries = rawEntries
      .filter((entry) => !entry.status || entry.status === 'published')
      .filter((entry) => !isLegacyFixture(entry))
      .map(({ audit, ...entry }) => ({
        ...entry,
        name: publicName(entry),
        company: publicCompany(entry),
        domain: publicDomain(entry),
        claimed: Boolean(audit.userId),
        note: pickPublicNote(audit.followUpAnswers, entry.message),
      }));

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('[Wall GET Error]', error);
    return NextResponse.json({ entries: [] });
  }
}
