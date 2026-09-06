'use client';

import Link from 'next/link';
import { ArrowRight, Clock3, LogIn, Mail, ShieldCheck, Sparkles } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

const FOREST_PREVIEW_URL =
  'https://images.unsplash.com/photo-1775222288678-9afdf2dcdc57?auto=format&fit=crop&fm=jpg&q=84&w=2200';

export default function HeroDemo({ locale }: Props) {
  const content = {
    de: {
      eyebrow: 'SAIMÔR · SOVEREIGN AI',
      title: 'Ein echter Einstieg.\nNicht nur eine Demo-Seite.',
      body:
        'Starte mit einem echten Security Check. Danach entsteht dein persönlicher Saimôr Demo-Zugang – mit deinem Report, deinem Workspace und 30 Tagen Zeit, das System wirklich auszuprobieren.',
      primary: 'Security Check starten',
      secondary: 'Bereits Zugang? Einloggen',
      note: 'Kein Passwort beim Einstieg. Der Zugang kommt per sicherem Magic Link.',
      steps: [
        ['01', 'Security Check', 'Ein echter erster Nutzen, noch vor dem Login.'],
        ['02', 'Demo-Account', 'Dein persönlicher Zugang wird nach dem Check vorbereitet.'],
        ['03', '30 Tage', 'Report und Workspace bleiben für deinen Demo-Zeitraum verbunden.'],
        ['04', 'Erste Mail', 'Ein Klick bringt dich direkt in deinen eigenen Einstieg.'],
      ],
      forestAlt: 'Dunkler Wald als Saimôr Hintergrundwelt',
    },
    en: {
      eyebrow: 'SAIMÔR · SOVEREIGN AI',
      title: 'A real entry.\nNot just a demo page.',
      body:
        'Start with a real Security Check. Afterwards your personal Saimôr demo access is prepared – with your report, your workspace and 30 days to actually explore the system.',
      primary: 'Start Security Check',
      secondary: 'Already have access? Sign in',
      note: 'No password at entry. Access arrives through a secure magic link.',
      steps: [
        ['01', 'Security Check', 'Immediate value before any login.'],
        ['02', 'Demo account', 'Your personal access is prepared after the check.'],
        ['03', '30 days', 'Report and workspace stay connected through the trial.'],
        ['04', 'First email', 'One click takes you straight into your own entry.'],
      ],
      forestAlt: 'Dark forest as the Saimôr background world',
    },
  }[locale];

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#020806] text-white"
      aria-label={content.forestAlt}
      data-demo-entry="security-check"
      data-agent-slot="astra"
    >
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url('${FOREST_PREVIEW_URL}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(1,7,6,.28)_0%,rgba(1,8,7,.55)_42%,rgba(1,7,6,.96)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_52%_30%,rgba(93,226,190,.16),transparent_28%),radial-gradient(circle_at_72%_18%,rgba(214,168,72,.18),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[42%] bg-gradient-to-t from-[#020806] via-[#020806]/88 to-transparent" />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-10 pt-24 sm:px-8 sm:pt-32 lg:px-10">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d6a848]/30 bg-black/25 px-3.5 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#66ddea]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72">
              {content.eyebrow}
            </span>
          </div>

          <h1 className="whitespace-pre-line text-[clamp(3.25rem,10vw,7.6rem)] font-light leading-[0.9] tracking-[-0.055em] text-white">
            {content.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
            {content.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check'}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#d8f5e8] px-6 py-4 text-sm font-bold text-[#062019] shadow-[0_20px_70px_rgba(48,193,148,.18)] transition hover:bg-white"
            >
              <ShieldCheck className="h-5 w-5" />
              <span>{content.primary}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login?callbackUrl=%2Faccount%2Fbridge"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/18 bg-black/25 px-6 py-4 text-sm font-semibold text-white/84 backdrop-blur-xl transition hover:border-white/30 hover:bg-black/40"
            >
              <LogIn className="h-4 w-4" />
              <span>{content.secondary}</span>
            </Link>
          </div>

          <div className="mt-5 flex max-w-xl items-start gap-3 text-xs leading-5 text-white/48">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#d6a848]/75" />
            <span>{content.note}</span>
          </div>
        </div>

        <div className="mt-auto pt-16 sm:pt-24">
          <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/38">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{locale === 'de' ? 'Dein Weg in die 30-Tage-Demo' : 'Your path into the 30-day demo'}</span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.map(([number, title, body]) => (
              <div key={number} className="min-h-36 bg-[#06100d]/80 p-5 backdrop-blur-xl sm:p-6">
                <div className="text-[10px] font-semibold tracking-[0.2em] text-[#d6a848]/70">{number}</div>
                <div className="mt-5 text-base font-semibold text-white/92">{title}</div>
                <p className="mt-2 text-sm leading-6 text-white/48">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
