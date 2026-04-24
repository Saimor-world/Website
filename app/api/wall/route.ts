import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; // ISR: rebuild every 60 s

export async function GET() {
  try {
    const entries = await prisma.wallEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        company: true,
        tag: true,
        domain: true,
        score: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('[Wall GET Error]', error);
    return NextResponse.json({ entries: [] });
  }
}
