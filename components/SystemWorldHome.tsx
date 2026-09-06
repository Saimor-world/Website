'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Layers3,
  LogIn,
  Mic2,
  Monitor,
  PanelTop,
  ShieldCheck,
} from 'lucide-react';

type Locale = 'de' | 'en';
type Props = { locale: Locale };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · SOVEREIGN SYSTEMS',
    thesis: 'Digitale Arbeitsräume, die Kontext behalten.',
    intro: 'Saimôr verbindet Arbeitsraum, Daten und KI zu einem System, das nicht bei jeder Aufgabe wieder bei null anfängt.',
    enter: 'System betreten',
    login: 'Einloggen',
    entryNote: 'Der Einstieg beginnt mit einem echten Security Check. Daraus entsteht dein 30-Tage-Demoraum.',
    orbit: [
      ['OS', 'Arbeitsraum'],
      ['MÔRA', 'Kontext'],
      ['DESK', 'Oberfläche'],
      ['STUDIO', 'Produkte & Wissen'],
    ],
    systemEyebrow: 'DAS SYSTEM',
    systemTitle: 'Nicht vier Produkte. Vier Ebenen derselben Idee.',
    layers: [
      ['00', 'SAIMÔR', 'Studio / System', 'Die Klammer. Hier entstehen Produkte, Arbeitsweisen und Experimente.'],
      ['01', 'OS', 'Arbeitsraum', 'Dateien, Vorgänge, Bereiche und Anbindungen leben in einem gemeinsamen Raum.'],
      ['02', 'MÔRA', 'Kontextschicht', 'Môra hält Zusammenhänge verfügbar, damit KI mit vorhandenem Kontext arbeiten kann.'],
      ['03', 'DESK', 'Oberfläche', 'Die tägliche Ansicht des Systems: Arbeit und Kontext dort, wo sie gerade gebraucht werden.'],
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Kein leerer Demo-Raum.',
    entryText: 'Du startest mit deiner Domain. Der Report wird zum ersten echten Objekt in deinem Saimôr-Raum und bleibt mit deinem Zugang verbunden.',
    entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Software ist nur ein Teil davon.',
    studioText: 'Ich bin Marius Fahrländer. Ich komme aus IT-Systemmanagement und technischem Vertrieb. Bei Saimôr baue ich Produkte und gebe Vorträge und Schulungen rund um praktische KI-Anwendungen.',
    offers: [
      ['Vorträge', 'KI verständlich einordnen – ohne Show und Buzzword-Nebel.'],
      ['Schulungen & Workshops', 'Praxisnah für Teams, die KI sinnvoll in ihre Arbeit bringen wollen.'],
      ['Prototypen & Webprojekte', 'Ideen schnell in eine testbare, belastbare Form bringen.'],
    ],
    talk: 'Vortrag oder Schulung anfragen',
    experiments: 'Weitere Arbeiten',
    experimentsText: 'YORI · Earth · ausgewählte Webprojekte und Prototypen',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'Wenn etwas davon zu deinem Problem passt, reden wir darüber.',
    finalText: 'Schreib kurz, woran du arbeitest oder wo es gerade hängt.',
    finalCta: 'Kontakt öffnen',
    scroll: 'SCROLL / SYSTEM MAP',
  },
  en: {
    eyebrow: 'SAIMÔR · SOVEREIGN SYSTEMS',
    thesis: 'Digital workspaces that keep context.',
    intro: 'Saimôr connects workspace, data and AI into one system that does not start from zero every time.',
    enter: 'Enter the system',
    login: 'Log in',
    entryNote: 'Entry starts with a real Security Check. It becomes the first object inside your 30-day demo space.',
    orbit: [
      ['OS', 'Workspace'],
      ['MÔRA', 'Context'],
      ['DESK', 'Surface'],
      ['STUDIO', 'Products & knowledge'],
    ],
    systemEyebrow: 'THE SYSTEM',
    systemTitle: 'Not four products. Four layers of the same idea.',
    layers: [
      ['00', 'SAIMÔR', 'Studio / System', 'The frame. Products, working methods and experiments originate here.'],
      ['01', 'OS', 'Workspace', 'Files, cases, areas and connections live inside one shared space.'],
      ['02', 'MÔRA', 'Context layer', 'Môra keeps relationships available so AI can work with existing context.'],
      ['03', 'DESK', 'Surface', 'The daily view of the system: work and context where they are needed.'],
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'No empty demo space.',
    entryText: 'You start with your domain. The report becomes the first real object inside your Saimôr space and stays connected to your access.',
    entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Software is only one part of it.',
    studioText: 'I am Marius Fahrländer, with a background in IT systems management and technical sales. At Saimôr I build products and give talks and training around practical uses of AI.',
    offers: [
      ['Talks', 'Putting AI into context without hype or buzzword fog.'],
      ['Training & workshops', 'Practical sessions for teams that want to use AI meaningfully.'],
      ['Prototypes & web projects', 'Turning ideas into something robust and testable quickly.'],
    ],
    talk: 'Ask about a talk or workshop',
    experiments: 'Other work',
    experimentsText: 'YORI · Earth · selected web projects and prototypes',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'If any of this fits your problem, we should talk.',
    finalText: 'Send a short note about what you are building or where you are stuck.',
    finalCta: 'Open contact',
    scroll: 'SCROLL / SYSTEM MAP',
  },
} as const;

const layerIcons = [Layers3, PanelTop, BrainCircuit, Monitor] as const;

export default function SystemWorldHome({ locale }: Props) {
  const c = COPY[locale];
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const contactHref = locale === 'de' ? '/de/kontakt' : '/en/contact';

  return (
    <div className="overflow-hidden bg-[#050706] text-white selection:bg-[#d8b86a] selection:text-black">
      <section className="relative min-h-[100svh] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(214,168,72,.075),transparent_22%),radial-gradient(circle_at_50%_74%,rgba(89,205,177,.05),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(255,255,255,.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.024)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
        <div className="s-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fd4c1]/42 to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-5 pt-[84px] sm:px-8 sm:pb-8 sm:pt-28 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[8px] font-semibold tracking-[0.24em] text-white/32 sm:text-[10px] sm:tracking-[0.28em]">{c.eyebrow}</div>
            <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.16em] text-white/24 sm:text-[10px]">
              <span className="s-live h-1.5 w-1.5 rounded-full bg-[#7fd4c1]" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="grid flex-1 items-center gap-3 py-2 sm:gap-8 sm:py-6 lg:grid-cols-[.92fr_1.08fr] lg:gap-6 lg:py-0">
            <div className="order-2 lg:order-1 lg:pr-8">
              <div className="max-w-2xl">
                <h1 className="font-serif text-[clamp(3.8rem,16vw,8.6rem)] font-light leading-[.8] tracking-[-.065em]">Saimôr</h1>
                <p className="mt-4 max-w-xl text-[clamp(1.55rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-.04em] text-white/92 sm:mt-6">{c.thesis}</p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/46 sm:mt-6 sm:text-lg sm:leading-8">{c.intro}</p>

                <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                  <Link href={securityHref} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#e7eadf] px-6 py-3 text-sm font-bold text-[#08100d] transition hover:bg-white sm:min-h-14 sm:py-3.5">
                    <ShieldCheck className="h-4 w-4" />
                    {c.enter}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="/login?callbackUrl=%2Faccount%2Fbridge" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white/58 transition hover:border-white/28 hover:text-white sm:min-h-14 sm:py-3.5">
                    <LogIn className="h-4 w-4" />
                    {c.login}
                  </Link>
                </div>
                <p className="mt-3 max-w-lg text-[11px] leading-5 text-white/25 sm:mt-4 sm:text-xs">{c.entryNote}</p>
              </div>
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-square w-[min(55vw,230px)] sm:w-[min(68vw,480px)] lg:w-[min(42vw,560px)]">
                <div className="s-halo absolute inset-[22%] rounded-full bg-[#d6a848]/9 blur-3xl" />
                <div className="s-orbit-a absolute inset-[6%] rounded-full border border-white/[0.075]" />
                <div className="s-orbit-b absolute inset-[18%] rounded-full border border-[#d6a848]/17" />
                <div className="s-orbit-c absolute inset-[29%] rounded-full border border-[#7fd4c1]/14" />
                <span className="s-dot-a absolute left-[5%] top-[48%] h-2 w-2 rounded-full bg-[#d6a848] shadow-[0_0_20px_rgba(214,168,72,.7)]" />
                <span className="s-dot-b absolute right-[17%] top-[12%] h-1.5 w-1.5 rounded-full bg-[#7fd4c1] shadow-[0_0_18px_rgba(127,212,193,.65)]" />
                <span className="s-dot-c absolute bottom-[14%] right-[14%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,.55)]" />

                <div className="absolute inset-[34%] flex items-center justify-center rounded-full border border-[#d6a848]/20 bg-black/28 shadow-[0_0_70px_rgba(214,168,72,.07)] backdrop-blur-xl">
                  <Image src="/saimor-seal-master.png" alt="Saimôr" fill sizes="180px" priority className="object-contain p-[18%] opacity-95 mix-blend-screen" />
                </div>

                {c.orbit.map(([name, role], i) => {
                  const positions = ['left-[1%] top-[26%]', 'right-[0%] top-[30%]', 'left-[8%] bottom-[18%]', 'right-[6%] bottom-[14%]'];
                  return (
                    <div key={name} className={`absolute ${positions[i]} hidden sm:block`}>
                      <div className="rounded-full border border-white/[0.1] bg-[#070a08]/82 px-3 py-2 backdrop-blur-xl">
                        <div className="font-mono text-[9px] font-semibold tracking-[.18em] text-white/72">{name}</div>
                        <div className="mt-0.5 text-[9px] text-white/28">{role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <a href="#system" className="mx-auto hidden items-center gap-2 pb-1 font-mono text-[9px] tracking-[.22em] text-white/22 transition hover:text-white/55 sm:flex">
            {c.scroll}<span className="s-down inline-block">↓</span>
          </a>
        </div>
      </section>

      <section id="system" className="relative border-b border-white/[0.08] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#d6a848]/68 sm:text-[10px]">{c.systemEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-6xl md:text-7xl">{c.systemTitle}</h2>

          <div className="mt-14 border-t border-white/[0.1] md:mt-20">
            {c.layers.map(([no, name, role, text], index) => {
              const Icon = layerIcons[index];
              return (
                <article key={no} className="group grid gap-4 border-b border-white/[0.08] py-7 md:grid-cols-[90px_1fr_1fr] md:items-center md:gap-8 md:py-9">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[.18em] text-white/24">
                    <span>{no}</span><Icon className="h-4 w-4 text-[#7fd4c1]/52" strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-light tracking-[-.035em] text-white/90 transition group-hover:text-white sm:text-5xl">{name}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-[#d6a848]/52">{role}</div>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">{text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-14 grid gap-8 border border-white/[0.1] bg-white/[0.018] p-6 sm:p-8 md:mt-16 md:grid-cols-[.85fr_1.15fr] md:items-end md:p-10">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#7fd4c1]/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7fd4c1]" />{c.entryLabel}
              </div>
              <h3 className="mt-5 max-w-md font-serif text-3xl font-light leading-tight text-white/92 sm:text-4xl">{c.entryTitle}</h3>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-6 text-white/43 sm:text-base sm:leading-7">{c.entryText}</p>
              <Link href={securityHref} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d8e9df] transition hover:text-white">
                {c.entryCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="relative border-b border-white/[0.08] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#d6a848]/68 sm:text-[10px]">{c.studioEyebrow}</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-6xl">{c.studioTitle}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/42 sm:text-base">{c.studioText}</p>
            <Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e8cf8e] transition hover:text-[#f3dda4]">
              <Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="border-t border-white/[0.1]">
            {c.offers.map(([name, text], index) => (
              <div key={name} className="grid gap-3 border-b border-white/[0.08] py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6">
                <div className="font-mono text-[9px] tracking-[.18em] text-white/20">0{index + 1}</div>
                <div className="text-lg font-medium text-white/84 sm:text-xl">{name}</div>
                <p className="text-sm leading-6 text-white/38">{text}</p>
              </div>
            ))}
            <div className="pt-7">
              <div className="font-mono text-[9px] uppercase tracking-[.2em] text-white/22">{c.experiments}</div>
              <p className="mt-2 text-sm text-white/36">{c.experimentsText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-t border-white/[0.1] pt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#7fd4c1]/58">{c.finalEyebrow}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/90 sm:text-6xl md:text-7xl">{c.finalTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/36 sm:text-base">{c.finalText}</p>
            </div>
            <Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#d6a848]/26 px-6 py-3.5 text-sm font-semibold text-[#e8cf8e] transition hover:border-[#d6a848]/52 hover:bg-[#d6a848]/[0.04]">
              {c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes orbitA { from { transform: rotate(0deg) scaleX(1.08); } to { transform: rotate(360deg) scaleX(1.08); } }
        @keyframes orbitB { from { transform: rotate(360deg) scaleY(.86); } to { transform: rotate(0deg) scaleY(.86); } }
        @keyframes orbitC { from { transform: rotate(12deg) scaleX(1.14); } to { transform: rotate(372deg) scaleX(1.14); } }
        @keyframes pulseSoft { 0%,100% { opacity: .42; } 50% { opacity: .92; } }
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 12% { opacity: .35; } 88% { opacity: .12; } 100% { transform: translateY(100svh); opacity: 0; } }
        @keyframes down { 0%,100% { transform: translateY(0); opacity: .3; } 50% { transform: translateY(4px); opacity: .72; } }
        .s-orbit-a { animation: orbitA 62s linear infinite; }
        .s-orbit-b { animation: orbitB 78s linear infinite; }
        .s-orbit-c { animation: orbitC 96s linear infinite; }
        .s-dot-a, .s-dot-b, .s-dot-c, .s-live, .s-halo { animation: pulseSoft 5.5s ease-in-out infinite; }
        .s-dot-b { animation-delay: -1.7s; }
        .s-dot-c { animation-delay: -3.1s; }
        .s-scan { animation: scan 15s linear infinite; }
        .s-down { animation: down 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .s-orbit-a,.s-orbit-b,.s-orbit-c,.s-dot-a,.s-dot-b,.s-dot-c,.s-live,.s-halo,.s-scan,.s-down { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
