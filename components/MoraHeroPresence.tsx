'use client';

import { useRef, useState } from 'react';
import MoraCharacterBody from './MoraCharacterBody';
import styles from './MoraHeroPresence.module.css';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';

/** Website adapter for the immutable OS body. It never subscribes to CORE or executes work. */
export default function MoraHeroPresence({ paused, locale }: {
  paused: boolean; locale: 'de' | 'en';
}) {
  const root = useRef<HTMLDivElement>(null);
  const interaction = useRef({ x: 0, y: 0, touchedAt: -Infinity });
  const [failed, setFailed] = useState(false);
  const lite = useSiteLiteMode();
  const still = paused || lite;
  const de = locale === 'de';
  const invite = () => {
    if (!failed) interaction.current = { x: .5, y: .12, touchedAt: performance.now() };
  };
  return <div ref={root} className={styles.presence} data-mora-presence
    data-testid="mora-hero-presence" data-character-source="preview" data-still={still}
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
      <MoraCharacterBody locale={locale} still={still} interaction={interaction}
        onFailure={() => setFailed(true)} />
    </div>
    <span className={styles.caption}>{de ? 'Interaktive Gestalt · Entwicklungsvorschau'
      : 'Interactive character · development preview'}</span>
  </div>;
}
