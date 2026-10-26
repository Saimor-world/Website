'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MoraCharacterBody from './MoraCharacterBody';
import styles from './MoraDeepView.module.css';

export type MoraFocusHandle = { enter: () => void };
type Props = {
  locale: 'de' | 'en'; paused: boolean; reduced: boolean; disabled: boolean;
  onProgress: (progress: number) => void; onActive: (active: boolean) => void; onSettled: () => void;
};

/** Holding a stable point settles the surrounding field; a click is the accessible alternative. */
const MoraFocusStone = forwardRef<MoraFocusHandle, Props>(function MoraFocusStone(props, ref) {
  const interaction = useRef({ x: 0, y: 0, touchedAt: -Infinity });
  const current = useRef(props); current.current = props;
  const mode = useRef<'hold' | 'auto' | 'idle'>('idle');
  const amount = useRef(0);
  const completed = useRef(false);
  const [active, setActive] = useState(false);
  const begin = (next: 'hold' | 'auto') => {
    const c = current.current;
    if (completed.current || c.disabled) return;
    if (c.paused || c.reduced) { completed.current = true; c.onProgress(1); c.onSettled(); return; }
    mode.current = next; setActive(true); c.onActive(true);
  };
  const release = () => {
    if (mode.current !== 'hold' || completed.current) return;
    mode.current = 'idle'; setActive(false); current.current.onActive(false);
  };
  useImperativeHandle(ref, () => ({ enter: () => begin('auto') }));
  useEffect(() => {
    let frame = 0, previous = performance.now();
    const sync = () => { previous = performance.now(); };
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.max(0, (now - previous) / 1000); previous = now;
      const c = current.current;
      if (document.hidden || c.paused || c.reduced || completed.current) return;
      const before = amount.current;
      amount.current = mode.current === 'idle' ? Math.max(0, before - dt * 1.5) : Math.min(1, before + dt / 2.8);
      if (before !== amount.current) c.onProgress(amount.current);
      if (amount.current === 1 && mode.current !== 'idle') {
        completed.current = true; mode.current = 'idle'; setActive(false); c.onActive(false); c.onSettled();
      }
    };
    document.addEventListener('visibilitychange', sync);
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <button type="button" className={`${styles.stoneStage} ${styles.stoneControl}`}
    aria-label={props.locale === 'de' ? 'MÔRA halten' : 'Hold MÔRA'} aria-busy={active}
    disabled={props.disabled} data-holding={active}
    onPointerMove={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      interaction.current.x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      interaction.current.y = 1 - (event.clientY - bounds.top) / bounds.height * 2;
    }}
    onPointerDown={event => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); begin('hold'); }}
    onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}
    onClick={event => { if (event.detail === 0 || props.reduced || props.paused) begin('auto'); }}>
    <MoraCharacterBody locale={props.locale} still={props.paused || props.reduced}
      state={active ? 'listening' : 'idle'} interaction={interaction} />
    <span className={styles.focusTrace} aria-hidden="true" />
    <span className={styles.holdHint} aria-hidden="true">{props.locale === 'de' ? 'Halte einen Moment.' : 'Stay for a moment.'}</span>
  </button>;
});
export default MoraFocusStone;
