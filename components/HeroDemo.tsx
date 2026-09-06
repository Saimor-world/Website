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
      title: 'Saimôr',
      subline: 'Dein System beginnt mit etwas Echtem.',
      body:
        'Der Security Check ist kein Vorspann. Er wird der erste Baustein deines eigenen Saimôr-Raums. Dein Report kommt mit, dein Zugang bleibt 30 Tage offen und von dort aus lernst du das System wirklich kennen.',
      primary: 'Security Check starten',
      secondary: 'Ich habe schon Zugang',
      note: 'Kein Passwort beim Einstieg. Dein persönlicher Zugang kommt per Magic Link.',
      steps: [
        ['01', 'Check', 'echter Report'],
        ['02', 'Zugang', 'automatisch'],
        ['03', '30 Tage', 'dein Raum'],
        ['04', 'Einstieg', 'per Mail'],
      ],
      pathLabel: 'Vom ersten Check in deinen eigenen Raum',
      forestAlt: 'Dunkler Wald als Saimôr Hintergrundwelt',
    },
    en: {
      eyebrow: 'SAIMÔR · SOVEREIGN AI',
      title: 'Saimôr',
      subline: 'Your system starts with something real.',
      body:
        'The Security Check is not a prelude. It becomes the first building block of your own Saimôr space. Your report comes with you, your access stays open for 30 days, and from there you can actually get to know the system.',
      primary: 'Start Security Check',
      secondary: 'I already have access',
      note: 'No password at entry. Your personal access arrives through a magic link.',
      steps: [
        ['01', 'Check', 'real report'],
        ['02', 'Access', 'automatic'],
        ['03', '30 days', 'your space'],
        ['04', 'Entry', 'by email'],
      ],
      pathLabel: 'From the first check into your own space',
      forestAlt: 'Dark forest as the Saimôr background world',
    },
  }[locale];

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#020806] text-white"
      aria-label={content.forestAlt}
      data-demo-entry="security-check"
      data-agent-surface="onboarding"
    >
      <div
        className="absolute inset-0 -z-30 bg-cover bg-[center_34%] opacity-90 sm:bg-center"
        style={{ backgroundImage: `url('${FOREST_PREVIEW_URL}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(1,7,6,.12)_0%,rgba(1,8,7,.40)_40%,rgba(1,7,6,.96)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_54%_24%,rgba(93,226,190,.13),transparent_30%),radial-gradient(circle_at_76%_16%,rgba(214,168,72,.16),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[46%] bg-gradient-to-t from-[#020806] via-[#020806]/90 to-transparent" />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-7 pt-24 sm:px-8 sm:pb-10 sm:pt-32 lg:px-10">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6a848]/28 bg-black/18 px-3.5 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#66ddea]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72">
              {content.eyebrow}
            </span>
          </div>

          <h1 className="text-[clamp(4.2rem,18vw,8rem)] font-light leading-[0.82] tracking-[-0.065em] text-white">
            {content.title}
          </h1>

          <p className="mt-5 max-w-3xl text-[clamp(1.75rem,6vw,3.6rem)] font-light leading-[1.02] tracking-[-0.035em] text-white/92">
            {content.subline}
          </p>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/64 sm:text-lg sm:leading-8">
            {content.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/18 bg-black/18 px-6 py-4 text-sm font-semibold text-white/82 backdrop-blur-xl transition hover:border-white/30 hover:bg-black/32"
            >
              <LogIn className="h-4 w-4" />
              <span>{content.secondary}</span>
            </Link>
          </div>

          <div className="mt-4 flex max-w-xl items-start gap-3 text-xs leading-5 text-white/46">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#d6a848]/72" />
            <span>{content.note}</span>
          </div>
        </div>

        <div className="mt-auto pt-10 sm:pt-20">
          <div className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/36 sm:text-[10px]">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{content.pathLabel}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {content.steps.map(([number, title, body]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/[0.09] bg-[#06100d]/66 px-4 py-4 backdrop-blur-xl sm:min-h-28 sm:px-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-semibold tracking-[0.18em] text-[#d6a848]/68">{number}</span>
                  <span className="text-[9px] text-white/30">{body}</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-white/88 sm:text-base">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
