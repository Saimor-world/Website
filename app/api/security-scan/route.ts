import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getClientIP, securityScanLimiter } from '@/lib/rate-limit';
import { performPassiveRecon } from '@/lib/recon';
import { calculateSecurityScore } from '@/lib/scoring';
import { runAisecurityAnalysis } from '@/lib/security-analysis';
import { validateScanDomain } from '@/lib/domain-safety';
import { signWebsiteEntryToken } from '@/lib/entry-token';

const Body = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().email(),
  locale: z.enum(['de', 'en']).default('de'),
  industry: z.string().trim().max(120).optional(),
  companySize: z.string().trim().max(50).optional(),
  targetDomain: z.string().trim().max(255).optional(),
  painPoint: z.string().trim().max(500).optional(),
});

function riskLabel(level: 'high' | 'medium' | 'low', locale: 'de' | 'en') {
  if (locale === 'en') {
    if (level === 'high') return 'High';
    if (level === 'medium') return 'Medium';
    return 'Low';
  }
  if (level === 'high') return 'Hoch';
  if (level === 'medium') return 'Mittel';
  return 'Niedrig';
}

function fallbackSummary(score: number, grade?: string) {
  if (score >= 80) {
    return `Der passive Check zeigt eine solide oeffentliche Sicherheitsbasis${grade ? ` (${grade})` : ''}. Einzelne Befunde sollten trotzdem regelmaessig geprueft werden.`;
  }
  if (score >= 50) {
    return `Der passive Check zeigt mittlere Risiken${grade ? ` (${grade})` : ''}. Die wichtigsten Massnahmen liegen bei TLS, Security-Headern und sichtbarer Infrastruktur.`;
  }
  return `Der passive Check zeigt deutliche Risiken${grade ? ` (${grade})` : ''}. Prioritaet haben gueltige Verschluesselung, harte Browser-Schutzheader und reduzierte Angriffsoberflaeche.`;
}

function findingPriority(severity: 'risk' | 'warn' | 'ok') {
  if (severity === 'risk') return 'high';
  if (severity === 'warn') return 'medium';
  return 'low';
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function fallbackFindings(domain: string, warning?: string | null) {
  return [
    {
      title: 'Passiver Recon nicht vollstaendig',
      severity: 'warn' as const,
      desc: warning
        ? `Der schnelle lokale Recon fuer ${domain} wurde begrenzt: ${warning}`
        : `Der schnelle lokale Recon fuer ${domain} konnte nicht vollstaendig abgeschlossen werden.`,
    },
    {
      title: 'Security Header priorisieren',
      severity: 'warn' as const,
      desc: 'Pruefe HSTS, Content-Security-Policy und X-Frame-Options als erstes oeffentlich sichtbares Schutzsignal.',
    },
    {
      title: 'DNS und E-Mail-Zustellung verifizieren',
      severity: 'ok' as const,
      desc: 'MX, SPF, DKIM und DMARC sollten als naechster Schritt gegen Spoofing und Zustellrisiken geprueft werden.',
    },
  ];
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const limit = await securityScanLimiter.check(req, ip);
    if (!limit.success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const rawBody = await req.json().catch(() => ({}));
    const parsed = Body.safeParse(rawBody);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const data = parsed.data;
    const fallbackDomain = data.email.split('@')[1] || '';
    const domainCheck = validateScanDomain(data.targetDomain || fallbackDomain);
    if (!domainCheck.ok) return NextResponse.json({ error: domainCheck.reason }, { status: 400 });
    const domain = domainCheck.domain;

    // 1. ECHTER RECON SCAN (0 Mock), aber lokale Demo darf bei Netzwerkfehlern nicht 500en.
    let recon = null;
    let scanWarning: string | null = null;
    try {
      recon = domain ? await withTimeout(performPassiveRecon(domain), 18000, 'Passive recon') : null;
    } catch (reconError: any) {
      scanWarning = reconError?.message || 'Recon konnte lokal nicht vollstaendig ausgefuehrt werden.';
      console.warn('[Security Scan API] Recon failed, returning fallback report:', scanWarning);
    }

    // 2. DETERMINISTISCHES SCORING
    const technicalAudit = recon ? calculateSecurityScore(recon) : null;
    const allFindings = technicalAudit ? Object.values(technicalAudit.categories).flatMap(c => c.findings) : fallbackFindings(domain, scanWarning);

    // 3. ECHTE LLM ANALYSE (Greyzone / Attacker Mindset)
    const aiResult = recon && technicalAudit ? await withTimeout(runAisecurityAnalysis({
        domain: recon.domain,
        ip: recon.ip || undefined,
        headers: recon.rawHeaders,
        tls: recon.sslInfo,
        subdomains: recon.subdomains,
        score: technicalAudit.totalScore,
        grade: technicalAudit.grade,
        findings: allFindings
      }), 8000, 'AI analysis').catch((analysisError) => {
        console.warn('[Security Scan API] AI analysis skipped:', analysisError?.message ?? analysisError);
        return null;
      }) : null;

    const score = technicalAudit?.totalScore ?? (recon ? 70 : 62);
    const level = score < 50 ? 'high' : score < 80 ? 'medium' : 'low';

    // 3. DATENBANK SPEICHERN, ABER SCAN NICHT VON DB-VERFUEGBARKEIT ABHAENGIG MACHEN
    let userId: string | null = null;
    let createdAuditId: string | null = null;
    let persisted = false;
    const recommendations = allFindings.map((f: any) => ({
      title: f.title,
      text: f.desc,
      priority: findingPriority(f.severity),
    }));
    const analysis = aiResult?.summary || fallbackSummary(score, technicalAudit?.grade);
    const followUpQuestions = aiResult?.followUpQuestions || [];
    const hasMaterialRisk = allFindings.some((f: any) => f.severity === 'risk');
    const entryId = createdAuditId || `scan-${Date.now()}`;

    try {
      const createdAudit = await withTimeout((async () => {
        const { getServerSession } = await import('next-auth');
        const { authOptions } = await import('@/lib/auth');
        const session = await getServerSession(authOptions);

        if (session?.user?.email) {
          const user = await prisma.user.findUnique({ where: { email: session.user.email } });
          if (user) userId = user.id;
        }

        return prisma.securityAudit.create({
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
            analysis,
            attackerPath: hasMaterialRisk ? aiResult?.attacker_path : null,
            reconData: recon as any,
            recommendations: recommendations as any,
            followUpQuestions: followUpQuestions as any,
          },
        });
      })(), 4500, 'Security audit persistence');

      createdAuditId = createdAudit.id;
      persisted = true;
    } catch (dbError: any) {
      console.warn('[Security Scan API] Scan completed without persistence:', dbError?.message ?? dbError);
    }

    const reconPayload = recon ? {
      domain: recon.domain,
      ip: recon.ip,
      ssl: recon.sslInfo,
      headers: recon.securityHeaders,
      subdomains: recon.subdomains,
      publicFiles: recon.publicFiles,
      pageProbe: recon.pageProbe,
      agentTrace: recon.agentTrace,
      finalUrl: recon.finalUrl,
      redirectChain: recon.redirectChain,
    } : null;

    const entryToken = signWebsiteEntryToken({
      id: createdAuditId || entryId,
      company: data.name,
      email: data.email,
      domain,
      score,
      level: riskLabel(level, data.locale),
      summary: analysis,
      actions: recommendations.slice(0, 3).map((recommendation: any) => recommendation.title).filter(Boolean),
    });

    return NextResponse.json({
      success: true,
      emailed: false,
      persisted,
      result: {
        id: createdAuditId,
        score,
        level,
        levelLabel: riskLabel(level, data.locale),
        grade: technicalAudit?.grade ?? null,
        categories: technicalAudit?.categories ?? null,
        analysis,
        summary: analysis,
        attacker_path: hasMaterialRisk ? aiResult?.attacker_path : null,
        followUpQuestions,
        recommendations,
        findings: allFindings,
        recon: reconPayload,
        warning: scanWarning,
        entryToken,
      }
    });
  } catch (error) {
    console.error('[Security Scan API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
