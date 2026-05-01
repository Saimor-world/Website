'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Printer, HelpCircle, Info, Pin, Save, ExternalLink, ClipboardList, Download, Mail } from 'lucide-react';
import DemoHqPreview from './DemoHqPreview';
import { buildDemoCompanyProfile } from '@/lib/demo-company';

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

function buildHqUrl(results: any) {
  const base = process.env.NEXT_PUBLIC_OS_HOME_URL || 'https://hq.saimor.world';
  const url = new URL(base);
  url.searchParams.set('surface', 'website');
  url.searchParams.set('entity', 'security-audit');
  url.searchParams.set('id', results.id || `local-preview-${Date.now()}`);
  url.searchParams.set('company', results.companyName);
  if (results.email) url.searchParams.set('email', results.email);
  url.searchParams.set('domain', results.recon?.domain || results.target);
  url.searchParams.set('score', String(results.score));
  url.searchParams.set('level', scoreLabel(results.score));
  if (results.grade) url.searchParams.set('grade', results.grade);
  if (results.summary) url.searchParams.set('summary', String(results.summary).slice(0, 420));
  if (results.entryToken) url.searchParams.set('entry_token', results.entryToken);
  const topRecommendations = (results.recommendations ?? [])
    .slice(0, 3)
    .map((rec: any) => rec?.title)
    .filter(Boolean)
    .join('|');
  if (topRecommendations) url.searchParams.set('actions', topRecommendations);
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
  const [wallConsent, setWallConsent] = useState(false);
  const [wallKind, setWallKind]       = useState('supporter');
  const [wallVisibility, setWallVisibility] = useState('company-anonymous');
  const [wallMessage, setWallMessage] = useState('');
  const [hqState, setHqState]         = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [wallVerifyState, setWallVerifyState] = useState<'idle' | 'verifying' | 'pinned' | 'error'>('idle');
  const [wallVerifyError, setWallVerifyError] = useState<string | null>(null);

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
          name: contactName.trim() || companyName.trim() || 'Anonym',
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
        name: contactName.trim() || companyName.trim() || 'Anonym',
        email: email.trim(),
        targetDomain: target.trim(),
        score: r.score,
        level: r.levelLabel,
        analysis: r.analysis,
        recommendations: r.recommendations,
        industry: industry,
        companySize: companySize,
      };

      setResults({
        ...auditData,
        persisted: data.persisted,
        target: target.trim(),
        companyName: companyName.trim() || domainToCompanyName(target.trim()),
        contactName: contactName.trim(),
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
        demoProfile: buildDemoCompanyProfile(auditData as any),
        hqUrl: buildHqUrl({
          ...auditData,
          companyName: companyName.trim() || domainToCompanyName(target.trim()),
          target: target.trim(),
          recon: r.recon,
          summary: r.summary,
          grade: r.grade,
          entryToken: r.entryToken,
        }),
      });
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
      setWallState('error');
      return;
    }
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
    } catch {
      setWallState('error');
    }
  };

  const requestHqLink = async () => {
    if (!results?.id || !results?.hqUrl) return;
    setHqState('sending');
    try {
      const res = await fetch('/api/security-scan/request-hq-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: results.id,
          hqUrl: results.hqUrl,
          locale,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'hq link failed');
      if (payload?.debugUrl) {
        window.open(payload.debugUrl, '_blank', 'noopener,noreferrer');
        setHqState('sent');
        return;
      }
      setHqState('sent');
    } catch {
      setHqState('error');
    }
  };

  return (
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
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Instant Audit</p>
              <h1 className="text-6xl font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Was sieht das <span className="italic">Internet</span> über dein Unternehmen?
              </h1>
              <p className="text-white/40 max-w-lg text-sm">
                Kein Login. Kein Deep-Scan. Nur das, was ein Angreifer in den ersten 60 Sekunden passiv herausfindet.
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
              {['Kein Login', 'DSGVO-konform', 'Nur passiver Scan', 'Kostenlos'].map((badge) => (
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
          <div className="space-y-12 animate-in fade-in duration-1000">

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 print:text-black">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Ergebnis für {results.companyName} · {results.target}</p>
                <h1 className="text-5xl font-light">Saimor Security <span className="italic">Dossier</span></h1>
              </div>
              <div className="flex items-center gap-3 print:hidden">
                <button
                  onClick={() => { setStep(1); setResults(null); setNoteState('idle'); setWallState('idle'); setWallConsent(false); setWallKind('supporter'); setWallVisibility('company-anonymous'); setWallMessage(''); setHqState('idle'); }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs hover:bg-white/10 transition-colors"
                >
                  Neuer Scan
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs hover:bg-white/10 transition-colors"
                >
                  <Printer size={14} /> PDF
                </button>
              </div>
            </header>

            {/* Work actions */}
            <div className="rounded-3xl border border-emerald-300/15 bg-emerald-400/[0.045] p-6 space-y-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-emerald-200/60">
                    <ClipboardList size={14} />
                    Arbeitskarte
                  </div>
                  <h2 className="text-2xl font-light">{results.companyName} als naechsten Schritt vorbereiten</h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-white/55">
                    Der Check ist jetzt ein Objekt: Notiz speichern, optional ins Supporter-Gaestebuch haengen oder den HQ-Einstieg per E-Mail freischalten.
                  </p>
                  {!results.id ? (
                    <p className="text-xs text-amber-200/70">Keine Audit-ID gespeichert. Wall und persistente Notizen sind erst mit Datenbank-Persistenz aktiv.</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={requestHqLink}
                  disabled={!results.id || hqState === 'sending' || hqState === 'sent'}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-cyan-200/20 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-50 hover:bg-cyan-300/15"
                >
                  {hqState === 'sending'
                    ? 'Sende HQ-Link...'
                    : hqState === 'sent'
                      ? 'HQ-Link gesendet'
                      : 'HQ-Link per E-Mail'}
                  <ExternalLink size={15} />
                </button>
              </div>

              <label className="block space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Interne Notiz</span>
                <textarea
                  value={ownerNote}
                  onChange={(e) => {
                    setOwnerNote(e.target.value);
                    setNoteState('idle');
                  }}
                  placeholder="Was ist wichtig? Wer muss draufschauen? Was soll Mora daraus machen?"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-emerald-300/40"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-3">
                <label className="block space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Wall-Typ</span>
                  <select
                    value={wallKind}
                    onChange={(event) => setWallKind(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40"
                  >
                    <option value="supporter">Supporter</option>
                    <option value="customer">Kunde</option>
                    <option value="pilot">Pilotkunde</option>
                    <option value="partner">Partner</option>
                    <option value="investor">Investor</option>
                    <option value="team">Team</option>
                    <option value="community">Community</option>
                    <option value="security-check">Security Signal</option>
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Sichtbarkeit</span>
                  <select
                    value={wallVisibility}
                    onChange={(event) => setWallVisibility(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40"
                  >
                    <option value="company-anonymous">Firma anonym</option>
                    <option value="anonymous">Ganz anonym</option>
                    <option value="named">Name sichtbar</option>
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Wall-Text</span>
                  <input
                    value={wallMessage}
                    onChange={(event) => setWallMessage(event.target.value)}
                    maxLength={240}
                    placeholder="Kurzes Signal, optional"
                    className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40"
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/18 p-4 text-sm text-white/58">
                <input
                  type="checkbox"
                  checked={wallConsent}
                  onChange={(event) => {
                    setWallConsent(event.target.checked);
                    if (wallState === 'error') setWallState('idle');
                  }}
                  className="mt-1 h-4 w-4 accent-emerald-300"
                />
                <span>
                  Ich stimme zu, dass dieser Eintrag nach E-Mail-Bestaetigung in die Wall-Freigabe darf. Oeffentlich sichtbar wird nur die ausgewaehlte Sichtbarkeit; E-Mail bleibt intern.
                </span>
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveAuditNote}
                  disabled={!results.id || noteState === 'saving'}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/75 hover:bg-white/[0.1] disabled:opacity-40"
                >
                  <Save size={14} />
                  {noteState === 'saving' ? 'Speichert...' : noteState === 'saved' ? 'Notiz gespeichert' : 'Notiz speichern'}
                </button>
                <button
                  type="button"
                  onClick={pinToWall}
                  disabled={!results.id || wallState === 'saving' || wallState === 'verification-sent' || wallState === 'pinned'}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-medium text-emerald-50 hover:bg-emerald-300/15 disabled:opacity-45"
                >
                  <Pin size={14} />
                  {wallState === 'saving'
                    ? 'Sende Bestaetigungslink...'
                    : wallState === 'verification-sent'
                      ? 'Bestaetigungslink gesendet'
                      : wallState === 'pinned'
                        ? 'In Review'
                        : 'Wall-Eintrag anfragen'}
                </button>
                {wallState === 'pinned' ? (
                  <Link href="/wall" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white/65 hover:bg-white/[0.1]">
                    Supporter Universe ansehen
                    <ExternalLink size={14} />
                  </Link>
                ) : null}
              </div>
              {noteState === 'error' || wallState === 'error' ? (
                <p className="text-xs text-red-300">
                  {wallState === 'error' && !wallConsent
                    ? 'Bitte bestaetige zuerst die Sichtbarkeit fuer die Wall.'
                    : 'Aktion konnte nicht gespeichert werden. Bitte erneut versuchen.'}
                </p>
              ) : null}
              {wallState === 'verification-sent' ? (
                <p className="text-xs text-emerald-200/72">
                  Check deine E-Mail. Erst der Link bestaetigt den Eintrag; danach kann er vom Owner freigegeben oder privat gehalten werden.
                </p>
              ) : null}
              {hqState === 'sent' ? (
                <p className="text-xs text-cyan-200/72">
                  Der HQ-Einstieg wurde an die E-Mail aus dem Check geschickt. Im lokalen Dev-Modus wurde der Link direkt geoeffnet.
                </p>
              ) : hqState === 'error' ? (
                <p className="text-xs text-red-300">HQ-Link konnte nicht gesendet werden. Bitte erneut versuchen.</p>
              ) : null}
            </div>

            {/* Score ring + technical summary */}
            <div className="flex flex-col md:flex-row gap-12 items-center bg-white/[0.02] border border-white/5 rounded-3xl p-10 print:bg-white print:border-black">
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="84" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                  <circle
                    cx="96" cy="96" r="84" fill="none"
                    stroke={scoreStroke(results.score)}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={528}
                    strokeDashoffset={528 - (528 * results.score) / 100}
                    style={{ filter: `drop-shadow(0 0 8px ${scoreStroke(results.score)}80)`, transition: 'stroke-dashoffset 1s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-light tabular-nums ${scoreColor(results.score)}`}>{results.score}</span>
                  <span className={`text-[10px] uppercase tracking-widest mt-1 ${scoreColor(results.score)} opacity-60`}>
                    {scoreLabel(results.score)}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3 text-center md:text-left">
                <h3 className="text-2xl font-light">Technische Einordnung</h3>
                {results.summary ? (
                  <p className="text-white/60 leading-relaxed text-sm">
                    {results.summary}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-white/40 leading-relaxed text-sm">
                      Die Recon-Daten wurden erfasst. Der Score basiert auf den verfügbaren passiven Signalen der Domain.
                    </p>
                    <div className="inline-flex items-center gap-2 text-[10px] text-white/25">
                      <Info size={12} />
                      Für eine vollständige KI-Analyse kontaktiere uns direkt.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Deterministic report card */}
            {results.categories && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Technische Teilnoten</p>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(results.categories).map(([key, category]: [string, any]) => (
                    <div key={key} className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                            {CATEGORY_LABELS[key] ?? key}
                          </p>
                          <p className={`mt-2 text-4xl font-light ${scoreColor(category.score)}`}>
                            {category.grade}
                          </p>
                        </div>
                        <p className="font-mono text-xs text-white/35">{category.score}/100</p>
                      </div>
                      <div className="space-y-2">
                        {(category.findings ?? []).slice(0, 2).map((finding: any, i: number) => (
                          <div key={`${finding.title}-${i}`} className="flex items-start gap-2 text-xs text-white/50">
                            <span
                              className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${
                                finding.severity === 'risk'
                                  ? 'bg-red-400'
                                  : finding.severity === 'warn'
                                    ? 'bg-amber-400'
                                    : 'bg-emerald-400'
                              }`}
                            />
                            <span>{finding.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live recon signals */}
            {results.recon && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Live Recon — Was wir gefunden haben</p>
                <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {results.recon.ip && (
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">IP-Adresse</p>
                      <p className="font-mono text-xs text-emerald-400">{results.recon.ip}</p>
                    </div>
                  )}
                  {results.recon.ssl?.protocol && (
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">TLS</p>
                      <p className="font-mono text-xs text-emerald-400">{results.recon.ssl.protocol}</p>
                    </div>
                  )}
                  {results.recon.ssl?.issuer && (
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">Zertifikat</p>
                      <p className="font-mono text-xs text-white/45 truncate">{results.recon.ssl.issuer}</p>
                    </div>
                  )}
                  {(results.recon.subdomains?.length ?? 0) > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">Subdomains</p>
                      <p className="font-mono text-xs text-amber-400">{results.recon.subdomains.length} gefunden</p>
                    </div>
                  )}
                  {(results.recon.publicFiles?.length ?? 0) > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">Public Files</p>
                      <p className="font-mono text-xs text-amber-400">
                        {results.recon.publicFiles.filter((file: any) => file.found).length} gefunden
                      </p>
                    </div>
                  )}
                  {(results.recon.subdomains?.length ?? 0) === 0 && !results.recon.ip && !results.recon.ssl && (
                    <div className="col-span-4 text-xs text-white/25 text-center py-2">
                      Keine öffentlichen Recon-Daten gefunden — Domain könnte gut gesichert sein.
                    </div>
                  )}
                </div>
              </div>
            )}

            {results.pageProbe && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Seiten-Fingerprint</p>
                <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-6 grid gap-5 md:grid-cols-3">
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">Titel</p>
                    <p className="text-sm text-white/65">{results.pageProbe.title || 'Kein Titel gefunden'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">Formulare</p>
                    <p className="font-mono text-xs text-emerald-400">{results.pageProbe.forms}</p>
                  </div>
                  {(results.pageProbe.technologies?.length ?? 0) > 0 && (
                    <div className="space-y-2 md:col-span-3">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">Technologie-Hinweise</p>
                      <div className="flex flex-wrap gap-2">
                        {results.pageProbe.technologies.map((tech: string) => (
                          <span key={tech} className="rounded-full border border-cyan-300/10 bg-cyan-400/[0.06] px-3 py-1 text-[10px] text-cyan-100/75">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {results.recon?.publicFiles?.some((file: any) => file.found) && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Audit-Agent Browse-Spuren</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {results.recon.publicFiles
                    .filter((file: any) => file.found)
                    .map((file: any) => (
                      <div key={file.path} className="rounded-2xl border border-white/5 bg-white/[0.015] p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-mono text-xs text-white/70">{file.path}</p>
                          <p className="font-mono text-[10px] text-white/25">HTTP {file.status}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${
                            file.risk === 'risk'
                              ? 'bg-red-500/10 text-red-300'
                              : file.risk === 'info'
                                ? 'bg-amber-500/10 text-amber-300'
                                : 'bg-emerald-500/10 text-emerald-300'
                          }`}
                        >
                          {file.risk === 'risk' ? 'Risiko' : file.risk === 'info' ? 'Info' : 'Gut'}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {results.agentTrace?.length > 0 && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Agent-Protokoll</p>
                <div className="grid gap-3">
                  {results.agentTrace.map((entry: any, i: number) => (
                    <div key={`${entry.step}-${i}`} className="rounded-2xl border border-white/5 bg-white/[0.012] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/38">{entry.step}</p>
                          <p className="mt-1 font-mono text-xs text-white/50 break-all">{entry.target}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${
                            entry.status === 'ok'
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : entry.status === 'warn'
                                ? 'bg-amber-500/10 text-amber-300'
                                : entry.status === 'blocked'
                                  ? 'bg-cyan-500/10 text-cyan-300'
                                  : 'bg-red-500/10 text-red-300'
                          }`}
                        >
                          {entry.status}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-white/48">{entry.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attacker path */}
            {results.attacker_path && (
              <div className="rounded-3xl border border-rose-500/20 bg-rose-500/[0.03] p-8 space-y-4">
                <div className="flex items-center gap-3 text-rose-400">
                  <AlertTriangle size={18} />
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Hypothetisches Angriffsszenario</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{results.attacker_path}</p>
                <p className="text-[10px] text-white/20 italic">
                  Generiert von Mora Intelligence auf Basis passiver Fingerabdrücke.
                </p>
              </div>
            )}

            {/* Findings */}
            {results.findings?.length > 0 && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">Befunde</p>
                <div className="grid gap-4">
                  {results.findings.map((f: any, i: number) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex gap-5 items-start hover:bg-white/[0.03] transition-all"
                    >
                      <div
                        className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                          f.status === 'ok'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : f.status === 'warn'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {f.status === 'ok' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-xs uppercase tracking-widest">{f.title}</h4>
                        <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up questions */}
            {results.followUpQuestions?.length > 0 && (
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 space-y-5">
                <div className="flex items-center gap-3 text-white/40">
                  <HelpCircle size={16} />
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Fragen, die du dir stellen solltest</h3>
                </div>
                <ul className="space-y-3">
                  {results.followUpQuestions.map((q: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="text-white/20 font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Demo HQ Preview - The "Schöne Übersichtsseite" */}
            {results.demoProfile && (
              <div className="pt-8 space-y-6">
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Naechster Schritt</p>
                  <h3 className="text-3xl font-light">Deine Firma in Saimor Mora erleben</h3>
                  <p className="text-white/40 text-sm max-w-xl">
                    Wir haben die Ergebnisse deines Checks in eine simulierte HQ-Instanz übertragen. 
                    So könnte Mora für {results.companyName} arbeiten.
                  </p>
                </div>
                <DemoHqPreview 
                  profile={results.demoProfile} 
                  osHref={results.hqUrl} 
                  onRequestAccess={requestHqLink}
                  accessState={hqState}
                />
              </div>
            )}

            <footer className="pt-16 pb-20 flex flex-col items-center gap-8 print:hidden border-t border-white/5">
              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                <Link
                  href="/de/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  Experten-Gespräch vereinbaren
                </Link>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-10 py-4 text-sm font-bold text-slate-950 hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                >
                  <Download size={18} />
                  Dossier als PDF sichern
                </button>
              </div>

              <div className="max-w-md text-center space-y-2">
                <p className="text-xs text-white/30 leading-relaxed">
                  Dieses Dossier wurde auf Basis passiver Signale erstellt. Für einen vollständigen Audit 
                  muss Mora in die Tiefe deines Unternehmens blicken dürfen.
                </p>
              </div>
              </footer>
              </div>
              )}
              </div>
              </main>
              );
              }
