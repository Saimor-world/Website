'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, useId } from 'react';

type Locale = 'de' | 'en';

type Props = {
  locale?: Locale;
};

const COPY: Record<Locale, { greeting: string; subtitle: string; badge: string; skip: string }> = {
  de: {
    greeting: 'Hallo, ich bin Môra 🌱',
    subtitle: 'Deine Begleiterin für Klarheit im Wandel.',
    badge: 'Môra erwacht …',
    skip: 'Überspringen',
  },
  en: {
    greeting: "Hello, I'm Môra 🌱",
    subtitle: 'Your companion for clarity in transformation.',
    badge: 'Môra is waking up…',
    skip: 'Skip intro',
  },
};

const CONNECTION_ANGLES = [15, 110, 220, 310];

export default function MoraIntroAnimation({ locale = 'de' }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const [ready, setReady] = useState(false);
  const timeouts = useRef<number[]>([]);
  const gradientId = useId();

  const copy = useMemo(() => COPY[locale] ?? COPY.de, [locale]);

  const clearTimers = useCallback(() => {
    if (typeof window === 'undefined') return;
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];
  }, []);

  const markSeen = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('mora-intro-seen', 'true');
  }, []);

  const endIntro = useCallback(
    (delay = 500) => {
      if (typeof window === 'undefined') return;
      clearTimers();
      markSeen();
      const exitId = window.setTimeout(() => setIsVisible(false), delay);
      timeouts.current.push(exitId);
    },
    [clearTimers, markSeen],
  );

  const skipIntro = useCallback(() => {
    setPhase(3);
    endIntro(350);
  }, [endIntro]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const seen = window.localStorage.getItem('mora-intro-seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setReady(true);

    if (seen || prefersReducedMotion) {
      markSeen();
      return;
    }

    setIsVisible(true);
    setPhase(0);

    const schedule = (handler: () => void, delay: number) => {
      const id = window.setTimeout(handler, delay);
      timeouts.current.push(id);
    };

    schedule(() => setPhase(1), 1100);
    schedule(() => setPhase(2), 2200);
    schedule(() => setPhase(3), 3500);
    schedule(() => endIntro(650), 4300);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimers();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearTimers, endIntro, markSeen, skipIntro]);

  const orbAnimation = useMemo(() => {
    if (phase === 3) {
      return {
        scale: 0.32,
        opacity: 0.9,
        x: '32vw',
        y: '30vh',
      };
    }

    if (phase === 1) {
      return {
        scale: [1, 1.22, 1],
        opacity: 1,
      };
    }

    return {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
    };
  }, [phase]);

  const orbTransition = useMemo(() => {
    if (phase === 1) {
      return { duration: 1.4, ease: 'easeInOut', times: [0, 0.5, 1] };
    }

    if (phase === 3) {
      return { duration: 0.9, ease: 'easeInOut' };
    }

    return { duration: 0.8, ease: 'easeOut' };
  }, [phase]);

  if (!ready) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050b0c]/95"
          onClick={skipIntro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-label="Môra Intro Animation"
        >
          <button
            type="button"
            className="absolute top-6 right-6 rounded-full border border-white/30 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 transition hover:bg-white/10"
            onClick={(event) => {
              event.stopPropagation();
              skipIntro();
            }}
          >
            {copy.skip}
          </button>

          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={orbAnimation}
            transition={orbTransition}
          >
            <div
              className="absolute rounded-full blur-[70px]"
              style={{
                width: 220,
                height: 220,
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.75) 0%, transparent 70%)',
              }}
            />

            <div
              className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full border border-white/40 shadow-[0_0_50px_rgba(52,211,153,0.6)]"
              style={{
                background: 'linear-gradient(140deg, #10B981 0%, #06B6D4 100%)',
              }}
            >
              <div className="flex gap-6">
                <div className="h-8 w-6 rounded-full bg-white/90" />
                <div className="h-8 w-6 rounded-full bg-white/90" />
              </div>

              {phase >= 1 && (
                <motion.div
                  className="absolute -top-2 -right-2 text-white"
                  animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-9 w-9" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {phase >= 1 && phase < 3 && (
            <motion.div
              className="absolute top-2/3 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
            >
              <h2
                className="mb-3 text-4xl font-semibold text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {copy.greeting}
              </h2>
              <p className="text-base text-white/80">{copy.subtitle}</p>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm text-white/90 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {copy.badge}
            </motion.div>
          )}

          {phase >= 2 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              {CONNECTION_ANGLES.map((angle, index) => {
                const radius = 28;
                const x2 = 50 + Math.cos((angle * Math.PI) / 180) * radius;
                const y2 = 50 + Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.line
                    key={angle}
                    x1="50%"
                    y1="50%"
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0.4] }}
                    transition={{ duration: 0.8, delay: index * 0.12 }}
                  />
                );
              })}

              <defs>
                <linearGradient id={gradientId}>
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
