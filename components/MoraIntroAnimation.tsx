'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

type Locale = 'de' | 'en';

interface Props {
  locale?: Locale;
}

export default function MoraIntroAnimation({ locale = 'de' }: Props) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);

  // First mount - prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Then check localStorage only after mounted
  useEffect(() => {
    if (!mounted) return;

    const seen = localStorage.getItem('mora-intro-seen');
    if (!seen) {
      setShow(true);

      // Phase timings
      setTimeout(() => setPhase(1), 1000);  // Awakening
      setTimeout(() => setPhase(2), 2000);  // Connection
      setTimeout(() => setPhase(3), 3000);  // Exit
      setTimeout(() => {
        setShow(false);
        localStorage.setItem('mora-intro-seen', 'true');
      }, 4000);
    }
  }, [mounted]);

  // Handle skip (ESC key or click)
  useEffect(() => {
    if (!show) return;

    const handleSkip = () => {
      setShow(false);
      localStorage.setItem('mora-intro-seen', 'true');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show]);

  const content = {
    de: {
      greeting: 'Hallo, ich bin Môra 🌱',
      subtitle: 'Deine KI-Begleiterin für Klarheit',
      skip: 'ESC oder Klick zum Überspringen'
    },
    en: {
      greeting: 'Hello, I\'m Môra 🌱',
      subtitle: 'Your AI companion for clarity',
      skip: 'ESC or click to skip'
    }
  }[locale];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center cursor-pointer"
          style={{ background: '#0A1612' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setShow(false);
            localStorage.setItem('mora-intro-seen', 'true');
          }}
          role="dialog"
          aria-label="Môra introduction animation"
        >
          {/* Skip hint */}
          <motion.p
            className="absolute top-8 right-8 text-sm text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {content.skip}
          </motion.p>

          {/* Orb */}
          <motion.div
            className="relative pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 0 ? 1 : phase === 1 ? [1, 1.3, 1] : phase === 3 ? 0.3 : 1,
              x: phase === 3 ? (typeof window !== 'undefined' ? window.innerWidth * 0.4 : 400) : 0,
              y: phase === 3 ? (typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300) : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Glow - pulsing effect */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, rgba(212, 180, 131, 0.2) 50%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%'
              }}
              animate={{
                scale: phase === 1 ? [1, 1.2, 1] : 1,
                opacity: phase === 1 ? [0.6, 0.9, 0.6] : 0.6
              }}
              transition={{
                duration: 2,
                repeat: phase === 1 ? Infinity : 0,
                repeatType: 'mirror',
                ease: 'easeInOut'
              }}
            />

            {/* Core Orb */}
            <div
              className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4B483 100%)',
                boxShadow: '0 0 60px rgba(212, 180, 131, 0.5), inset 0 2px 20px rgba(255,255,255,0.3)'
              }}
            >
              {/* Eyes */}
              <div className="flex gap-6">
                <motion.div
                  className="w-6 h-8 bg-white rounded-full"
                  animate={phase >= 1 ? { scaleY: [1, 0.1, 1] } : {}}
                  transition={{ duration: 0.3, repeat: 3, repeatDelay: 2 }}
                />
                <motion.div
                  className="w-6 h-8 bg-white rounded-full"
                  animate={phase >= 1 ? { scaleY: [1, 0.1, 1] } : {}}
                  transition={{ duration: 0.3, repeat: 3, repeatDelay: 2 }}
                />
              </div>

              {/* Sparkles - Disney magic! */}
              {phase >= 1 && (
                <>
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-8 h-8 text-white/80" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-6 left-5"
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6 text-[#D4B483]/70" />
                  </motion.div>
                  <motion.div
                    className="absolute top-8 left-6"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 text-white/60" />
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>

          {/* Text */}
          {phase >= 1 && phase < 3 && (
            <motion.div
              className="absolute top-2/3 text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-4xl sm:text-5xl font-bold text-white mb-3"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              >
                {content.greeting}
              </h2>
              <p
                className="text-lg sm:text-xl"
                style={{
                  color: 'rgba(212, 180, 131, 0.9)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                {content.subtitle}
              </p>
            </motion.div>
          )}

          {/* Connection Lines - 6 lines like mycelium network */}
          {phase === 2 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4B483" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4A6741" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const x1 = 50;
                const y1 = 50;
                const x2 = 50 + Math.cos(angle * Math.PI / 180) * 35;
                const y2 = 50 + Math.sin(angle * Math.PI / 180) * 35;

                return (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
              {/* Connection dots at endpoints */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const x = 50 + Math.cos(angle * Math.PI / 180) * 35;
                const y = 50 + Math.sin(angle * Math.PI / 180) * 35;

                return (
                  <motion.circle
                    key={`dot-${i}`}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="#D4B483"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.5 + i * 0.08
                    }}
                  />
                );
              })}
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
