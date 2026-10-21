'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import MoraCharacter from './MoraCharacter';
import styles from './MoraCompanion.module.css';

type Hint = { section: string; text: [string, string]; cta: [string, string]; href: (de: boolean) => string };

// MÔRA guides: one short, contextual next step per section. She exists once; while another MÔRA
// is on screen she leaves only an empty trace in her dock.
const HINTS: Hint[] = [
  { section: '[aria-labelledby="mora-features"]', text: ['Willst du sehen, wie ich im OS arbeite?', 'Want to see how I work in the OS?'], cta: ['Zum Demo-Raum', 'To the demo room'], href: () => '#im-os' },
  { section: '[aria-labelledby="mora-trust"]', text: ['Neugierig, wie ich die Welt sehe?', 'Curious how I see the world?'], cta: ['Zur Lichtung', 'Visit the clearing'], href: (de) => `${de ? '' : '/en'}/mora/deep-view?from=mora` },
  { section: '#im-os', text: ['Hier kannst du mich im Arbeitsraum erleben.', 'This is where you can meet me at work.'], cta: ['Meine Art kennenlernen', 'Discover my character'], href: () => '#persona' },
];

export default function MoraCompanion({ locale, paused }: { locale: 'de' | 'en'; paused: boolean }) {
  const [open, setOpen] = useState(false);
  const [otherVisible, setOtherVisible] = useState(true);
  const [hint, setHint] = useState<number | null>(null);
  const [bubble, setBubble] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const seen = useRef(new Set<number>());
  const de = locale === 'de';
  const t = (pair: [string, string]) => pair[de ? 0 : 1];

  // Only one MÔRA at a time: watch every other MÔRA on the page.
  useEffect(() => {
    const others = Array.from(document.querySelectorAll('[data-mora-character], [data-mora-presence]'))
      .filter((el) => !root.current?.contains(el));
    if (!others.length) { setOtherVisible(false); return; }
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target);
      setOtherVisible(visible.size > 0);
    }, { threshold: 0.2 });
    others.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Which section she is guiding right now.
  useEffect(() => {
    const targets = HINTS.map((h, i) => [document.querySelector(h.section), i] as const).filter(([el]) => el);
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const found = targets.find(([el]) => el === entry.target);
        if (found) setHint(found[1]);
      }
    }, { threshold: 0.45 });
    targets.forEach(([el]) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  const present = !otherVisible || open;

  // A short whisper the first time she arrives at a section; then she docks quietly.
  useEffect(() => {
    if (!present || open || hint === null || seen.current.has(hint)) return;
    seen.current.add(hint);
    setBubble(true);
    const id = window.setTimeout(() => setBubble(false), 6500);
    return () => window.clearTimeout(id);
  }, [present, open, hint]);

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

  const current = hint === null ? null : HINTS[hint];

  return <div ref={root} className={styles.companion} data-testid="mora-companion" data-open={open} data-paused={paused} data-presence={present ? 'present' : 'trace'}>
    {current && bubble && present && !open ? (
      <Link href={current.href(de)} className={styles.bubble} onClick={() => setBubble(false)}>
        <span>{t(current.text)}</span><ArrowRight size={14} aria-hidden="true" />
      </Link>
    ) : null}
    <div className={styles.dock}>
      <span className={styles.trace} aria-hidden="true" />
      <button ref={trigger} type="button" className={styles.trigger} aria-expanded={open} aria-controls="mora-companion-panel"
        aria-label={de ? 'Kleine MÔRA kennenlernen' : 'Meet little MÔRA'} onClick={() => { setBubble(false); setOpen(value => !value); }}>
        <span className={styles.figure}><MoraCharacter size={56} state={open ? 'listen' : 'rest'} paused={paused} /></span>
      </button>
    </div>
    {open && <div id="mora-companion-panel" className={styles.panel} role="dialog" aria-label={de ? 'MÔRA an deiner Seite' : 'MÔRA by your side'}>
      <button type="button" className={styles.close} aria-label={de ? 'MÔRA-Hinweis schließen' : 'Close MÔRA note'} onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={16} /></button>
      <p className={styles.eyebrow}>{de ? 'HALLO. ICH BIN MÔRA.' : 'HELLO. I’M MÔRA.'}</p>
      <p className={styles.title}>{current ? t(current.text) : de ? 'Ich zeige dir den nächsten Schritt.' : 'I’ll show you the next step.'}</p>
      {current && current.href(de) !== `${de ? '' : '/en'}/mora/deep-view?from=mora` && current.href(de) !== '#persona'
        ? <Link href={current.href(de)} onClick={() => setOpen(false)}>{t(current.cta)}<ArrowRight size={15} /></Link> : null}
      <Link href="#persona" onClick={() => setOpen(false)}>{de ? 'Meine Art kennenlernen' : 'Discover my character'}<ArrowRight size={15} /></Link>
      <Link href={`${de ? '' : '/en'}/mora/deep-view?from=mora`} onClick={() => setOpen(false)}>{de ? 'Zur Lichtung' : 'Visit the clearing'}<ArrowRight size={15} /></Link>
    </div>}
  </div>;
}
