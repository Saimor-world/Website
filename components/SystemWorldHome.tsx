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
    eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
    thesis: 'Dateien, Aufgaben und KI. Ein gemeinsamer Arbeitsraum.',
    intro:
      'Saimôr OS ist ein digitaler Arbeitsraum für tägliche Arbeit und intelligente Assistenz. Kalender, Dateien, Vorgänge, Integrationen und KI leben im selben Kontext – statt über einzelne Apps und Chats verteilt zu sein.',
    enter: 'Saimôr OS ausprobieren',
    learn: 'System verstehen',
    login: 'Einloggen',
    training: 'Vorträge & Schulungen',
    entryNote:
      'Der Security Check prüft öffentliche Signale deiner Domain. Die Ergebnisse bilden den Ausgangspunkt deines persönlichen Vorschau-Raums.',
    orbit: [
      ['DATEIEN', 'im Zusammenhang'],
      ['MÔRA', 'proaktive Assistenz'],
      ['ARBEIT', 'Kalender · Inbox · Board'],
      ['AGENTS', 'Ausführung im Hintergrund'],
    ],
    systemEyebrow: 'SAIMÔR OS',
    systemTitle: 'Was heute über viele Tools verteilt ist, lebt hier zusammen.',
    layers: [
      ['01', 'ARBEIT', 'Ein gemeinsamer Raum', 'Home, Inbox, Kalender, Board, Dateien und Bereiche greifen auf denselben Arbeitskontext zu.'],
      ['02', 'KONTEXT', 'Nicht jedes Mal von vorne', 'Informationen, offene Fäden und Beziehungen bleiben verfügbar, statt mit jedem neuen Chat oder Toolwechsel zu verschwinden.'],
      ['03', 'MÔRA', 'Proaktive Assistenz', 'Môra wartet nicht nur auf Prompts. Sie erkennt relevante Signale, bereitet nächste Schritte vor und meldet sich, wenn etwas wirklich Aufmerksamkeit braucht.'],
      ['04', 'AUSFÜHRUNG', 'Nicht nur Antworten', 'Agents, Automationen und Integrationen können Arbeit im Hintergrund ausführen – nachvollziehbar und innerhalb klarer Systemgrenzen.'],
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Nicht mit einem leeren Chat anfangen.',
    entryText:
      'Du startest mit deiner Domain. Der Security Report wird zum ersten echten Objekt im OS. Damit beginnt der Raum bereits mit realem Kontext statt mit einer leeren Promptbox.',
    entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Produkte bauen. KI verständlich machen.',
    studioText:
      'Saimôr ist unser unabhängiges Produktstudio. Wir verbinden Erfahrung aus IT-Systemmanagement und technischem Vertrieb mit eigener Produktentwicklung und bieten daneben Vorträge, Workshops und Schulungen zu praktischer KI an.',
    offers: [
      ['Vorträge', 'KI verständlich einordnen – ohne Show und Buzzword-Nebel.'],
      ['Schulungen & Workshops', 'Praxisnah für Teams, die KI sinnvoll in ihre Arbeit bringen wollen.'],
      ['Prototypen & Webprojekte', 'Ideen schnell in eine testbare, belastbare Form bringen.'],
    ],
    talk: 'Vortrag oder Schulung anfragen',
    experiments: 'Weitere Arbeiten',
    experimentsText: 'Earth · YORI · ausgewählte Experimente, Webprojekte und Prototypen',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'Wenn Saimôr zu deinem Problem passt, reden wir darüber.',
    finalText: 'Schreib kurz, woran du arbeitest oder wo es gerade hängt.',
    finalCta: 'Kontakt öffnen',
    scroll: 'SCROLL / MEHR ERFAHREN',
  },
  en: {
    eyebrow: 'SAIMÔR · SOVEREIGN AI SYSTEMS',
    thesis: 'Files, tasks and AI. One shared workspace.',
    intro:
      'Saimôr OS is a digital workspace for everyday work and intelligent assistance. Calendar, files, tasks, integrations and AI live in the same context instead of being scattered across separate apps and chats.',
    enter: 'Try Saimôr OS',
    learn: 'Understand the system',
    login: 'Log in',
    training: 'Talks & training',
    entryNote:
      'The Security Check examines public signals from your domain. Its results become the starting point of your personal preview workspace.',
    orbit: [
      ['FILES', 'kept in context'],
      ['MÔRA', 'proactive assistant'],
      ['WORK', 'calendar · inbox · board'],
      ['AGENTS', 'background execution'],
    ],
    systemEyebrow: 'SAIMÔR OS',
    systemTitle: 'What is scattered across many tools today lives together here.',
    layers: [
      ['01', 'WORK', 'One shared space', 'Home, inbox, calendar, board, files and areas work from the same context.'],
      ['02', 'CONTEXT', 'No constant restart', 'Information, open threads and relationships remain available instead of disappearing with every new chat or tool switch.'],
      ['03', 'MÔRA', 'Proactive assistance', 'Môra does not just wait for prompts. She notices relevant signals, prepares next steps and appears when something genuinely needs attention.'],
      ['04', 'EXECUTION', 'More than answers', 'Agents, automations and integrations can carry out background work within clear, traceable system boundaries.'],
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Do not start with an empty chat.',
    entryText:
      'You start with your domain. The Security Report becomes the first real object inside the OS, so the space begins with real context instead of an empty prompt box.',
    entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Build products. Make AI understandable.',
    studioText:
      'Saimôr is our independent product studio. We combine experience in IT systems management and technical sales with hands-on product development, and we also offer talks, workshops and practical AI training.',
    offers: [
      ['Talks', 'Putting AI into context without hype or buzzword fog.'],
      ['Training & workshops', 'Practical sessions for teams that want to use AI meaningfully.'],
      ['Prototypes & web projects', 'Turning ideas into something robust and testable quickly.'],
    ],
    talk: 'Ask about a talk or workshop',
    experiments: 'Other work',
    experimentsText: 'Earth · YORI · selected experiments, web projects and prototypes',
    finalEyebrow: 'CONTACT / OPEN CHANNEL',
    finalTitle: 'If Saimôr fits your problem, we should talk.',
    finalText: 'Send a short note about what you are building or where you are stuck.',
    finalCta: 'Open contact',
    scroll: 'SCROLL / LEARN MORE',
  },
} as const;

const layerIcons = [Layers3, PanelTop, BrainCircuit, Monitor] as const;

export default function SystemWorldHome({ locale }: Props) {
  const c = COPY[locale];
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const contactHref = locale === 'de' ? '/de/kontakt' : '/en/contact';

  return (
    <div className="overflow-hidden bg-[#112a20] text-[#f4f5ed] selection:bg-[#d8b86a] selection:text-[#102219]">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-[#d9eadf]/10 bg-[#16372a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(100,181,132,.28),transparent_34%),radial-gradient(ellipse_at_86%_18%,rgba(216,184,106,.18),transparent_29%),radial-gradient(ellipse_at_52%_76%,rgba(80,153,112,.20),transparent_42%),linear-gradient(160deg,#1a402f_0%,#122f24_48%,#18382b_100%)]" />
        <div className="s-fog-a pointer-events-none absolute -left-[16%] top-[2%] h-[52%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(127,212,193,.17),transparent_68%)]" />
        <div className="s-fog-b pointer-events-none absolute -right-[18%] top-[8%] h-[48%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.13),transparent_68%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        <div className="s-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9fe4cc]/34 to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-5 pt-[84px] sm:px-8 sm:pb-8 sm:pt-28 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[8px] font-semibold tracking-[0.24em] text-white/68 sm:text-[10px] sm:tracking-[0.28em]">{c.eyebrow}</div>
            <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.16em] text-white/62 sm:text-[10px]">
              <span className="s-live h-1.5 w-1.5 rounded-full bg-[#8be0c5] shadow-[0_0_10px_rgba(139,224,197,.45)]" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="grid flex-1 items-center gap-3 py-4 sm:gap-8 sm:py-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:py-0">
            <div className="order-2 lg:order-1 lg:pr-8">
              <div className="max-w-2xl">
                <h1 className="font-serif text-[clamp(4rem,16vw,8.6rem)] font-light leading-[.8] tracking-[-.065em] text-[#fbfbf5]">Saimôr</h1>
                <p className="mt-5 max-w-2xl text-[clamp(1.65rem,3.2vw,2.8rem)] font-light leading-[1.12] tracking-[-.025em] [text-wrap:balance] text-white/96 sm:mt-6">{c.thesis}</p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#e4eee6]/78 sm:mt-6 sm:text-lg sm:leading-8">{c.intro}</p>

                <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Link href={securityHref} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#eef2e6] px-6 py-3 text-sm font-bold text-[#102219] shadow-[0_14px_36px_rgba(8,29,20,.14)] transition hover:bg-white sm:min-h-14 sm:py-3.5">
                    <ShieldCheck className="h-4 w-4" />
                    {c.enter}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#system" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#d9eadf]/26 bg-[#214735]/78 px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/38 hover:bg-[#28543f] sm:min-h-14 sm:py-3.5">
                    {c.learn}<ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/66 sm:text-xs">
                  <Link href="/login?callbackUrl=%2Faccount%2Fbridge" className="inline-flex items-center gap-1.5 transition hover:text-white">
                    <LogIn className="h-3.5 w-3.5" />{c.login}
                  </Link>
                  <span className="hidden h-3 w-px bg-white/20 sm:block" />
                  <a href="#studio" className="inline-flex items-center gap-1.5 text-[#f0d996]/90 transition hover:text-[#ffe7a7]">
                    <Mic2 className="h-3.5 w-3.5" />{c.training}
                  </a>
                </div>
                <p className="mt-4 max-w-lg text-[11px] leading-5 text-[#d5e5da]/62 sm:text-xs">{c.entryNote}</p>
              </div>
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-square w-[min(62vw,250px)] sm:w-[min(68vw,500px)] lg:w-[min(43vw,570px)]">
                <div className="s-halo absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.18),transparent_66%)]" />
                <div className="s-halo-green absolute inset-[24%] rounded-full bg-[radial-gradient(circle,rgba(127,212,193,.14),transparent_68%)]" />
                <div className="s-orbit-a absolute inset-[4%] rounded-full border border-white/[0.18]" />
                <div className="s-orbit-b absolute inset-[16%] rounded-full border border-[#d6a848]/38" />
                <div className="s-orbit-c absolute inset-[28%] rounded-full border border-[#8be0c5]/30" />
                <div className="s-orbit-d absolute inset-[10%] rounded-[50%] border border-white/[0.10] [transform:rotate(-24deg)_scaleY(.68)]" />
                <span className="s-dot-a absolute left-[4%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#e1b958] shadow-[0_0_18px_rgba(225,185,88,.58)]" />
                <span className="s-dot-b absolute right-[15%] top-[11%] h-2 w-2 rounded-full bg-[#8be0c5] shadow-[0_0_16px_rgba(139,224,197,.52)]" />
                <span className="s-dot-c absolute bottom-[12%] right-[13%] h-1.5 w-1.5 rounded-full bg-white/84" />
                <span className="s-dot-d absolute left-[23%] top-[13%] h-1 w-1 rounded-full bg-[#8ee8ef]" />

                <div className="absolute inset-[29%] flex items-center justify-center rounded-full border border-[#e0bb62]/38 bg-[#183b2d]/92 shadow-[0_0_44px_rgba(214,168,72,.12)]">
                  <div className="absolute inset-[-12%] rounded-full border border-white/[0.10]" />
                  <Image src="/saimor-seal-256.webp" alt="Saimôr" fill sizes="(max-width: 639px) 120px, 220px" priority className="rounded-full object-contain p-[14%] opacity-[0.99] mix-blend-screen" />
                </div>

                {c.orbit.map(([name, role], i) => {
                  const positions = ['left-[-2%] top-[25%]', 'right-[-2%] top-[29%]', 'left-[6%] bottom-[16%]', 'right-[4%] bottom-[12%]'];
                  return (
                    <div key={name} className={`absolute ${positions[i]} hidden sm:block`}>
                      <div className="rounded-full border border-white/[0.16] bg-[#17392c]/94 px-3 py-2 shadow-[0_10px_28px_rgba(7,25,18,.16)]">
                        <div className="font-mono text-[9px] font-semibold tracking-[.18em] text-white/88">{name}</div>
                        <div className="mt-0.5 text-[9px] text-white/58">{role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <a href="#system" className="mx-auto hidden items-center gap-2 pb-1 font-mono text-[9px] tracking-[.22em] text-white/52 transition hover:text-white/78 sm:flex">
            {c.scroll}<span className="s-down inline-block">↓</span>
          </a>
        </div>
      </section>

      <section id="system" className="relative border-b border-[#d9eadf]/10 bg-[radial-gradient(circle_at_80%_10%,rgba(127,212,193,.10),transparent_34%),#143126] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/88 sm:text-[10px]">{c.systemEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl md:text-7xl">{c.systemTitle}</h2>

          <div className="mt-10 grid gap-px overflow-hidden border-y border-white/[0.10] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {c.layers.map(([no, name, role], index) => {
              const Icon = layerIcons[index];
              return (
                <div key={no} className="flex min-h-24 items-center gap-4 bg-[#143126] px-4 py-4 sm:px-5">
                  <Icon className="h-4 w-4 shrink-0 text-[#91dec7]/72" strokeWidth={1.35} />
                  <div className="min-w-0">
                    <div className="font-mono text-[8px] tracking-[.17em] text-white/38">{no}</div>
                    <div className="mt-1 text-sm font-semibold tracking-[.03em] text-white/90">{name}</div>
                    <div className="mt-1 text-[11px] leading-4 text-[#dce9e0]/48">{role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 border-l border-[#e0bd67]/28 pl-5 sm:pl-7 md:grid-cols-[.85fr_1.15fr] md:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#91dec7]/88">
                <span className="h-1.5 w-1.5 rounded-full bg-[#91dec7]" />{c.entryLabel}
              </div>
              <h3 className="mt-4 max-w-md font-serif text-3xl font-light leading-tight text-white/96 sm:text-4xl">{c.entryTitle}</h3>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-6 text-[#dce9e0]/68 sm:text-base sm:leading-7">{c.entryText}</p>
              <Link href={securityHref} className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e5f1e9] transition hover:text-white">
                {c.entryCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="relative border-b border-[#d9eadf]/10 bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,72,.09),transparent_31%),#17352a] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/88 sm:text-[10px]">{c.studioEyebrow}</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl">{c.studioTitle}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#dce9e0]/68 sm:text-base">{c.studioText}</p>
            <Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]">
              <Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="border-t border-white/[0.15]">
            {c.offers.map(([name, text], index) => (
              <div key={name} className="grid gap-3 border-b border-white/[0.12] py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6">
                <div className="font-mono text-[9px] tracking-[.18em] text-white/46">0{index + 1}</div>
                <div className="text-lg font-medium text-white/94 sm:text-xl">{name}</div>
                <p className="text-sm leading-6 text-[#dce9e0]/64">{text}</p>
              </div>
            ))}
            <div className="pt-7">
              <div className="font-mono text-[9px] uppercase tracking-[.2em] text-white/48">{c.experiments}</div>
              <p className="mt-2 text-sm text-[#dce9e0]/58">{c.experimentsText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#112c21] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-t border-white/[0.15] pt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#91dec7]/82">{c.finalEyebrow}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/96 sm:text-6xl md:text-7xl">{c.finalTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#dce9e0]/64 sm:text-base">{c.finalText}</p>
            </div>
            <Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#e0bd67]/40 px-6 py-3.5 text-sm font-semibold text-[#f0d38c] transition hover:border-[#e0bd67]/68 hover:bg-[#d6a848]/[0.07]">
              {c.finalCta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes orbitA { from { transform: rotate(0deg) scaleX(1.08); } to { transform: rotate(360deg) scaleX(1.08); } }
        @keyframes orbitB { from { transform: rotate(360deg) scaleY(.86); } to { transform: rotate(0deg) scaleY(.86); } }
        @keyframes orbitC { from { transform: rotate(12deg) scaleX(1.14); } to { transform: rotate(372deg) scaleX(1.14); } }
        @keyframes orbitD { from { transform: rotate(-24deg) scaleY(.68); } to { transform: rotate(336deg) scaleY(.68); } }
        @keyframes pulseSoft { 0%,100% { opacity: .62; } 50% { opacity: 1; } }
        @keyframes fogA { 0%,100% { transform: translate3d(-1%,0,0) scale(1); } 50% { transform: translate3d(2%,1%,0) scale(1.03); } }
        @keyframes fogB { 0%,100% { transform: translate3d(1%,0,0) scale(1.02); } 50% { transform: translate3d(-2%,1%,0) scale(.99); } }
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 14% { opacity: .22; } 88% { opacity: .08; } 100% { transform: translateY(100svh); opacity: 0; } }
        @keyframes down { 0%,100% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(4px); opacity: .82; } }

        .s-orbit-a,.s-orbit-b,.s-orbit-c,.s-orbit-d,.s-fog-a,.s-fog-b,.s-scan { animation: none; }
        .s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green { animation: pulseSoft 6.5s ease-in-out infinite; }
        .s-down { animation: down 2.2s ease-in-out infinite; }

        @media (min-width: 640px) {
          .s-orbit-a { animation: orbitA 72s linear infinite; }
          .s-orbit-b { animation: orbitB 88s linear infinite; }
          .s-orbit-c { animation: orbitC 106s linear infinite; }
          .s-orbit-d { animation: orbitD 124s linear infinite; }
          .s-fog-a { animation: fogA 20s ease-in-out infinite; }
          .s-fog-b { animation: fogB 24s ease-in-out infinite; }
          .s-scan { animation: scan 18s linear infinite; }
        }

        @media (max-width: 639px) {
          .s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-halo,.s-halo-green { animation: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .s-orbit-a,.s-orbit-b,.s-orbit-c,.s-orbit-d,.s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green,.s-fog-a,.s-fog-b,.s-scan,.s-down { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
