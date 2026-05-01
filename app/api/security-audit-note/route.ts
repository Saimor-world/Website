import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const Body = z.object({
  auditId: z.string().cuid(),
  notes: z
    .array(z.object({
      id: z.string().trim().min(1).max(80),
      answer: z.string().trim().max(500),
    }))
    .max(8),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const audit = await prisma.securityAudit.findUnique({
      where: { id: parsed.data.auditId },
      select: { id: true },
    });

    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    const updated = await prisma.securityAudit.update({
      where: { id: parsed.data.auditId },
      data: { followUpAnswers: parsed.data.notes as any },
      select: { id: true, followUpAnswers: true },
    });

    return NextResponse.json({ success: true, audit: updated });
  } catch (error) {
    console.error('[Security Audit Note Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
