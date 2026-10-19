'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';
import { publicAmbientRoute, routeAmbientScene, type AmbientScene } from '@/lib/ambientScene';
import type { AmbientAudio } from '@/lib/ambientAudio';
import styles from './ScrollAmbient.module.css';

/** One persistent soundscape; audio starts only with the listener's gesture. */
export default function ScrollAmbient({ locale }: { locale: 'de' | 'en' }) {
  const pathname = usePathname() || '/';
  const available = publicAmbientRoute(pathname);
  const encounter = /\/mora\/deep-view$/.test(pathname);
  const [enabled, setEnabled] = useState(false);
  const [pending, setPending] = useState(false);
  const [volume, setVolume] = useState(35);
  const [error, setError] = useState(false);
  const engine = useRef<AmbientAudio | null>(null);
  const opening = useRef<AudioContext | null>(null);
  const operation = useRef(0);
  const scene = useRef<AmbientScene>('cosmos');
  const volumeRef = useRef(volume); volumeRef.current = volume;
  const de = locale === 'de';

  useEffect(() => {
    try {
      const saved = localStorage.getItem('saimor.ambient.volume.v1');
      if (saved !== null && Number.isFinite(Number(saved))) setVolume(Math.max(0, Math.min(100, Number(saved))));
    } catch { /* optional preference */ }
    // Capture the ref containers, not their values: cleanup must cancel the
    // latest pending start, including one created after this mount effect.
    const epoch = operation, active = engine, starting = opening;
    return () => { epoch.current++; void active.current?.dispose(); void starting.current?.close().catch(() => {}); };
  }, []);

  useEffect(() => {
    const update = (next?: AmbientScene) => {
      scene.current = next ?? routeAmbientScene(pathname, window.location.hash);
      engine.current?.setScene(scene.current);
    };
    update();
    const hash = () => update(); window.addEventListener('hashchange', hash);
    const regions = Array.from(document.querySelectorAll<HTMLElement>('[aria-labelledby="world-title"],#system,#products,#studio'));
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(() => {
      const middle = innerHeight * .5;
      const visible = regions.find(region => { const r = region.getBoundingClientRect(); return r.top <= middle && r.bottom > middle; });
      if (visible) update(visible.id === 'system' ? 'forest' : visible.hasAttribute('aria-labelledby') ? 'cosmos' : 'studio');
      else update();
    }, { rootMargin: '-25% 0px -25%', threshold: [0, .2, .5] });
    regions.forEach(region => observer?.observe(region));
    if (!available) {
      operation.current++; void engine.current?.dispose(); engine.current = null;
      void opening.current?.close().catch(() => {}); opening.current = null;
      setEnabled(false); setPending(false);
    }
    return () => { window.removeEventListener('hashchange', hash); observer?.disconnect(); };
  }, [pathname, available]);

  useEffect(() => {
    const visibility = () => {
      if (document.hidden) engine.current?.suspend();
      else {
        const active = engine.current;
        void active?.resume().catch(() => {
          if (engine.current !== active) return;
          engine.current = null; void active.dispose(); setError(true); setEnabled(false);
        });
      }
    };
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);

  const toggle = async () => {
    if (pending) return;
    const request = ++operation.current;
    setPending(true); setError(false);
    if (engine.current) {
      const previous = engine.current; engine.current = null; setEnabled(false);
      try { await previous.dispose(); } finally { if (operation.current === request) setPending(false); }
      return;
    }
    const Context = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    let context: AudioContext | null = null;
    try {
      if (!Context) throw new Error('Web Audio unavailable');
      context = new Context(); opening.current = context;
      // Resume synchronously in the click, before loading the graph (iOS).
      const resumed = context.resume();
      const [{ createAmbientAudio }] = await Promise.all([import('@/lib/ambientAudio'), resumed]);
      if (request !== operation.current) { if (context.state !== 'closed') await context.close(); return; }
      const audio = createAmbientAudio(context); opening.current = null; engine.current = audio;
      audio.setScene(scene.current); audio.setVolume(volumeRef.current / 100);
      if (document.hidden) audio.suspend();
      setEnabled(true);
    } catch {
      if (context && context.state !== 'closed') await context.close().catch(() => {});
      opening.current = null;
      if (request === operation.current) { setError(true); setEnabled(false); }
    } finally { if (request === operation.current) setPending(false); }
  };
  if (!available) return null;
  return <div className={styles.control} data-testid="site-ambient" data-encounter={encounter} data-enabled={enabled}>
    <button type="button" onClick={() => void toggle()} disabled={pending} aria-pressed={enabled}
      aria-label={de ? enabled ? 'Ambient-Klang ausschalten' : 'Ambient-Klang einschalten' : enabled ? 'Turn ambient sound off' : 'Turn ambient sound on'}>
      {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>{pending ? '…' : de ? enabled ? 'Klang an' : 'Klang aus' : enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
    <details><summary aria-label={de ? 'Lautstärke einstellen' : 'Adjust volume'}><SlidersHorizontal size={13} /></summary><div className={styles.level}><label htmlFor="site-ambient-volume">{de ? 'Lautstärke' : 'Volume'}<span>{volume}%</span></label><input id="site-ambient-volume" type="range" min="0" max="100" step="1" value={volume} onChange={event => {
      const value = Number(event.target.value); setVolume(value); engine.current?.setVolume(value / 100);
      try { localStorage.setItem('saimor.ambient.volume.v1', String(value)); } catch { /* optional preference */ }
    }} /></div></details>
    {error && <span className={styles.error} role="status">{de ? 'Ton konnte nicht starten. Bitte erneut versuchen.' : 'Sound could not start. Please try again.'}</span>}
  </div>;
}
