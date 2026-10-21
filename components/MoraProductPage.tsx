'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, CircleCheck, FileText, Pause, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { DemoLaunchButton } from '@/components/DemoLaunchButton';
import AmbientParticleField from './AmbientParticleField';
import MoraCharacter, { type MoraMood } from './MoraCharacter';
import MoraCompanion from './MoraCompanion';
import styles from './MoraProductPage.module.css';

type Props = { locale: 'de' | 'en'; embedded?: boolean };

const COPY = {
  de: {
    eyebrow: 'MÔRA / SAIMÔR OS · PRODUKTVORSCHAU',
    title: 'Sie hält den Faden.',
    lead: 'Dateien, Termine und offene Dinge bleiben zusammen. MÔRA kennt den Stand und kann dort weitermachen.',
    mobileLead: 'Wissen, Termine und nächste Schritte. MÔRA hält den Zusammenhang.',
    note: 'Aufmerksam, wenn du sie brauchst. Zurückhaltend, wenn du im Fluss bist.',
    demo: 'MÔRA im OS erleben',
    deep: 'Deep View öffnen',
    mapLabel: 'ARBEITSKONTEXT',
    file: 'Dateien',
    calendar: 'Termine',
    open: 'Offene Dinge',
    personaEyebrow: 'WER MÔRA IST',
    personaTitle: 'Eine eigene Art, an deiner Seite zu sein.',
    personaText: 'MÔRA ist der Jadestein im Saimôr-Zeichen. Ihre Adern stehen für die Verbindungen zwischen Wissen und Arbeit. Ihr Blick zeigt, ob sie zuhört, nachdenkt oder etwas mitteilen möchte. Du gibst die Richtung vor.',
    statesLabel: 'Zustand wählen',
    states: [
      ['rest', 'Ruht', 'Nichts Neues. MÔRA hält den Stand und bleibt still.'],
      ['dream', 'Träumt', 'MÔRA ordnet, was passiert ist: verbindet nur mit Grund und verwirft Rauschen.'],
      ['speak', 'Spricht', 'MÔRA bringt einen Gedanken auf den Punkt und macht den nächsten Schritt nachvollziehbar.'],
      ['listen', 'Hört zu', 'Du gibst den Gedanken vor. MÔRA bleibt aufmerksam und hält den Zusammenhang.'],
    ] as [MoraMood, string, string][],
    greeting: 'Hallo. Ich bin MÔRA.',
    characterLine: 'Ich behalte den Zusammenhang im Blick.',
    sample: 'EIN BEISPIEL · KEINE LIVE-DATEN',
    contextHint: 'Wähle einen Zusammenhang.',
    contexts: [
      ['Die aktuelle Fassung.', 'Die Rückfrage gehört zum Angebot. Beides bleibt zusammen, bevor du weiterarbeitest.'],
      ['Mit Kontext in den Termin.', 'Zum Gespräch am Freitag gehören das Angebot und die noch offene Rückfrage.'],
      ['Ein klarer nächster Schritt.', 'Die Freigabe fehlt noch. Erst prüfen, dann das Angebot vor dem Termin bereitstellen.'],
    ],
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
    deepTitle: 'Die Welt durch MÔRAs Augen.',
    deepText: 'Vom Nebel in eine Lichtung. Begegne MÔRA, sieh durch ihre Augen und entdecke, wie aus vorhandenem Kontext Orientierung für die Arbeit werden kann.',
    deepCta: 'MÔRA begegnen',
    osEyebrow: 'SAIMÔR OS',
    osTitle: 'MÔRA gehört in den Arbeitsraum.',
    osText: 'Im Demo-Raum kannst du die Rolle von MÔRA im OS ansehen. Der Demo-Tenant bleibt getrennt; eigene Daten kommen erst über ausdrücklich verbundene Quellen hinzu.',
    security: 'Mit eigener Domain starten',
    realityEyebrow: 'HEUTIGER STAND',
    realityTitle: 'Klare Grenzen statt Magie.',
    realityText: 'MÔRA kann nur mit Kontext arbeiten, der im System vorhanden oder verbunden ist. Für Sprach- und Denkaufgaben können unterschiedliche externe Modellanbieter genutzt werden; MÔRA selbst ist nicht das Modell. Aktionen laufen über freigegebene Fähigkeiten und sollen sichtbar bleiben.',
  },
  en: {
    eyebrow: 'MÔRA / SAIMÔR OS · PRODUCT PREVIEW',
    title: 'She keeps the thread.',
    lead: 'Files, meetings and open work stay together. MÔRA keeps the state and can continue from there.',
    mobileLead: 'Knowledge, meetings and next steps. MÔRA keeps the context together.',
    note: 'Attentive when you need her. Quiet when you are in your flow.',
    demo: 'Experience MÔRA in the OS',
    deep: 'Open Deep View',
    mapLabel: 'WORK CONTEXT',
    file: 'Files',
    calendar: 'Meetings',
    open: 'Open work',
    personaEyebrow: 'WHO MÔRA IS',
    personaTitle: 'Her own way of being by your side.',
    personaText: 'MÔRA is the jade stone in the Saimôr sign. Her veins represent the connections between knowledge and work. Her expression shows when she is listening, thinking or sharing something. You set the direction.',
    statesLabel: 'Choose a state',
    states: [
      ['rest', 'Resting', 'Nothing new. MÔRA keeps the state and stays quiet.'],
      ['dream', 'Dreaming', 'MÔRA sorts what happened: connects only with a reason and drops noise.'],
      ['speak', 'Speaking', 'MÔRA puts a thought into words and makes the next step understandable.'],
      ['listen', 'Listening', 'You bring the thought. MÔRA stays attentive and keeps the context together.'],
    ] as [MoraMood, string, string][],
    greeting: 'Hello. I’m MÔRA.',
    characterLine: 'I keep the context in view.',
    sample: 'AN EXAMPLE · NO LIVE DATA',
    contextHint: 'Choose a connection.',
    contexts: [
      ['The current version.', 'The question belongs with the proposal. Both stay together before you continue.'],
      ['Context for the meeting.', 'Friday’s conversation connects to the proposal and the remaining question.'],
      ['A clear next step.', 'Approval is still pending. Check it first, then prepare the proposal before the meeting.'],
    ],
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
    deepTitle: 'The world through MÔRA’s eyes.',
    deepText: 'From mist into a clearing. Meet MÔRA, see through her eyes and discover how existing context can become orientation for your work.',
    deepCta: 'Meet MÔRA',
    osEyebrow: 'SAIMÔR OS',
    osTitle: 'MÔRA belongs inside the workspace.',
    osText: 'The demo workspace lets you see MÔRA inside the OS. The demo tenant stays isolated; your own data only appears through sources you explicitly connect.',
    security: 'Start with your own domain',
    realityEyebrow: 'CURRENT STATE',
    realityTitle: 'Clear boundaries instead of magic.',
    realityText: 'MÔRA can only work with context that exists in the system or is connected to it. Different external model providers may be used for language and reasoning; MÔRA itself is not the model. Actions run through approved capabilities and are intended to remain visible.',
  },
};

export default function MoraProductPage({ locale, embedded = false }: Props) {
  const Title = embedded ? 'h2' : 'h1';
  const c = COPY[locale];
  const [orbState, setOrbState] = useState<MoraMood>('rest');
  const [context, setContext] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    visibility(); document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  const still = paused || hidden;
  const deepHref = `${locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'}?from=mora`;
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const activeState = c.states.find(([key]) => key === orbState) ?? c.states[0];

  return (
    <div className={styles.page} data-testid="mora-product" data-paused={still}>
      <section className={styles.hero} aria-labelledby="mora-title">
        <div className={styles.heroAtmosphere} aria-hidden="true" />
        <AmbientParticleField paused={still} />
        <div className={styles.heroGrid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <Title id="mora-title">{c.title}</Title>
            <p className={styles.lead}><span className={styles.desktopLead}>{c.lead}</span><span className={styles.mobileLead}>{c.mobileLead}</span></p>
            <p className={styles.note}>{c.note}</p>
            <div className={styles.actions}>
              <DemoLaunchButton locale={locale} label={c.demo} className={styles.primary} />
              <Link href={deepHref} className={styles.secondary}><Sparkles size={16} />{c.deep}</Link>
            </div>
            <button type="button" className={styles.motion} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
              {paused ? <Play size={13} /> : <Pause size={13} />}
              {locale === 'de' ? paused ? 'Bewegung fortsetzen' : 'Bewegung pausieren' : paused ? 'Resume motion' : 'Pause motion'}
            </button>
          </div>
          <div className={styles.presence}>
            <p className={styles.hello}>{c.greeting}</p>
            <div className={styles.contextMap} role="group" aria-label={c.contextHint}>
              <div className={styles.orbit} aria-hidden="true" />
              <div className={styles.characterStage}>
                <MoraCharacter size={300} state={orbState} paused={still} priority className={styles.heroCharacter} />
              </div>
              <ContextNode active={context === 0} onClick={() => { setContext(0); setOrbState('dream'); }} className={styles.files} icon={<FileText size={15} />} label={c.file} />
              <ContextNode active={context === 1} onClick={() => { setContext(1); setOrbState('listen'); }} className={styles.calendar} icon={<CalendarDays size={15} />} label={c.calendar} />
              <ContextNode active={context === 2} onClick={() => { setContext(2); setOrbState('speak'); }} className={styles.openWork} icon={<CircleCheck size={15} />} label={c.open} />
            </div>
            <p className={styles.characterLine}>{c.characterLine}</p>
            <div className={styles.contextReadout} aria-live="polite" data-testid="mora-context-preview">
              <span>{c.sample}</span>
              <h2>{c.contexts[context][0]}</h2>
              <p>{c.contexts[context][1]}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="persona" className="relative scroll-mt-24 overflow-hidden border-b border-white/[.07] bg-[#06100c] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(79,169,131,.12),transparent_32%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid place-items-center">
            <MoraCharacter size={280} state={orbState} paused={still} className={styles.personaCharacter} />
          </div>
          <div>
            <p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#e0bd67]/85">{c.personaEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl">{c.personaTitle}</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#dce9e0]/80 sm:text-base">{c.personaText}</p>
            <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label={c.statesLabel}>
              {c.states.map(([key, label]) => (
                <button key={key} type="button" aria-pressed={orbState === key} onClick={() => setOrbState(key)} className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold transition ${orbState === key ? 'border-[#e0c878]/60 bg-[#e0c878]/10 text-[#f5e6b8]' : 'border-white/12 text-white/75 hover:border-white/26 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-5 max-w-xl border-l border-[#dfc775]/45 pl-5 text-sm leading-6 text-white/75" aria-live="polite">{activeState[2]}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#91dcc4]/80">{c.sectionEyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl md:text-7xl">{c.sectionTitle}</h2>
          <div className="mt-12 border-t border-white/[.11]">
            {c.roles.map(([title, body], index) => (
              <article key={title} className="grid gap-4 border-b border-white/[.09] py-7 sm:grid-cols-[48px_.72fr_1.28fr] sm:items-start sm:gap-8">
                <div className="font-mono text-[12px] tracking-[.14em] text-[#d8c27d]/60">0{index + 1}</div>
                <h3 className="text-xl font-medium text-white/90 sm:text-2xl">{title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.08] bg-[#0b1c15] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div>
            <p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#e0bd67]/85">{c.exampleEyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl">{c.exampleTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/80 sm:text-base">{c.exampleBody}</p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#b8d4c5]/12 bg-[#07130e]/78 p-6 shadow-[0_28px_90px_rgba(0,0,0,.22)] sm:p-8">
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#4d9676]/10 blur-3xl" aria-hidden="true" />
            <div className="grid gap-3 sm:grid-cols-2">
              {c.chips.map((chip, index) => <div key={chip} className="border-b border-white/[.08] px-1 py-4 text-sm text-white/70"><span className="mr-3 font-mono text-[12px] tracking-[.12em] text-[#d8c27d]/65">0{index + 1}</span>{chip}</div>)}
            </div>
            <div className="mt-7 flex items-start gap-4 border-l border-[#dfc775]/45 pl-5">
              <MoraCharacter size={40} state="speak" paused={still} className="mt-1 shrink-0" />
              <div>
                <div className="font-mono text-[12px] tracking-[.16em] text-[#dfc775]/80">{c.outcomeLabel}</div>
                <p className="mt-3 max-w-xl font-serif text-2xl leading-tight text-[#f5f1e4] sm:text-3xl">{c.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="deep-view" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(104,190,155,.12),transparent_26%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[.82fr_1.18fr] md:items-center">
          <div>
            <p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#e0bd67]/85">{c.deepEyebrow}</p>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[.92] tracking-[-.045em] sm:text-7xl">{c.deepTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/80 sm:text-base">{c.deepText}</p>
            <Link href={deepHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]">{c.deepCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <Link href={deepHref} className="relative grid h-[330px] place-items-center overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0a1812] transition hover:border-[#d8c27d]/30 sm:h-[430px]" aria-label={c.deepCta}>
            <AmbientParticleField paused={still} />
            <MoraCharacter size={120} state="listen" paused={still} />
          </Link>
        </div>
      </section>

      {!embedded && (<section id="im-os" className="scroll-mt-24 border-t border-white/[.08] bg-[#06100c] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div><p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#91dcc4]/80">{c.osEyebrow}</p><h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-[.96] tracking-[-.04em] sm:text-6xl">{c.osTitle}</h2></div>
          <div><p className="max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{c.osText}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><DemoLaunchButton locale={locale} label={c.demo} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#eef1e4] px-6 py-3 text-sm font-bold text-[#102219] transition hover:bg-white disabled:opacity-60" /><Link href={securityHref} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/72 transition hover:border-white/28 hover:text-white"><ShieldCheck className="h-4 w-4" />{c.security}</Link></div></div>
        </div>
      </section>)}

      <section className="border-t border-white/[.08] bg-[#040806] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.65fr_1.35fr]">
          <div><p className="font-mono text-[12px] font-semibold tracking-[.18em] text-white/80">{c.realityEyebrow}</p><h2 className="mt-4 font-serif text-3xl font-light text-white/90 sm:text-4xl">{c.realityTitle}</h2></div>
          <p className="max-w-3xl text-sm leading-7 text-white/80 sm:text-base">{c.realityText}</p>
        </div>
      </section>
      <MoraCompanion locale={locale} paused={still} />
    </div>
  );
}

function ContextNode({ className, icon, label, active, onClick }: { className: string; icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button type="button" className={`${styles.contextNode} ${className}`} aria-pressed={active} onClick={onClick}>
    {icon}<span>{label}</span>
  </button>;
}
