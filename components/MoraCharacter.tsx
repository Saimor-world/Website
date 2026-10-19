'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import MoraOrb from './MoraOrb';
import MoraOsFace from './MoraOsFace';
import styles from './MoraCharacter.module.css';

export type MoraMood = 'rest' | 'dream' | 'speak' | 'listen';
const FACE = { rest: 'rest', dream: 'think', speak: 'done', listen: 'listen' } as const;

/** The original jade artwork and the same A4 light-face used in the OS. */
export default function MoraCharacter({ size = 240, state = 'rest', paused = false, priority = false, className = '', label = 'MÔRA' }: {
  size?: number; state?: MoraMood; paused?: boolean; priority?: boolean; className?: string; label?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!root.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return <span ref={root} data-mora-character data-mood={state} data-still={paused || !visible}
    className={`${styles.character} ${className}`} style={{ '--character-size': `${size}px` } as CSSProperties}>
    <MoraOrb size={size} state={state === 'listen' ? 'dream' : state} className={styles.stone} priority={priority} label={label} />
    <MoraOsFace size={size} state={FACE[state]} />
  </span>;
}
