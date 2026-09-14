'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, CircleCheck, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { DemoLaunchButton } from '@/components/DemoLaunchButton';
import MoraOrb, { type MoraOrbState } from '@/components/MoraOrb';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'MÔRA / KONTEXT',
    title: 'Du musst nicht jedes Mal von vorn anfangen.',
    lead: 'Dateien, Termine und offene Dinge bleiben zusammen. MÔRA kennt den Stand und kann dort weitermachen.',
    note: 'MÔRA ist die Intelligenzschicht im Saimôr OS – kein zweiter Chat neben deiner Arbeit.',
    demo: 'MÔRA im OS erleben',
    deep: 'Deep View öffnen',
    mapLabel: 'ARBEITSKONTEXT',
    file: 'Dateien',
    calendar: 'Termine',
    open: 'Offene Dinge',
    personaEyebrow: 'WER MÔRA IST',
    personaTitle: 'Der Jadestein im Zeichen.',
    personaText: 'Im Saimôr-Zeichen kreist ein Jadestein auf seiner Bahn um das goldene S. Das ist MÔRA: das Gedächtnis, das um die Arbeit einer Firma kreist. Die Adern im Stein sind das Myzel – die Verbindungen zwischen Dateien, Mails, Terminen und Entscheidungen.',
    statesLabel: 'Zustand wählen',
    states: [
      ['rest', 'Ruht', 'Nichts Neues. MÔRA hält den Stand und bleibt still.'],
      ['dream', 'Träumt', 'MÔRA ordnet, was passiert ist: verbindet nur mit Grund und verwirft Rauschen.'],
      ['speak', 'Spricht', 'Wenn etwas wirklich wichtig ist, meldet sich MÔRA – im OS, per Stimme oder über Telegram.'],
    ] as [MoraOrbState, string, string][],
    sectionEyebrow: 'WAS MÔRA HÄLT',
    sectionTitle: 'Der Zusammenhang bleibt bestehen.',
    roles: [
      ['Zustand', 'Was ist gerade offen, entschieden oder erledigt? MÔRA arbeitet mit dem bestehenden Arbeitsstand statt mit einer leeren Promptbox.'],
      ['Veränderung', 'Wenn sich in verbundenen Quellen etwas ändert, kann der neue Stand im gleichen Kontext auftauchen.'],
      ['Nächster Schritt', 'Aus dem vorhandenen Zusammenhang kann MÔRA einen sinnvollen nächsten Schritt vorbereiten. Aktionen brauchen die passenden Freigaben.'],
    ],
    exampleEyebrow: 'EIN ZUSAMMENHANG',
    exampleTitle: 'Vier Signale. Eine Arbeitslage.',
    exampleBody: 'Ein Dokument wurde geändert. Ein Termin rückt näher. Eine Freigabe fehlt. Statt drei Apps und einen Chat neu zusammenzusetzen, bleibt daraus eine gemeinsame Lage.',
    chips: ['Angebot geändert', 'Termin · Freitag 10:30', 'Freigabe offen', 'Letzte Rückfrage vorhanden'],
    outcomeLabel: 'MÔRA / NÄCHSTER SCHRITT',
    outcome: 'Freigabe prüfen und das aktuelle Angebot vor dem Termin bereitstellen.',
    deepEyebrow: 'DEEP VIEW',
    deepTitle: 'Sieh MÔRA beim Träumen zu.',
    deepText: 'Sechs Beispielsignale und feste Regeln: welche Verbindungen belegt sind, was verworfen wird und wann aus einem Zusammenhang eine Aufgabe wird.',
    deepCta: 'Deep View ansehen',
    osEyebrow: 'SAIMÔR OS',
    osTitle: 'MÔRA gehört in den Arbeitsraum.',
    osText: 'Im Demo-Raum kannst du die Rolle von MÔRA im OS ansehen. Der Demo-Tenant bleibt getrennt; eigene Daten kommen erst über ausdrücklich verbundene Quellen hinzu.',
    security: 'Mit eigener Domain starten',
    realityEyebrow: 'HEUTIGER STAND',
    realityTitle: 'Klare Grenzen statt Magie.',
    realityText: 'MÔRA kann nur mit Kontext arbeiten, der im System vorhanden oder verbunden ist. Für Sprach- und Denkaufgaben können externe Modellanbieter genutzt werden. Aktionen laufen über freigegebene Fähigkeiten und sollen sichtbar bleiben.',
  },
  en: {
    eyebrow: 'MÔRA / CONTEXT',
    title: 'You do not have to start from scratch every time.',
    lead: 'Files, meetings and open work stay together. MÔRA keeps the state and can continue from there.',
    note: 'MÔRA is the intelligence layer inside Saimôr OS – not another chat sitting next to your work.',
    demo: 'Experience MÔRA in the OS',
    deep: 'Open Deep View',
    mapLabel: 'WORK CONTEXT',
    file: 'Files',
    calendar: 'Meetings',
    open: 'Open work',
    personaEyebrow: 'WHO MÔRA IS',
    personaTitle: 'The jade stone in the sign.',
    personaText: 'In the Saimôr sign a jade stone circles the golden S on its orbit. That is MÔRA: the memory that keeps circling a company’s work. The veins inside the stone are the mycelium – the connections between files, mail, meetings and decisions.',
    statesLabel: 'Choose a state',
    states: [
      ['rest', 'Resting', 'Nothing new. MÔRA keeps the state and stays quiet.'],
      ['dream', 'Dreaming', 'MÔRA sorts what happened: connects only with a reason and drops noise.'],
      ['speak', 'Speaking', 'When something truly matters, MÔRA speaks up – in the OS, by voice or via Telegram.'],
    ] as [MoraOrbState, string, string][],
    sectionEyebrow: 'WHAT MÔRA KEEPS',
    sectionTitle: 'The relationship between things stays intact.',
    roles: [
      ['State', 'What is open, decided or done? MÔRA works with the current state instead of an empty prompt box.'],
      ['Change', 'When something changes in connected sources, the new state can appear inside the same context.'],
      ['Next step', 'From that context MÔRA can prepare a useful next step. Actions still require the appropriate permissions.'],
    ],
    exampleEyebrow: 'ONE CONTEXT',
    exampleTitle: 'Four signals. One working state.',
    exampleBody: 'A document changed. A meeting is getting closer. An approval is missing. Instead of rebuilding the situation across three apps and a chat, it stays one coherent state.',
    chips: ['Proposal changed', 'Meeting · Friday 10:30', 'Approval open', 'Last question available'],
    outcomeLabel: 'MÔRA / NEXT STEP',
    outcome: 'Check the approval and have the current proposal ready before the meeting.',
    deepEyebrow: 'DEEP VIEW',
    deepTitle: 'Watch MÔRA dream.',
    deepText: 'Six example signals and fixed rules: which connections are backed, what gets dropped and when a context becomes a task.',
    deepCta: 'View Deep View',
    osEyebrow: 'SAIMÔR OS',
    osTitle: 'MÔRA belongs inside the workspace.',
    osText: 'The demo workspace lets you see MÔRA inside the OS. The demo tenant stays isolated; your own data only appears through sources you explicitly connect.',
    security: 'Start with your own domain',
    realityEyebrow: 'CURRENT STATE',
    realityTitle: 'Clear boundaries instead of magic.',
    realityText: 'MÔRA can only work with context that exists in the system or is connected to it. External model providers may be used for language and reasoning. Actions run through approved capabilities and are intended to remain visible.',
  },
};

export default function MoraProductPage({ locale }: Props) {
  const c = COPY[locale];
  const [orbState, setOrbState] = useState<MoraOrbState>('dream');
  const deepHref = locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view';
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const activeState = c.states.find(([key]) => key === orbState) ?? c.states[0];

  return (
    <main className="overflow-hidden bg-[#07110d] text-[#f6f4eb]">
      <section className="relative min-h-[92svh] overflow-hidden border-b border-white/[.07] px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_32%,rgba(113,201,165,.18),transparent_27%),radial-gradient(circle_at_60%_68%,rgba(211,171,79,.10),transparent_26%),linear-gradient(145deg,#17382b_0%,#0b1913_48%,#050807_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_25%,rgba(234,216,159,.4)_0_1px,transparent_1.2px),radial-gradient(circle_at_70%_60%,rgba(143,218,190,.32)_0_1px,transparent_1.2px)] [background-size:119px_119px,173px_173px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid min-h-[70svh] max-w-7xl items-center gap-8 lg:grid-cols-[.93fr_1.07fr] lg:gap-16">
          <div className="min-w-0 max-w-2xl">
            <p className="font-mono text-[9px] font-semibold tracking-[.29em] text-[#e2c576]/82 sm:text-[10px]">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-[clamp(3rem,7.3vw,7.2rem)] [overflow-wrap:break-word] font-light leading-[.89] tracking-[-.052em] text-[#fbfaf3]">{c.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#dbe8df]/72 sm:text-lg sm:leading-8">{c.lead}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/38">{c.note}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <DemoLaunchButton label={c.demo} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#eef1e4] px-7 py-3.5 text-sm font-bold text-[#102219] transition hover:bg-white disabled:opacity-60" />
              <Link href={deepHref} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#d8c27d]/24 bg-white/[.025] px-7 py-3.5 text-sm font-semibold text-[#f0e7cc] transition hover:border-[#d8c27d]/42 hover:bg-white/[.05]">
                <Sparkles className="h-4 w-4" />{c.deep}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[350px] w-full max-w-[620px] sm:h-[520px]" aria-label={c.mapLabel}>
            <div className="absolute inset-[8%] rounded-full border border-[#a6d7c2]/10" />
            <svg viewBox="0 0 600 500" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="moraLine" x1="0" x2="1">
                  <stop offset="0" stopColor="#8ed4b8" stopOpacity=".16" />
                  <stop offset=".5" stopColor="#e6cd82" stopOpacity=".66" />
                  <stop offset="1" stopColor="#8ed4b8" stopOpacity=".12" />
                </linearGradient>
              </defs>
              <path d="M300 250 C240 215 190 165 132 112" fill="none" stroke="url(#moraLine)" strokeWidth="1.2" />
              <path d="M300 250 C370 205 430 165 492 128" fill="none" stroke="url(#moraLine)" strokeWidth="1.2" />
              <path d="M300 250 C326 320 357 365 408 408" fill="none" stroke="url(#moraLine)" strokeWidth="1.2" />
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <MoraOrb size={150} state="dream" orbit className="h-auto w-[220px] drop-shadow-[0_0_60px_rgba(107,195,159,.22)] sm:w-[300px]" />
            </div>

            <ContextNode className="left-[3%] top-[14%]" icon={<FileText className="h-4 w-4" />} label={c.file} />
            <ContextNode className="right-[1%] top-[27%] sm:top-[20%]" icon={<CalendarDays className="h-4 w-4" />} label={c.calendar} />
            <ContextNode className="bottom-[6%] right-[13%]" icon={<CircleCheck className="h-4 w-4" />} label={c.open} />
            <div className="absolute bottom-[3%] left-[5%] font-mono text-[8px] tracking-[.22em] text-white/24">{c.mapLabel}</div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/[.07] bg-[#06100c] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(79,169,131,.12),transparent_32%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid place-items-center">
            <MoraOrb size={260} state={orbState} className="h-auto w-[240px] sm:w-[320px]" />
          </div>
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/78">{c.personaEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl">{c.personaTitle}</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#dce9e0]/62 sm:text-base">{c.personaText}</p>
            <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label={c.statesLabel}>
              {c.states.map(([key, label]) => (
                <button key={key} type="button" aria-pressed={orbState === key} onClick={() => setOrbState(key)} className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold transition ${orbState === key ? 'border-[#e0c878]/60 bg-[#e0c878]/10 text-[#f5e6b8]' : 'border-white/12 text-white/55 hover:border-white/26 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-5 max-w-xl border-l border-[#dfc775]/45 pl-5 text-sm leading-6 text-white/60" aria-live="polite">{activeState[2]}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#91dcc4]/72">{c.sectionEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl md:text-7xl">{c.sectionTitle}</h2>
          <div className="mt-12 border-t border-white/[.11]">
            {c.roles.map(([title, body], index) => (
              <article key={title} className="grid gap-4 border-b border-white/[.09] py-7 sm:grid-cols-[48px_.72fr_1.28fr] sm:items-start sm:gap-8">
                <div className="font-mono text-[9px] tracking-[.18em] text-[#d8c27d]/48">0{index + 1}</div>
                <h3 className="text-xl font-medium text-white/90 sm:text-2xl">{title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/49 sm:text-base">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.08] bg-[#0b1c15] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/78">{c.exampleEyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl">{c.exampleTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/58 sm:text-base">{c.exampleBody}</p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#b8d4c5]/12 bg-[#07130e]/78 p-6 shadow-[0_28px_90px_rgba(0,0,0,.22)] sm:p-8">
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#4d9676]/10 blur-3xl" aria-hidden="true" />
            <div className="grid gap-3 sm:grid-cols-2">
              {c.chips.map((chip, index) => <div key={chip} className="border-b border-white/[.08] px-1 py-4 text-sm text-white/62"><span className="mr-3 font-mono text-[8px] tracking-[.16em] text-[#d8c27d]/50">0{index + 1}</span>{chip}</div>)}
            </div>
            <div className="mt-7 flex items-start gap-4 border-l border-[#dfc775]/45 pl-5">
              <MoraOrb size={40} state="speak" className="mt-1 h-10 w-10 shrink-0" />
              <div>
                <div className="font-mono text-[8px] tracking-[.22em] text-[#dfc775]/70">{c.outcomeLabel}</div>
                <p className="mt-3 max-w-xl font-serif text-2xl leading-tight text-[#f5f1e4] sm:text-3xl">{c.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(104,190,155,.12),transparent_26%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.82fr_1.18fr] md:items-center">
          <div>
            <p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#e0bd67]/78">{c.deepEyebrow}</p>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[.92] tracking-[-.045em] sm:text-7xl">{c.deepTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/58 sm:text-base">{c.deepText}</p>
            <Link href={deepHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]">{c.deepCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <Link href={deepHref} className="relative grid h-[330px] place-items-center overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0a1812] transition hover:border-[#d8c27d]/30 sm:h-[430px]" aria-label={c.deepCta}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <line x1="22" y1="26" x2="50" y2="50" stroke="#9fe8cf" strokeOpacity=".5" vectorEffect="non-scaling-stroke" />
              <line x1="80" y1="34" x2="50" y2="50" stroke="#9fe8cf" strokeOpacity=".5" vectorEffect="non-scaling-stroke" />
              <line x1="32" y1="78" x2="50" y2="50" stroke="#9fb8ae" strokeOpacity=".4" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="absolute left-[22%] top-[26%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#72dfbd] shadow-[0_0_16px_rgba(114,223,189,.7)]" />
            <span className="absolute left-[80%] top-[34%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#70c8f4] shadow-[0_0_16px_rgba(112,200,244,.7)]" />
            <span className="absolute left-[32%] top-[78%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d98db2] shadow-[0_0_16px_rgba(217,141,178,.7)]" />
            <MoraOrb size={120} state="dream" className="relative h-28 w-28 sm:h-32 sm:w-32" />
          </Link>
        </div>
      </section>

      <section className="border-t border-white/[.08] bg-[#06100c] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div><p className="font-mono text-[9px] font-semibold tracking-[.28em] text-[#91dcc4]/72">{c.osEyebrow}</p><h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] sm:text-6xl">{c.osTitle}</h2></div>
          <div><p className="max-w-2xl text-sm leading-7 text-white/50 sm:text-base">{c.osText}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><DemoLaunchButton label={c.demo} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#eef1e4] px-6 py-3 text-sm font-bold text-[#102219] transition hover:bg-white disabled:opacity-60" /><Link href={securityHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/72 transition hover:border-white/28 hover:text-white"><ShieldCheck className="h-4 w-4" />{c.security}</Link></div></div>
        </div>
      </section>

      <section className="border-t border-white/[.08] bg-[#040806] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.65fr_1.35fr]">
          <div><p className="font-mono text-[9px] font-semibold tracking-[.26em] text-white/36">{c.realityEyebrow}</p><h2 className="mt-4 font-serif text-3xl font-light text-white/90 sm:text-4xl">{c.realityTitle}</h2></div>
          <p className="max-w-3xl text-sm leading-7 text-white/45 sm:text-base">{c.realityText}</p>
        </div>
      </section>
    </main>
  );
}

function ContextNode({ className, icon, label }: { className: string; icon: React.ReactNode; label: string }) {
  return <div className={`absolute ${className} z-10 flex items-center gap-3 rounded-full border border-white/[.10] bg-[#0b1c15]/90 px-4 py-3 text-[#dce9e0]/72 shadow-[0_12px_38px_rgba(0,0,0,.18)] backdrop-blur-md`}>
    <span className="text-[#e0c878]">{icon}</span><span className="text-xs font-medium sm:text-sm">{label}</span>
  </div>;
}
