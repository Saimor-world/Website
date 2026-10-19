'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import MoraCharacter from './MoraCharacter';
import styles from './MoraCompanion.module.css';

export default function MoraCompanion({ locale, paused }: { locale: 'de' | 'en'; paused: boolean }) {
  const [open, setOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const de = locale === 'de';

  useEffect(() => {
    const hero = document.querySelector('[data-testid="mora-product"] section');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [open]);

  return <div ref={root} className={styles.companion} data-testid="mora-companion" data-open={open} data-paused={paused} data-hero-visible={heroVisible}>
    <div className={styles.flight}>
      <button ref={trigger} type="button" className={styles.trigger} aria-expanded={open} aria-controls="mora-companion-panel"
        aria-label={de ? 'Kleine MÔRA kennenlernen' : 'Meet little MÔRA'} onClick={() => setOpen(value => !value)}>
        <MoraCharacter size={60} state={open ? 'listen' : 'rest'} paused={paused} />
      </button>
    </div>
    {open && <div id="mora-companion-panel" className={styles.panel} role="dialog" aria-label={de ? 'MÔRA an deiner Seite' : 'MÔRA by your side'}>
      <button type="button" className={styles.close} aria-label={de ? 'MÔRA-Hinweis schließen' : 'Close MÔRA note'} onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={16} /></button>
      <p className={styles.eyebrow}>{de ? 'HALLO. ICH BIN MÔRA.' : 'HELLO. I’M MÔRA.'}</p>
      <p className={styles.title}>{de ? 'Ein kleiner Stein. Mit einem Blick fürs Ganze.' : 'A little stone. An eye for the whole picture.'}</p>
      <p>{de ? 'Hier lernst du meine Art kennen. In der Lichtung kannst du die Welt durch meine Augen sehen.' : 'Discover my character here. In the clearing, see the world through my eyes.'}</p>
      <Link href="#persona" onClick={() => setOpen(false)}>{de ? 'Meine Art kennenlernen' : 'Discover my character'}<ArrowRight size={15} /></Link>
      <Link href={`${de ? '' : '/en'}/mora/deep-view?from=mora`} onClick={() => setOpen(false)}>{de ? 'Zur Lichtung' : 'Visit the clearing'}<ArrowRight size={15} /></Link>
    </div>}
  </div>;
}
