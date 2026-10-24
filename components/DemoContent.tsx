'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CalendarClock,
  ExternalLink,
  FileSearch,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { usePublicLocale } from '@/lib/use-public-locale';
import { DemoLaunchButton } from '@/components/DemoLaunchButton';

const COPY = {
  de: {
    flow: [
      { icon: ScanLine, title: 'Security Check', body: 'Passiv und ohne Login – nur öffentlich sichtbare Signale deiner Domain.' },
      { icon: FileSearch, title: 'Echte Befunde', body: 'Konkrete Risiken und Stärken werden zu nachvollziehbaren Objekten statt zu einem bloßen Score.' },
      { icon: LayoutDashboard, title: 'Saimôr OS', body: 'Der Report wird zum ersten Objekt in deinem Arbeitsraum und bleibt mit dem weiteren Kontext verbunden.' },
      { icon: KeyRound, title: 'Eigener Zugang', body: 'Mit dem Magic Link übernimmst du deinen 30-Tage-Raum, ohne ein zweites Konto oder einen Produktwechsel.' },
    ],
    h1: '{t.h1}',
    lead: '{t.lead}',
    check: 'Eigene Domain prüfen', launch: 'Isolierten Beispielraum öffnen',
    isoTitle: '{t.isoTitle}',
    isoBody: '{t.isoBody}',
    flowTitle: '{t.flowTitle}',
    flowBody: '{t.flowBody}',
    talkTitle: '{t.talkTitle}',
    talkBody: '{t.talkBody}',
    start: 'Security Check starten', book: 'Gespräch buchen', securityHref: '/de/einstieg/security-check',
  },
  en: {
    flow: [
      { icon: ScanLine, title: 'Security Check', body: 'Passive and without login – only publicly visible signals of your domain.' },
      { icon: FileSearch, title: 'Real findings', body: 'Concrete risks and strengths become traceable objects instead of a bare score.' },
      { icon: LayoutDashboard, title: 'Saimôr OS', body: 'The report becomes the first object in your workspace and stays connected to everything that follows.' },
      { icon: KeyRound, title: 'Your own access', body: 'With the magic link you take over your 30-day space – no second account, no product switch.' },
    ],
    h1: 'Don’t start with an empty prompt box.',
    lead: 'You can look at Saimôr in two ways: with your own Security Check or in an isolated sample space. In both cases, other users’ data and private operator data stay separate.',
    check: 'Check your own domain', launch: 'Open isolated sample space',
    isoTitle: 'What “isolated” means here',
    isoBody: 'Every sample start gets its own demo ID and a separate sample tenant. No private operator sessions or other users’ data are loaded.',
    flowTitle: 'From the first signal into the same workspace.',
    flowBody: 'The entry is already part of the product. No showcase before it and no second app after it.',
    talkTitle: 'Want to understand first whether it fits?',
    talkBody: 'Alongside product work, Saimôr also offers talks, workshops and hands-on AI training.',
    start: 'Start Security Check', book: 'Book a call', securityHref: '/en/entry/security-check',
  },
} as const;

export default function DemoContent() {
  const locale = usePublicLocale();
  const t = COPY[locale];
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06100d] px-5 pb-24 pt-28 text-white sm:px-8 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(127,212,193,.09),transparent_30%),radial-gradient(circle_at_75%_45%,rgba(214,168,72,.07),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7fd4c1]/25 bg-[#7fd4c1]/[0.055] px-4 py-2 font-mono text-[9px] font-bold tracking-[.22em] text-[#a9eadb] sm:text-[10px]">
            <Sparkles className="h-3.5 w-3.5" />
            SAIMÔR OS · DEMO
          </span>

          <h1 className="mt-8 font-serif text-[clamp(3rem,13vw,6rem)] font-light leading-[.96] tracking-[-.045em]">
            {t.h1}
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            {t.lead}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={t.securityHref}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#e7eadf] px-7 py-3.5 text-sm font-bold text-[#08100d] transition hover:bg-white"
            >
              <ShieldCheck className="h-4 w-4" />
              {t.check}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <DemoLaunchButton
              label={t.launch}
              locale={locale}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.025] px-7 py-3.5 text-sm font-semibold text-white/78 transition hover:border-white/28 hover:bg-white/[0.05] hover:text-white disabled:opacity-60"
            />
          </div>
        </header>

        <section className="mt-16 grid gap-5 rounded-[1.8rem] border border-[#7fd4c1]/18 bg-[#7fd4c1]/[0.035] p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7fd4c1]/20 text-[#9de3d2]">
            <LockKeyhole className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white/88">{t.isoTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/46">
              {t.isoBody}
            </p>
          </div>
        </section>

        <section className="mt-20">
          <p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#d6a848]/70">ENTRY / REAL CONTEXT</p>
          <div className="mt-5 grid gap-5 md:grid-cols-[.9fr_1.1fr] md:items-end">
            <h2 className="font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-6xl">
              {t.flowTitle}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/42 sm:text-base">
              {t.flowBody}
            </p>
          </div>

          <div className="mt-10 border-t border-white/[0.1]">
            {t.flow.map(({ icon: Icon, title, body }, index) => (
              <article key={title} className="grid gap-4 border-b border-white/[0.08] py-7 sm:grid-cols-[52px_.8fr_1.2fr] sm:items-start sm:gap-6">
                <div className="flex items-center gap-2 font-mono text-[9px] tracking-[.18em] text-white/24">
                  <span>0{index + 1}</span>
                  <Icon className="h-4 w-4 text-[#7fd4c1]/60" strokeWidth={1.4} />
                </div>
                <h3 className="text-lg font-medium text-white/86 sm:text-xl">{title}</h3>
                <p className="text-sm leading-6 text-white/42">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-7 border-t border-white/[0.1] pt-9 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.24em] text-white/28">TALKS / TRAINING</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-white/90 sm:text-4xl">
              {t.talkTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
              {t.talkBody}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href={t.securityHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-white/30 hover:text-white">
              {t.start} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://cal.com/saimor/30min" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d6a848]/24 px-5 py-3 text-sm font-semibold text-[#e7cd8c] transition hover:border-[#d6a848]/45 hover:text-[#f3dda4]">
              <CalendarClock className="h-4 w-4" /> {t.book} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
