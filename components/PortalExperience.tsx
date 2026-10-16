'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, FileText, Sparkles, X } from 'lucide-react';
import styles from './PortalExperience.module.css';

type Locale = 'de' | 'en';
type ThreadKey = 'file' | 'meeting' | 'decision';
const items = [
  { key: 'file', icon: FileText, index: '01' },
  { key: 'meeting', icon: CalendarDays, index: '02' },
  { key: 'decision', icon: CheckCircle2, index: '03' },
] as const;

const copy = {
  de: {
    invite: 'Portal betreten',
    cinemaEyebrow: 'JENSEITS DER SCHWELLE',
    cinemaTitle: 'Was bleibt, kommt mit.',
    cinemaContinue: 'Dem Faden folgen',
    cinemaBack: 'Zurück in den Wald',
    close: 'Zurück in den Wald',
    back: 'Zurück',
    next: 'Nächster Zusammenhang',
    enter: 'Ein Blick hinter die Schwelle',
    concept: 'PRINZIPDARSTELLUNG · KEINE VERBUNDENEN LIVE-DATEN',
    heading: 'Drinnen beginnt der Zusammenhang nicht von vorn.',
    description: 'Ein Projekt. Drei Spuren. Nicht drei neue Anfänge. Was draußen in einzelnen Werkzeugen liegt, begegnet sich hier in einem gemeinsamen Arbeitsraum.',
    thread: 'EIN GEMEINSAMER FADEN',
    source: 'WAS BLEIBT',
    details: {
      file: {
        title: 'Das Briefing',
        subtitle: 'Ein Dokument kommt dazu.',
        annotation: 'Die Grundlage',
        paragraph: 'Eine Datei bringt Fragen und Entscheidungen mit. Im verbundenen Arbeitsraum bleibt nachvollziehbar, zu welcher Besprechung sie gehört.',
        outcome: 'Quelle und Projektbezug bleiben sichtbar.',
      },
      meeting: {
        title: 'Das Gespräch',
        subtitle: 'Der Kontext reist mit.',
        annotation: 'Die Verbindung',
        paragraph: 'Der Termin beginnt nicht bei null. Das Briefing gehört weiter dazu – und aus dem Gespräch entsteht eine offene Entscheidung.',
        outcome: 'Besprechung, Dokument und nächste Schritte gehören zusammen.',
      },
      decision: {
        title: 'Der nächste Schritt',
        subtitle: 'Nichts verschwindet im Chat.',
        annotation: 'Die Kontinuität',
        paragraph: 'Was noch offen ist, bleibt beim selben Vorgang. MÔRA kann Zusammenhänge aufzeigen; Handlungen setzen passende Quellen und Freigaben voraus.',
        outcome: 'Eine offene Frage behält ihren Ursprung.',
      },
    },
    objectLabels: { file: 'Briefing', meeting: 'Termin', decision: 'Entscheidung' },
    mora: 'MÔRA hält den Faden',
    moraText: 'Versteht die Verbindung · zeigt Quellen · achtet auf Freigaben',
    explore: 'Mehr über MÔRA erfahren',
  },
  en: {
    invite: 'Enter the portal',
    cinemaEyebrow: 'BEYOND THE THRESHOLD',
    cinemaTitle: 'What matters stays with you.',
    cinemaContinue: 'Follow the thread',
    cinemaBack: 'Return to the forest',
    close: 'Back to the forest',
    back: 'Back',
    next: 'Next connection',
    enter: 'A look beyond the threshold',
    concept: 'CONCEPT ONLY · NO CONNECTED LIVE DATA',
    heading: 'Inside, context does not start over.',
    description: 'One project. Three threads. Not three fresh starts. What lives in separate tools outside comes together in a shared workspace here.',
    thread: 'ONE CONTINUOUS THREAD',
    source: 'WHAT STAYS',
    details: {
      file: {
        title: 'The brief',
        subtitle: 'A document joins the story.',
        annotation: 'The starting point',
        paragraph: 'A file carries questions and decisions with it. In a connected workspace you can trace which conversation it belongs to.',
        outcome: 'Source and project context remain visible.',
      },
      meeting: {
        title: 'The conversation',
        subtitle: 'Context comes along.',
        annotation: 'The connection',
        paragraph: 'The meeting does not start from zero. The brief still belongs to it, and a pending decision comes out of the conversation.',
        outcome: 'Meeting, document and next steps stay together.',
      },
      decision: {
        title: 'The next step',
        subtitle: 'Nothing disappears into chat.',
        annotation: 'Continuity',
        paragraph: 'What remains unfinished stays connected to the same work. MÔRA can surface links; actions require appropriate sources and approvals.',
        outcome: 'An open question keeps its origin.',
      },
    },
    objectLabels: { file: 'Brief', meeting: 'Meeting', decision: 'Decision' },
    mora: 'MÔRA keeps the thread',
    moraText: 'Shows connections · reveals sources · respects approval',
    explore: 'Explore MÔRA',
  },
} as const;

export default function PortalExperience({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [entered, setEntered] = useState(false);
  const [stage, setStage] = useState<'atmosphere' | 'explain'>('atmosphere');
  const [current, setCurrent] = useState<ThreadKey>('file');
  const order: ThreadKey[] = ['file', 'meeting', 'decision'];
  const active = c.details[current];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (entered && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!entered && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [entered]);

  function enter() {
    setCurrent('file');
    setStage('atmosphere');
    setEntered(true);
  }
  function exit() {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    setEntered(false);
  }
  function advance() {
    setCurrent(order[(order.indexOf(current) + 1) % order.length]);
  }

  return (
    <div className={styles.root}>
      <div className={styles.forestThreshold}>
        {/* The full forest AND doorway are a single photograph supplied by
            SystemWorldHome. This is a transparent interaction hotspot only:
            no second bitmap, no drawn portal, no rectangular compositing. */}
        <button type="button" className={styles.door} onClick={enter} aria-haspopup="dialog" aria-label={c.invite} />
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        data-stage={stage}
        aria-labelledby="portal-inside-title"
        onClose={() => setEntered(false)}
        onClick={(event) => { if (event.target === event.currentTarget) exit(); }}
      >
        {stage === 'atmosphere' ? (
          <div className={styles.cinematic} data-stage="atmosphere">
            {/* The same woodland photograph drives a film-like push-through.
                Nothing here is a fake app or an extra forest on the homepage. */}
            <span className={styles.cinemaForest} aria-hidden="true" />
            <span className={styles.cinemaHorizon} aria-hidden="true" />
            <span className={styles.cinemaVeil} aria-hidden="true" />
            <span className={styles.cinemaMist} aria-hidden="true" />
            <button type="button" className={styles.cinemaClose} onClick={exit} aria-label={c.cinemaBack}><X size={20} aria-hidden="true" /></button>
            <div className={styles.cinemaCenter}>
              <span className={styles.cinemaEyebrow}>{c.cinemaEyebrow}</span>
              <h2 id="portal-inside-title" className={styles.cinemaTitle}>{c.cinemaTitle}</h2>
              <span className={styles.cinemaFilament} aria-hidden="true" />
            </div>
            <button type="button" className={styles.cinemaContinue} onClick={() => setStage('explain')}>
              {c.cinemaContinue}<ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        ) : (
        <div className={styles.inside}>
          <div className={styles.insideTop}>
            <span className={styles.insideEyebrow}>SAIMÔR / CONTINUITY</span>
            <button type="button" onClick={exit} className={styles.close} aria-label={c.close}><X size={21} aria-hidden="true" /></button>
          </div>
          <div className={styles.insideHeading}>
            <div><p className={styles.eyebrow}>{c.enter}</p><h3 id="portal-inside-title">{c.heading}</h3></div>
            <p>{c.description}</p>
          </div>
          <div className={styles.experience}>
            <div className={styles.scene}>
              <div className={styles.sceneHead}>{c.thread}</div>
              <div className={styles.thread}>
                {items.map(({ key, icon: Icon, index }) => (
                  <button
                    type="button"
                    key={key}
                    className={`${styles.node} ${current === key ? styles.activeNode : ''}`}
                    onClick={() => setCurrent(key)}
                    aria-pressed={current === key}
                    aria-label={c.objectLabels[key]}
                  >
                    <span className={styles.nodeIndex}>{index}</span>
                    <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
                    <span>{c.objectLabels[key]}</span>
                  </button>
                ))}
              </div>
              <div className={styles.moraNode}><Sparkles size={19} aria-hidden="true" /><div><strong>{c.mora}</strong><span>{c.moraText}</span></div></div>
              <div className={styles.sceneLight} aria-hidden="true" />
            </div>
            <div className={styles.explanation} aria-live="polite">
              <p className={styles.explanationNumber}>{items.find(x => x.key === current)?.index} / {active.annotation}</p>
              <h4>{active.title}</h4>
              <p className={styles.activeSubtitle}>{active.subtitle}</p>
              <p className={styles.paragraph}>{active.paragraph}</p>
              <div className={styles.keeps}><span>{c.source}</span><strong>{active.outcome}</strong></div>
              <button type="button" className={styles.advance} onClick={advance}>{c.next}<ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
          <div className={styles.insideFooter}>
            <span>{c.concept}</span>
            <Link href={locale === 'de' ? '/mora' : '/en/mora'} onClick={exit}>{c.explore}<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        )}
      </dialog>
    </div>
  );
}
