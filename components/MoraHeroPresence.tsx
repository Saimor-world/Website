'use client';

import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './MoraHeroPresence.module.css';

const Scene = dynamic(() => import('./mora/alive/CharacterScene'), {
  ssr: false, loading: () => <span className={styles.loading} aria-hidden="true">MÔRA</span>,
});
class PresenceBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFailure: () => void }, { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/** Website adapter for the immutable OS body. It never subscribes to CORE or executes work. */
export default function MoraHeroPresence({ paused, locale }: {
  paused: boolean; locale: 'de' | 'en';
}) {
  const root = useRef<HTMLDivElement>(null);
  const interaction = useRef({ x: 0, y: 0, touchedAt: -Infinity });
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === 'visible');
    sync(); document.addEventListener('visibilitychange', sync);
    const observer = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observer?.observe(root.current);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  const de = locale === 'de';
  const invite = () => {
    if (!failed) interaction.current = { x: .5, y: .12, touchedAt: performance.now() };
  };
  const fallback = <span className={styles.fallback}>
    {de ? 'Die interaktive Ansicht ist hier nicht verfügbar.'
      : 'The interactive view is unavailable in this browser.'}
  </span>;
  return <div ref={root} className={styles.presence} data-mora-presence
    data-testid="mora-hero-presence" data-character-source="preview" data-still={paused}
    role={failed ? 'img' : 'button'} tabIndex={failed ? -1 : 0}
    aria-label={failed ? (de ? 'MÔRA: interaktive Ansicht nicht verfügbar'
      : 'MÔRA: interactive view unavailable') : (de ? 'MÔRA zu dir einladen' : 'Invite MÔRA closer')}
    onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); invite(); }
    }} onPointerMove={event => {
      const rect = event.currentTarget.getBoundingClientRect();
      interaction.current.x = (event.clientX - rect.left) / rect.width * 2 - 1;
      interaction.current.y = 1 - (event.clientY - rect.top) / rect.height * 2;
    }} onPointerDown={event => {
      const rect = event.currentTarget.getBoundingClientRect();
      interaction.current = { x: (event.clientX - rect.left) / rect.width * 2 - 1,
        y: 1 - (event.clientY - rect.top) / rect.height * 2, touchedAt: performance.now() };
    }} onClick={event => { if (event.detail === 0) invite(); }}>
    <div className={styles.canvas} aria-hidden="true">
      <PresenceBoundary fallback={fallback} onFailure={() => setFailed(true)}>{failed ? fallback
        : <Scene state="idle" still={paused} active={visible && pageVisible}
          interaction={interaction} onFailure={() => setFailed(true)} />}
      </PresenceBoundary>
    </div>
    <span className={styles.caption}>{de ? 'Interaktive Gestalt · Entwicklungsvorschau'
      : 'Interactive character · development preview'}</span>
  </div>;
}
