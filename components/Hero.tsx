import { ArrowRight, Circle } from 'lucide-react';
import Image from 'next/image';
import ScrollAmbient from '@/components/ScrollAmbient';

type Locale = 'de' | 'en';

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · SOUVERÄNE KI-SYSTEME',
    title: 'KI, die nicht bei jeder Aufgabe von vorne beginnt.',
    body: 'Saimôr entwickelt eigene KI-Arbeitsräume für Selbständige, kleine Teams und Organisationen. Môra hält den Kontext zusammen, verbindet Vorgänge und unterstützt bei konkreten nächsten Schritten.',
    primary: 'Demo prüfen',
    secondary: 'Môra verstehen',
    note: 'Getrennte Demo · keine Kontoerstellung · keine persönlichen Daten',
    layers: [
      ['MÔRA', 'Kontext und Handlung'],
      ['DAS OS', 'Arbeitsabläufe in einem gemeinsamen Raum'],
      ['EIGENE INSTANZ', 'Datenhaltung mit klaren Grenzen'],
    ],
  },
  en: {
    eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
    title: 'AI that does not start from zero with every task.',
    body: 'Saimôr builds dedicated AI workspaces for independents, small teams and organizations. Môra keeps context connected, links work and supports concrete next steps.',
    primary: 'Review the demo',
    secondary: 'Understand Môra',
    note: 'Isolated demo · no account creation · no personal data',
    layers: [
      ['MÔRA', 'Context and action'],
      ['THE OS', 'Workflows in one shared space'],
      ['DEDICATED INSTANCE', 'Data with clear boundaries'],
    ],
  },
} as const;

export default function Hero({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#05090a] text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(214,168,72,.15),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(72,151,131,.11),transparent_32%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#081112] to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-12 px-5 pb-14 pt-28 sm:px-7 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-20 lg:pt-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[#dfbd70]">
            <Image src="/saimor-seal-256.webp" alt="" width={34} height={34} priority className="rounded-lg opacity-90" />
            <p className="font-mono text-xs font-semibold tracking-[.17em]">{copy.eyebrow}</p>
          </div>

          <h1 className="mt-9 font-serif text-[clamp(3.25rem,8vw,7rem)] font-light leading-[.91] tracking-[-.045em] text-[#f5f0e7]">{copy.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl sm:leading-9">{copy.body}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check'} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d6a848] px-6 py-3 text-sm font-bold text-[#151006] transition hover:-translate-y-0.5 hover:bg-[#e3c174]">
              {copy.primary}<ArrowRight className="h-4 w-4" />
            </a>
            <a href={locale === 'de' ? '/mora' : '/en/mora'} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/78 transition hover:border-white/30 hover:text-white">{copy.secondary}</a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/38">
            <span className="inline-flex items-center gap-2"><Circle className="h-2 w-2 fill-[#74cbb4] text-[#74cbb4]" />{copy.note}</span>
            <ScrollAmbient locale={locale} />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-10 rounded-full bg-[#d6a848]/7 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0a1112]/88 p-4 shadow-[0_34px_90px_rgba(0,0,0,.48)]">
            <div className="flex items-center justify-between border-b border-white/8 px-3 pb-4 pt-2">
              <span className="font-mono text-xs tracking-[.18em] text-white/42">SAIMÔR / SYSTEM</span>
              <span className="rounded-full border border-[#74cbb4]/20 bg-[#74cbb4]/8 px-3 py-1 text-xs text-[#9cdbc9]">Pilotphase</span>
            </div>
            <div className="space-y-2 py-3">
              {copy.layers.map(([name, description], index) => (
                <div key={name} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/7 bg-white/[.025] p-5">
                  <span className="font-mono text-xs text-[#d6a848]/68">0{index + 1}</span>
                  <div><p className="text-sm font-bold tracking-[.13em] text-white/88">{name}</p><p className="mt-2 text-base text-white/46">{description}</p></div>
                </div>
              ))}
            </div>
            <p className="px-3 pb-2 pt-1 font-serif text-xl italic text-white/35">Context stays. Boundaries stay visible.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
