'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

type Locale = 'de' | 'en';

interface Props {
  locale?: Locale;
}

export default function MoraIntroAnimation({ locale = 'de' }: Props) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

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
  }, []);

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
      greeting: 'Hallo, ich bin Môra',
      subtitle: 'Deine KI-Begleiterin für Klarheit'
    },
    en: {
      greeting: 'Hello, I\'m Môra',
      subtitle: 'Your AI companion for clarity'
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
          <motion.div
            className="absolute top-8 right-8 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {locale === 'de' ? 'ESC oder Klick zum Überspringen' : 'ESC or click to skip'}
          </motion.div>

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
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />

            {/* Core Orb */}
            <div
              className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)'
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

              {/* Sparkles */}
              {phase >= 1 && (
                <>
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4"
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-[#D4B483]" />
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
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {content.greeting}
              </h2>
              <p className="text-lg md:text-xl text-[#D4B483]/80">
                {content.subtitle}
              </p>
            </motion.div>
          )}

          {/* Connection Lines */}
          {phase === 2 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + Math.cos(angle * Math.PI / 180) * 30}%`}
                  y2={`${50 + Math.sin(angle * Math.PI / 180) * 30}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
              <defs>
                <linearGradient id="connectionGradient">
                  <stop offset="0%" stopColor="#D4B483" />
                  <stop offset="100%" stopColor="#4A6741" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
