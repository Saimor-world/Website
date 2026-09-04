'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type Locale = 'de' | 'en';

const CHORDS = [
  [130.81, 164.81, 196.00, 246.94], // Cmaj7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [146.83, 174.61, 220.00, 261.63], // Dm7
  [146.83, 196.00, 246.94, 293.66], // G6
] as const;

type AmbientEngine = {
  context: AudioContext;
  master: GainNode;
  oscillators: OscillatorNode[];
};

export default function ScrollAmbient({ locale }: { locale: Locale }) {
  const [enabled, setEnabled] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastChordRef = useRef(-1);

  useEffect(() => {
    const onScroll = () => {
      const engine = engineRef.current;
      if (!engine || frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
        const chordIndex = Math.min(CHORDS.length - 1, Math.floor(progress * CHORDS.length));
        const now = engine.context.currentTime;

        if (chordIndex !== lastChordRef.current) {
          CHORDS[chordIndex].forEach((frequency, index) => {
            engine.oscillators[index].frequency.cancelScheduledValues(now);
            engine.oscillators[index].frequency.setTargetAtTime(frequency, now, 0.55);
          });
          lastChordRef.current = chordIndex;
        }

        engine.master.gain.cancelScheduledValues(now);
        engine.master.gain.setTargetAtTime(0.013, now, 0.12);
        if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = window.setTimeout(() => {
          const activeEngine = engineRef.current;
          if (!activeEngine) return;
          activeEngine.master.gain.setTargetAtTime(0.0045, activeEngine.context.currentTime, 0.7);
        }, 420);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
      const engine = engineRef.current;
      engineRef.current = null;
      void engine?.context.close();
    };
  }, []);

  const toggle = async () => {
    const activeEngine = engineRef.current;
    if (activeEngine) {
      engineRef.current = null;
      await activeEngine.context.close();
      setEnabled(false);
      return;
    }

    const AudioContextClass = window.AudioContext
      ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 920;
    filter.Q.value = 0.35;
    master.gain.value = 0.0045;
    filter.connect(master);
    master.connect(context.destination);

    const oscillators = CHORDS[0].map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = [-5, 2, -2, 5][index];
      oscillator.connect(filter);
      oscillator.start();
      return oscillator;
    });

    await context.resume();
    engineRef.current = { context, master, oscillators };
    lastChordRef.current = 0;
    setEnabled(true);
  };

  const copy = locale === 'de'
    ? { on: 'FAHRSTUHLMODUS AN', off: 'FAHRSTUHLMODUS', label: 'Leise Musik beim Scrollen' }
    : { on: 'ELEVATOR MODE ON', off: 'ELEVATOR MODE', label: 'Soft music while scrolling' };

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--world-gold)]/25 bg-black/25 px-4 py-2 font-mono text-[9px] font-bold tracking-[.15em] text-[var(--world-gold)] backdrop-blur-md transition hover:border-[var(--world-gold)]/60"
      aria-label={copy.label}
      aria-pressed={enabled}
      title={copy.label}
    >
      {enabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 opacity-70" />}
      {enabled ? copy.on : copy.off}
    </button>
  );
}
