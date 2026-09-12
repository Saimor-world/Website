'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleCheck,
  FileText,
  MessageSquareText,
  Pause,
  Play,
  Radio,
} from 'lucide-react';

type Props = { locale: 'de' | 'en' };

type Source = {
  key: string;
  kind: string;
  title: string;
  meta: string;
  detail: string;
  code: string;
  confidence: string;
  color: string;
  position: string;
  Icon: typeof FileText;
};

const COPY = {
  de: {
    back: 'MÔRA',
    eyebrow: 'MÔRA / SIGNAL LAB',
    title: 'Kontext kann man sehen.',
    lead: 'Beweg den Cursor durch das Feld oder tippe auf ein Signal. Diese kleine Live-Simulation zeigt, wie MÔRA einzelne Zustände zu einer gemeinsamen Arbeitslage verbindet.',
    badge: 'INTERAKTIVE DEMO · KEINE ECHTDATEN',
    hint: 'Signal wählen · Feld bewegen · Trace starten',
    run: 'Trace starten',
    pause: 'Trace pausieren',
    center: 'MÔRA',
    centerSub: 'verbindet den Arbeitsstand',
    active: 'AKTIVES SIGNAL',
    confidence: 'KONTEXTGEWICHT',
    terminal: 'CONTEXT TRACE / SIMULIERT',
    resultLabel: 'ABGELEITETER NÄCHSTER SCHRITT',
    result: 'Freigabe prüfen und das aktuelle Angebot vor dem Termin bereitstellen.',
    note: 'Die Ansicht erklärt die Logik. Sie greift nicht auf deine Daten zu und zeigt keine erfundenen Live-Metriken.',
    whyEyebrow: 'WAS HIER PASSIERT',
    whyTitle: 'Vier Signale werden zu einer Lage.',
    steps: [
      ['01', 'Beobachten', 'Ein einzelnes Signal wird fokussiert – zum Beispiel eine geänderte Datei oder ein näher rückender Termin.'],
      ['02', 'Verbinden', 'MÔRA setzt das Signal in Beziehung zu den anderen vorhandenen Zuständen.'],
      ['03', 'Ableiten', 'Aus dem Zusammenhang entsteht ein nachvollziehbarer nächster Schritt. Aktionen bleiben freigabepflichtig.'],
    ],
    demo: 'Im OS ansehen',
    home: 'Zur MÔRA-Seite',
    sources: [
      {
        key: 'file',
        kind: 'DATEI',
        title: 'Angebot_final.pdf',
        meta: 'heute · 14:32 geändert',
        detail: 'Neue Version erkannt. Inhalt gehört zum offenen Kundenvorgang.',
        code: 'context.attach("angebot_final.pdf")',
        confidence: '0.96',
      },
      {
        key: 'calendar',
        kind: 'KALENDER',
        title: 'Kundentermin',
        meta: 'Freitag · 10:30',
        detail: 'Der Termin rückt näher und erhöht die Relevanz des Angebots.',
        code: 'deadline.link("friday_10_30")',
        confidence: '0.91',
      },
      {
        key: 'approval',
        kind: 'OFFEN',
        title: 'Freigabe',
        meta: 'noch ausstehend',
        detail: 'Blockiert den Versand. Ohne Freigabe bleibt der Vorgang offen.',
        code: 'state.blocked_by("approval")',
        confidence: '0.99',
      },
      {
        key: 'history',
        kind: 'VERLAUF',
        title: 'Letzte Rückfrage',
        meta: 'Preisstaffel klären',
        detail: 'Der letzte Gesprächskontext erklärt, was vor dem Termin noch fehlt.',
        code: 'memory.recall("price_tiers")',
        confidence: '0.84',
      },
    ],
  },
  en: {
    back: 'MÔRA',
    eyebrow: 'MÔRA / SIGNAL LAB',
    title: 'Context can be seen.',
    lead: 'Move through the field or tap a signal. This small live simulation shows how MÔRA connects separate states into one shared working context.',
    badge: 'INTERACTIVE DEMO · NO REAL DATA',
    hint: 'Choose a signal · move the field · run trace',
    run: 'Run trace',
    pause: 'Pause trace',
    center: 'MÔRA',
    centerSub: 'connects the working state',
    active: 'ACTIVE SIGNAL',
    confidence: 'CONTEXT WEIGHT',
    terminal: 'CONTEXT TRACE / SIMULATED',
    resultLabel: 'DERIVED NEXT STEP',
    result: 'Check the approval and have the current proposal ready before the meeting.',
    note: 'This view explains the logic. It does not access your data and it does not show invented live metrics.',
    whyEyebrow: 'WHAT IS HAPPENING',
    whyTitle: 'Four signals become one situation.',
    steps: [
      ['01', 'Observe', 'A single signal is focused – for example a changed file or an approaching meeting.'],
      ['02', 'Connect', 'MÔRA relates that signal to the other states already present in the workspace.'],
      ['03', 'Derive', 'The combined context produces an understandable next step. Actions still require permission.'],
    ],
    demo: 'View it in the OS',
    home: 'Back to MÔRA',
    sources: [
      {
        key: 'file',
        kind: 'FILE',
        title: 'Proposal_final.pdf',
        meta: 'today · changed 14:32',
        detail: 'A new version was detected and belongs to the open client case.',
        code: 'context.attach("proposal_final.pdf")',
        confidence: '0.96',
      },
      {
        key: 'calendar',
        kind: 'CALENDAR',
        title: 'Client meeting',
        meta: 'Friday · 10:30',
        detail: 'The meeting is approaching and increases the proposal’s relevance.',
        code: 'deadline.link("friday_10_30")',
        confidence: '0.91',
      },
      {
        key: 'approval',
        kind: 'OPEN',
        title: 'Approval',
        meta: 'still pending',
        detail: 'It blocks sending. Without approval the case remains open.',
        code: 'state.blocked_by("approval")',
        confidence: '0.99',
      },
      {
        key: 'history',
        kind: 'HISTORY',
        title: 'Last question',
        meta: 'clarify price tiers',
        detail: 'The latest conversation explains what is still missing before the meeting.',
        code: 'memory.recall("price_tiers")',
        confidence: '0.84',
      },
    ],
  },
} as const;

const VISUALS = [
  { Icon: FileText, color: '#72dfbd', position: 'left-[4%] top-[13%] sm:left-[8%] sm:top-[15%]' },
  { Icon: CalendarDays, color: '#70c8f4', position: 'right-[4%] top-[16%] sm:right-[8%] sm:top-[18%]' },
  { Icon: CircleCheck, color: '#e8bd62', position: 'left-[5%] bottom-[18%] sm:left-[11%] sm:bottom-[16%]' },
  { Icon: MessageSquareText, color: '#d98db2', position: 'right-[4%] bottom-[16%] sm:right-[10%] sm:bottom-[14%]' },
] as const;

const PATHS = [
  'M 128 112 C 238 108, 322 205, 500 300',
  'M 872 126 C 750 116, 690 215, 500 300',
  'M 142 505 C 260 500, 335 390, 500 300',
  'M 866 500 C 742 500, 672 395, 500 300',
] as const;

export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoTrace, setAutoTrace] = useState(true);

  const moraHref = locale === 'de' ? '/mora' : '/en/mora';
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';

  const sources: Source[] = c.sources.map((source, index) => ({
    ...source,
    ...VISUALS[index],
  }));
  const current = sources[active];

  useEffect(() => {
    if (!autoTrace) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % sources.length);
    }, 1900);
    return () => window.clearInterval(timer);
  }, [autoTrace, sources.length]);

  function moveField(clientX: number, clientY: number) {
    const node = stageRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    node.style.setProperty('--mx', `${x}%`);
    node.style.setProperty('--my', `${y}%`);
    node.style.setProperty('--px', `${(x - 50) / 50}`);
    node.style.setProperty('--py', `${(y - 50) / 50}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050a08] text-[#f5f3e9]">
      <section className="relative border-b border-white/[.07] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(70,194,155,.15),transparent_30%),radial-gradient(circle_at_22%_76%,rgba(112,200,244,.09),transparent_25%),linear-gradient(180deg,#0b2017_0%,#050a08_72%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <Link href={moraHref} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-white/40 transition hover:text-white/75">
            <ArrowLeft className="h-3.5 w-3.5" />{c.back}
          </Link>
          <div className="mt-16 max-w-4xl sm:mt-20">
            <p className="font-mono text-[9px] font-semibold tracking-[.29em] text-[#e5c871]/82">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-[clamp(3.6rem,7.5vw,7.6rem)] font-light leading-[.88] tracking-[-.055em] text-[#fbfaf3]">
              {c.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#dbe8df]/64 sm:text-lg">{c.lead}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 font-mono text-[8px] font-semibold tracking-[.23em] text-[#d9c77f]/70">
              <Radio className="h-3.5 w-3.5 text-[#79e0be]" />{c.badge}
            </div>
            <div className="font-mono text-[7px] tracking-[.18em] text-white/28">{c.hint}</div>
          </div>

          <div
            ref={stageRef}
            onPointerMove={(event) => moveField(event.clientX, event.clientY)}
            className="mora-signal-stage relative min-h-[700px] overflow-hidden rounded-[2rem] border border-white/[.10] bg-[#07110e] shadow-[0_38px_120px_rgba(0,0,0,.36)] sm:min-h-[760px]"
          >
            <div className="mora-grid absolute inset-0" aria-hidden="true" />
            <div className="mora-cursor-glow absolute inset-0" aria-hidden="true" />
            <div className="mora-scanlines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

            <div className="absolute left-5 top-5 z-30 flex items-center gap-3 rounded-full border border-white/[.08] bg-black/20 px-3 py-2 backdrop-blur-md sm:left-7 sm:top-7">
              <span className="h-1.5 w-1.5 rounded-full bg-[#78e1bd] shadow-[0_0_14px_rgba(120,225,189,.95)]" />
              <span className="font-mono text-[7px] tracking-[.22em] text-white/42">SIGNAL FIELD / 04</span>
            </div>

            <button
              type="button"
              onClick={() => setAutoTrace((value) => !value)}
              className="absolute right-5 top-5 z-30 inline-flex h-9 items-center gap-2 rounded-full border border-white/[.10] bg-black/25 px-3 font-mono text-[7px] uppercase tracking-[.16em] text-white/55 backdrop-blur-md transition hover:border-white/25 hover:text-white sm:right-7 sm:top-7"
            >
              {autoTrace ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {autoTrace ? c.pause : c.run}
            </button>

            <svg viewBox="0 0 1000 620" className="pointer-events-none absolute inset-x-0 top-[72px] z-10 h-[500px] w-full sm:top-[76px] sm:h-[560px]" aria-hidden="true">
              <defs>
                <filter id="moraGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="moraCore" cx="38%" cy="30%">
                  <stop offset="0" stopColor="#d9fff1" stopOpacity=".95" />
                  <stop offset=".22" stopColor="#79dfbd" stopOpacity=".72" />
                  <stop offset=".58" stopColor="#23664d" stopOpacity=".62" />
                  <stop offset="1" stopColor="#07110e" stopOpacity="1" />
                </radialGradient>
              </defs>

              <ellipse cx="500" cy="300" rx="210" ry="170" fill="none" stroke="#8bcfb6" strokeOpacity=".08" strokeWidth="1" />
              <ellipse cx="500" cy="300" rx="270" ry="220" fill="none" stroke="#dcbf6d" strokeOpacity=".055" strokeWidth="1" strokeDasharray="4 13" />

              {PATHS.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  fill="none"
                  stroke={index === active ? sources[index].color : '#b9cec5'}
                  strokeOpacity={index === active ? '.88' : '.10'}
                  strokeWidth={index === active ? '2.2' : '1'}
                  strokeDasharray={index === active ? '10 9' : undefined}
                  className={index === active ? 'mora-trace-line' : undefined}
                  filter={index === active ? 'url(#moraGlow)' : undefined}
                />
              ))}

              <circle cx="500" cy="300" r="104" fill="url(#moraCore)" stroke="#d9c779" strokeOpacity=".30" strokeWidth="1" className="mora-core" />
              <circle cx="500" cy="300" r="129" fill="none" stroke={current.color} strokeOpacity=".18" strokeWidth="1" className="mora-orbit" />
              <circle cx="500" cy="300" r="157" fill="none" stroke="#e2c979" strokeOpacity=".09" strokeWidth="1" strokeDasharray="3 11" className="mora-orbit-reverse" />

              <path d="M420 300 C448 266, 472 260, 500 300 S552 334, 580 300" fill="none" stroke={current.color} strokeOpacity=".70" strokeWidth="2.2" className="mora-wave" />
              <circle cx="500" cy="300" r="5" fill="#eafff6" filter="url(#moraGlow)" />
            </svg>

            <div className="absolute left-1/2 top-[294px] z-20 w-[150px] -translate-x-1/2 text-center sm:top-[332px]">
              <span className="mx-auto block h-2 w-2 rounded-full bg-[#effff8] shadow-[0_0_20px_rgba(220,255,242,.95)]" />
              <div className="mt-4 font-mono text-[11px] font-semibold tracking-[.27em] text-[#f2d891]">{c.center}</div>
              <div className="mt-2 text-[10px] leading-4 text-white/34">{c.centerSub}</div>
            </div>

            {sources.map((source, index) => {
              const Icon = source.Icon;
              const selected = index === active;
              return (
                <button
                  key={source.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => { setActive(index); setAutoTrace(false); }}
                  className={`absolute z-30 w-[150px] rounded-2xl border bg-[#0a1712]/90 p-3 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 sm:w-[185px] sm:p-4 ${source.position}`}
                  style={{
                    borderColor: selected ? `${source.color}88` : 'rgba(255,255,255,.09)',
                    boxShadow: selected ? `0 0 0 1px ${source.color}22, 0 18px 45px ${source.color}16` : '0 16px 36px rgba(0,0,0,.18)',
                    transform: selected ? 'translateY(-4px)' : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full border" style={{ color: source.color, borderColor: `${source.color}45`, background: `${source.color}0d` }}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-mono text-[6px] tracking-[.16em] text-white/28">0{index + 1}</span>
                  </div>
                  <div className="mt-3 font-mono text-[7px] tracking-[.19em]" style={{ color: `${source.color}cc` }}>{source.kind}</div>
                  <div className="mt-1 truncate text-[12px] font-medium text-white/78 sm:text-[13px]">{source.title}</div>
                  <div className="mt-1 truncate text-[9px] text-white/32 sm:text-[10px]">{source.meta}</div>
                </button>
              );
            })}

            <div className="absolute inset-x-4 bottom-4 z-30 grid gap-3 sm:inset-x-6 sm:bottom-6 lg:grid-cols-[.9fr_1.1fr]">
              <div className="rounded-2xl border border-white/[.09] bg-[#08130f]/92 p-4 backdrop-blur-xl sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-[7px] tracking-[.2em] text-white/30">{c.active}</div>
                  <div className="font-mono text-[7px] tracking-[.16em]" style={{ color: current.color }}>{c.confidence} · {current.confidence}</div>
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: current.color, boxShadow: `0 0 14px ${current.color}` }} />
                  <div>
                    <div className="text-sm font-semibold text-white/88">{current.title}</div>
                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/44">{current.detail}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[.09] bg-[#020706]/88 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/[.07] px-4 py-2.5">
                  <span className="font-mono text-[7px] tracking-[.2em] text-[#78e0bd]/55">{c.terminal}</span>
                  <span className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#d98db2]/60" /><i className="h-1.5 w-1.5 rounded-full bg-[#e8bd62]/60" /><i className="h-1.5 w-1.5 rounded-full bg-[#72dfbd]/60" /></span>
                </div>
                <div className="space-y-1.5 px-4 py-3 font-mono text-[9px] leading-5 sm:text-[10px]">
                  <div className="text-white/25">$ mora.trace --source {current.key}</div>
                  <div style={{ color: current.color }}>→ {current.code}</div>
                  <div className="text-[#70c8f4]/62">→ relation.scan(4 signals)</div>
                  <div className="text-[#e8bd62]/66">→ next_step.score({current.confidence})</div>
                  <div className="mora-terminal-caret text-white/38">→ ready_</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-white/[.08] bg-[#07110e] p-5 sm:p-6 md:grid-cols-[.72fr_1.28fr] md:items-center">
            <div className="font-mono text-[8px] tracking-[.22em] text-[#e5c871]/60">{c.resultLabel}</div>
            <div>
              <p className="font-serif text-2xl font-light leading-tight text-[#f6f2e8] sm:text-3xl">{c.result}</p>
              <p className="mt-3 text-xs leading-5 text-white/30">{c.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#08150f] px-5 py-20 sm:px-8 md:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#7dddbd]/68">{c.whyEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/94 sm:text-6xl">{c.whyTitle}</h2>
          <div className="mt-10 border-t border-white/[.10]">
            {c.steps.map(([number, title, body]) => (
              <article key={number} className="grid gap-4 border-b border-white/[.08] py-7 sm:grid-cols-[56px_.65fr_1.35fr] sm:gap-8">
                <span className="font-mono text-[9px] tracking-[.18em] text-[#e2c474]/46">{number}</span>
                <h3 className="text-xl font-medium text-white/86">{title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/48 sm:text-base">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={securityHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#eef1e4] px-6 py-3 text-sm font-bold text-[#102219] transition hover:bg-white">
              {c.demo}<ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={moraHref} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white/64 transition hover:border-white/26 hover:text-white">
              {c.home}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .mora-signal-stage { --mx: 50%; --my: 50%; --px: 0; --py: 0; }
        .mora-grid {
          background-image:
            linear-gradient(rgba(120,225,189,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,225,189,.035) 1px, transparent 1px),
            radial-gradient(circle at 50% 45%, rgba(56,143,106,.10), transparent 42%);
          background-size: 34px 34px, 34px 34px, auto;
          transform: translate(calc(var(--px) * -4px), calc(var(--py) * -4px)) scale(1.015);
          transition: transform 120ms ease-out;
        }
        .mora-cursor-glow {
          background: radial-gradient(circle 220px at var(--mx) var(--my), rgba(112,200,244,.12), rgba(114,223,189,.045) 42%, transparent 72%);
        }
        .mora-scanlines {
          background: repeating-linear-gradient(180deg, transparent 0 4px, rgba(255,255,255,.018) 5px, transparent 6px);
          mix-blend-mode: screen;
        }
        .mora-trace-line { animation: moraTrace 1.25s linear infinite; }
        .mora-core { animation: moraBreathe 4.8s ease-in-out infinite; transform-origin: 500px 300px; }
        .mora-orbit { animation: moraOrbit 13s linear infinite; transform-origin: 500px 300px; }
        .mora-orbit-reverse { animation: moraOrbitReverse 20s linear infinite; transform-origin: 500px 300px; }
        .mora-wave { animation: moraWave 2.1s ease-in-out infinite; transform-origin: 500px 300px; }
        .mora-terminal-caret { animation: moraBlink .9s steps(1,end) infinite; }
        @keyframes moraTrace { to { stroke-dashoffset: -38; } }
        @keyframes moraBreathe { 0%,100% { transform: scale(.985); opacity:.88 } 50% { transform: scale(1.035); opacity:1 } }
        @keyframes moraOrbit { to { transform: rotate(360deg); } }
        @keyframes moraOrbitReverse { to { transform: rotate(-360deg); } }
        @keyframes moraWave { 0%,100% { transform: scaleX(.88); opacity:.45 } 50% { transform: scaleX(1.08); opacity:1 } }
        @keyframes moraBlink { 0%,55% { opacity:1 } 56%,100% { opacity:.12 } }
        @media (prefers-reduced-motion: reduce) {
          .mora-trace-line,.mora-core,.mora-orbit,.mora-orbit-reverse,.mora-wave,.mora-terminal-caret { animation: none !important; }
          .mora-grid { transition: none; }
        }
      `}</style>
    </main>
  );
}
