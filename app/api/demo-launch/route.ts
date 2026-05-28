import { NextRequest, NextResponse } from 'next/server';
import { signWebsiteEntryToken } from '@/lib/entry-token';

/**
 * POST /api/demo-launch
 * Generates a short-lived signed entry token for a generic public demo
 * and returns the redirect URL to hq.saimor.world/entry.
 *
 * Body: { companyName?: string, domain?: string, locale?: 'de' | 'en' }
 * Response: { url: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const companyName = typeof body.companyName === 'string' && body.companyName.trim()
      ? body.companyName.trim()
      : 'Demo-Unternehmen';
    const domain = typeof body.domain === 'string' && body.domain.trim()
      ? body.domain.trim()
      : 'saimor.world';

    // Use a per-session random prefix so each demo visitor gets an isolated tenant.
    // _preview_ids() in CORE hashes email+domain+company → same email = same tenant.
    // A random suffix guarantees uniqueness without requiring auth.
    const sessionSuffix = Math.random().toString(36).slice(2, 10);
    const demoEmail = `demo-${sessionSuffix}@${domain}`;
    const demoId = `public-demo-${Date.now()}-${sessionSuffix}`;

    const token = signWebsiteEntryToken({
      id: demoId,
      company: companyName,
      email: demoEmail,
      domain,
      score: 68,
      level: 'mittel',
      summary: 'Öffentliche Demo — erkunde Saimôr OS ohne Account.',
      actions: ['OS erkunden', 'Dokumente ansehen', 'Mit Môra sprechen'],
    });

    const osBase = process.env.NEXT_PUBLIC_OS_HOME_URL || 'https://hq.saimor.world';
    const url = new URL('/entry', osBase);
    url.searchParams.set('token', token);
    // mode=demo: signals a pure product demo, NOT a security-audit dossier.
    // No entity/score/companyName params → no dossier context stored in the OS.
    url.searchParams.set('mode', 'demo');

    return NextResponse.json({ url: url.toString() });
  } catch (err) {
    console.error('[demo-launch]', err);
    return NextResponse.json({ error: 'Failed to generate demo token' }, { status: 500 });
  }
}
