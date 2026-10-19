'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, X } from 'lucide-react';
import styles from './EarthEntry.module.css';

const PLACES = {
  de: [
    ['Wasser', 'Ein Ort trägt Spuren.', 'Erinnerungen müssen nicht in einem Feed verschwinden. Earth ist die Idee, Geschichten mit ihren Orten zu verbinden.'],
    ['Wege', 'Aus Spuren werden Verbindungen.', 'Wissen, Stimmen und Veränderungen könnten gemeinsam auf einer Karte und durch die Zeit lesbar werden.'],
    ['Lichtung', 'Jede Welt braucht einen Eingang.', 'Dieser Wald ist unser bildlicher Eingang ins SAIMÔR-Ökosystem. Durch das Portal begegnest du MÔRA.'],
  ],
  en: [
    ['Water', 'A place carries traces.', 'Memories need not disappear into a feed. Earth explores the idea of connecting stories to their places.'],
    ['Paths', 'Traces become connections.', 'Knowledge, voices and change could become readable together on a map and across time.'],
    ['Clearing', 'Every world needs an entrance.', 'This forest is our visual entrance to the SAIMÔR ecosystem. Through the portal, you meet MÔRA.'],
  ],
} as const;

/** An explicitly conceptual Easter egg, not a live map or a connected Earth account. */
export default function EarthEntry({ locale }: { locale: 'de' | 'en' }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [place, setPlace] = useState(0);
  const de = locale === 'de';
  const selected = PLACES[locale][place];
  return <>
    <button type="button" className={styles.surface} aria-label={de ? 'Erde erkunden' : 'Explore Earth'} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()} />
    <button type="button" className={styles.entry} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
      <span className={styles.beacon} aria-hidden="true"><i /><i /><i /></span>
      <span>SAIMÔR Earth<small>{de ? 'Inoffizielle Produktvorschau' : 'Unofficial product preview'}</small></span>
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="earth-preview-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.interior}>
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label={de ? 'Earth-Vorschau schließen' : 'Close Earth preview'}><X size={20} /></button>
        <p className={styles.eyebrow}>SAIMÔR EARTH / {de ? 'INOFFIZIELLE PRODUKTVORSCHAU' : 'UNOFFICIAL PRODUCT PREVIEW'}</p>
        <div className={styles.terrain} data-place={place}>
          <svg viewBox="0 0 600 220" aria-hidden="true"><path d="M40 180 Q130 40 280 130 T560 55 M100 200 Q240 10 490 170 M280 130 Q340 180 420 200" /></svg>
          {PLACES[locale].map(([name], index) => <button type="button" key={name} className={styles.place} style={{ left: `${22 + index * 29}%`, top: `${[66, 41, 59][index]}%` }} aria-pressed={place === index} onClick={() => setPlace(index)}><i aria-hidden="true" />{name}</button>)}
          <span className={styles.mapNote}>{de ? 'IMAGINÄRER ORT · KEINE LIVE-KARTE' : 'IMAGINED PLACE · NOT A LIVE MAP'}</span>
        </div>
        <div className={styles.copy} aria-live="polite"><h2 id="earth-preview-title">{selected[1]}</h2><p>{selected[2]}</p></div>
        <div className={styles.actions}>
          <a href="#system" onClick={() => dialog.current?.close()}>{de ? 'Auf der Erde ankommen' : 'Arrive on Earth'}<ArrowDown size={16} /></a>
          <Link href="/earth">{de ? 'Die Earth-Idee' : 'The Earth concept'}<ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </dialog>
  </>;
}
