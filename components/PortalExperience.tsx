'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import styles from './PortalExperience.module.css';

type Locale = 'de' | 'en';

const copy = {
  de: {
    enter: 'Schwelle betreten',
    close: 'Zurück in den Wald',
    eyebrow: 'JENSEITS DER SCHWELLE',
    title: 'Was bleibt, kommt mit.',
    next: 'MÔRA entdecken',
  },
  en: {
    enter: 'Cross the threshold',
    close: 'Return to the forest',
    eyebrow: 'BEYOND THE THRESHOLD',
    title: 'What matters stays with you.',
    next: 'Explore MÔRA',
  },
} as const;

/* Homepage: one forest photograph and one invisible doorway hit target.
   The destination is ONE atmospheric scene, not a second product explainer. */
export default function PortalExperience({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onHistory = () => setOpen(false);
    window.addEventListener('popstate', onHistory);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('popstate', onHistory);
    };
  }, [open]);

  const close = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.forestThreshold}>
        <button
          type="button"
          className={styles.door}
          onClick={() => setOpen(true)}
          aria-label={c.enter}
          aria-haspopup="dialog"
        />
      </div>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="portal-inside-title"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.currentTarget === event.target) close();
        }}
      >
        <div className={styles.cinematic} data-stage="atmosphere">
          <div className={styles.cinemaForest} aria-hidden="true" />
          <div className={styles.cinemaLight} aria-hidden="true" />
          <div className={styles.cinemaAtmosphere} aria-hidden="true" />
          <button type="button" className={styles.close} aria-label={c.close} onClick={close}>
            <X size={20} aria-hidden="true" />
          </button>
          <div className={styles.cinemaCopy}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="portal-inside-title">{c.title}</h2>
            <span className={styles.filament} aria-hidden="true" />
            <Link
              href={locale === 'de' ? '/mora' : '/en/mora'}
              onClick={close}
              className={styles.discover}
            >
              {c.next}<ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
}
