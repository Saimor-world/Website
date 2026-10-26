'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, MoveHorizontal } from 'lucide-react';
import MoraWaterGuide from './MoraWaterGuide';
import styles from './MoraPerspective.module.css';

const COPY = {
  de: {
    waiting: 'Durch MÔRAs Augen', title: 'Klarheit.', light: 'Licht hereinlassen',
    next: 'MÔRA im OS entdecken', explore: 'Die Lichtung erkunden', hint: 'Berühre die Sterne im Wasser.',
    instructions: 'Bewege die Maus oder streiche über das Wasser: Sterne und Mycelium leuchten auf. Mit den Pfeiltasten kannst du dich ebenfalls umsehen.',
    eyebrow: 'MÔRA / SAIMÔR OS · PRODUKTVORSCHAU',
    arrival: 'Klarheit beginnt mit Zusammenhang.',
    lead: 'Aus einzelnen Spuren wird ein Ort, an dem du dich orientieren kannst. Dafür steht diese Lichtung als Vorschau: Im Saimôr OS hält MÔRA Dateien, Termine und offene Dinge im Kontext deiner Arbeit zusammen.',
    chapters: [
      ['Dateien, Termine, offene Dinge', 'MÔRA arbeitet mit dem Stand, der im OS vorhanden ist. Eigene Daten kommen über Quellen hinzu, die du ausdrücklich verbindest.'],
      ['Veränderungen einordnen', 'Was ist neu, was hängt zusammen? MÔRA kann neue Informationen aus verbundenen Quellen in den bisherigen Arbeitskontext einordnen.'],
      ['Du entscheidest, was passiert', 'Aus dem Zusammenhang kann MÔRA nächste Schritte vorbereiten. Aktionen brauchen die passenden Freigaben.'],
    ],
    emerging: 'Was zusammengehört, wird sichtbar.', rest: 'Lichtung genießen', reopen: 'MÔRA kennenlernen',
  },
  en: {
    waiting: 'Through MÔRA’s eyes', title: 'Clarity.', light: 'Let the light in',
    next: 'Discover MÔRA in the OS', explore: 'Explore the clearing', hint: 'Touch the stars in the water.',
    instructions: 'Move the pointer or swipe across the water: stars and mycelium light up. You can also look around with the arrow keys.',
    eyebrow: 'MÔRA / SAIMÔR OS · PRODUCT PREVIEW',
    arrival: 'Clarity begins with context.',
    lead: 'Separate traces become a place where you can find your bearings. That is what this clearing stands for as a preview: in Saimôr OS, MÔRA keeps files, meetings and open work together in your working context.',
    chapters: [
      ['Files, meetings and open work', 'MÔRA works with the state available in the OS. Your own data comes through sources you explicitly connect.'],
      ['Making sense of change', 'What is new, and what belongs together? MÔRA can relate new information from connected sources to the existing working context.'],
      ['You decide what happens', 'From that context MÔRA can prepare next steps. Actions require the appropriate permissions.'],
    ],
    emerging: 'What belongs together comes into view.', rest: 'Enjoy the clearing', reopen: 'Get to know MÔRA',
  },
} as const;

/** The atmosphere leads into an honest introduction and a concrete product path. */
export default function MoraPerspective({ locale, morning, onLight, onLook, still, onChapter }: {
  locale: 'de' | 'en'; morning: boolean; onLight: () => void;
  onLook: (x: number, y: number) => void; still: boolean;
  onChapter?: (chapter: number) => void;
}) {
  const c = COPY[locale];
  const heading = useRef<HTMLHeadingElement>(null);
  const infoHeading = useRef<HTMLHeadingElement>(null);
  const reopen = useRef<HTMLButtonElement>(null);
  const focusRequested = useRef(false);
  const gaze = useRef({ x: 0, y: 0 });
  const [infoVisible, setInfoVisible] = useState(false);
  const [chapter, setChapter] = useState(-1);
  const activate = (index: number) => { setChapter(index); onChapter?.(index); };
  useEffect(() => () => onChapter?.(-1), [onChapter]);
  useEffect(() => {
    // Let WebKit finish the pointer-up default before restoring scene focus.
    const frame = window.requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [morning]);
  useEffect(() => {
    if (!focusRequested.current) return;
    (infoVisible ? infoHeading.current : reopen.current)?.focus({ preventScroll: true });
    focusRequested.current = false;
  }, [infoVisible]);
  const showInfo = (show: boolean) => { focusRequested.current = true; setInfoVisible(show); if (!show) activate(-1); };
  const look = (x: number, y: number) => {
    if (still) return;
    gaze.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    onLook(gaze.current.x, gaze.current.y);
  };
  return (
    <div className={styles.perspective} data-testid="deep-clarity" data-morning={morning} data-info={morning && infoVisible}>
      {morning && <MoraWaterGuide locale={locale} chapter={chapter} still={still} label={infoVisible ? 'MÔRA' : c.reopen}
        onActivate={() => showInfo(true)} buttonRef={reopen} interactive={!infoVisible} />}
      <h1 ref={heading} tabIndex={-1} className={styles.unspoken}>{morning ? c.title : c.waiting}</h1>
      <p id="clearing-instructions" className={styles.unspoken}>{c.instructions}</p>
      <div className={styles.explore} role="region" tabIndex={0} aria-label={c.explore} aria-describedby="clearing-instructions"
        onPointerMove={event => {
          const bounds = event.currentTarget.getBoundingClientRect();
          look((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
        }}
        onPointerLeave={() => { if (!still) { gaze.current = { x: 0, y: 0 }; onLook(0, 0); } }}
        onKeyDown={event => {
          if (still) return;
          const direction = { ArrowLeft: [-.35, 0], ArrowRight: [.35, 0], ArrowUp: [0, -.35], ArrowDown: [0, .35] }[event.key];
          if (direction) { event.preventDefault(); look(gaze.current.x + direction[0], gaze.current.y + direction[1]); }
          if (event.key === 'Home') { event.preventDefault(); gaze.current = { x: 0, y: 0 }; onLook(0, 0); }
        }} />
      <div className={styles.veil} data-testid="clearing-veil" aria-hidden="true" />
      {!morning && <p className={styles.emerging}>{c.emerging}</p>}
      {morning && infoVisible ? <article className={styles.story} aria-labelledby="clearing-mora-title">
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h2 id="clearing-mora-title" ref={infoHeading} tabIndex={-1}>{c.arrival}</h2>
        <p className={styles.lead}>{c.lead}</p>
        <div className={styles.chapters}>{c.chapters.map(([title, text], index) => <details key={title} data-active={chapter === index}
          onPointerEnter={() => activate(index)} onPointerLeave={() => activate(-1)}
          onFocus={() => activate(index)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) activate(-1); }}
          onToggle={event => activate(event.currentTarget.open ? index : -1)}>
          <summary><span className={styles.chapterNumber}>0{index + 1}</span><span>{title}</span><ChevronDown size={14} aria-hidden="true" /></summary><p>{text}</p>
        </details>)}</div>
        <Link className={styles.guide} href={`${locale === 'de' ? '/mora' : '/en/mora'}#im-os`}>
          <span>{c.next}</span><ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button type="button" className={styles.rest} onClick={() => showInfo(false)}>{c.rest}<MoveHorizontal size={14} aria-hidden="true" /></button>
      </article> : null}
      {!morning ? <div className={styles.action}>
        {<button type="button" className={styles.quiet}
            // The automatic dawn can remove this button between pointer down and up.
            // Keep focus on the scene rather than a control that is about to disappear.
            onPointerDown={event => event.preventDefault()}
            onClick={() => { onLight(); heading.current?.focus({ preventScroll: true }); }}>{c.light}</button>}
      </div> : null}
    </div>
  );
}
