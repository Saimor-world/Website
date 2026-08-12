import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { waitlistLimiter, getClientIP } from '@/lib/rate-limit';

const newsletterRequestSchema = z.object({
  email: z.string().trim().email().max(254),
  locale: z.enum(['de', 'en']).default('de'),
});

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const { success: withinLimit } = await waitlistLimiter.check(request, ip);

  if (!withinLimit) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = newsletterRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const { locale } = parsed.data;
  let entry;

  try {
    entry = await prisma.waitlist.upsert({
      where: { email },
      update: { locale },
      create: {
        email,
        name: 'Newsletter subscriber',
        interests: ['newsletter'],
        locale,
      },
    });
  } catch (error) {
    console.error('[newsletter] persistence failed', error);
    return NextResponse.json(
      { error: 'Subscription could not be stored' },
      { status: 503 }
    );
  }

  const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter_signup',
          data: {
            email: entry.email,
            locale: entry.locale,
            timestamp: entry.createdAt.toISOString(),
            source: 'saimor-website',
          },
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
    } catch (error) {
      console.error('[newsletter] webhook delivery failed', error);
      return NextResponse.json(
        { error: 'Subscription stored but confirmation delivery failed' },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: locale === 'de' ? 'Anmeldung gespeichert.' : 'Subscription stored.',
  });
}