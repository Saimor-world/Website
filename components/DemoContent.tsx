'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  FileSearch,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { DemoLaunchButton } from '@/components/DemoLaunchButton';

const flow = [
  {
    icon: ScanLine,
    title: 'Security Check',
    body: 'Passiv und ohne Login – nur öffentlich sichtbare Signale deiner Domain.',
  },
  {
    icon: FileSearch,
    title: 'Echte Befunde',
    body: 'Konkrete Risiken und Stärken werden zu nachvollziehbaren Objekten statt zu einem bloßen Score.',
  },
  {
    icon: LayoutDashboard,
    title: 'Saimôr OS',
    body: 'Der Report wird zum ersten Objekt in deinem Arbeitsraum und bleibt mit dem weiteren Kontext verbunden.',
  },
  {
    icon: KeyRound,
    title: 'Eigener Zugang',
    body: 'Mit dem Magic Link übernimmst du deinen 30-Tage-Raum, ohne ein zweites Konto oder einen Produktwechsel.',
  },
];

export default function DemoContent() {
  return (
    <div className="relative mx-auto max-w-6xl space-y-16 px-6 py-24">
      <header className="space-y-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-200">
          <Sparkles className="h-3.5 w-3.5" />
          Saimôr OS · Demo
        </span>
        <h1 className="text-5xl font-light leading-[1.05] sm:text-6xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Nicht mit einer leeren Promptbox anfangen.
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">
          Du kannst Saimôr auf zwei Arten ansehen: mit einem isolierten Beispielraum oder mit deinem eigenen Security Check. In beiden Fällen bleiben andere Nutzer- und private Betreiberdaten getrennt.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
          >
            <ShieldCheck className="h-4 w-4" />
            Eigene Domain prüfen
            <ArrowRight className="h-4 w-4" />
          </Link>
          <DemoLaunchButton
            label="Isolierten Beispielraum öffnen"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/80 transition-colors hover:bg-white/10 disabled:opacity-60"
          />
        </div>
      </header>

      <section className="grid gap-4 rounded-[2rem] border border-cyan-300/15 bg-cyan-400/[0.045] p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-black/25 text-cyan-200">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-white/90">Was „isoliert“ hier bedeutet</h2>
          <p className="mt-1 text-sm leading-6 text-white/55">
            Jeder Beispielstart erhält eine eigene Demo-ID und einen getrennten Beispiel-Tenant. Es werden keine privaten Betreiber-Sessions oder Daten anderer Nutzer geladen.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
        <div className="space-y-2 text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300/70">ENTRY / REAL CONTEXT</p>
          <h2 className="text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Vom ersten Signal in denselben Arbeitsraum.
          </h2>
          <p className="mx-auto max-w-xl text-white/55">
            Der Einstieg ist bereits Teil des Produkts. Kein Showcase davor und keine zweite App danach.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {flow.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="relative rounded-2xl border border-white/8 bg-black/25 p-6">
                <span className="absolute right-5 top-5 font-mono text-xs text-white/25">0{index + 1}</span>
                <Icon className="mb-4 h-6 w-6 text-emerald-300/80" />
                <h3 className="text-lg font-semibold text-white/90">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-8 text-center sm:p-10">
        <h2 className="text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Lieber erst verstehen, ob es zu dir passt?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/50">
          Neben der Produktarbeit bietet Saimôr auch Vorträge, Workshops und praktische KI-Schulungen an.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-emerald-100"
          >
            Security Check starten
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
          >
            <CalendarClock className="h-4 w-4" />
            Gespräch buchen
          </a>
        </div>
      </section>
    </div>
  );
}
