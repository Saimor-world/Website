'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield, Lock, Globe, Server, AlertTriangle, CheckCircle2, FileText, ChevronRight, Download, Printer } from 'lucide-react';

const LOADING_STEPS = [
  { id: 'dns', label: 'Digitale Wegweiser prüfen (DNS)', desc: 'Wir schauen, ob deine Adressen sicher geroutet werden.' },
  { id: 'tls', label: 'Verschlüsselungs-Check (TLS)', desc: 'Ist die Verbindung zu deinen Servern zeitgemäß gesichert?' },
  { id: 'headers', label: 'Schutzschilde analysieren (HTTP)', desc: 'Prüfung der Sicherheits-Header deiner Webseite.' },
  { id: 'subdomains', label: 'Nachbargebäude finden (Subdomains)', desc: 'Was ist im Umfeld deiner Domain noch alles sichtbar?' },
  { id: 'ai', label: 'Mora Intelligence Analyse', desc: 'Die kognitive Einordnung deiner Ergebnisse.' }
];

export default function ScanPage({ locale = 'de' }: { locale: string }) {
  const [step, setStep] = useState(1);
  const [target, setTarget] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;
    setStep(2);
    
    // Simulate steps
    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadingStep(i);
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    }

    // Mock results based on real scan logic
    const score = Math.floor(Math.random() * 40) + 55; // 55-95
    setResults({
      score,
      target,
      date: new Date().toISOString(),
      findings: [
        { title: 'Verschlüsselung', status: 'ok', desc: 'Deine Webseite nutzt moderne TLS 1.3 Standards. Das ist wie ein Sicherheitsschloss der neuesten Generation.' },
        { title: 'Sichtbarkeit', status: 'warn', desc: 'Wir haben 4 Subdomains gefunden, die teilweise Test-Systeme zeigen. Das ist wie ein offenes Fenster im Hinterhof.' },
        { title: 'Header-Schutz', status: 'risk', desc: 'Wichtige Sicherheits-Header fehlen. Dein Server sagt jedem Besucher zu viel über seine interne Technik.' }
      ]
    });
    setStep(3);
  };

  return (
    <main className={`min-h-screen bg-[#060a09] text-white p-6 md:p-20 ${isPrinting ? 'bg-white text-black p-0' : ''}`}>
      <div className="mx-auto max-w-4xl space-y-12 print:max-w-none">
        
        {/* Step 1: Entry */}
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
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-emerald-300 transition-all active:scale-95">
                Scan starten
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Loading Animation */}
        {step === 2 && (
          <div className="space-y-12">
             <div className="space-y-2">
               <p className="text-[10px] uppercase tracking-widest text-emerald-400 animate-pulse">Analyse läuft...</p>
               <h2 className="text-4xl font-light italic">{LOADING_STEPS[loadingStep].label}</h2>
             </div>
             
             <div className="space-y-6">
                {LOADING_STEPS.map((s, i) => (
                  <div key={s.id} className={`flex items-start gap-4 transition-all duration-500 ${i > loadingStep ? 'opacity-10' : 'opacity-100'}`}>
                    <div className={`mt-1 h-2 w-2 rounded-full ${i === loadingStep ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white/20'}`} />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{s.label}</p>
                      {i === loadingStep && <p className="text-xs text-white/40 animate-in fade-in duration-500">{s.desc}</p>}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Step 3: Results (The Report) */}
        {step === 3 && results && (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10 print:text-black">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Ergebnis fÃ¼r {results.target}</p>
                <h1 className="text-5xl font-light">Saimor Security <span className="italic">Dossier</span></h1>
              </div>
              <div className="flex gap-4 print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs hover:bg-white/10"
                >
                  <Printer size={14} /> PDF Drucken
                </button>
              </div>
            </header>

            {/* Score Ring & Summary */}
            <div className="flex flex-col md:flex-row gap-12 items-center bg-white/[0.02] border border-white/5 rounded-3xl p-10 print:bg-white print:border-black">
               <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                    <circle 
                      cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" 
                      strokeDasharray={552}
                      strokeDashoffset={552 - (552 * results.score) / 100}
                      className="text-emerald-400 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-light tabular-nums">{results.score}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-40">Vertrauen</span>
                  </div>
               </div>
               
               <div className="flex-1 space-y-4 text-center md:text-left">
                  <h3 className="text-2xl font-light">Mora's kognitive EinschÃ¤tzung</h3>
                  <p className="text-white/60 leading-relaxed italic">
                    "{results.summary || 'Deine digitale PrÃ¤senz weist kritische LÃ¼cken auf, die ein gezieltes Eindringen begÃ¼nstigen.'}"
                  </p>
               </div>
            </div>

            {/* NEW: Attacker's Path */}
            {results.attacker_path && (
              <div className="rounded-3xl border border-rose-500/20 bg-rose-500/[0.03] p-8 space-y-6">
                 <div className="flex items-center gap-3 text-rose-400">
                    <AlertTriangle size={20} />
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Hypothetisches Angriffsszenario</h3>
                 </div>
                 <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                       {results.attacker_path}
                    </p>
                 </div>
                 <p className="text-[10px] text-white/20 italic">
                    Dieses Szenario wurde von Mora Intelligence basierend auf deinen passiven FingerabdrÃ¼cken generiert.
                 </p>
              </div>
            )}

            {/* Findings */}
            <div className="grid gap-6">
               {results.findings.map((f: any, i: number) => (
                 <div key={i} className="group rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex gap-6 items-start hover:bg-white/[0.03] transition-all">
                    <div className={`mt-1 p-2 rounded-lg ${f.status === 'ok' ? 'bg-emerald-500/10 text-emerald-400' : f.status === 'warn' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                       {f.status === 'ok' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    </div>
                    <div className="space-y-2">
                       <h4 className="font-bold text-sm uppercase tracking-widest">{f.title}</h4>
                       <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                 </div>
               ))}
            </div>

            <footer className="pt-10 flex flex-col items-center gap-6 print:hidden">
               <p className="text-sm text-white/30">Möchtest du diese Lücken schließen?</p>
               <Link href="/de/kontakt" className="bg-white text-black px-12 py-4 rounded-full font-bold hover:bg-emerald-300 transition-all">
                  Experten-Gespräch vereinbaren
               </Link>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}
