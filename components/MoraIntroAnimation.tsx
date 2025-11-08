'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

type Props = {
  locale: 'de' | 'en';
};

export default function MoraIntroAnimation({ locale }: Props) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size for exit animation
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Check if user has seen intro before
    const seen = localStorage.getItem('mora-intro-seen');
    if (!seen) {
      setShow(true);

      // Phase timings
      const timer1 = setTimeout(() => setPhase(1), 1000);  // Awakening
      const timer2 = setTimeout(() => setPhase(2), 2000);  // Connection
      const timer3 = setTimeout(() => setPhase(3), 3000);  // Exit - Flight to Avatar
      const timer4 = setTimeout(() => {
        setShow(false);
        localStorage.setItem('mora-intro-seen', 'true');
      }, 5200); // Extended to finish flight animation

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, []);

  // Skip intro on ESC or click
  const skipIntro = () => {
    setShow(false);
    localStorage.setItem('mora-intro-seen', 'true');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && show) {
        skipIntro();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling during intro
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  const content = {
    de: {
      greeting: 'Hallo, ich bin Môra',
      subtitle: 'Deine KI-Begleiterin für Klarheit',
      skip: 'Überspringen (ESC)'
    },
    en: {
      greeting: 'Hello, I\'m Môra',
      subtitle: 'Your AI companion for clarity',
      skip: 'Skip (ESC)'
    }
  }[locale];

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #0A1612 0%, #0E1A1B 50%, #0A1612 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={skipIntro}
        transition={{ duration: 0.5 }}
      >
        {/* Skip button */}
        <motion.button
          className="absolute top-8 right-8 text-white/60 hover:text-white text-sm font-medium transition-colors z-[10001] px-4 py-2 rounded-full backdrop-blur-sm"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {content.skip}
        </motion.button>

        {/* Ambient background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.3) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Main Orb Container */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: phase === 0 ? 1 : phase === 1 ? [1, 1.3, 1] : phase === 3 ? 0.25 : 1,
            x: phase === 3 ? (windowSize.width / 2) - 70 : 0,
            y: phase === 3 ? (windowSize.height / 2) - 70 : 0,
            opacity: phase === 3 ? 1 : 1
          }}
          transition={{
            duration: phase === 1 ? 1 : phase === 3 ? 1.8 : 0.8,
            ease: phase === 3 ? [0.22, 1, 0.36, 1] : "easeOut"
          }}
        >
          {/* Outer Glow */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              width: 240,
              height: 240,
              background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, rgba(212, 180, 131, 0.3) 40%, transparent 70%)',
              filter: 'blur(50px)'
            }}
            animate={{
              scale: phase >= 1 ? [1, 1.2, 1] : 1,
              opacity: phase >= 1 ? [0.6, 0.8, 0.6] : 0.6
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Core Orb */}
          <motion.div
            className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4B483 70%, #E6C897 100%)',
              boxShadow: '0 20px 60px rgba(212, 180, 131, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: '-200%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />

            {/* Môra Icon (simplified CPU/grid icon) */}
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 20 20"
              fill="white"
              className="relative z-10"
              animate={phase >= 1 ? {
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <path d="M13 7H7v6h6V7z"/>
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"/>
            </motion.svg>

            {/* Sparkles around orb */}
            {phase >= 1 && (
              <>
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px)`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Text Content */}
        {phase >= 1 && phase < 3 && (
          <motion.div
            className="absolute top-[60%] text-center max-w-2xl px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                textShadow: '0 4px 20px rgba(212, 180, 131, 0.5)'
              }}
              animate={{
                textShadow: [
                  '0 4px 20px rgba(212, 180, 131, 0.5)',
                  '0 4px 30px rgba(212, 180, 131, 0.8)',
                  '0 4px 20px rgba(212, 180, 131, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {content.greeting}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {content.subtitle}
            </motion.p>
          </motion.div>
        )}

        {/* Connection Lines (Lianen) */}
        {phase === 2 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 9999 }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(212, 180, 131, 0.8)" />
                <stop offset="100%" stopColor="rgba(74, 103, 65, 0.6)" />
              </linearGradient>
            </defs>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const centerX = 50;
              const centerY = 50;
              const length = 35;
              const endX = centerX + Math.cos((angle * Math.PI) / 180) * length;
              const endY = centerY + Math.sin((angle * Math.PI) / 180) * length;

              return (
                <motion.line
                  key={i}
                  x1={`${centerX}%`}
                  y1={`${centerY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: "easeOut"
                  }}
                />
              );
            })}

            {/* Connection endpoints (nodes) */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const centerX = 50;
              const centerY = 50;
              const length = 35;
              const endX = centerX + Math.cos((angle * Math.PI) / 180) * length;
              const endY = centerY + Math.sin((angle * Math.PI) / 180) * length;

              return (
                <motion.circle
                  key={`node-${i}`}
                  cx={`${endX}%`}
                  cy={`${endY}%`}
                  r="6"
                  fill="#D4B483"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08 + 0.3
                  }}
                />
              );
            })}
          </svg>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
