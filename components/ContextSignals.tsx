'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, FileText, Sparkles, X } from 'lucide-react';
import styles from './ContextSignals.module.css';

type Locale = 'de' | 'en';
type Signal = 'files' | 'meetings' | 'open' | 'mora';

const definitions = [
  { key: 'files', icon: FileText, number: '01' },
  { key: 'meetings', icon: CalendarDays, number: '02' },
  { key: 'open', icon: CheckCircle2, number: '03' },
  { key: 'mora', icon: Sparkles, number: '04' },
] as const;

const content = {
  de: {
    label: 'Zusammen im Arbeitsraum',
    hint: 'Antippen, um den Zusammenhang zu sehen',
    close: 'Schließen',
    example: 'BEISPIELANSICHT · KEINE LIVE-DATEN',
    related: 'Im Zusammenhang',
    source: 'Bedeutung',
    learn: 'MÔRA genauer entdecken',
    signals: {
      files: {
        title: 'Dateien', subtitle: 'mit dem Projekt verbunden',
        headline: 'Ein Dokument ist mehr als ein Anhang.',
        body: 'Stell dir ein Projektbriefing vor: Du findest nicht nur die Datei, sondern auch den Termin und die offenen Entscheidungen, auf die sie sich bezieht. Verbundene Quellen und Berechtigungen sind dafür Voraussetzung.',
        subject: 'Projektbriefing', relation: 'Besprechung · offene Entscheidung', meaning: 'Eine Datei mit ihrem Arbeitszusammenhang',
      },
      meetings: {
        title: 'Termine', subtitle: 'mit dem Wesentlichen verknüpft',
        headline: 'Ein Termin steht nie für sich allein.',
        body: 'Aus einer Besprechung entstehen Fragen und nächste Schritte. In einer verbundenen Arbeitswelt gehören ihre Unterlagen und Aufgaben dazu – statt in unterschiedlichen Tabs zu verschwinden.',
        subject: 'Projektgespräch', relation: 'Briefing · nächste Schritte', meaning: 'Zeitpunkt, Unterlagen und Aufgaben im Zusammenhang',
      },
      open: {
        title: 'Offene Dinge', subtitle: 'mit nächstem Schritt',
        headline: 'Was offen ist, bleibt sichtbar.',
        body: 'Eine Entscheidung wartet auf Rückmeldung. Statt nur eine weitere Aufgabe abzulegen, wird verständlich, warum sie offen ist, zu welchem Projekt sie gehört und wer den nächsten Schritt freigeben muss.',
        subject: 'Rückmeldung ausstehend', relation: 'Projektgespräch · Freigabe', meaning: 'Aufgaben mit Herkunft und Verantwortung',
      },
      mora: {
        title: 'MÔRA', subtitle: 'hält den Faden',
        headline: 'Intelligenz mit nachvollziehbarem Kontext.',
        body: 'MÔRA soll zusammengehörige Signale einordnen, Quellen erkennbar machen und bei passenden Freigaben nächste Schritte unterstützen. Aktionen erfolgen nicht einfach heimlich oder automatisch.',
        subject: 'Zusammenhang erkannt', relation: 'Quelle · Kontext · Freigabe', meaning: 'Assistenz statt einer neuen leeren Promptbox',
      },
    },
  },
  en: {
    label: 'Connected in the workspace',
    hint: 'Tap to see how things relate',
    close: 'Close',
    example: 'CONCEPT VIEW · NO LIVE DATA',
    related: 'Connected to',
    source: 'What it means',
    learn: 'Explore MÔRA in detail',
    signals: {
      files: {
        title: 'Files', subtitle: 'connected to the project',
        headline: 'A document is more than an attachment.',
        body: 'Imagine a project brief that connects to its meeting and outstanding decisions. That only becomes possible with connected sources and appropriate permissions.',
        subject: 'Project brief', relation: 'Meeting · pending decision', meaning: 'A document with its working context',
      },
      meetings: {
        title: 'Meetings', subtitle: 'connected to what matters',
        headline: 'Meetings do not exist in isolation.',
        body: 'A conversation leads to decisions and next steps. In a connected workspace, materials and tasks stay associated instead of disappearing into separate tabs.',
        subject: 'Project discussion', relation: 'Brief · next steps', meaning: 'Time, documents and work in context',
      },
      open: {
        title: 'Open work', subtitle: 'with a next step',
        headline: 'Unfinished work stays visible.',
        body: 'A decision awaits feedback. Beyond an isolated checkbox, you can understand why it is pending, which project it belongs to and whose approval is needed.',
        subject: 'Awaiting feedback', relation: 'Discussion · approval', meaning: 'Work with provenance and responsibility',
      },
      mora: {
        title: 'MÔRA', subtitle: 'keeps the thread',
        headline: 'Intelligence with traceable context.',
        body: 'MÔRA aims to relate signals, show their sources and support next steps with appropriate approval. Actions should never happen secretly or without control.',
        subject: 'Context identified', relation: 'Source · context · approval', meaning: 'Assistance beyond an empty prompt box',
      },
    },
  },
} as const;

export default function ContextSignals({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const [selected, setSelected] = useState<Signal | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;
    if (selected !== null && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (selected === null && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [selected]);

  const dismiss = () => {
    const dialog = modalRef.current;
    if (dialog?.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    setSelected(null);
  };

  const active = selected === null ? null : copy.signals[selected];
  const selectedDefinition = definitions.find((item) => item.key === selected);
  const ActiveIcon = selectedDefinition?.icon;

  return (
    <div className={styles.shell}>
      <p className={styles.hint}><span className={styles.hintDot} aria-hidden="true" />{copy.hint}</p>
      <ul className={styles.grid} aria-label={copy.label}>
        {definitions.map(({ key, icon: Icon, number }) => {
          const item = copy.signals[key];
          return (
            <li key={key}>
              <button
                type="button"
                className={styles.signal}
                aria-haspopup="dialog"
                onClick={() => setSelected(key)}
              >
                <span className={styles.topline}><span>{number} / CONTEXT</span><ArrowUpRight size={14} aria-hidden="true" /></span>
                <Icon className={styles.signalIcon} size={22} strokeWidth={1.3} aria-hidden="true" />
                <span className={styles.title}>{item.title}</span>
                <span className={styles.subtitle}>{item.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog ref={modalRef} className={styles.dialog} aria-labelledby="context-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
        {active && (
          <div className={styles.dialogBody}>
            <div className={styles.dialogTop}>
              <span className={styles.kicker}>SAIMÔR / {selectedDefinition?.number} · CONTEXT</span>
              <button className={styles.close} type="button" onClick={dismiss} aria-label={copy.close}><X size={20} /></button>
            </div>
            <div className={styles.dialogIcon}>{ActiveIcon && <ActiveIcon size={27} strokeWidth={1.25} aria-hidden="true" />}</div>
            <h3 id="context-dialog-title">{active.headline}</h3>
            <p className={styles.description}>{active.body}</p>
            <div className={styles.example}>
              <p className={styles.exampleLabel}>{copy.example}</p>
              <div className={styles.exampleSubject}><span className={styles.exampleSeed} aria-hidden="true" />{active.subject}</div>
              <div className={styles.exampleEdge} aria-hidden="true" />
              <div className={styles.exampleRelation}>{copy.related}: <strong>{active.relation}</strong></div>
              <p className={styles.exampleMeaning}><span>{copy.source}</span>{active.meaning}</p>
            </div>
            <Link href={locale === 'de' ? '/mora' : '/en/mora'} className={styles.deepLink} onClick={dismiss}>{copy.learn}<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        )}
      </dialog>
    </div>
  );
}
