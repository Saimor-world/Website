'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LogIn, Presentation, ShieldCheck } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

const FOREST_PREVIEW_URL =
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=82&w=2400&auto=format&fit=crop';

export default function HeroDemo({ locale }: Props) {
  const content = {
    de: {
      eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
      title: 'Saimôr',
      subline: 'Ein eigener digitaler Arbeitsraum – mit KI, die Zusammenhänge behält.',
      body:
        'Saimôr ist ein unabhängiges Produktstudio für souveräne KI-Systeme. Im Zentrum steht das Saimôr OS: ein gemeinsamer Arbeitsraum für Dateien, Vorgänge und Kontext. Darin arbeitet Môra als KI-Schicht, die nicht bei jeder Aufgabe wieder bei null beginnt.',
      primary: 'Security Check starten',
      secondary: 'Das OS verstehen',
      login: 'Schon Zugang? Einloggen',
      training: 'Vorträge & Schulungen',
      trainingBody: 'KI praktisch erklären, gemeinsam einordnen und sinnvoll einsetzen.',
      pillars: [
        ['OS', 'Arbeitsraum', 'Arbeit, Dateien und Prozesse an einem Ort.'],
        ['MÔRA', 'Kontextschicht', 'KI, die den vorhandenen Zusammenhang nutzen kann.'],
        ['STUDIO', 'Wissen teilen', 'Produkte, Vorträge und Schulungen aus einem Haus.'],
      ],
      forestAlt: 'Saimôr Welt mit Wald, Siegel und ruhigen Orbitlinien',
    },
    en: {
      eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
      title: 'Saimôr',
      subline: 'A digital workspace of your own – with AI that keeps the context.',
      body:
        'Saimôr is an independent product studio for sovereign AI systems. At its center is Saimôr OS: a shared workspace for files, work and context. Inside it, Môra acts as the AI layer that does not start from zero every time.',
      primary: 'Start Security Check',
      secondary: 'Understand the OS',
      login: 'Already have access? Sign in',
      training: 'Talks & training',
      trainingBody: 'Making AI practical, understandable and useful in real work.',
      pillars: [
        ['OS', 'Workspace', 'Work, files and processes in one place.'],
        ['MÔRA', 'Context layer', 'AI that can work with the context already there.'],
        ['STUDIO', 'Share knowledge', 'Products, talks and training from one studio.'],
      ],
      forestAlt: 'Saimôr world with forest, seal and calm orbit lines',
    },
  }[locale];

  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#06110d] text-white"
      aria-label={content.forestAlt}
      data-demo-entry="security-check"
      data-agent-surface="onboarding"
    >
      {/* Forest stays visible as part of the Saimôr world instead of collapsing into black. */}
      <div
        className="absolute inset-0 -z-40 bg-cover bg-center opacity-[0.48] saturate-[0.72] contrast-[1.03]"
        style={{ backgroundImage: `url('${FOREST_PREVIEW_URL}')` }}
        aria-hidden="true"
      />

      {/* Brighter green depth: enough contrast for copy, but no heavy black curtain. */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(6,17,13,.18)_0%,rgba(6,17,13,.38)_36%,rgba(6,17,13,.72)_78%,rgba(6,17,13,.92)_100%)]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_18%,rgba(214,168,72,.14),transparent_22%),radial-gradient(circle_at_22%_30%,rgba(82,198,160,.18),transparent_30%),radial-gradient(circle_at_78%_36%,rgba(102,221,234,.10),transparent_30%),radial-gradient(circle_at_50%_58%,rgba(40,120,88,.18),transparent_38%)]" />

      {/* Fog + ambient field. Slow enough to feel alive, never like an effect demo. */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_40%_32%,rgba(255,255,255,.06),transparent_22%),radial-gradient(circle_at_62%_26%,rgba(255,255,255,.05),transparent_18%),radial-gradient(circle_at_52%_48%,rgba(255,255,255,.04),transparent_26%)]" />
      <div className="pointer-events-none absolute -left-[18%] top-[12%] -z-20 h-[48rem] w-[48rem] rounded-full bg-emerald-400/[0.08] blur-[140px] animate-[pulse_11s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="pointer-events-none absolute -right-[18%] top-[22%] -z-20 h-[44rem] w-[44rem] rounded-full bg-cyan-300/[0.05] blur-[150px] animate-[pulse_14s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-gradient-to-t from-[#06110d] via-[#06110d]/84 to-transparent" />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:px-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          {/* Restored identity: seal + restrained orbit system from the older Saimôr language. */}
          <div className="relative mb-7 mt-2 flex h-40 w-64 items-center justify-center sm:h-48 sm:w-80" aria-label="Saimôr Siegel">
            <div className="absolute left-1/2 top-1/2 h-28 w-60 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#d6a848]/32 rotate-[-14deg] animate-[spin_46s_linear_infinite] motion-reduce:animate-none sm:h-32 sm:w-72" />
            <div className="absolute left-1/2 top-1/2 h-20 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#66ddea]/18 rotate-[19deg] animate-[spin_62s_linear_infinite_reverse] motion-reduce:animate-none sm:h-24 sm:w-64" />
            <div className="absolute left-1/2 top-1/2 h-px w-64 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#d6a848]/26 to-transparent sm:w-80" />

            <span className="absolute left-[9%] top-[31%] h-2 w-2 rounded-full bg-[#d6a848] shadow-[0_0_16px_rgba(214,168,72,.72)] animate-[pulse_4.8s_ease-in-out_infinite] motion-reduce:animate-none" />
            <span className="absolute right-[12%] top-[58%] h-1.5 w-1.5 rounded-full bg-[#66ddea] shadow-[0_0_14px_rgba(102,221,234,.62)] animate-[pulse_6s_ease-in-out_infinite] motion-reduce:animate-none" />
            <span className="absolute right-[28%] top-[17%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,.55)] animate-[pulse_7.2s_ease-in-out_infinite] motion-reduce:animate-none" />

            <div className="absolute h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.14)_0%,rgba(24,54,43,.34)_38%,rgba(6,17,13,.22)_58%,transparent_74%)] blur-xl sm:h-32 sm:w-32" />
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[#d6a848]/26 bg-black/24 shadow-[0_0_60px_rgba(214,168,72,.12)] backdrop-blur-xl sm:h-28 sm:w-28">
              <Image
                src="/saimor-seal-master.png"
                alt="Saimôr Siegel"
                fill
                priority
                sizes="112px"
                className="object-contain opacity-95 mix-blend-screen drop-shadow-[0_0_18px_rgba(214,168,72,.54)]"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d6a848]/24 bg-black/10 px-3.5 py-2 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#66ddea] shadow-[0_0_10px_rgba(102,221,234,.65)]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-[10px]">
              {content.eyebrow}
            </span>
          </div>

          <h1 className="mt-5 font-serif text-[clamp(4.5rem,17vw,8.4rem)] font-light leading-[0.82] tracking-[-0.065em] text-white">
            {content.title}
          </h1>

          <p className="mt-6 max-w-3xl text-[clamp(1.65rem,5.2vw,3.15rem)] font-light leading-[1.04] tracking-[-0.035em] text-white/94">
            {content.subline}
          </p>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/68 sm:text-lg sm:leading-8">
            {content.body}
          </p>

          <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={securityHref}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#d8f5e8] px-6 py-4 text-sm font-bold text-[#062019] shadow-[0_20px_70px_rgba(48,193,148,.16)] transition hover:bg-white"
            >
              <ShieldCheck className="h-5 w-5" />
              <span>{content.primary}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#os"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/16 bg-[#071511]/38 px-6 py-4 text-sm font-semibold text-white/84 backdrop-blur-xl transition hover:border-[#d6a848]/34 hover:bg-[#071511]/54"
            >
              <span>{content.secondary}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Link
            href="/login?callbackUrl=%2Faccount%2Fbridge"
            className="mt-4 inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-white/76"
          >
            <LogIn className="h-3.5 w-3.5" />
            {content.login}
          </Link>
        </div>

        <div className="mt-auto pt-12 sm:pt-20">
          <div className="grid gap-2 sm:grid-cols-3">
            {content.pillars.map(([name, title, description], index) => (
              <div
                key={name}
                className="group rounded-2xl border border-white/[0.08] bg-[rgba(10,28,22,0.48)] px-4 py-4 text-left backdrop-blur-xl transition hover:border-white/15 sm:min-h-28 sm:px-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold tracking-[0.22em] text-[#d6a848]/72">{name}</span>
                  {index === 2 && <Presentation className="h-3.5 w-3.5 text-[#66ddea]/62" />}
                </div>
                <div className="mt-3 text-sm font-semibold text-white/90 sm:text-base">{title}</div>
                <p className="mt-1.5 text-xs leading-5 text-white/50">{description}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}#studio`}
            className="mx-auto mt-5 flex max-w-max items-center gap-2 text-[11px] text-white/44 transition hover:text-white/68"
          >
            <Presentation className="h-3.5 w-3.5 text-[#d6a848]/68" />
            <span className="font-semibold text-white/60">{content.training}</span>
            <span className="hidden sm:inline">· {content.trainingBody}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
