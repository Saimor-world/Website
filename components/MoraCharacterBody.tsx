'use client';

import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';
import type { CharacterState } from '@/lib/mora/alive/engine';
import type { CharacterInteraction } from './mora/alive/CharacterScene';
import styles from './MoraCharacterBody.module.css';

const Scene = dynamic(() => import('./mora/alive/CharacterScene'), {
  ssr: false, loading: () => <span className={styles.message}>MÔRA</span>,
});
class BodyBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFailure: () => void }, { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/** One Website lifecycle adapter around the immutable OS renderer. Local expression only. */
export default function MoraCharacterBody({ locale = 'de', still: limited, state = 'idle',
  interaction: supplied, onFailure }: {
  locale?: 'de' | 'en'; still: boolean; state?: CharacterState;
  interaction?: MutableRefObject<CharacterInteraction>; onFailure?: () => void;
}) {
  const host = useRef<HTMLSpanElement>(null);
  const local = useRef({ x: 0, y: 0, touchedAt: -Infinity });
  const [visible, setVisible] = useState(true), [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(true), [failed, setFailed] = useState(false);
  const lite = useSiteLiteMode();
  const still = limited || reduced || lite;
  useEffect(() => {
    const syncPage = () => setPageVisible(document.visibilityState === 'visible');syncPage();
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(media?.matches ?? false);syncMotion();
    document.addEventListener('visibilitychange', syncPage);
    media?.addEventListener?.('change', syncMotion);
    const observer = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer?.observe(host.current);
    return () => {
      observer?.disconnect();document.removeEventListener('visibilitychange', syncPage);
      media?.removeEventListener?.('change', syncMotion);
    };
  }, []);
  const fail = () => { setFailed(true);onFailure?.(); };
  const fallback = <span className={styles.message}>{locale === 'de'
    ? 'Die interaktive Ansicht ist hier nicht verfügbar.'
    : 'The interactive view is unavailable in this browser.'}</span>;
  return <span ref={host} className={styles.body} data-mora-body data-character-source="preview"
    data-character-state={state} data-still={still} data-unavailable={failed} aria-hidden="true">
    <BodyBoundary fallback={fallback} onFailure={fail}>{failed ? fallback
      : <Scene state={state} still={still} active={visible && pageVisible}
        interaction={supplied ?? local} onFailure={fail} />}
    </BodyBoundary>
  </span>;
}
