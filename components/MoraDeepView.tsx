'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Play, RotateCcw, Sparkles, X } from 'lucide-react';
import MoraOrb from '@/components/MoraOrb';
import { dream, type DreamOperation, type LinkReason, type RejectReason, type SignalKey, type TaskKey } from '@/lib/deep-view-dream';

type Props = { locale: 'de' | 'en' };
type TaskStage = 'proposed' | 'accepted' | 'done';
type SignalCopy = { title: string; meta: string };

type Copy = {
  back: string;
  eyebrow: string;
  title: string;
  lead: string;
  badge: string;
  fieldLabel: string;
  play: string;
  reset: string;
  selected: (count: number) => string;
  hint: string;
  moraResting: string;
  moraDreaming: string;
  signals: Record<SignalKey, SignalCopy>;
  protocolTitle: string;
  protocolEmpty: string;
  evidence: { gesetzt: string; geraten: string };
  linkReasons: Record<LinkReason, string>;
  rejectReasons: Record<RejectReason, string>;
  drop: { noise: (title: string) => string; repeat: (title: string) => string };
  rejectedPrefix: string;
  constellationLabel: string;
  constellationName: string;
  constellation: (count: number) => string;
  taskProposed: (title: string) => string;
  taskTitle: string;
  taskEmpty: string;
  tasks: Record<TaskKey, string>;
  due: string;
  stages: Record<TaskStage, { label: string; text: string; action: string }>;
  dismiss: string;
  note: string;
  legendBacked: string;
  legendGuessed: string;
  legendRejected: string;
  whyEyebrow: string;
  whyTitle: string;
  steps: [string, string, string][];
  demo: string;
  home: string;
};

const COPY: Record<'de' | 'en', Copy> = {
  de: {
    back: 'MÔRA',
    eyebrow: 'MÔRA / DEEP VIEW',
    title: 'Aus Signalen wird ein Bild.',
    lead: 'Tippe an, was heute passiert ist. MÔRA träumt darüber: verbindet nur mit Grund, verwirft Rauschen und schlägt höchstens eine Aufgabe vor.',
    badge: 'INTERAKTIVE DEMO · BEISPIELDATEN · FESTE REGELN',
    fieldLabel: 'STERNENFELD',
    play: 'Traum abspielen',
    reset: 'Zurücksetzen',
    selected: (count) => (count === 1 ? '1 Signal' : `${count} Signale`),
    hint: 'Tippe Sterne an – oder spiel den Traum ab.',
    moraResting: 'MÔRA ruht',
    moraDreaming: 'MÔRA träumt',
    signals: {
      offer: { title: 'Angebot_final.pdf', meta: 'Datei · heute 14:32' },
      mail: { title: 'Rückfrage Lindner', meta: 'Mail · Preisstaffel?' },
      meeting: { title: 'Kundentermin', meta: 'Termin · Freitag 10:30' },
      approval: { title: 'Freigabe Angebot', meta: 'Offen · ausstehend' },
      nightwatch: { title: 'Status OK ×14', meta: 'Nightwatch' },
      newsletter: { title: 'Newsletter', meta: 'Mail · Werbung' },
    },
    protocolTitle: 'TRAUMPROTOKOLL',
    protocolEmpty: 'Noch nichts geträumt.',
    evidence: { gesetzt: 'belegt', geraten: 'vermutet' },
    linkReasons: {
      meetingNamesOffer: 'der Termin nennt das Angebot',
      mailRepliesOffer: 'die Mail antwortet auf das Angebot',
      approvalBlocksOffer: 'die Freigabe gehört zu diesem Angebot',
      sameCustomer: 'gleicher Kunde, kein direkter Bezug',
    },
    rejectReasons: {
      noSource: 'nur ein gleiches Wort',
      unrelated: 'kein Zusammenhang',
    },
    drop: {
      noise: (title) => `${title} verworfen – Rauschen.`,
      repeat: (title) => `${title} gefaltet und verworfen – wiederholte Maschinenmeldung.`,
    },
    rejectedPrefix: 'Abgelehnt',
    constellationLabel: 'KONSTELLATION',
    constellationName: 'Angebot Lindner',
    constellation: (count) => `Konstellation „Angebot Lindner“ aus ${count} Sternen.`,
    taskProposed: (title) => `Aufgabe vorgeschlagen: ${title}.`,
    taskTitle: 'AUFGABE',
    taskEmpty: 'Keine Aufgabe. MÔRA schlägt nur etwas vor, wenn Sterne wirklich zusammengehören.',
    tasks: {
      prepareOffer: 'Angebot vor dem Termin bereitstellen',
      clarifyTiers: 'Preisstaffel klären, bevor das Angebot rausgeht',
      getApproval: 'Freigabe einholen – sie blockiert das Angebot',
    },
    due: 'bis Freitag 10:30',
    stages: {
      proposed: { label: 'STERNSCHNUPPE', text: 'Ein Vorschlag. Er gehört noch niemandem.', action: 'Annehmen' },
      accepted: { label: 'MOND', text: 'Angenommen. Die Aufgabe kreist um ihre Konstellation, bis sie erledigt ist.', action: 'Erledigt' },
      done: { label: 'STERN', text: 'Erledigt. Sie bleibt als Stern im Gedächtnis – mit ihren Quellen.', action: '' },
    },
    dismiss: 'Verwerfen',
    note: 'Beispieldaten und feste Regeln – so arbeitet der Traum. Im OS prüft CORE jede Entscheidung von MÔRA gegen dieselben Regeln, bevor sich etwas ändert.',
    legendBacked: 'belegt',
    legendGuessed: 'vermutet',
    legendRejected: 'abgelehnt',
    whyEyebrow: 'WAS HIER PASSIERT',
    whyTitle: 'Wenig, aber richtig.',
    steps: [
      ['01', 'Signale', 'Rohes aus Dateien, Mails, Terminen und Nightwatch. Wiederholtes und Rauschen wird verworfen, nicht gespeichert.'],
      ['02', 'Traum', 'MÔRA verbindet nur mit Grund. Belegte Verbindungen sind durchgezogen, Vermutungen gestrichelt – und bleiben als Vermutung erkennbar.'],
      ['03', 'Aufgabe', 'Höchstens ein Vorschlag, als Sternschnuppe. Nimmt ein Mensch ihn an, wird er zum Mond; erledigt wird er zum Stern.'],
    ],
    demo: 'Im OS ansehen',
    home: 'Zur MÔRA-Seite',
  },
  en: {
    back: 'MÔRA',
    eyebrow: 'MÔRA / DEEP VIEW',
    title: 'Signals become a picture.',
    lead: 'Tap what happened today. MÔRA dreams over it: connects only with a reason, drops noise and proposes at most one task.',
    badge: 'INTERACTIVE DEMO · EXAMPLE DATA · FIXED RULES',
    fieldLabel: 'STAR FIELD',
    play: 'Play the dream',
    reset: 'Reset',
    selected: (count) => (count === 1 ? '1 signal' : `${count} signals`),
    hint: 'Tap stars – or play the dream.',
    moraResting: 'MÔRA is resting',
    moraDreaming: 'MÔRA is dreaming',
    signals: {
      offer: { title: 'Proposal_final.pdf', meta: 'File · today 14:32' },
      mail: { title: 'Question from Lindner', meta: 'Mail · price tiers?' },
      meeting: { title: 'Client meeting', meta: 'Meeting · Friday 10:30' },
      approval: { title: 'Proposal approval', meta: 'Open · pending' },
      nightwatch: { title: 'Status OK ×14', meta: 'Nightwatch' },
      newsletter: { title: 'Newsletter', meta: 'Mail · promotion' },
    },
    protocolTitle: 'DREAM LOG',
    protocolEmpty: 'Nothing dreamt yet.',
    evidence: { gesetzt: 'backed', geraten: 'guessed' },
    linkReasons: {
      meetingNamesOffer: 'the meeting names the proposal',
      mailRepliesOffer: 'the mail replies to the proposal',
      approvalBlocksOffer: 'the approval belongs to this proposal',
      sameCustomer: 'same client, no direct reference',
    },
    rejectReasons: {
      noSource: 'only a shared word',
      unrelated: 'no connection',
    },
    drop: {
      noise: (title) => `${title} dropped – noise.`,
      repeat: (title) => `${title} folded and dropped – repeated machine message.`,
    },
    rejectedPrefix: 'Rejected',
    constellationLabel: 'CONSTELLATION',
    constellationName: 'Proposal Lindner',
    constellation: (count) => `Constellation “Proposal Lindner” from ${count} stars.`,
    taskProposed: (title) => `Task proposed: ${title}.`,
    taskTitle: 'TASK',
    taskEmpty: 'No task. MÔRA only proposes something when stars really belong together.',
    tasks: {
      prepareOffer: 'Have the proposal ready before the meeting',
      clarifyTiers: 'Clarify price tiers before the proposal goes out',
      getApproval: 'Get the approval – it blocks the proposal',
    },
    due: 'by Friday 10:30',
    stages: {
      proposed: { label: 'SHOOTING STAR', text: 'A proposal. It belongs to no one yet.', action: 'Accept' },
      accepted: { label: 'MOON', text: 'Accepted. The task orbits its constellation until it is done.', action: 'Done' },
      done: { label: 'STAR', text: 'Done. It stays in memory as a star – with its sources.', action: '' },
    },
    dismiss: 'Dismiss',
    note: 'Example data and fixed rules – this is how the dream works. In the OS, CORE checks every decision MÔRA makes against the same rules before anything changes.',
    legendBacked: 'backed',
    legendGuessed: 'guessed',
    legendRejected: 'rejected',
    whyEyebrow: 'WHAT IS HAPPENING',
    whyTitle: 'Little, but right.',
    steps: [
      ['01', 'Signals', 'Raw input from files, mail, meetings and Nightwatch. Repeats and noise are dropped, not stored.'],
      ['02', 'Dream', 'MÔRA connects only with a reason. Backed connections are solid, guesses dashed – and they stay recognisable as guesses.'],
      ['03', 'Task', 'At most one proposal, as a shooting star. Once a person accepts it, it becomes a moon; done, it becomes a star.'],
    ],
    demo: 'View it in the OS',
    home: 'Back to MÔRA',
  },
};

// Star anchors in % of the field. Spread so that labels (below each dot) never touch lines or each other.
const FIELD: Record<SignalKey, { x: number; y: number; color: string }> = {
  newsletter: { x: 14, y: 16, color: '#8a9590' },
  meeting: { x: 74, y: 18, color: '#70c8f4' },
  offer: { x: 44, y: 40, color: '#72dfbd' },
  mail: { x: 20, y: 66, color: '#d98db2' },
  approval: { x: 70, y: 62, color: '#e8bd62' },
  nightwatch: { x: 88, y: 84, color: '#9aa7a1' },
};

const PLAY_ORDER: SignalKey[] = ['newsletter', 'offer', 'meeting', 'nightwatch', 'mail', 'approval'];
const DOT = 16; // px; the dot centre is exactly on the anchor

function centroid(stars: SignalKey[]) {
  const x = stars.reduce((sum, key) => sum + FIELD[key].x, 0) / stars.length;
  const y = stars.reduce((sum, key) => sum + FIELD[key].y, 0) / stars.length;
  return { x, y };
}

function hullPoints(stars: SignalKey[]) {
  const center = centroid(stars);
  return [...stars]
    .sort((a, b) => Math.atan2(FIELD[a].y - center.y, FIELD[a].x - center.x) - Math.atan2(FIELD[b].y - center.y, FIELD[b].x - center.x))
    .map((key) => `${FIELD[key].x},${FIELD[key].y}`)
    .join(' ');
}

export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const [selected, setSelected] = useState<SignalKey[]>([]);
  const [taskStage, setTaskStage] = useState<TaskStage>('proposed');
  const [dismissed, setDismissed] = useState<TaskKey | null>(null);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<number[]>([]);

  const result = useMemo(() => dream(selected), [selected]);
  const task = result.task && result.task.key !== dismissed ? result.task : null;
  const taskKey = task?.key ?? null;

  useEffect(() => {
    setTaskStage('proposed');
  }, [taskKey]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const moraHref = locale === 'de' ? '/mora' : '/en/mora';
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const title = (key: SignalKey) => c.signals[key].title;

  function stopPlaying() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setPlaying(false);
  }

  function toggle(key: SignalKey) {
    stopPlaying();
    setDismissed(null);
    setSelected((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
  }

  function reset() {
    stopPlaying();
    setSelected([]);
    setDismissed(null);
  }

  function play() {
    reset();
    setPlaying(true);
    PLAY_ORDER.forEach((key, index) => {
      const id = window.setTimeout(() => {
        setSelected((current) => (current.includes(key) ? current : [...current, key]));
        if (index === PLAY_ORDER.length - 1) setPlaying(false);
      }, 450 + index * 850);
      timers.current.push(id);
    });
  }

  function describe(op: DreamOperation) {
    switch (op.kind) {
      case 'drop':
        return { ok: true, text: c.drop[op.reason](title(op.signal)) };
      case 'link':
        return { ok: true, text: `${title(op.a)} ↔ ${title(op.b)} – ${c.linkReasons[op.reason]}.`, tag: c.evidence[op.evidence] };
      case 'rejected':
        return { ok: false, text: `${c.rejectedPrefix}: ${title(op.a)} ↔ ${title(op.b)} – ${c.rejectReasons[op.reason]}.` };
      case 'constellation':
        return { ok: true, text: c.constellation(op.stars.length) };
      case 'task':
        return { ok: true, text: c.taskProposed(c.tasks[op.task]) };
    }
  }

  const stars = result.constellation;
  const center = stars ? centroid(stars) : null;
  const dreaming = playing || selected.length > 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#050a08] text-[#f5f3e9]">
      <section className="relative border-b border-white/[.07] px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(70,194,155,.15),transparent_30%),radial-gradient(circle_at_22%_76%,rgba(112,200,244,.09),transparent_25%),linear-gradient(180deg,#0b2017_0%,#050a08_72%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <Link href={moraHref} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-white/40 transition hover:text-white/75">
            <ArrowLeft className="h-3.5 w-3.5" />{c.back}
          </Link>
          <div className="mt-12 max-w-4xl sm:mt-16">
            <p className="font-mono text-[9px] font-semibold tracking-[.29em] text-[#e5c871]/82">{c.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[clamp(2.8rem,11vw,6.6rem)] font-light leading-[.92] tracking-[-.05em] text-[#fbfaf3]">{c.title}</h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#dbe8df]/64 sm:text-lg sm:leading-8">{c.lead}</p>
          </div>
        </div>
      </section>

      <section className="px-3 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 font-mono text-[8px] font-semibold tracking-[.2em] text-[#d9c77f]/70">{c.badge}</div>

          <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
            {/* Star field */}
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[.10] bg-[#07110e] shadow-[0_30px_90px_rgba(0,0,0,.36)]">
              <div className="dv-grid absolute inset-0" aria-hidden="true" />

              <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[.07] px-4 py-3">
                <div className="flex items-center gap-3">
                  <MoraOrb size={34} state={dreaming ? 'dream' : 'rest'} label="MÔRA" />
                  <div>
                    <div className="font-mono text-[8px] tracking-[.22em] text-white/42">{c.fieldLabel} · {c.selected(selected.length)}</div>
                    <div className="mt-0.5 text-[11px] text-[#9fe8cf]/80">{dreaming ? c.moraDreaming : c.moraResting}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={play} disabled={playing} className="inline-flex h-9 items-center gap-2 rounded-full border border-white/[.14] bg-black/25 px-3 font-mono text-[8px] uppercase tracking-[.16em] text-white/75 transition hover:border-white/30 hover:text-white disabled:opacity-40">
                    <Play className="h-3 w-3" />{c.play}
                  </button>
                  <button type="button" onClick={reset} className="inline-flex h-9 items-center gap-2 rounded-full border border-white/[.14] bg-black/25 px-3 font-mono text-[8px] uppercase tracking-[.16em] text-white/60 transition hover:border-white/30 hover:text-white">
                    <RotateCcw className="h-3 w-3" /><span className="sr-only sm:not-sr-only">{c.reset}</span>
                  </button>
                </div>
              </div>

              <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]" role="group" aria-label={c.fieldLabel}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  {stars && stars.length >= 3 && (
                    <polygon points={hullPoints(stars)} fill="#e5c871" fillOpacity=".045" stroke="#e5c871" strokeOpacity=".28" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" className="dv-fade" />
                  )}
                  {result.rejected.map((link) => (
                    <line key={`x-${link.a}-${link.b}`} x1={FIELD[link.a].x} y1={FIELD[link.a].y} x2={FIELD[link.b].x} y2={FIELD[link.b].y} stroke="#e07a7a" strokeOpacity=".28" strokeWidth={1} strokeDasharray="2 8" vectorEffect="non-scaling-stroke" className="dv-fade" />
                  ))}
                  {result.links.map((link) => (
                    <line key={`${link.a}-${link.b}`} x1={FIELD[link.a].x} y1={FIELD[link.a].y} x2={FIELD[link.b].x} y2={FIELD[link.b].y} stroke={link.evidence === 'gesetzt' ? '#9fe8cf' : '#b7c9c1'} strokeOpacity={link.evidence === 'gesetzt' ? '.9' : '.55'} strokeWidth={link.evidence === 'gesetzt' ? 2 : 1.4} strokeDasharray={link.evidence === 'gesetzt' ? undefined : '7 6'} vectorEffect="non-scaling-stroke" className="dv-fade" />
                  ))}
                </svg>

                {task && center && taskStage === 'proposed' && (
                  <div className="pointer-events-none absolute z-20 h-0 w-0" style={{ left: `${center.x}%`, top: `${center.y}%` }} aria-hidden="true">
                    <span className="dv-shoot absolute block h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent to-[#fff6d8]" />
                  </div>
                )}
                {task && center && taskStage === 'accepted' && (
                  <div className="pointer-events-none absolute z-20 h-0 w-0" style={{ left: `${center.x}%`, top: `${center.y}%` }} aria-hidden="true">
                    <div className="dv-orbit h-0 w-0">
                      <span className="absolute block h-3 w-3 rounded-full bg-[#ece7d2] shadow-[0_0_14px_rgba(236,231,210,.8)]" style={{ left: 44, top: -6 }} />
                    </div>
                  </div>
                )}
                {task && center && taskStage === 'done' && (
                  <div className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 dv-fade" style={{ left: `${center.x}%`, top: `${center.y}%` }} aria-hidden="true">
                    <span className="block h-3.5 w-3.5 rotate-45 bg-[#f2d891] shadow-[0_0_22px_rgba(242,216,145,.95)]" />
                  </div>
                )}

                {(Object.keys(FIELD) as SignalKey[]).map((key) => {
                  const signal = c.signals[key];
                  const position = FIELD[key];
                  const isSelected = selected.includes(key);
                  const isDropped = result.dropped.includes(key);
                  const inConstellation = stars?.includes(key) ?? false;
                  const dotSize = inConstellation ? DOT : isSelected ? DOT - 2 : DOT - 6;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={signal.title}
                      onClick={() => toggle(key)}
                      className="group absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9fe8cf]/60"
                      style={{ left: `${position.x}%`, top: `${position.y}%`, width: 36, height: 36 }}
                    >
                      {/* dot: its centre is exactly the anchor, so lines meet it */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                        style={{
                          width: dotSize,
                          height: dotSize,
                          background: isSelected && !isDropped ? position.color : 'transparent',
                          border: `1.5px solid ${isDropped ? '#6b7672' : position.color}`,
                          boxShadow: isSelected && !isDropped ? `0 0 ${inConstellation ? 22 : 12}px ${position.color}` : 'none',
                          opacity: isDropped ? 0.5 : 1,
                        }}
                      />
                      {/* label below the dot, never on a line anchor */}
                      <span className="pointer-events-none absolute left-1/2 top-[30px] w-max max-w-[150px] -translate-x-1/2 text-center">
                        <span className={`block text-[12px] font-medium leading-tight transition-colors ${isDropped ? 'text-white/30 line-through' : isSelected ? 'text-white/90' : 'text-white/60 group-hover:text-white/85'}`}>{signal.title}</span>
                        {!isDropped && <span className="mt-0.5 block text-[10px] leading-tight text-white/34">{signal.meta}</span>}
                      </span>
                    </button>
                  );
                })}

                {stars && (
                  <div className="dv-fade absolute bottom-3 left-3 z-40 rounded-full border border-[#e5c871]/25 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                    <span className="font-mono text-[8px] tracking-[.2em] text-[#e5c871]/70">{c.constellationLabel}</span>
                    <span className="ml-2 text-[12px] text-[#f2e3b3]">{c.constellationName}</span>
                  </div>
                )}
                {selected.length === 0 && (
                  <div className="pointer-events-none absolute bottom-3 left-3 z-40 text-[12px] text-white/40">{c.hint}</div>
                )}
              </div>

              <div className="relative flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/[.07] px-4 py-2.5 font-mono text-[8px] uppercase tracking-[.16em] text-white/40">
                <span className="inline-flex items-center gap-2"><span className="inline-block h-[2px] w-5 bg-[#9fe8cf]" />{c.legendBacked}</span>
                <span className="inline-flex items-center gap-2"><span className="inline-block h-0 w-5 border-t border-dashed border-[#b7c9c1]" />{c.legendGuessed}</span>
                <span className="inline-flex items-center gap-2"><span className="inline-block h-0 w-5 border-t border-dotted border-[#e07a7a]/70" />{c.legendRejected}</span>
              </div>
            </div>

            {/* Task first, then the dream log */}
            <div className="grid content-start gap-4">
              <div className="rounded-[1.4rem] border border-white/[.09] bg-[#08130f] p-5">
                <div className="font-mono text-[8px] tracking-[.22em] text-[#e5c871]/65">{c.taskTitle}</div>
                {task ? (
                  <div className="mt-3">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[.2em] text-[#f2d891]"><Sparkles className="h-3 w-3" />{c.stages[taskStage].label}</div>
                    <p className="mt-2 break-words font-serif text-[1.35rem] font-light leading-snug text-[#f6f2e8]">{c.tasks[task.key]}</p>
                    {task.due && <p className="mt-1 text-xs text-white/40">{c.due}</p>}
                    <p className="mt-2 text-[13px] leading-5 text-white/50">{c.stages[taskStage].text}</p>
                    {taskStage !== 'done' && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button type="button" onClick={() => setTaskStage(taskStage === 'proposed' ? 'accepted' : 'done')} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#eef1e4] px-5 text-sm font-bold text-[#102219] transition hover:bg-white">
                          {c.stages[taskStage].action}
                        </button>
                        {taskStage === 'proposed' && (
                          <button type="button" onClick={() => setDismissed(task.key)} className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/12 px-5 text-sm font-semibold text-white/60 transition hover:border-white/26 hover:text-white">
                            {c.dismiss}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-white/40">{c.taskEmpty}</p>
                )}
              </div>

              <div className="rounded-[1.4rem] border border-white/[.09] bg-[#08130f] p-5">
                <div className="font-mono text-[8px] tracking-[.22em] text-[#78e0bd]/60">{c.protocolTitle}</div>
                {result.operations.length === 0 ? (
                  <p className="mt-3 text-sm leading-6 text-white/40">{c.protocolEmpty}</p>
                ) : (
                  <ol className="mt-3 space-y-2" aria-live="polite">
                    {result.operations.map((op, index) => {
                      const entry = describe(op);
                      return (
                        <li key={`${op.kind}-${index}`} className="dv-fade flex items-start gap-2.5 text-[12.5px] leading-5">
                          <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${entry.ok ? 'bg-[#72dfbd]/15 text-[#8fe6c9]' : 'bg-[#e07a7a]/15 text-[#eaa0a0]'}`}>
                            {entry.ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
                          </span>
                          <span className={entry.ok ? 'text-white/70' : 'text-white/42'}>
                            {entry.text}
                            {entry.tag && <span className="ml-2 whitespace-nowrap rounded-full border border-white/[.12] px-1.5 py-px font-mono text-[8px] uppercase tracking-[.12em] text-white/50">{entry.tag}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>

              <p className="px-1 text-xs leading-5 text-white/32">{c.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#08150f] px-5 py-16 pb-24 sm:px-8 md:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#7dddbd]/68">{c.whyEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/94 sm:text-6xl">{c.whyTitle}</h2>
          <div className="mt-10 border-t border-white/[.10]">
            {c.steps.map(([number, heading, body]) => (
              <article key={number} className="grid gap-4 border-b border-white/[.08] py-7 sm:grid-cols-[56px_.65fr_1.35fr] sm:gap-8">
                <span className="font-mono text-[9px] tracking-[.18em] text-[#e2c474]/46">{number}</span>
                <h3 className="text-xl font-medium text-white/86">{heading}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/48 sm:text-base">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={securityHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#eef1e4] px-6 py-3 text-sm font-bold text-[#102219] transition hover:bg-white">{c.demo}<ArrowRight className="h-4 w-4" /></Link>
            <Link href={moraHref} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white/64 transition hover:border-white/26 hover:text-white">{c.home}</Link>
          </div>
        </div>
      </section>

      <style>{`
        .dv-grid{background-image:linear-gradient(rgba(120,225,189,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(120,225,189,.028) 1px,transparent 1px),radial-gradient(circle at 45% 45%,rgba(56,143,106,.12),transparent 55%);background-size:34px 34px,34px 34px,auto}
        .dv-fade{animation:dvFade .5s ease both}
        .dv-orbit{animation:dvOrbit 7s linear infinite}
        .dv-shoot{animation:dvShoot 2.4s cubic-bezier(.2,.7,.2,1) infinite;transform-origin:right center}
        @keyframes dvFade{from{opacity:0}to{opacity:1}}
        @keyframes dvOrbit{to{transform:rotate(360deg)}}
        @keyframes dvShoot{0%{opacity:0;transform:translate(60px,-70px) rotate(-40deg)}25%{opacity:1}70%{opacity:1;transform:translate(-64px,-4px) rotate(-40deg)}100%{opacity:0;transform:translate(-64px,-4px) rotate(-40deg)}}
        @media(prefers-reduced-motion:reduce){.dv-fade,.dv-orbit,.dv-shoot{animation:none!important}}
      `}</style>
    </main>
  );
}
