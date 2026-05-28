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

    const token = signWebsiteEntryToken({
      id: `public-demo-${Date.now()}`,
      company: companyName,
      email: `demo@${domain}`,
      domain,
      score: 68,
      level: 'mittel',
      summary: 'Öffentliche Demo — erkunde Saimôr OS ohne Account.',
      actions: ['OS erkunden', 'Dokumente ansehen', 'Mit Môra sprechen'],
    });

    const osBase = process.env.NEXT_PUBLIC_OS_HOME_URL || 'https://hq.saimor.world';
    const url = new URL('/entry', osBase);
    url.searchParams.set('token', token);
    url.searchParams.set('surface', 'website');
    url.searchParams.set('entity', 'security-audit');
    url.searchParams.set('id', `public-demo-${Date.now()}`);
    url.searchParams.set('companyName', companyName);
    url.searchParams.set('domain', domain);
    url.searchParams.set('score', '68');
    url.searchParams.set('level', 'mittel');
    url.searchParams.set('title', 'Demo-Workspace');

    return NextResponse.json({ url: url.toString() });
  } catch (err) {
    console.error('[demo-launch]', err);
    return NextResponse.json({ error: 'Failed to generate demo token' }, { status: 500 });
  }
}
