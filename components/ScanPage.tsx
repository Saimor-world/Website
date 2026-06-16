'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Printer, HelpCircle, Info, Pin, Save, ExternalLink, ClipboardList, Download, Mail, Sparkles } from 'lucide-react';
import DemoHqPreview from './DemoHqPreview';
import { buildDemoCompanyProfile } from '@/lib/demo-company';
import { buildContextToken } from '@/lib/entry-token';

const LOADING_STEPS = [
  { id: 'dns',        label: 'Digitale Wegweiser prüfen (DNS)',    desc: 'Wir schauen, ob deine Adressen sicher geroutet werden.' },
  { id: 'tls',        label: 'Verschlüsselungs-Check (TLS)',       desc: 'Ist die Verbindung zu deinen Servern zeitgemäß gesichert?' },
  { id: 'headers',    label: 'Schutzschilde analysieren (HTTP)',    desc: 'Prüfung der Sicherheits-Header deiner Webseite.' },
  { id: 'publicFiles', label: 'Oeffentliche Spuren browsen',        desc: 'Der Audit-Agent prueft security.txt, robots.txt, sitemap und sensible Standardpfade.' },
  { id: 'subdomains', label: 'Nachbargebäude finden (Subdomains)', desc: 'Was ist im Umfeld deiner Domain noch alles sichtbar?' },
  { id: 'report',     label: 'Report-Card bauen',                   desc: 'Die Befunde werden in technische Teilnoten und konkrete Massnahmen uebersetzt.' },
];

function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}

function scoreStroke(score: number): string {
  if (score >= 80) return '#34d399';
  if (score >= 50) return '#fbbf24';
  return '#f87171';
}

function scoreLabel(score: number): string {
  if (score >= 80) return 'Sicher';
  if (score >= 50) return 'Mittel';
  return 'Kritisch';
}

function wallErrorMessage(value?: string) {
  if (!value) return 'Der Bestaetigungslink konnte nicht gesendet werden. Bitte spaeter erneut versuchen.';
  if (value === 'Email delivery failed') return 'Der Bestaetigungslink konnte nicht versendet werden. Nightwatch nutzt jetzt denselben Mailkanal wie der HQ-Link; bitte erneut versuchen.';
  if (value === 'Email delivery not configured') return 'Der Wall-Mailkanal ist noch nicht konfiguriert.';
  if (value === 'Consent is required before publishing to the wall') return 'Bitte bestaetige zuerst die Sichtbarkeit fuer die Wall. Ohne deine Bestaetigung wird nichts oeffentlich.';
  return value;
}

const CATEGORY_LABELS: Record<string, string> = {
  encryption: 'Verschluesselung',
  headers: 'Browser-Schutz',
  informationHygiene: 'Informationshygiene',
  infrastructure: 'Infrastruktur',
};

function domainToCompanyName(value: string) {
  const host = value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .split('.')[0]
    ?.replaceAll('-', ' ');
  if (!host) return 'Deine Firma';
  return host
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function buildHqUrl(results: any) {
  const base = process.env.NEXT_PUBLIC_OS_HOME_URL || 'https://hq.saimor.world';
  const url = new URL(base);
  if (!url.pathname || url.pathname === '/') url.pathname = '/entry';

  const ct = results.entryToken || buildContextToken({
    id: results.id || `local-preview-${Date.now()}`,
    company: results.companyName,
    email: results.email || '',
    domain: results.recon?.domain || results.target || '',
    score: results.score,
    level: scoreLabel(results.score),
    grade: results.grade ?? null,
    summary: results.summary ? String(results.summary).slice(0, 420) : null,
    actions: (results.recommendations ?? [])
      .slice(0, 3)
      .map((rec: any) => rec?.title)
      .filter(Boolean),
  });

  url.searchParams.set('ct', ct);
  return url.toString();
}

export default function ScanPage({ locale = 'de' }: { locale: string }) {
  const [step, setStep]               = useState(1);
  const [target, setTarget]           = useState('');
  const [email, setEmail]             = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [industry, setIndustry]       = useState('');
  const [companySize, setCompanySize] = useState('');
  const [workIntent, setWorkIntent]   = useState('');
  const [ownerNote, setOwnerNote]     = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults]         = useState<any>(null);
  const [error, setError]             = useState<string | null>(null);
  const [noteState, setNoteState]     = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [wallState, setWallState]     = useState<'idle' | 'saving' | 'verification-sent' | 'pinned' | 'error'>('idle');
  const [wallError, setWallError]     = useState<string | null>(null);
  const [wallConsent, setWallConsent] = useState(false);
  const [wallKind, setWallKind]       = useState('supporter');
  const [wallVisibility, setWallVisibility] = useState('company-anonymous');
  const [wallMessage, setWallMessage] = useState('');
  const [hqState, setHqState]         = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [wallVerifyState, setWallVerifyState] = useState<'idle' | 'verifying' | 'pinned' | 'error'>('idle');
  const [wallVerifyError, setWallVerifyError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [countdown, setCountdown]     = useState(3);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('wall_token');
    if (!token) return;

    let cancelled = false;
    const verify = async () => {
      setWallVerifyState('verifying');
      try {
        const res = await fetch('/api/wall-entry/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const payload = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) throw new Error(payload?.error || 'Wall-Verifizierung fehlgeschlagen.');
        setWallVerifyState('pinned');
        window.history.replaceState({}, '', window.location.pathname);
      } catch (err: any) {
        if (cancelled) return;
        setWallVerifyError(err?.message || 'Der Link ist abgelaufen oder ungueltig.');
        setWallVerifyState('error');
      }
    };

    void verify();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (step !== 4 || !redirectUrl) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = redirectUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, redirectUrl]);

  const validateEmail = (e: string) => {
    return String(e)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) {
      setError('Bitte gib eine Domain an.');
      return;
    }
    if (!email.trim() || !validateEmail(email.trim())) {
      setError('Eine gültige E-Mail-Adresse ist erforderlich.');
      return;
    }

    setStep(2);
    setError(null);
    setLoadingStep(0);

    // Advance loading animation every ~1.4 s while real API runs in parallel
    let si = 0;
    const timer = setInterval(() => {
      si = Math.min(si + 1, LOADING_STEPS.length - 1);
      setLoadingStep(si);
    }, 1400);

    try {
      const res = await fetch('/api/security-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: companyName.trim() || contactName.trim() || domainToCompanyName(target.trim()),
          companyName: companyName.trim() || domainToCompanyName(target.trim()),
          contactName: contactName.trim() || undefined,
          email: email.trim(),
          targetDomain: target.trim(),
          industry: industry || 'Nicht angegeben',
          companySize: companySize || 'Unbekannt',
          painPoint: workIntent || undefined,
        }),
      });

      clearInterval(timer);
      setLoadingStep(LOADING_STEPS.length - 1);

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Scan fehlgeschlagen');

      const r = data.result;
      const auditData = {
        id: r.id,
        name: r.companyName || companyName.trim() || domainToCompanyName(target.trim()),
        email: email.trim(),
        targetDomain: target.trim(),
        score: r.score,
        level: r.levelLabel,
        analysis: r.analysis,
        recommendations: r.recommendations,
        industry: industry,
        companySize: companySize,
      };

      const builtHqUrl = buildHqUrl({
        ...auditData,
        companyName: companyName.trim() || domainToCompanyName(target.trim()),
        target: target.trim(),
        recon: r.recon,
        summary: r.summary,
        grade: r.grade,
        entryToken: r.entryToken,
      });

      // The signed /entry link creates an isolated preview account when opened.
      // Never create a shared public-playground session from the WORLD browser:
      // an existing real HQ cookie would otherwise win and expose the wrong account.

      // Always: show results on-page and send the e-mail verification link
      setResults({
        ...auditData,
        persisted: data.persisted,
        target: target.trim(),
        companyName: companyName.trim() || domainToCompanyName(target.trim()),
        contactName: r.contactName || contactName.trim(),
        workIntent: workIntent.trim(),
        summary: r.summary,
        attacker_path: r.attacker_path,
        recon: r.recon,
        agentTrace: r.recon?.agentTrace ?? [],
        pageProbe: r.recon?.pageProbe ?? null,
        grade: r.grade,
        entryToken: r.entryToken,
        categories: r.categories,
        followUpQuestions: r.followUpQuestions,
        findings: (r.findings ?? []).map((f: any) => ({
          title: f.title,
          status: f.severity === 'risk' ? 'risk' : f.severity === 'warn' ? 'warn' : 'ok',
          desc: f.desc,
        })),
        demoProfile: buildDemoCompanyProfile({
          ...(auditData as any),
          name: r.companyName || companyName.trim() || domainToCompanyName(target.trim()),
        }),
        hqUrl: builtHqUrl,
      });

      // Auto-send HQ link to the email provided — no manual click needed
      void sendHqLinkEmail(builtHqUrl, r.id ?? null, email.trim());

      setStep(3);
    } catch (err: any) {
      clearInterval(timer);
      setError(err.message || 'Scan fehlgeschlagen. Bitte versuche es erneut.');
      setStep(3);
    }
  };

  const notePayload = () => [
    ...(ownerNote.trim() ? [{ id: 'owner-note', answer: ownerNote.trim() }] : []),
    ...(workIntent.trim() ? [{ id: 'work-intent', answer: workIntent.trim() }] : []),
  ];

  const saveAuditNote = async () => {
    if (!results?.id) return;
    setNoteState('saving');
    try {
      const res = await fetch('/api/security-audit-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: results.id,
          notes: notePayload(),
        }),
      });
      if (!res.ok) throw new Error('note failed');
      setNoteState('saved');
    } catch {
      setNoteState('error');
    }
  };

  const pinToWall = async () => {
    if (!results?.id) return;
    if (!wallConsent) {
      setWallError('Bitte bestaetige zuerst die Sichtbarkeit fuer die Wall. Ohne deine Bestaetigung wird nichts oeffentlich.');
      setWallState('error');
      return;
    }
    setWallError(null);
    setWallState('saving');
    try {
      const res = await fetch('/api/wall-entry/request-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: results.id,
          name: contactName.trim() || results.companyName,
          company: results.companyName,
          kind: wallKind,
          visibility: wallVisibility,
          message: wallMessage.trim() || ownerNote.trim() || undefined,
          followUpAnswers: notePayload(),
          consent: true,
          locale,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'wall verification failed');
      if (payload?.debugUrl) {
        window.location.href = payload.debugUrl;
        return;
      }
      setWallState('verification-sent');
    } catch (err: any) {
      setWallError(wallErrorMessage(err?.message));
      setWallState('error');
    }
  };

  const sendHqLinkEmail = async (hqUrl: string, auditId: string | null, emailAddr: string) => {
    setHqState('sending');
    try {
      const res = await fetch('/api/security-scan/request-hq-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(auditId ? { auditId } : {}),
          email: emailAddr,
          hqUrl,
          locale,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'hq link failed');
      if (payload?.debugUrl) {
        window.open(payload.debugUrl, '_blank', 'noopener,noreferrer');
      }
      setHqState('sent');
    } catch {
      setHqState('error');
    }
  };

  const requestHqLink = () => {
    if (!results?.hqUrl) return;
    void sendHqLinkEmail(results.hqUrl, results.id ?? null, results.email);
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          @page { margin: 2cm; }
          body { background: white !important; color: black !important; }
          main { background: white !important; padding: 0 !important; }
          .print-hide { display: none !important; }
          .print-break-inside-avoid { page-break-inside: avoid; }
          .print-border { border: 1px solid #ddd !important; }
          h1, h2, h3 { color: black !important; }
          p { color: #333 !important; }
          .rounded-3xl, .rounded-2xl { border-radius: 8px !important; }
        }
      `}</style>
      <main className="min-h-screen bg-[#060a09] text-white p-6 md:p-20 print:bg-white print:text-black">
      <div className="mx-auto max-w-4xl space-y-12 print:max-w-none">
        {wallVerifyState !== 'idle' ? (
          <div className={`rounded-3xl border p-6 ${
            wallVerifyState === 'pinned'
              ? 'border-emerald-300/20 bg-emerald-400/[0.06]'
              : wallVerifyState === 'error'
                ? 'border-red-300/20 bg-red-400/[0.06]'
                : 'border-cyan-300/20 bg-cyan-400/[0.06]'
          }`}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/42">Wall Verification</p>
            <h2 className="mt-2 text-2xl font-light">
              {wallVerifyState === 'verifying'
                ? 'E-Mail wird bestaetigt...'
                : wallVerifyState === 'pinned'
                  ? 'Check ist im Supporter Universe'
                  : 'Verifizierung nicht moeglich'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/56">
              {wallVerifyState === 'verifying'
                ? 'Wir pruefen den Link und veroeffentlichen erst danach.'
                : wallVerifyState === 'pinned'
                  ? 'Die Wall wurde erst nach bestaetigter E-Mail und Zustimmung beschrieben.'
                  : wallVerifyError || 'Der Link ist abgelaufen oder ungueltig.'}
            </p>
            {wallVerifyState === 'pinned' ? (
              <Link href="/wall" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/75 hover:bg-white/[0.1]">
                Supporter Universe ansehen
                <ExternalLink size={14} />
              </Link>
            ) : null}
          </div>
        ) : null}

        {/* ── Step 1 · Entry ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Nightwatch Quickscan</p>
              <h1 className="text-6xl font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Was sieht das <span className="italic">Internet</span> über dein Unternehmen?
              </h1>
              <p className="text-white/40 max-w-lg text-sm">
                Nightwatch prueft nur oeffentliche Signale. Danach uebersetzt Mora OS die Befunde in einen isolierten HQ-Workspace.
              </p>
            </header>

            <form onSubmit={startScan} className="flex flex-col gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">Website oder Domain</span>
                    <input
                      type="text"
                      placeholder="deine-domain.de"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </label>
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">E-Mail Adresse (erforderlich)</span>
                    <input
                      type="email"
                      placeholder="dein@email.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-colors"
                      required
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">Firma optional</span>
                    <input
                      type="text"
                      placeholder="Firmenname"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">Kontakt optional</span>
                    <input
                      type="text"
                      placeholder="Dein Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">Branche</span>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-emerald-500/50 transition-colors"
                    >
                      <option value="">Nicht angeben</option>
                      <option value="Handwerk">Handwerk</option>
                      <option value="Beratung">Beratung</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Gesundheit">Gesundheit</option>
                      <option value="Kommunal">Kommunal</option>
                    </select>
                  </label>
                  <div className="space-y-2 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">Groesse</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['1-10', '11-50', '51+'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setCompanySize(size)}
                          className={`rounded-2xl border px-4 py-3 text-sm transition-colors ${
                            companySize === size
                              ? 'border-emerald-300/45 bg-emerald-400/15 text-emerald-50'
                              : 'border-white/10 bg-black/15 text-white/45 hover:bg-white/[0.06]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/32">Was soll daraus werden?</span>
                    <textarea
                      placeholder="z.B. Website sicherer machen, Kundenvertrauen zeigen, internes Security-Board starten"
                      value={workIntent}
                      onChange={(e) => setWorkIntent(e.target.value)}
                      rows={3}
                      className="w-full resize-none bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </label>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs px-2 animate-pulse">
                  <AlertTriangle size={14} />
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-emerald-300 transition-all active:scale-95 sm:self-start"
              >
                Scan starten
              </button>
            </form>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.25em] text-white/20">
              {['Kein Login', 'Nightwatch passiv', 'HQ-Preview inklusive', 'Kostenlos'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <CheckCircle2 size={10} className="text-emerald-400/50" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2 · Loading ────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 animate-pulse">Analyse läuft…</p>
              <h2 className="text-4xl font-light italic">{LOADING_STEPS[loadingStep].label}</h2>
            </div>
            <div className="space-y-6">
              {LOADING_STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex items-start gap-4 transition-all duration-500 ${i > loadingStep ? 'opacity-10' : 'opacity-100'}`}
                >
                  <div
                    className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      i === loadingStep
                        ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                        : i < loadingStep
                          ? 'bg-emerald-400/40'
                          : 'bg-white/20'
                    }`}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{s.label}</p>
                    {i === loadingStep && (
                      <p className="text-xs text-white/40 animate-in fade-in duration-500">{s.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3 · Error ──────────────────────────────────────── */}
        {step === 3 && error && (
          <div className="animate-in fade-in duration-700">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center space-y-4">
              <AlertTriangle size={32} className="text-red-400 mx-auto" />
              <p className="text-white/70 text-sm">{error}</p>
              <button
                onClick={() => { setStep(1); setError(null); }}
                className="text-emerald-400 text-sm underline underline-offset-2"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3 · Results ────────────────────────────────────── */}
        {step === 3 && results && !error && (
          <div className="space-y-8 animate-in fade-in duration-1000">

            {/* ── 1. HEADER ── */}
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/28">Nightwatch Security Check · {results.target}</p>
                <h1 className="mt-1 text-3xl font-light">
                  {results.companyName}
                  {results.grade && <span className="ml-3 text-lg text-white/35 font-extralight">· {results.grade}</span>}
                </h1>
              </div>
              <div className="flex items-center gap-2 print:hidden shrink-0">
                <button
                  onClick={() => { setStep(1); setResults(null); setNoteState('idle'); setWallState('idle'); setWallConsent(false); setWallKind('supporter'); setWallVisibility('company-anonymous'); setWallMessage(''); setHqState('idle'); }}
                  className="flex items-center gap-1.5 border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-xl text-[11px] text-white/55 hover:bg-white/[0.08] transition-colors"
                >
                  Neuer Scan
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-1.5 border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-xl text-[11px] text-white/55 hover:bg-white/[0.08] transition-colors">
                  <Printer size={13} /> PDF
                </button>
              </div>
            </header>

            {/* ── 2. SCORE + SUMMARY — the verdict ── */}
            <div className={`grid md:grid-cols-[160px_1fr] gap-8 items-center rounded-3xl border p-8 ${
              results.score < 50 ? 'bg-red-500/[0.04] border-red-500/15' : results.score < 80 ? 'bg-amber-400/[0.04] border-amber-400/15' : 'bg-emerald-400/[0.04] border-emerald-400/15'
            }`}>
              <div className="relative w-36 h-36 mx-auto md:mx-0 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="84" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                  <circle cx="96" cy="96" r="84" fill="none" stroke={scoreStroke(results.score)} strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={528} strokeDashoffset={528 - (528 * results.score) / 100}
                    style={{ filter: `drop-shadow(0 0 8px ${scoreStroke(results.score)}80)`, transition: 'stroke-dashoffset 1s ease-out' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-light tabular-nums ${scoreColor(results.score)}`}>{results.score}</span>
                  <span className={`text-[9px] uppercase tracking-widest mt-1 ${scoreColor(results.score)} opacity-60`}>{scoreLabel(results.score)}</span>
                </div>
              </div>
              <div className="space-y-3">
                {/* Finding summary pills */}
                {results.findings?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const risks = results.findings.filter((f: any) => f.status === 'risk').length;
                      const warns = results.findings.filter((f: any) => f.status === 'warn').length;
                      const oks = results.findings.filter((f: any) => f.status === 'ok').length;
                      return <>
                        {risks > 0 && <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-400/20 px-3 py-1 text-[11px] text-red-300"><AlertTriangle size={11} />{risks} {risks === 1 ? 'Risiko' : 'Risiken'}</span>}
                        {warns > 0 && <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 px-3 py-1 text-[11px] text-amber-300"><AlertTriangle size={11} />{warns} {warns === 1 ? 'Warnung' : 'Warnungen'}</span>}
                        {oks > 0 && <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-3 py-1 text-[11px] text-emerald-300"><CheckCircle2 size={11} />{oks} in Ordnung</span>}
                      </>;
                    })()}
                  </div>
                )}
                {results.summary
                  ? <p className="text-white/60 leading-relaxed text-sm">{results.summary}</p>
                  : <p className="text-white/35 text-sm">Score basiert auf verfügbaren passiven Recon-Signalen.</p>}
              </div>
            </div>

            {/* ── 3. MÔRA CTA — the key action ── */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-300/20 bg-emerald-400/[0.04] p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(16,185,129,0.08),transparent)]" />
              <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* MÔRA orb */}
                <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
                  <span className="absolute inset-0 animate-pulse rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)' }} />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.45), rgba(16,185,129,0.62) 46%, rgba(0,0,0,0.32))', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
                    <Sparkles size={14} className="text-white/95" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-light text-white/90">Dein SAIMOR-Workspace ist bereit</h2>
                  <p className="mt-1 text-sm text-white/50 leading-relaxed">
                    MÔRA kennt deine Website — die Befunde sind bereits in deinem persönlichen Dossier. Öffne das HQ und sieh, was das OS daraus macht.
                  </p>
                  {hqState === 'sent' && (
                    <p className="mt-2 text-[11px] text-emerald-300/80">
                      ✓ Link automatisch an <strong>{results.email}</strong> gesendet — check dein Postfach.
                    </p>
                  )}
                  {hqState === 'error' && (
                    <p className="mt-2 text-[11px] text-amber-300/80">Link-Versand fehlgeschlagen — nutze den Button unten.</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a href={results.hqUrl} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-7 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-all shadow-[0_0_24px_rgba(52,211,153,0.3)] active:scale-95">
                    HQ öffnen
                    <ExternalLink size={15} />
                  </a>
                  <button type="button" onClick={requestHqLink} disabled={hqState === 'sending' || hqState === 'sent'}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.05] px-5 py-3.5 text-sm text-white/65 hover:bg-white/[0.1] disabled:opacity-50 transition-colors">
                    <Mail size={14} />
                    {hqState === 'sending' ? 'Sende...' : hqState === 'sent' ? 'Gesendet' : 'Per E-Mail'}
                  </button>
                </div>
              </div>
            </div>

            {/* ── 4. FINDINGS — the meat ── */}
            {results.findings?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[9px] uppercase tracking-[0.35em] text-white/28">Was wir gefunden haben</h3>
                <div className="grid gap-3">
                  {results.findings.map((f: any, i: number) => (
                    <div key={i} className={`flex gap-4 items-start rounded-2xl border p-5 transition-colors hover:bg-white/[0.025] ${
                      f.status === 'risk' ? 'border-red-400/15 bg-red-500/[0.03]' : f.status === 'warn' ? 'border-amber-400/15 bg-amber-500/[0.03]' : 'border-white/[0.06] bg-white/[0.01]'
                    }`}>
                      <div className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${f.status === 'risk' ? 'bg-red-500/12 text-red-400' : f.status === 'warn' ? 'bg-amber-500/12 text-amber-400' : 'bg-emerald-500/12 text-emerald-400'}`}>
                        {f.status === 'ok' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">{f.title}</p>
                        {f.desc && <p className="mt-1 text-sm leading-relaxed text-white/46">{f.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 5. ATTACKER PATH ── */}
            {results.attacker_path && (
              <div className="rounded-3xl border border-rose-500/18 bg-rose-500/[0.025] p-7 space-y-3">
                <div className="flex items-center gap-3 text-rose-400">
                  <AlertTriangle size={16} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Hypothetisches Angriffsszenario</span>
                </div>
                <p className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap">{results.attacker_path}</p>
                <p className="text-[10px] text-white/20 italic">Generiert von MÔRA Intelligence auf Basis passiver Fingerabdrücke.</p>
              </div>
            )}

            {/* ── 6. DEMO PREVIEW (OS teaser) ── */}
            {results.demoProfile && (
              <div className="space-y-3">
                <h3 className="text-[9px] uppercase tracking-[0.35em] text-white/28">So sieht dein HQ aus</h3>
                <DemoHqPreview profile={results.demoProfile} osHref={results.hqUrl} onRequestAccess={requestHqLink} accessState={hqState} />
              </div>
            )}

            {/* ── 7. FOLLOW-UP QUESTIONS ── */}
            {results.followUpQuestions?.length > 0 && (
              <div className="rounded-2xl border border-white/6 bg-white/[0.01] p-7 space-y-4">
                <div className="flex items-center gap-2 text-white/38">
                  <HelpCircle size={15} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Fragen, die du dir stellen solltest</span>
                </div>
                <ul className="space-y-3">
                  {results.followUpQuestions.map((q: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                      <span className="text-white/18 font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── 8. TECHNICAL DETAILS (collapsible) ── */}
            <details className="group">
              <summary className="flex cursor-pointer items-center gap-3 select-none">
                <div className="flex-1 h-px bg-white/6" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-white/22 group-open:text-white/40 transition-colors shrink-0">Technische Details</span>
                <div className="flex-1 h-px bg-white/6" />
              </summary>
              <div className="mt-8 space-y-8">
                {results.categories && (
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Teilnoten</p>
                    <div className="grid gap-4 md:grid-cols-3">
                      {Object.entries(results.categories).map(([key, category]: [string, any]) => (
                        <div key={key} className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">{CATEGORY_LABELS[key] ?? key}</p>
                              <p className={`mt-2 text-4xl font-light ${scoreColor(category.score)}`}>{category.grade}</p>
                            </div>
                            <p className="font-mono text-xs text-white/35">{category.score}/100</p>
                          </div>
                          <div className="space-y-2">
                            {(category.findings ?? []).slice(0, 2).map((finding: any, i: number) => (
                              <div key={`${finding.title}-${i}`} className="flex items-start gap-2 text-xs text-white/50">
                                <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${finding.severity === 'risk' ? 'bg-red-400' : finding.severity === 'warn' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                <span>{finding.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {results.recon && (
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Live Recon</p>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
                      {results.recon.ip && <div><p className="text-[9px] uppercase tracking-widest text-white/25 font-mono mb-1">IP</p><p className="font-mono text-xs text-emerald-400">{results.recon.ip}</p></div>}
                      {results.recon.ssl?.protocol && <div><p className="text-[9px] uppercase tracking-widest text-white/25 font-mono mb-1">TLS</p><p className="font-mono text-xs text-emerald-400">{results.recon.ssl.protocol}</p></div>}
                      {results.recon.ssl?.issuer && <div><p className="text-[9px] uppercase tracking-widest text-white/25 font-mono mb-1">Zertifikat</p><p className="font-mono text-xs text-white/45 truncate">{results.recon.ssl.issuer}</p></div>}
                      {(results.recon.subdomains?.length ?? 0) > 0 && <div><p className="text-[9px] uppercase tracking-widest text-white/25 font-mono mb-1">Subdomains</p><p className="font-mono text-xs text-amber-400">{results.recon.subdomains.length} gefunden</p></div>}
                    </div>
                  </div>
                )}
                {results.pageProbe && (
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Seiten-Fingerprint</p>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 space-y-3">
                      <p className="text-sm text-white/60">{results.pageProbe.title || 'Kein Titel'}</p>
                      {(results.pageProbe.technologies?.length ?? 0) > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {results.pageProbe.technologies.map((tech: string) => (
                            <span key={tech} className="rounded-full border border-cyan-300/10 bg-cyan-400/[0.06] px-3 py-1 text-[10px] text-cyan-100/75">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {results.agentTrace?.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Agent-Protokoll</p>
                    <div className="grid gap-2">
                      {results.agentTrace.map((entry: any, i: number) => (
                        <div key={`${entry.step}-${i}`} className="rounded-xl border border-white/5 bg-white/[0.01] p-4 flex items-start gap-4">
                          <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest ${entry.status === 'ok' ? 'bg-emerald-500/10 text-emerald-300' : entry.status === 'warn' ? 'bg-amber-500/10 text-amber-300' : entry.status === 'blocked' ? 'bg-cyan-500/10 text-cyan-300' : 'bg-red-500/10 text-red-300'}`}>{entry.status}</span>
                          <div>
                            <p className="font-mono text-[10px] text-white/45">{entry.step} · {entry.target}</p>
                            <p className="mt-1 text-xs text-white/35">{entry.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>

            {/* ── 9. OWNER SECTION — internal, collapsed ── */}
            <details className="group">
              <summary className="flex cursor-pointer items-center gap-3 select-none">
                <div className="flex-1 h-px bg-white/4" />
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-white/18 group-open:text-white/32 transition-colors shrink-0">
                  <ClipboardList size={10} /> Owner-Bereich
                </span>
                <div className="flex-1 h-px bg-white/4" />
              </summary>
              <div className="mt-6 rounded-3xl border border-white/8 bg-white/[0.02] p-6 space-y-5">
                <label className="block space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Interne Notiz</span>
                  <textarea value={ownerNote} onChange={(e) => { setOwnerNote(e.target.value); setNoteState('idle'); }} placeholder="Was ist wichtig? Wer muss draufschauen?" rows={3} className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-emerald-300/40" />
                </label>
                <div className="grid gap-3 md:grid-cols-3">
                  <label className="block space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Wall-Typ</span>
                    <select value={wallKind} onChange={(e) => { setWallKind(e.target.value); setWallError(null); if (wallState === 'error') setWallState('idle'); }} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40">
                      <option value="supporter">Supporter</option><option value="customer">Kunde</option><option value="pilot">Pilotkunde</option>
                      <option value="partner">Partner</option><option value="investor">Investor</option><option value="team">Team</option>
                      <option value="community">Community</option><option value="security-check">Security Signal</option>
                    </select>
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Sichtbarkeit</span>
                    <select value={wallVisibility} onChange={(e) => { setWallVisibility(e.target.value); setWallError(null); if (wallState === 'error') setWallState('idle'); }} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40">
                      <option value="company-anonymous">Firma anonym</option><option value="anonymous">Ganz anonym</option><option value="named">Name sichtbar</option>
                    </select>
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Wall-Text</span>
                    <input value={wallMessage} onChange={(e) => { setWallMessage(e.target.value); setWallError(null); if (wallState === 'error') setWallState('idle'); }} maxLength={240} placeholder="Kurzes Signal, optional" className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40" />
                  </label>
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/18 p-4 text-sm text-white/55">
                  <input type="checkbox" checked={wallConsent} onChange={(e) => { setWallConsent(e.target.checked); setWallError(null); if (wallState === 'error') setWallState('idle'); }} className="mt-1 h-4 w-4 accent-emerald-300" />
                  <span>Ich stimme zu, dass Nightwatch diesen Security-Check nach E-Mail-Bestätigung als Wall-Signal in die Freigabe geben darf.</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={saveAuditNote} disabled={!results.id || noteState === 'saving'} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/70 hover:bg-white/[0.1] disabled:opacity-40">
                    <Save size={13} />{noteState === 'saving' ? 'Speichert...' : noteState === 'saved' ? 'Gespeichert' : 'Notiz speichern'}
                  </button>
                  <button type="button" onClick={pinToWall} disabled={!results.id || wallState === 'saving' || wallState === 'verification-sent' || wallState === 'pinned'} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs text-emerald-50 hover:bg-emerald-300/15 disabled:opacity-45">
                    <Pin size={13} />{wallState === 'saving' ? 'Sende Link...' : wallState === 'verification-sent' ? 'Link gesendet' : wallState === 'pinned' ? 'In Review' : 'Wall-Eintrag anfragen'}
                  </button>
                  {wallState === 'pinned' && <Link href="/wall" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white/65 hover:bg-white/[0.1]">Universe ansehen <ExternalLink size={13} /></Link>}
                </div>
                {(noteState === 'error' || wallState === 'error') && <div className="rounded-2xl border border-red-300/18 bg-red-500/[0.08] px-4 py-3 text-xs text-red-100/86">{wallState === 'error' ? wallError || 'Aktion fehlgeschlagen.' : 'Notiz konnte nicht gespeichert werden.'}</div>}
                {wallState === 'verification-sent' && <p className="text-xs text-emerald-200/72">Check deine E-Mail — der Link bestätigt den Eintrag erst nach Bestätigung.</p>}
              </div>
            </details>

            <footer className="pt-8 pb-16 flex flex-col sm:flex-row gap-4 justify-center print:hidden border-t border-white/5">
              <Link href="/de/kontakt" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all">
                Experten-Gespräch vereinbaren
              </Link>
              <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-8 py-4 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <Download size={16} /> PDF sichern
              </button>
            </footer>
          </div>
        )}

        {step === 4 && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in duration-700 relative overflow-hidden">
            {/* Glowing Ambient Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-cyan-500/5 blur-[70px] animate-pulse delay-500" />

            <div className="relative z-10 max-w-md w-full border border-white/[0.08] bg-black/40 p-10 rounded-[32px] shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 overflow-hidden">
              {/* Top Glow bar */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/40 via-cyan-500/30 to-emerald-500/40" />

              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative h-20 w-20">
                    {/* Outer breathing ring */}
                    <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/10 blur-md" />
                    <div className="absolute inset-1.5 rounded-full border border-emerald-500/20 bg-black/40 flex items-center justify-center">
                      <span className="text-2xl font-light text-emerald-400 tracking-tighter" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {countdown}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-bold">MORA OS — SECURED TRANSITION</p>
                  <h1 className="text-3xl font-light tracking-wide text-white leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Dossier wird geladen
                  </h1>
                  <p className="text-xs text-white/55 max-w-xs mx-auto leading-relaxed">
                    Deine sichere Verbindung zum Website-HQ wird hergestellt. Die Daten werden verschlüsselt übertragen.
                  </p>
                </div>
              </div>

              {/* Smooth Progress Bar */}
              <div className="space-y-2">
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 transition-all duration-1000 ease-linear"
                    style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] uppercase tracking-[0.15em] text-white/30">
                  <span>Authentifizierung</span>
                  <span>Umleitung</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => { window.location.href = redirectUrl; }}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400/80 hover:text-emerald-300 font-medium underline underline-offset-4 decoration-emerald-500/30 transition-colors"
                >
                  Klicke hier für eine direkte Weiterleitung
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
              </main>
              </>
              );
              }

