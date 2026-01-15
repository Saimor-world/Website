'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, useId } from 'react';

type Locale = 'de' | 'en';

type Props = {
  locale?: Locale;
};

const COPY: Record<Locale, {
  greeting: string;
  subtitle: string;
  badge: string;
  skip: string;
  systemInit: string[];
  readyMessage: string;
}> = {
  de: {
    greeting: 'Hallo, ich bin Môra',
    subtitle: 'Dein semantisches Gedächtnis für Klarheit im Wandel.',
    badge: 'System erwacht',
    skip: 'Überspringen',
    systemInit: [
      'Initialisiere semantische Schichten...',
      'Verbinde Wissensnetzwerke...',
      'Aktiviere Mustererkennug...',
      'Lade Kontextmodelle...',
      'Synchronisiere Datenströme...',
    ],
    readyMessage: 'Bereit für dich.',
  },
  en: {
    greeting: "Hello, I'm Môra",
    subtitle: 'Your semantic memory for clarity in transformation.',
    badge: 'System awakening',
    skip: 'Skip intro',
    systemInit: [
      'Initializing semantic layers...',
      'Connecting knowledge networks...',
      'Activating pattern recognition...',
      'Loading context models...',
      'Synchronizing data streams...',
    ],
    readyMessage: 'Ready for you.',
  },
};

// Floating particles for ambient effect
const FloatingParticle = ({ delay, duration, size }: { delay: number; duration: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
      y: [0, -100, -200],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

// Connection line component
const ConnectionLine = ({
  angle,
  gradientId,
  delay,
}: {
  angle: number;
  gradientId: string;
  delay: number;
}) => {
  const radius = 35;
  const x2 = 50 + Math.cos((angle * Math.PI) / 180) * radius;
  const y2 = 50 + Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.line
      x1="50%"
      y1="50%"
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={`url(#${gradientId})`}
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 0.8, 0.4] }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    />
  );
};

const CONNECTION_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function MoraIntroAnimation({ locale = 'de' }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const [ready, setReady] = useState(false);
  const [currentInitLine, setCurrentInitLine] = useState(0);
  const [typedText, setTypedText] = useState('');
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
    setPhase(5);
    endIntro(300);
  }, [endIntro]);

  // Typewriter effect for system init lines
  useEffect(() => {
    if (phase !== 2 || currentInitLine >= copy.systemInit.length) return;
    
    const line = copy.systemInit[currentInitLine];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setTypedText(line.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentInitLine(prev => prev + 1);
          setTypedText('');
        }, 300);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [phase, currentInitLine, copy.systemInit]);

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

    // Phase 0: Initial darkness (0-800ms)
    // Phase 1: Orb appears with glow (800-2000ms)
    schedule(() => setPhase(1), 800);
    // Phase 2: System init text (2000-5000ms)
    schedule(() => setPhase(2), 2000);
    // Phase 3: Connections form (5000-6500ms)
    schedule(() => setPhase(3), 5000);
    // Phase 4: Greeting message (6500-8500ms)
    schedule(() => setPhase(4), 6500);
    // Phase 5: Exit animation (8500ms+)
    schedule(() => setPhase(5), 8500);
    schedule(() => endIntro(800), 9300);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === ' ') {
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
    if (phase === 5) {
      return {
        scale: 0.2,
        opacity: 0,
        y: '-50vh',
      };
    }

    if (phase >= 1) {
      return {
        scale: [0.8, 1.05, 1],
        opacity: 1,
      };
    }

    return {
      scale: 0.5,
      opacity: 0,
    };
  }, [phase]);

  if (!ready) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          onClick={skipIntro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="dialog"
          aria-label="Môra Intro Animation"
        >
          {/* Deep space background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #071a12 0%, #030a07 50%, #000 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Animated star field */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <FloatingParticle
                key={i}
                delay={i * 0.3}
                duration={4 + Math.random() * 3}
                size={2 + Math.random() * 4}
              />
            ))}
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Skip button */}
          <motion.button
            type="button"
            className="absolute top-6 right-6 z-50 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/50 transition-all hover:bg-white/10 hover:text-white/80 hover:border-white/30"
            onClick={(event) => {
              event.stopPropagation();
              skipIntro();
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copy.skip} [ESC]
          </motion.button>

          {/* Central Orb */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={orbAnimation}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer glow rings */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 350,
                height: 350,
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute rounded-full"
              style={{
                width: 280,
                height: 280,
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Main orb */}
            <motion.div
              className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full shadow-[0_0_80px_rgba(16,185,129,0.5),0_0_120px_rgba(6,182,212,0.3)]"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #06B6D4 100%)',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
              animate={{
                boxShadow: phase >= 2
                  ? [
                      '0 0 80px rgba(16,185,129,0.5), 0 0 120px rgba(6,182,212,0.3)',
                      '0 0 100px rgba(16,185,129,0.7), 0 0 150px rgba(6,182,212,0.5)',
                      '0 0 80px rgba(16,185,129,0.5), 0 0 120px rgba(6,182,212,0.3)',
                    ]
                  : '0 0 60px rgba(16,185,129,0.4), 0 0 100px rgba(6,182,212,0.2)',
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-2 rounded-full opacity-50"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                }}
              />

              {/* Eyes */}
              <div className="flex gap-6">
                <motion.div
                  className="h-8 w-5 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  animate={phase >= 2 ? {
                    scaleY: [1, 0.1, 1],
                  } : {}}
                  transition={{ duration: 0.15, delay: 3, repeat: phase >= 2 ? 1 : 0, repeatDelay: 4 }}
                />
                <motion.div
                  className="h-8 w-5 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  animate={phase >= 2 ? {
                    scaleY: [1, 0.1, 1],
                  } : {}}
                  transition={{ duration: 0.15, delay: 3, repeat: phase >= 2 ? 1 : 0, repeatDelay: 4 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* System Init Terminal */}
          {phase === 2 && currentInitLine < copy.systemInit.length && (
            <motion.div
              className="absolute bottom-[25%] left-1/2 -translate-x-1/2 font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 text-emerald-400/80">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ▸
                </motion.span>
                <span>{typedText}</span>
                <motion.span
                  className="inline-block w-2 h-4 bg-emerald-400/80"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}

          {/* Connection Lines */}
          {phase >= 3 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              {CONNECTION_ANGLES.map((angle, index) => (
                <ConnectionLine
                  key={angle}
                  angle={angle}
                  gradientId={gradientId}
                  delay={index * 0.08}
                />
              ))}

              <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Badge */}
          {phase >= 1 && phase < 4 && (
            <motion.div
              className="absolute top-[15%] left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm">
                <motion.div
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-medium uppercase tracking-widest text-emerald-300/80">
                  {copy.badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* Main Greeting */}
          {phase >= 4 && phase < 5 && (
            <motion.div
              className="absolute bottom-[20%] text-center px-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h2
                className="mb-4 text-4xl md:text-5xl font-semibold text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {copy.greeting}
                <motion.span
                  className="inline-block ml-3"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
                >
                  🌱
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-lg text-white/70 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {copy.subtitle}
              </motion.p>
              <motion.p
                className="mt-6 text-sm text-emerald-400/80 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {copy.readyMessage}
              </motion.p>
            </motion.div>
          )}

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
          >
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className="h-1 rounded-full"
                style={{
                  width: 24,
                  backgroundColor: phase >= step ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255,255,255,0.2)',
                }}
                animate={{
                  backgroundColor: phase >= step ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255,255,255,0.2)',
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
