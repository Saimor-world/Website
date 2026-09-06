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
  PanelTop,
  ShieldCheck,
} from 'lucide-react';

type Locale = 'de' | 'en';
type Props = { locale: Locale };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR · SOVEREIGN SYSTEMS',
    thesis: 'Digitale Arbeitsräume, die Kontext behalten.',
    intro:
      'Saimôr verbindet Arbeitsraum, Daten und KI zu einem System, das nicht bei jeder Aufgabe wieder bei null anfängt.',
    enter: 'System betreten',
    login: 'Einloggen',
    demo: 'Der Einstieg beginnt mit einem echten Security Check. Daraus entsteht dein 30-Tage-Demoraum.',
    orbit: [
      ['OS', 'Arbeitsraum'],
      ['MÔRA', 'Kontext'],
      ['DESK', 'Oberfläche'],
      ['STUDIO', 'Produkte & Wissen'],
    ],
    systemEyebrow: 'DAS SYSTEM',
    systemTitle: 'Nicht vier Produkte. Vier Ebenen derselben Idee.',
    layers: [
      {
        no: '00',
        name: 'SAIMÔR',
        role: 'Studio / System',
        text: 'Die Klammer. Hier entstehen die Produkte, Arbeitsweisen und Experimente.',
      },
      {
        no: '01',
        name: 'OS',
        role: 'Arbeitsraum',
        text: 'Dateien, Vorgänge, Bereiche und Anbindungen leben in einem gemeinsamen Raum.',
      },
      {
        no: '02',
        name: 'MÔRA',
        role: 'Kontextschicht',
        text: 'Môra hält Zusammenhänge verfügbar, damit KI mit vorhandenem Kontext arbeiten kann.',
      },
      {
        no: '03',
        name: 'DESK',
        role: 'Oberfläche',
        text: 'Die tägliche Ansicht: weniger Tabs, weniger Suchen, mehr Zusammenhang im richtigen Moment.',
      },
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Ein echter Befund statt leerer Demo.',
    entryText:
      'Du startest mit deiner Domain. Der Report wird zum ersten Objekt in deinem eigenen Saimôr-Raum und bleibt dort mit deinem Zugang verbunden.',
    entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Software ist nur ein Teil davon.',
    studioText:
      'Hinter Saimôr steht Marius Fahrländer – aus IT-Systemmanagement und technischem Vertrieb. Ich baue Produkte, erkläre KI verständlich und arbeite mit Teams an sinnvollen Einsatzmöglichkeiten.',
    offers: [
      ['Vorträge', 'KI einordnen, ohne Show und Buzzword-Nebel.'],
      ['Schulungen & Workshops', 'Praxisnah für Teams, die wirklich damit arbeiten wollen.'],
      ['Prototypen & Webprojekte', 'Ideen schnell in eine belastbare, testbare Form bringen.'],
    ],
    talk: 'Vortrag oder Schulung anfragen',
    experiments: 'Weitere Arbeiten',
    experimentsText: 'YORI · Earth · ausgewählte Webprojekte und Prototypen',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'Wenn etwas davon zu deinem Problem passt, reden wir darüber.',
    finalText: 'Keine Sales-Funnel-Show. Schreib kurz, woran du arbeitest oder wo es gerade hängt.',
    finalCta: 'Kontakt öffnen',
  },
  en: {
    eyebrow: 'SAIMÔR · SOVEREIGN SYSTEMS',
    thesis: 'Digital workspaces that keep context.',
    intro:
      'Saimôr connects workspace, data and AI into one system that does not start from zero every time.',
    enter: 'Enter the system',
    login: 'Log in',
    demo: 'Entry starts with a real Security Check. It becomes the first object inside your 30-day demo space.',
    orbit: [
      ['OS', 'Workspace'],
      ['MÔRA', 'Context'],
      ['DESK', 'Surface'],
      ['STUDIO', 'Products & knowledge'],
    ],
    systemEyebrow: 'THE SYSTEM',
    systemTitle: 'Not four products. Four layers of the same idea.',
    layers: [
      {
        no: '00',
        name: 'SAIMÔR',
        role: 'Studio / System',
        text: 'The frame. Products, working methods and experiments originate here.',
      },
      {
        no: '01',
        name: 'OS',
        role: 'Workspace',
        text: 'Files, cases, areas and connections live inside one shared space.',
      },
      {
        no: '02',
        name: 'MÔRA',
        role: 'Context layer',
        text: 'Môra keeps relationships available so AI can work with existing context.',
      },
      {
        no: '03',
        name: 'DESK',
        role: 'Surface',
        text: 'The daily view: fewer tabs, less searching, more context at the right moment.',
      },
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'A real finding instead of an empty demo.',
    entryText:
      'You start with your domain. The report becomes the first object inside your own Saimôr space and stays connected to your access.',
    entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Software is only one part of it.',
    studioText:
      'Saimôr is built by Marius Fahrländer, with a background in IT systems management and technical sales. I build products, explain AI clearly and work with teams on useful applications.',
    offers: [
      ['Talks', 'Understanding AI without hype and buzzword fog.'],
      ['Training & workshops', 'Practical sessions for teams that actually want to work with it.'],
      ['Prototypes & web projects', 'Turning ideas into something robust and testable quickly.'],
    ],
    talk: 'Ask about a talk or workshop',
    experiments: 'Other work',
    experimentsText: 'YORI · Earth · selected web projects and prototypes',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'If any of this fits your problem, we should talk.',
    finalText: 'No sales-funnel theatre. Send a short note about what you are building or where you are stuck.',
    finalCta: 'Open contact',
  },
} as const;

const layerIcons = [Layers3, PanelTop, BrainCircuit, PanelTop] as const;

export default function SystemWorldHome({ locale }: Props) {
  const c = COPY[locale];
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const contactHref = locale === 'de' ? '/de/kontakt' : '/en/contact';

  return (
    <div className="overflow-hidden bg-[#050706] text-white selection:bg-[#d8b86a] selection:text-black">
      <section className="relative min-h-[100svh] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(214,168,72,.08),transparent_24%),radial-gradient(circle_at_50%_70%,rgba(89,205,177,.055),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        <div className="s-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fd4c1]/55 to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-7 pt-24 sm:px-8 sm:pt-28 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[9px] font-semibold tracking-[0.28em] text-white/38 sm:text-[10px]">
              {c.eyebrow}
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-white/28 sm:text-[10px]">
              <span className="s-live h-1.5 w-1.5 rounded-full bg-[#7fd4c1]" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-6 lg:py-0">
            <div className="order-2 lg:order-1 lg:pr-8">
              <div className="max-w-2xl">
                <h1 className="font-serif text-[clamp(4.2rem,16vw,8.6rem)] font-light leading-[.78] tracking-[-.065em]">
                  Saimôr
                </h1>
                <p className="mt-6 max-w-xl text-[clamp(1.75rem,5vw,3.5rem)] font-light leading-[1.02] tracking-[-.04em] text-white/92">
                  {c.thesis}
                </p>
                <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/50 sm:text-lg sm:leading-8">{c.intro}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={securityHref}
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#e7eadf] px-6 py-3.5 text-sm font-bold text-[#08100d] transition hover:bg-white"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {c.enter}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/login?callbackUrl=%2Faccount%2Fbridge"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/12 px-6 py-3.5 text-sm font-semibold text-white/62 transition hover:border-white/28 hover:text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    {c.login}
                  </Link>
                </div>
                <p className="mt-4 max-w-lg text-xs leading-5 text-white/28">{c.demo}</p>
              </div>
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-square w-[min(78vw,560px)]">
                <div className="s-halo absolute inset-[22%] rounded-full bg-[#d6a848]/10 blur-3xl" />
                <div className="s-orbit-a absolute inset-[6%] rounded-full border border-white/[0.08]" />
                <div className="s-orbit-b absolute inset-[18%] rounded-full border border-[#d6a848]/18" />
                <div className="s-orbit-c absolute inset-[29%] rounded-full border border-[#7fd4c1]/15" />

                <span className="s-dot-a absolute left-[5%] top-[48%] h-2 w-2 rounded-full bg-[#d6a848] shadow-[0_0_20px_rgba(214,168,72,.8)]" />
                <span className="s-dot-b absolute right-[17%] top-[12%] h-1.5 w-1.5 rounded-full bg-[#7fd4c1] shadow-[0_0_18px_rgba(127,212,193,.75)]" />
                <span className="s-dot-c absolute bottom-[14%] right-[14%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,.65)]" />

                <div className="absolute inset-[34%] flex items-center justify-center rounded-full border border-[#d6a848]/22 bg-black/30 p-6 shadow-[0_0_80px_rgba(214,168,72,.08)] backdrop-blur-xl">
                  <Image
                    src="/saimor-seal-master.png"
                    alt="Saimôr"
                    fill
                    sizes="180px"
                    priority
                    className="object-contain p-[18%] opacity-95 mix-blend-screen"
                  />
                </div>

                {c.orbit.map(([name, role], i) => {
                  const positions = [
                    'left-[1%] top-[26%]',
                    'right-[0%] top-[30%]',
                    'left-[8%] bottom-[18%]',
                    'right-[6%] bottom-[14%]',
                  ];
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

          <a href="#system" className="mx-auto flex items-center gap-2 pb-2 font-mono text-[9px] tracking-[.22em] text-white/24 transition hover:text-white/55">
            SCROLL / SYSTEM MAP
            <span className="s-down inline-block">↓</span>
          </a>
        </div>
      </section>

      <section id="system" className="relative border-b border-white/[0.08] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#d6a848]/72 sm:text-[10px]">{c.systemEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-6xl md:text-7xl">
            {c.systemTitle}
          </h2>

          <div className="mt-14 border-t border-white/[0.1] md:mt-20">
            {c.layers.map((layer, index) => {
              const Icon = layerIcons[index];
              return (
                <article key={layer.no} className="group grid gap-5 border-b border-white/[0.08] py-7 md:grid-cols-[90px_1fr_1fr] md:items-center md:gap-8 md:py-9">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[.18em] text-white/24">
                    <span>{layer.no}</span>
                    <Icon className="h-4 w-4 text-[#7fd4c1]/55" strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-light tracking-[-.035em] text-white/90 transition group-hover:text-white sm:text-5xl">{layer.name}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-[#d6a848]/55">{layer.role}</div>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-white/42 sm:text-base sm:leading-7">{layer.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 grid gap-8 border border-white/[0.1] bg-white/[0.018] p-6 sm:p-8 md:grid-cols-[.85fr_1.15fr] md:items-end md:p-10">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#7fd4c1]/72">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7fd4c1]" />
                {c.entryLabel}
              </div>
              <h3 className="mt-5 max-w-md font-serif text-3xl font-light leading-tight text-white/92 sm:text-4xl">{c.entryTitle}</h3>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-6 text-white/45 sm:text-base sm:leading-7">{c.entryText}</p>
              <Link href={securityHref} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d8e9df] transition hover:text-white">
                {c.entryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="relative border-b border-white/[0.08] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#d6a848]/72 sm:text-[10px]">{c.studioEyebrow}</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-6xl">{c.studioTitle}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/44 sm:text-base">{c.studioText}</p>
            <Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e8cf8e] transition hover:text-[#f3dda4]">
              <Mic2 className="h-4 w-4" />
              {c.talk}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
              <p className="mt-2 text-sm text-white/38">{c.experimentsText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-t border-white/[0.1] pt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#7fd4c1]/62">{c.finalEyebrow}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/90 sm:text-6xl md:text-7xl">{c.finalTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/38 sm:text-base">{c.finalText}</p>
            </div>
            <Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#d6a848]/28 px-6 py-3.5 text-sm font-semibold text-[#e8cf8e] transition hover:border-[#d6a848]/55 hover:bg-[#d6a848]/[0.04]">
              {c.finalCta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes orbitA { from { transform: rotate(0deg) scaleX(1.08); } to { transform: rotate(360deg) scaleX(1.08); } }
        @keyframes orbitB { from { transform: rotate(360deg) scaleY(.86); } to { transform: rotate(0deg) scaleY(.86); } }
        @keyframes orbitC { from { transform: rotate(12deg) scaleX(1.14); } to { transform: rotate(372deg) scaleX(1.14); } }
        @keyframes pulseSoft { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 12% { opacity: .5; } 88% { opacity: .18; } 100% { transform: translateY(100svh); opacity: 0; } }
        @keyframes down { 0%,100% { transform: translateY(0); opacity: .35; } 50% { transform: translateY(4px); opacity: .8; } }
        .s-orbit-a { animation: orbitA 58s linear infinite; }
        .s-orbit-b { animation: orbitB 74s linear infinite; }
        .s-orbit-c { animation: orbitC 92s linear infinite; }
        .s-dot-a, .s-dot-b, .s-dot-c, .s-live, .s-halo { animation: pulseSoft 5s ease-in-out infinite; }
        .s-dot-b { animation-delay: -1.7s; }
        .s-dot-c { animation-delay: -3.1s; }
        .s-scan { animation: scan 13s linear infinite; }
        .s-down { animation: down 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .s-orbit-a,.s-orbit-b,.s-orbit-c,.s-dot-a,.s-dot-b,.s-dot-c,.s-live,.s-halo,.s-scan,.s-down { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
