'use client';

import { useEffect, useRef, useState } from 'react';
import { AudioLines, VolumeX } from 'lucide-react';

type Engine = { context: AudioContext; master: GainNode };
const NOTES = [261.63, 329.63, 392, 493.88, 440, 349.23, 293.66, 392];

export default function ScrollAmbient({ locale }: { locale: 'de' | 'en' }) {
  const [enabled, setEnabled] = useState(false);
  const engineRef = useRef<Engine | null>(null);
  const lastStepRef = useRef(-1);
  const lastPlayedRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const engine = engineRef.current;
      if (!engine) return;
      const nowMs = performance.now();
      if (nowMs - lastPlayedRef.current < 420) return;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const step = Math.min(NOTES.length - 1, Math.floor((window.scrollY / scrollable) * NOTES.length));
      if (step === lastStepRef.current) return;
      lastStepRef.current = step;
      lastPlayedRef.current = nowMs;

      const now = engine.context.currentTime;
      const base = engine.context.createOscillator();
      const overtone = engine.context.createOscillator();
      const envelope = engine.context.createGain();
      const filter = engine.context.createBiquadFilter();
      base.type = 'sine';
      overtone.type = 'triangle';
      base.frequency.value = NOTES[step];
      overtone.frequency.value = NOTES[step] * 2;
      filter.type = 'lowpass';
      filter.frequency.value = 1100;
      envelope.gain.setValueAtTime(0.0001, now);
      envelope.gain.exponentialRampToValueAtTime(0.12, now + 0.035);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);
      base.connect(filter);
      overtone.connect(filter);
      filter.connect(envelope);
      envelope.connect(engine.master);
      base.start(now);
      overtone.start(now);
      base.stop(now + 1.5);
      overtone.stop(now + 1.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      const engine = engineRef.current;
      engineRef.current = null;
      void engine?.context.close();
    };
  }, []);

  const toggle = async () => {
    if (engineRef.current) {
      const engine = engineRef.current;
      engineRef.current = null;
      await engine.context.close();
      setEnabled(false);
      return;
    }
    const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.055;
    master.connect(context.destination);
    await context.resume();
    engineRef.current = { context, master };
    lastStepRef.current = -1;
    setEnabled(true);
  };

  const copy = locale === 'de' ? { on: 'Klangspur an', off: 'Klangspur', label: 'Leise Klangspur beim Scrollen' } : { on: 'Sound trail on', off: 'Sound trail', label: 'Soft sound trail while scrolling' };
  return (
    <button type="button" onClick={() => void toggle()} aria-pressed={enabled} aria-label={copy.label} title={copy.label} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs text-white/46 transition hover:border-white/22 hover:text-white/72">
      {enabled ? <AudioLines className="h-4 w-4 text-[#d6a848]" /> : <VolumeX className="h-4 w-4" />}{enabled ? copy.on : copy.off}
    </button>
  );
}
