import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { contactFormLimiter, getClientIP } from '@/lib/rate-limit';
import { performPassiveRecon } from '@/lib/recon';
import { runAisecurityAnalysis } from '@/lib/security-analysis';

const Body = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().email(),
  locale: z.enum(['de', 'en']).default('de'),
  industry: z.string().trim().max(120).optional(),
  companySize: z.string().trim().max(50).optional(),
  targetDomain: z.string().trim().max(255).optional(),
  painPoint: z.string().trim().max(500).optional(),
});

function normalizeDomain(value: string) { 
  const input = (value || '').trim().toLowerCase();
  if (!input) return '';
  return input.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/:\d+$/, '');
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const ip = getClientIP(req);
    const limit = await contactFormLimiter.check(req, ip);
    if (!limit.success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const rawBody = await req.json().catch(() => ({}));
    const parsed = Body.safeParse(rawBody);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const data = parsed.data;
    const fallbackDomain = data.email.split('@')[1] || '';
    const domain = normalizeDomain(data.targetDomain || fallbackDomain);

    // 1. ECHTER RECON SCAN (0 Mock)
    const recon = domain ? await performPassiveRecon(domain) : null;

    // 2. ECHTE LLM ANALYSE (Greyzone / Attacker Mindset)
    const aiResult = recon ? await runAisecurityAnalysis({
      domain: recon.domain,
      ip: recon.ip || undefined,
      headers: (recon as any).rawHeaders || {}, // Wir mappen das später
      tls: recon.sslInfo,
      subdomains: recon.subdomains
    }) : null;

    const score = aiResult?.score ?? (recon ? 70 : 100);
    const level = score < 50 ? 'high' : score < 80 ? 'medium' : 'low';

    // 3. DATENBANK SPEICHERN
    let userId: string | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) userId = user.id;
    }

    const createdAudit = await prisma.securityAudit.create({
      data: {
        userId,
        name: data.name,
        email: data.email,
        industry: data.industry,
        companySize: data.companySize,
        domain: domain,
        targetDomain: recon?.domain || domain,
        score,
        level: level.charAt(0).toUpperCase() + level.slice(1),
        analysis: aiResult?.summary || 'Standard Analyse abgeschlossen.',
        attackerPath: aiResult?.attacker_path,
        reconData: recon as any,
        recommendations: (aiResult?.findings?.map((f: any) => ({
          title: f.title,
          text: f.desc,
          priority: f.severity === 'risk' ? 'high' : 'medium'
        })) || []) as any,
        followUpQuestions: (aiResult?.followUpQuestions || []) as any,
      },
    });

    return NextResponse.json({
      success: true,
      result: {
        id: createdAudit.id,
        score,
        level,
        summary: aiResult?.summary,
        attacker_path: aiResult?.attacker_path,
        findings: aiResult?.findings,
        recon: recon ? {
          domain: recon.domain,
          ip: recon.ip,
          ssl: recon.sslInfo,
          subdomains: recon.subdomains,
        } : null,
      }
    });

  } catch (error) {
    console.error('[Security Scan API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
