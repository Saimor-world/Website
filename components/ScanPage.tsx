'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Printer, HelpCircle, Info } from 'lucide-react';

const LOADING_STEPS = [
  { id: 'dns',        label: 'Digitale Wegweiser prüfen (DNS)',    desc: 'Wir schauen, ob deine Adressen sicher geroutet werden.' },
  { id: 'tls',        label: 'Verschlüsselungs-Check (TLS)',       desc: 'Ist die Verbindung zu deinen Servern zeitgemäß gesichert?' },
  { id: 'headers',    label: 'Schutzschilde analysieren (HTTP)',    desc: 'Prüfung der Sicherheits-Header deiner Webseite.' },
  { id: 'subdomains', label: 'Nachbargebäude finden (Subdomains)', desc: 'Was ist im Umfeld deiner Domain noch alles sichtbar?' },
  { id: 'ai',         label: 'Mora Intelligence Analyse',           desc: 'Die kognitive Einordnung deiner Ergebnisse.' },
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

export default function ScanPage({ locale = 'de' }: { locale: string }) {
  const [step, setStep]               = useState(1);
  const [target, setTarget]           = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults]         = useState<any>(null);
  const [error, setError]             = useState<string | null>(null);

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) return;
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
          name: 'Anonym',
          email: 'scan@anon.saimor.world',
          targetDomain: target.trim(),
          industry: 'Nicht angegeben',
          companySize: 'Unbekannt',
        }),
      });

      clearInterval(timer);
      setLoadingStep(LOADING_STEPS.length - 1);

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Scan fehlgeschlagen');

      const r = data.result;
      setResults({
        score: r.score,
        target: target.trim(),
        summary: r.summary,
        attacker_path: r.attacker_path,
        recon: r.recon,
        followUpQuestions: r.followUpQuestions,
        findings: (r.findings ?? []).map((f: any) => ({
          title: f.title,
          status: f.severity === 'risk' ? 'risk' : f.severity === 'warn' ? 'warn' : 'ok',
          desc: f.desc,
        })),
      });
      setStep(3);
    } catch (err: any) {
      clearInterval(timer);
      setError(err.message || 'Scan fehlgeschlagen. Bitte versuche es erneut.');
      setStep(3);
    }
  };

  return (
    <main className="min-h-screen bg-[#060a09] text-white p-6 md:p-20 print:bg-white print:text-black">
      <div className="mx-auto max-w-4xl space-y-12 print:max-w-none">

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

            <form onSubmit={startScan} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="deine-domain.de"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-emerald-300 transition-all active:scale-95"
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
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Ergebnis für {results.target}</p>
                <h1 className="text-5xl font-light">Saimor Security <span className="italic">Dossier</span></h1>
              </div>
              <div className="flex items-center gap-3 print:hidden">
                <button
                  onClick={() => { setStep(1); setResults(null); }}
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

            {/* Score ring + AI summary */}
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
                <h3 className="text-2xl font-light">Mora&apos;s kognitive Einschätzung</h3>
                {results.summary ? (
                  <p className="text-white/60 leading-relaxed italic text-sm">
                    &ldquo;{results.summary}&rdquo;
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
                  {results.recon.ssl?.version && (
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/25 font-mono">TLS</p>
                      <p className="font-mono text-xs text-emerald-400">{results.recon.ssl.version}</p>
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
                  {(results.recon.subdomains?.length ?? 0) === 0 && !results.recon.ip && !results.recon.ssl && (
                    <div className="col-span-4 text-xs text-white/25 text-center py-2">
                      Keine öffentlichen Recon-Daten gefunden — Domain könnte gut gesichert sein.
                    </div>
                  )}
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

            <footer className="pt-8 flex flex-col items-center gap-4 print:hidden">
              <p className="text-sm text-white/30">Möchtest du diese Lücken schließen?</p>
              <Link
                href="/de/kontakt"
                className="bg-white text-black px-12 py-4 rounded-full font-bold hover:bg-emerald-300 transition-all"
              >
                Experten-Gespräch vereinbaren
              </Link>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}
