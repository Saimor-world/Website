'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type ScanResult = {
  id: string | null;
  score: number;
  level: 'high' | 'medium' | 'low';
  levelLabel: string;
  analysis: string;
  risks: Array<{ title: string; text: string }>;
  potentials: Array<{ title: string; text: string }>;
  recommendations: Array<{ title: string; text: string; priority: string }>;
  followUpQuestions: Array<{
    id: string;
    question: string;
    options: string[];
  }>;
  recon: {
    domain: string;
    ip: string | null;
    ssl: {
      valid?: boolean;
      protocol?: string;
      issuer?: string;
      validTo?: string;
    } | null;
    headers: {
      hsts?: boolean;
      csp?: boolean;
      xFrameOptions?: boolean;
    };
    subdomains: string[];
  } | null;
};

type FormData = {
  name: string;
  email: string;
  targetDomain: string;
  industry: string;
  painPoint: string;
};

type FollowUpAnswer = { id: string; answer: string };

type Props = {
  locale?: 'de' | 'en';
};

// ─── Constants ────────────────────────────────────────────────────────────────

const INPUT_CLASS =
  'bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 text-sm w-full transition-colors';

const PRIMARY_BTN =
  'bg-white text-black font-bold rounded-xl px-6 py-3 hover:bg-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

const GHOST_BTN =
  'border border-white/15 text-white/70 rounded-xl px-6 py-3 hover:bg-white/[0.06] transition-colors';

const LABEL_CLASS = 'text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold mb-2 block';

// Loading steps that reflect what the API actually does
const LOADING_STEPS_DE = [
  { text: 'Domain auflösen...', delay: 0 },
  { text: 'TLS-Verbindung prüfen...', delay: 1400 },
  { text: 'Security-Header analysieren...', delay: 2800 },
  { text: 'Subdomain-Inventar abrufen (crt.sh)...', delay: 4000 },
  { text: 'KI-Analyse läuft...', delay: 5500 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreRing({ score, level }: { score: number; level: 'high' | 'medium' | 'low' }) {
  const color = { high: '#f87171', medium: '#fbbf24', low: '#34d399' }[level];
  const label = { high: 'Hohes Risiko', medium: 'Mittleres Risiko', low: 'Gering' }[level];
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = circ * (score / 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="text-center -mt-[62px] mb-[42px]">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="block text-[10px] text-white/40 tracking-widest uppercase mt-0.5">/ 100</span>
      </div>
      <span
        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
        style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}
      >
        {label}
      </span>
    </div>
  );
}

function HeaderStatus({ label, ok, value }: { label: string; ok: boolean; value?: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-0.5 text-xs font-bold shrink-0 ${ok ? 'text-emerald-400' : 'text-red-400'}`}>
        {ok ? '✓' : '✗'}
      </span>
      <div>
        <span className="text-xs text-white/70">{label}</span>
        {value && <span className="text-[10px] text-white/35 ml-1.5">{value}</span>}
      </div>
    </div>
  );
}

function RiskCard({ title, text, severity }: { title: string; text: string; severity?: string }) {
  const isHigh = severity === 'high';
  const isMed = severity === 'medium';
  return (
    <div className={`rounded-xl border p-4 space-y-1.5 ${
      isHigh ? 'border-red-500/20 bg-red-500/[0.04]' :
      isMed  ? 'border-amber-500/20 bg-amber-500/[0.04]' :
               'border-white/10 bg-white/[0.02]'
    }`}>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          isHigh ? 'bg-red-400' : isMed ? 'bg-amber-400' : 'bg-emerald-400'
        }`} />
        <p className="text-sm font-semibold text-white/90">{title}</p>
      </div>
      <p className="text-xs text-white/55 leading-relaxed pl-3.5">{text}</p>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = LOADING_STEPS_DE.slice(1).map((step, i) =>
      setTimeout(() => setActiveStep(i + 1), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] gap-10">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400/15 border-t-emerald-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60 animate-pulse" />
        </div>
      </div>

      <div className="space-y-3 text-left w-full max-w-xs">
        {LOADING_STEPS_DE.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${
              i < activeStep ? 'opacity-40' : i === activeStep ? 'opacity-100' : 'opacity-20'
            }`}
          >
            <span className={`shrink-0 w-4 h-4 flex items-center justify-center text-xs rounded-full ${
              i < activeStep
                ? 'bg-emerald-400/20 text-emerald-400'
                : i === activeStep
                ? 'border border-emerald-400/40 text-emerald-400'
                : 'border border-white/10 text-white/20'
            }`}>
              {i < activeStep ? '✓' : i === activeStep ? '⟳' : '·'}
            </span>
            <span className="text-sm text-white/70 font-mono tracking-tight">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScanPage({ locale = 'de' }: Props) {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    targetDomain: '',
    industry: '',
    painPoint: '',
  });
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<FollowUpAnswer[]>([]);
  const [wallName, setWallName] = useState('');
  const [wallCompany, setWallCompany] = useState('');
  const [wallEntrySuccess, setWallEntrySuccess] = useState(false);
  const [wallError, setWallError] = useState('');
  const [submitError, setSubmitError] = useState('');

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');
    setStep(1);

    try {
      const res = await fetch('/api/security-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          locale,
          industry: form.industry || undefined,
          targetDomain: form.targetDomain || undefined,
          painPoint: form.painPoint || undefined,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error('Scan nicht erfolgreich');

      setScanResult(data.result);
      setWallName(form.name);
      setStep(2);
    } catch (err) {
      setStep(0);
      setSubmitError(
        err instanceof Error ? `Fehler: ${err.message}` : 'Scan fehlgeschlagen. Bitte versuche es erneut.'
      );
    }
  }

  function handleQuestionsNext() {
    setStep(4);
  }

  async function handleWallOptIn() {
    if (!scanResult?.id) { setStep(5); return; }
    try {
      const res = await fetch('/api/wall-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: scanResult.id,
          name: wallName,
          company: wallCompany || undefined,
          followUpAnswers,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setWallEntrySuccess(true);
    } catch {
      setWallError('Wall-Eintrag fehlgeschlagen.');
    }
    setStep(5);
  }

  function selectAnswer(questionId: string, answer: string) {
    setFollowUpAnswers((prev) => {
      const exists = prev.find((a) => a.id === questionId);
      if (exists) return prev.map((a) => a.id === questionId ? { id: questionId, answer } : a);
      return [...prev, { id: questionId, answer }];
    });
  }

  function getAnswer(questionId: string) {
    return followUpAnswers.find((a) => a.id === questionId)?.answer ?? null;
  }

  const allQuestionsAnswered =
    scanResult !== null &&
    scanResult.followUpQuestions.every((q) => getAnswer(q.id) !== null);

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#060d0b] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* ── Step 0: Form ─────────────────────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-10">
            <header className="space-y-4 max-w-2xl">
              <p className={LABEL_CLASS}>Kostenloser Instant-Audit</p>
              <h1 className="text-5xl sm:text-6xl font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Was sieht man über dein Unternehmen von außen?
              </h1>
              <p className="text-white/60 text-base leading-relaxed">
                Echter DNS-Lookup, TLS-Check, Subdomain-Scan und KI-Analyse — in unter 10 Sekunden.
                Kein Account. Kein Sales-Pitch.
              </p>

              {/* Trust markers */}
              <div className="flex flex-wrap gap-4 pt-1">
                {['DNS + IP', 'TLS / SSL', 'Security-Header', 'Subdomains (crt.sh)', 'KI-Analyse'].map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-[0.18em] text-emerald-400/70 border border-emerald-400/20 rounded-full px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {submitError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
                {submitError}
              </div>
            )}

            <form onSubmit={handleScan} className="space-y-5 max-w-2xl">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL_CLASS} htmlFor="scan-name">Name</label>
                  <input id="scan-name" type="text" required placeholder="Max Mustermann" className={INPUT_CLASS}
                    value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL_CLASS} htmlFor="scan-email">E-Mail</label>
                  <input id="scan-email" type="email" required placeholder="max@firma.de" className={INPUT_CLASS}
                    value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="scan-domain">
                  Domain / Website
                  <span className="text-white/25 normal-case ml-1">(wird live gescannt)</span>
                </label>
                <input id="scan-domain" type="text" placeholder="firma.de" className={INPUT_CLASS}
                  value={form.targetDomain} onChange={(e) => setForm((f) => ({ ...f, targetDomain: e.target.value }))} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={LABEL_CLASS} htmlFor="scan-industry">
                    Branche <span className="text-white/25 normal-case">(optional)</span>
                  </label>
                  <input id="scan-industry" type="text" placeholder="z. B. Gesundheitswesen, SaaS, Handwerk" className={INPUT_CLASS}
                    value={form.industry} onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL_CLASS} htmlFor="scan-pain">
                    Größter Zeitfresser <span className="text-white/25 normal-case">(optional)</span>
                  </label>
                  <input id="scan-pain" type="text" placeholder="z. B. manuelle Reports, Support-Emails..." className={INPUT_CLASS}
                    value={form.painPoint} onChange={(e) => setForm((f) => ({ ...f, painPoint: e.target.value }))} />
                </div>
              </div>

              <button type="submit" className={PRIMARY_BTN + ' w-full sm:w-auto'}>
                Audit starten →
              </button>
            </form>
          </div>
        )}

        {/* ── Step 1: Loading ──────────────────────────────────────────────── */}
        {step === 1 && <LoadingScreen />}

        {/* ── Step 2: Results ──────────────────────────────────────────────── */}
        {step === 2 && scanResult && (
          <div className="space-y-8">
            <header className="space-y-1">
              <p className={LABEL_CLASS}>Audit-Ergebnis</p>
              <h2 className="text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {form.targetDomain || form.email.split('@')[1] || 'Dein Bericht'}
              </h2>
            </header>

            {/* Score + recon summary hero row */}
            <div className="grid lg:grid-cols-[1fr_260px] gap-6">

              {/* Recon digest — the REAL data */}
              {scanResult.recon ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
                  <p className={LABEL_CLASS}>Live-Scan Ergebnis</p>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Infrastruktur</p>
                      <div className="space-y-1.5">
                        <HeaderStatus label="Domain" ok={true} value={scanResult.recon.domain} />
                        {scanResult.recon.ip && (
                          <HeaderStatus label="IP-Adresse" ok={true} value={scanResult.recon.ip} />
                        )}
                        {scanResult.recon.ssl && (
                          <HeaderStatus
                            label="TLS-Zertifikat"
                            ok={scanResult.recon.ssl.valid !== false}
                            value={scanResult.recon.ssl.protocol ?? undefined}
                          />
                        )}
                        {scanResult.recon.ssl?.issuer && (
                          <HeaderStatus label="Aussteller" ok={true} value={scanResult.recon.ssl.issuer} />
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Security-Header</p>
                      <div className="space-y-1.5">
                        <HeaderStatus label="HSTS" ok={!!scanResult.recon.headers.hsts} />
                        <HeaderStatus label="Content-Security-Policy" ok={!!scanResult.recon.headers.csp} />
                        <HeaderStatus label="X-Frame-Options" ok={!!scanResult.recon.headers.xFrameOptions} />
                      </div>
                    </div>
                  </div>

                  {scanResult.recon.subdomains.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">
                        Subdomains ({scanResult.recon.subdomains.length} gefunden)
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.recon.subdomains.slice(0, 10).map((sub) => (
                          <span key={sub} className="font-mono text-[10px] text-white/40 border border-white/10 rounded px-2 py-0.5">
                            {sub}
                          </span>
                        ))}
                        {scanResult.recon.subdomains.length > 10 && (
                          <span className="text-[10px] text-white/25 px-2 py-0.5">
                            +{scanResult.recon.subdomains.length - 10} weitere
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex items-center justify-center">
                  <p className="text-sm text-white/30 italic">Kein Domain-Scan — Bewertung basiert auf Branchenkontext.</p>
                </div>
              )}

              {/* Score ring */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col items-center justify-center gap-2">
                <p className={LABEL_CLASS + ' self-start'}>Score</p>
                <ScoreRing score={scanResult.score} level={scanResult.level} />
                {scanResult.analysis && (
                  <p className="text-[11px] text-white/40 text-center leading-relaxed mt-2">
                    {scanResult.analysis.slice(0, 140)}{scanResult.analysis.length > 140 ? '…' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Risks + Potentials */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Risks */}
              <div className="space-y-3">
                <p className={LABEL_CLASS}>Identifizierte Risiken</p>
                {(scanResult.risks.length > 0 ? scanResult.risks : scanResult.recommendations).map((item, i) => (
                  <RiskCard
                    key={i}
                    title={item.title}
                    text={item.text}
                    severity={'priority' in item ? (item as any).priority : (i === 0 ? 'high' : 'medium')}
                  />
                ))}
                {scanResult.risks.length === 0 && scanResult.recommendations.length === 0 && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                    <p className="text-sm text-emerald-400/80">✓ Keine kritischen Lücken erkannt.</p>
                  </div>
                )}
              </div>

              {/* AI Potentials */}
              <div className="space-y-3">
                <p className={LABEL_CLASS}>KI-Potenziale für dein Team</p>
                {scanResult.potentials.length > 0 ? (
                  scanResult.potentials.map((item, i) => (
                    <div key={i} className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.03] p-4 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <p className="text-sm font-semibold text-cyan-300/90">{item.title}</p>
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed pl-3.5">{item.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/30 italic p-4">Analyse wird mit Follow-up-Fragen verfeinert.</p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                className={PRIMARY_BTN}
                onClick={() => scanResult.followUpQuestions.length === 0 ? setStep(4) : setStep(3)}
              >
                {scanResult.followUpQuestions.length > 0 ? 'Weiter zu den Fragen →' : 'Zur Besucher-Wall →'}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Follow-up questions ──────────────────────────────────── */}
        {step === 3 && scanResult && (
          <div className="space-y-10 max-w-2xl">
            <header className="space-y-2">
              <p className={LABEL_CLASS}>Vertiefung</p>
              <h2 className="text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Zwei gezielte Folgefragen
              </h2>
              <p className="text-white/50 text-sm">
                Damit die KI-Auswertung exakter auf euren Kontext passt.
              </p>
            </header>

            <div className="space-y-6">
              {scanResult.followUpQuestions.map((q) => {
                const selected = getAnswer(q.id);
                return (
                  <div key={q.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
                    <p className="text-sm font-medium text-white/90">{q.question}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => selectAnswer(q.id, opt)}
                          className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                            selected === opt
                              ? 'border-emerald-400 text-emerald-300 bg-emerald-400/10'
                              : 'border-white/15 text-white/60 hover:bg-white/[0.06]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                className={PRIMARY_BTN}
                disabled={!allQuestionsAnswered}
                onClick={handleQuestionsNext}
              >
                Weiter →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Wall Opt-in ───────────────────────────────────────────── */}
        {step === 4 && scanResult && (
          <div className="space-y-10 max-w-2xl">
            <header className="space-y-2">
              <p className={LABEL_CLASS}>Besucher-Wall</p>
              <h2 className="text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Zeig, dass du es ernst nimmst.
              </h2>
              <p className="text-white/55 text-sm leading-relaxed">
                Unternehmen die einen Audit gemacht haben erscheinen auf der öffentlichen Wall.
                Keine E-Mail. Kein Foto. Nur Name, Score und Branche.
              </p>
            </header>

            {/* Preview card */}
            <div>
              <p className={LABEL_CLASS}>Vorschau</p>
              <div className="inline-block rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-3 min-w-[220px]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white truncate">
                      {wallName || form.name || 'Dein Name'}
                    </p>
                    {wallCompany && <p className="text-xs text-white/40 truncate">{wallCompany}</p>}
                  </div>
                  <span
                    className="text-lg font-bold shrink-0 tabular-nums"
                    style={{ color: { high: '#f87171', medium: '#fbbf24', low: '#34d399' }[scanResult.level] }}
                  >
                    {scanResult.score}
                  </span>
                </div>
                {form.targetDomain && (
                  <p className="font-mono text-[10px] text-white/35">{form.targetDomain}</p>
                )}
                <span className="inline-block text-[10px] uppercase tracking-[0.18em] border border-white/15 rounded-full px-2.5 py-0.5 text-white/40">
                  {form.industry || 'Unternehmen'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={LABEL_CLASS} htmlFor="wall-name">Name für die Wall</label>
                <input id="wall-name" type="text" className={INPUT_CLASS + ' max-w-sm'}
                  value={wallName} onChange={(e) => setWallName(e.target.value)} />
              </div>
              <div>
                <label className={LABEL_CLASS} htmlFor="wall-company">
                  Firmenname <span className="text-white/25 normal-case">(optional)</span>
                </label>
                <input id="wall-company" type="text" placeholder="Deine GmbH" className={INPUT_CLASS + ' max-w-sm'}
                  value={wallCompany} onChange={(e) => setWallCompany(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className={PRIMARY_BTN} onClick={handleWallOptIn}>
                Zur Wall hinzufügen →
              </button>
              <button className={GHOST_BTN} onClick={() => setStep(5)}>
                Überspringen
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5: Confirmation ──────────────────────────────────────────── */}
        {step === 5 && (
          <div className="space-y-10 max-w-2xl">
            <header className="space-y-4">
              {wallEntrySuccess ? (
                <>
                  <p className={LABEL_CLASS}>Fertig</p>
                  <h2 className="text-5xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Du bist auf der Wall!
                  </h2>
                  <Link href="/wall" className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold hover:underline">
                    Wall ansehen →
                  </Link>
                </>
              ) : (
                <>
                  <p className={LABEL_CLASS}>Audit abgeschlossen</p>
                  <h2 className="text-5xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Ergebnis gespeichert.
                  </h2>
                </>
              )}
            </header>

            {wallError && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-300">
                {wallError}
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4 max-w-md">
              <p className={LABEL_CLASS}>Nächster Schritt</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Ein 20-minütiges Gespräch reicht, um die drei wichtigsten Hebel zu identifizieren — ohne Vorbereitung, ohne Pitch.
              </p>
              <Link
                href={process.env.NEXT_PUBLIC_CAL_URL ?? '/de/kontakt'}
                className={PRIMARY_BTN + ' inline-block text-center'}
              >
                Kostenloses Gespräch buchen
              </Link>
            </div>

            <Link href="/" className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors">
              ← Zurück zur Startseite
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
