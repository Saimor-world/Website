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
    thesis: 'Deine Arbeit, Dateien und KI – in einem System, das den Zusammenhang behält.',
    intro:
      'Saimôr OS ist ein digitaler Arbeitsraum für tägliche Arbeit und intelligente Assistenz. Kalender, Dateien, Vorgänge, Integrationen und KI leben im selben Kontext – statt über einzelne Apps und Chats verteilt zu sein.',
    enter: 'Saimôr OS ausprobieren',
    learn: 'System verstehen',
    login: 'Einloggen',
    training: 'Vorträge & Schulungen',
    entryNote:
      'Der Einstieg beginnt mit einem echten Security Check. Sein Ergebnis wird zum ersten Objekt in deinem 30-Tage-Raum.',
    orbit: [
      ['DATEIEN', 'im Zusammenhang'],
      ['MÔRA', 'proaktive Assistenz'],
      ['ARBEIT', 'Kalender · Inbox · Board'],
      ['AGENTS', 'Ausführung im Hintergrund'],
    ],
    systemEyebrow: 'SAIMÔR OS',
    systemTitle: 'Was heute über viele Tools verteilt ist, lebt hier zusammen.',
    layers: [
      [
        '01',
        'ARBEIT',
        'Ein gemeinsamer Raum',
        'Home, Inbox, Kalender, Board, Dateien und Bereiche greifen auf denselben Arbeitskontext zu.',
      ],
      [
        '02',
        'KONTEXT',
        'Nicht jedes Mal von vorne',
        'Informationen, offene Fäden und Beziehungen bleiben verfügbar, statt mit jedem neuen Chat oder Toolwechsel zu verschwinden.',
      ],
      [
        '03',
        'MÔRA',
        'Proaktive Assistenz',
        'Môra wartet nicht nur auf Prompts. Sie erkennt relevante Signale, bereitet nächste Schritte vor und meldet sich, wenn etwas wirklich Aufmerksamkeit braucht.',
      ],
      [
        '04',
        'AUSFÜHRUNG',
        'Nicht nur Antworten',
        'Agents, Automationen und Integrationen können Arbeit im Hintergrund ausführen – nachvollziehbar und innerhalb klarer Systemgrenzen.',
      ],
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Nicht mit einem leeren Chat anfangen.',
    entryText:
      'Du startest mit deiner Domain. Der Security Report wird zum ersten echten Objekt im OS. Damit beginnt der Raum bereits mit realem Kontext statt mit einer leeren Promptbox.',
    entryCta: 'Security Check starten',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Produkte bauen. KI verständlich machen.',
    studioText:
      'Saimôr ist mein unabhängiges Produktstudio. Ich komme aus IT-Systemmanagement und technischem Vertrieb, entwickle die Systeme selbst und biete daneben Vorträge, Workshops und Schulungen zu praktischer KI an.',
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
    thesis: 'Your work, files and AI – in one system that keeps the context.',
    intro:
      'Saimôr OS is a digital workspace for everyday work and intelligent assistance. Calendar, files, tasks, integrations and AI live in the same context instead of being scattered across separate apps and chats.',
    enter: 'Try Saimôr OS',
    learn: 'Understand the system',
    login: 'Log in',
    training: 'Talks & training',
    entryNote:
      'Entry starts with a real Security Check. Its result becomes the first object inside your 30-day space.',
    orbit: [
      ['FILES', 'kept in context'],
      ['MÔRA', 'proactive assistant'],
      ['WORK', 'calendar · inbox · board'],
      ['AGENTS', 'background execution'],
    ],
    systemEyebrow: 'SAIMÔR OS',
    systemTitle: 'What is scattered across many tools today lives together here.',
    layers: [
      [
        '01',
        'WORK',
        'One shared space',
        'Home, inbox, calendar, board, files and areas work from the same context.',
      ],
      [
        '02',
        'CONTEXT',
        'No constant restart',
        'Information, open threads and relationships remain available instead of disappearing with every new chat or tool switch.',
      ],
      [
        '03',
        'MÔRA',
        'Proactive assistance',
        'Môra does not just wait for prompts. She notices relevant signals, prepares next steps and appears when something genuinely needs attention.',
      ],
      [
        '04',
        'EXECUTION',
        'More than answers',
        'Agents, automations and integrations can carry out background work within clear, traceable system boundaries.',
      ],
    ],
    entryLabel: 'ENTRY / SECURITY CHECK',
    entryTitle: 'Do not start with an empty chat.',
    entryText:
      'You start with your domain. The Security Report becomes the first real object inside the OS, so the space begins with real context instead of an empty prompt box.',
    entryCta: 'Start Security Check',
    studioEyebrow: 'SAIMÔR · STUDIO',
    studioTitle: 'Build products. Make AI understandable.',
    studioText:
      'Saimôr is my independent product studio. My background is in IT systems management and technical sales; I build the systems myself and also offer talks, workshops and practical AI training.',
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
    <div className="overflow-hidden bg-[#06100d] text-white selection:bg-[#d8b86a] selection:text-black">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.08] bg-[#07110e]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_18%,rgba(47,112,87,.18),transparent_38%),radial-gradient(ellipse_at_78%_30%,rgba(214,168,72,.11),transparent_28%),radial-gradient(ellipse_at_72%_70%,rgba(89,205,177,.075),transparent_34%),linear-gradient(160deg,#07110e_0%,#040806_52%,#07100d_100%)]" />
        <div className="s-fog-a pointer-events-none absolute -left-[24%] top-[4%] h-[78%] w-[78%] rounded-full bg-[#7fd4c1]/[0.045] blur-[140px]" />
        <div className="s-fog-b pointer-events-none absolute -right-[20%] top-[8%] h-[76%] w-[76%] rounded-full bg-[#d6a848]/[0.055] blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.026)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="s-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fd4c1]/42 to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-5 pt-[84px] sm:px-8 sm:pb-8 sm:pt-28 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-[8px] font-semibold tracking-[0.24em] text-white/42 sm:text-[10px] sm:tracking-[0.28em]">{c.eyebrow}</div>
            <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.16em] text-white/34 sm:text-[10px]">
              <span className="s-live h-1.5 w-1.5 rounded-full bg-[#7fd4c1]" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="grid flex-1 items-center gap-3 py-4 sm:gap-8 sm:py-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-8 lg:py-0">
            <div className="order-2 lg:order-1 lg:pr-8">
              <div className="max-w-2xl">
                <h1 className="font-serif text-[clamp(4rem,16vw,8.6rem)] font-light leading-[.8] tracking-[-.065em] text-white">Saimôr</h1>
                <p className="mt-5 max-w-2xl text-[clamp(1.6rem,5vw,3.5rem)] font-light leading-[1.03] tracking-[-.04em] text-white/94 sm:mt-6">{c.thesis}</p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:mt-6 sm:text-lg sm:leading-8">{c.intro}</p>

                <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Link href={securityHref} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#e7eadf] px-6 py-3 text-sm font-bold text-[#08100d] shadow-[0_18px_55px_rgba(92,190,155,.12)] transition hover:bg-white sm:min-h-14 sm:py-3.5">
                    <ShieldCheck className="h-4 w-4" />
                    {c.enter}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="#system" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/16 bg-black/16 px-6 py-3 text-sm font-semibold text-white/72 backdrop-blur-xl transition hover:border-white/28 hover:bg-black/26 hover:text-white sm:min-h-14 sm:py-3.5">
                    {c.learn}<ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/46 sm:text-xs">
                  <Link href="/login?callbackUrl=%2Faccount%2Fbridge" className="inline-flex items-center gap-1.5 transition hover:text-white/76">
                    <LogIn className="h-3.5 w-3.5" />{c.login}
                  </Link>
                  <span className="hidden h-3 w-px bg-white/14 sm:block" />
                  <a href="#studio" className="inline-flex items-center gap-1.5 text-[#e7ca84]/72 transition hover:text-[#f0d998]">
                    <Mic2 className="h-3.5 w-3.5" />{c.training}
                  </a>
                </div>
                <p className="mt-4 max-w-lg text-[11px] leading-5 text-white/40 sm:text-xs">{c.entryNote}</p>
              </div>
            </div>

            <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-square w-[min(62vw,250px)] sm:w-[min(68vw,500px)] lg:w-[min(43vw,570px)]">
                <div className="s-halo absolute inset-[18%] rounded-full bg-[#d6a848]/10 blur-[56px]" />
                <div className="s-halo-green absolute inset-[26%] rounded-full bg-[#7fd4c1]/8 blur-[44px]" />
                <div className="s-orbit-a absolute inset-[4%] rounded-full border border-white/[0.10]" />
                <div className="s-orbit-b absolute inset-[16%] rounded-full border border-[#d6a848]/24" />
                <div className="s-orbit-c absolute inset-[28%] rounded-full border border-[#7fd4c1]/20" />
                <div className="s-orbit-d absolute inset-[10%] rounded-[50%] border border-white/[0.045] [transform:rotate(-24deg)_scaleY(.68)]" />
                <span className="s-dot-a absolute left-[4%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#d6a848] shadow-[0_0_24px_rgba(214,168,72,.82)]" />
                <span className="s-dot-b absolute right-[15%] top-[11%] h-2 w-2 rounded-full bg-[#7fd4c1] shadow-[0_0_22px_rgba(127,212,193,.72)]" />
                <span className="s-dot-c absolute bottom-[12%] right-[13%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,.65)]" />
                <span className="s-dot-d absolute left-[23%] top-[13%] h-1 w-1 rounded-full bg-[#66ddea] shadow-[0_0_14px_rgba(102,221,234,.70)]" />

                <div className="absolute inset-[29%] flex items-center justify-center rounded-full border border-[#d6a848]/28 bg-[#07100d]/55 shadow-[0_0_90px_rgba(214,168,72,.16)] backdrop-blur-2xl">
                  <div className="absolute inset-[-12%] rounded-full border border-white/[0.055]" />
                  <Image src="/saimor-seal-master.png" alt="Saimôr" fill sizes="220px" priority className="object-contain p-[14%] opacity-[0.98] mix-blend-screen drop-shadow-[0_0_22px_rgba(214,168,72,.38)]" />
                </div>

                {c.orbit.map(([name, role], i) => {
                  const positions = ['left-[-2%] top-[25%]', 'right-[-2%] top-[29%]', 'left-[6%] bottom-[16%]', 'right-[4%] bottom-[12%]'];
                  return (
                    <div key={name} className={`absolute ${positions[i]} hidden sm:block`}>
                      <div className="rounded-full border border-white/[0.12] bg-[#07100d]/72 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,.22)] backdrop-blur-xl">
                        <div className="font-mono text-[9px] font-semibold tracking-[.18em] text-white/80">{name}</div>
                        <div className="mt-0.5 text-[9px] text-white/38">{role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <a href="#system" className="mx-auto hidden items-center gap-2 pb-1 font-mono text-[9px] tracking-[.22em] text-white/30 transition hover:text-white/58 sm:flex">
            {c.scroll}<span className="s-down inline-block">↓</span>
          </a>
        </div>
      </section>

      <section id="system" className="relative border-b border-white/[0.08] bg-[radial-gradient(circle_at_80%_10%,rgba(127,212,193,.045),transparent_32%),#06100d] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#d6a848]/72 sm:text-[10px]">{c.systemEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/94 sm:text-6xl md:text-7xl">{c.systemTitle}</h2>

          <div className="mt-14 border-t border-white/[0.1] md:mt-20">
            {c.layers.map(([no, name, role, text], index) => {
              const Icon = layerIcons[index];
              return (
                <article key={no} className="group grid gap-4 border-b border-white/[0.08] py-7 md:grid-cols-[90px_1fr_1fr] md:items-center md:gap-8 md:py-9">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[.18em] text-white/25">
                    <span>{no}</span><Icon className="h-4 w-4 text-[#7fd4c1]/58" strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-light tracking-[-.035em] text-white/90 transition group-hover:text-white sm:text-5xl">{name}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-[#d6a848]/58">{role}</div>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-white/44 sm:text-base sm:leading-7">{text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-14 grid gap-8 border border-white/[0.1] bg-white/[0.022] p-6 backdrop-blur-xl sm:p-8 md:mt-16 md:grid-cols-[.85fr_1.15fr] md:items-end md:p-10">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.22em] text-[#7fd4c1]/74">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7fd4c1]" />{c.entryLabel}
              </div>
              <h3 className="mt-5 max-w-md font-serif text-3xl font-light leading-tight text-white/94 sm:text-4xl">{c.entryTitle}</h3>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-6 text-white/46 sm:text-base sm:leading-7">{c.entryText}</p>
              <Link href={securityHref} className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d8e9df] transition hover:text-white">
                {c.entryCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="relative border-b border-white/[0.08] bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,72,.045),transparent_30%),#08110f] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#d6a848]/72 sm:text-[10px]">{c.studioEyebrow}</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/94 sm:text-6xl">{c.studioTitle}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/46 sm:text-base">{c.studioText}</p>
            <Link href={contactHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e8cf8e] transition hover:text-[#f3dda4]">
              <Mic2 className="h-4 w-4" />{c.talk}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="border-t border-white/[0.1]">
            {c.offers.map(([name, text], index) => (
              <div key={name} className="grid gap-3 border-b border-white/[0.08] py-7 sm:grid-cols-[42px_.8fr_1.2fr] sm:items-start sm:gap-6">
                <div className="font-mono text-[9px] tracking-[.18em] text-white/22">0{index + 1}</div>
                <div className="text-lg font-medium text-white/86 sm:text-xl">{name}</div>
                <p className="text-sm leading-6 text-white/42">{text}</p>
              </div>
            ))}
            <div className="pt-7">
              <div className="font-mono text-[9px] uppercase tracking-[.2em] text-white/24">{c.experiments}</div>
              <p className="mt-2 text-sm text-white/38">{c.experimentsText}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#06100d] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-t border-white/[0.1] pt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[9px] font-semibold tracking-[.25em] text-[#7fd4c1]/62">{c.finalEyebrow}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.98] tracking-[-.035em] text-white/92 sm:text-6xl md:text-7xl">{c.finalTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">{c.finalText}</p>
            </div>
            <Link href={contactHref} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#d6a848]/28 px-6 py-3.5 text-sm font-semibold text-[#e8cf8e] transition hover:border-[#d6a848]/56 hover:bg-[#d6a848]/[0.04]">
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
        @keyframes pulseSoft { 0%,100% { opacity: .45; } 50% { opacity: .96; } }
        @keyframes fogA { 0%,100% { transform: translate3d(-2%,0,0) scale(1); opacity: .46; } 50% { transform: translate3d(5%,2%,0) scale(1.08); opacity: .78; } }
        @keyframes fogB { 0%,100% { transform: translate3d(2%,0,0) scale(1.04); opacity: .38; } 50% { transform: translate3d(-5%,3%,0) scale(.97); opacity: .70; } }
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 12% { opacity: .35; } 88% { opacity: .12; } 100% { transform: translateY(100svh); opacity: 0; } }
        @keyframes down { 0%,100% { transform: translateY(0); opacity: .3; } 50% { transform: translateY(4px); opacity: .72; } }
        .s-orbit-a { animation: orbitA 62s linear infinite; }
        .s-orbit-b { animation: orbitB 78s linear infinite; }
        .s-orbit-c { animation: orbitC 96s linear infinite; }
        .s-orbit-d { animation: orbitD 110s linear infinite; }
        .s-dot-a, .s-dot-b, .s-dot-c, .s-dot-d, .s-live, .s-halo, .s-halo-green { animation: pulseSoft 5.5s ease-in-out infinite; }
        .s-dot-b { animation-delay: -1.7s; }
        .s-dot-c { animation-delay: -3.1s; }
        .s-dot-d { animation-delay: -4.2s; }
        .s-fog-a { animation: fogA 16s ease-in-out infinite; }
        .s-fog-b { animation: fogB 19s ease-in-out infinite; }
        .s-scan { animation: scan 15s linear infinite; }
        .s-down { animation: down 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .s-orbit-a,.s-orbit-b,.s-orbit-c,.s-orbit-d,.s-dot-a,.s-dot-b,.s-dot-c,.s-dot-d,.s-live,.s-halo,.s-halo-green,.s-fog-a,.s-fog-b,.s-scan,.s-down { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
