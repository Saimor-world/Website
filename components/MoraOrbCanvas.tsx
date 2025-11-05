'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * MoraOrbCanvas - 3D-artiger Orb mit Atmung, Augen (Blinzeln), Flug-Animation
 * Disney/Pixar-Stil, aber ruhig & edel
 */

interface Props {
  onComplete?: () => void;
}

export default function MoraOrbCanvas({ onComplete }: Props) {
  const [phase, setPhase] = useState<'flight' | 'landing' | 'breathing'>('flight');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('breathing');
      onComplete?.();
      return;
    }

    // Animation sequence
    const flightTimer = setTimeout(() => setPhase('landing'), 2000);
    const landingTimer = setTimeout(() => {
      setPhase('breathing');
      onComplete?.();
    }, 3500);

    return () => {
      clearTimeout(flightTimer);
      clearTimeout(landingTimer);
    };
  }, [prefersReducedMotion, onComplete]);

  return (
    <div className="relative flex items-center justify-center h-[400px]" aria-label="Môra presence">
      {/* Particle Trail during flight */}
      {phase === 'flight' && !prefersReducedMotion && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? 'rgba(212, 180, 131, 0.6)' : 'rgba(139, 181, 129, 0.5)',
                boxShadow: '0 0 8px currentColor',
                left: `${30 + i * 8}%`,
                top: `${20 + i * 5}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                y: [0, 60, 120]
              }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* Main Orb */}
      <motion.div
        className="relative pointer-events-auto cursor-pointer"
        initial={prefersReducedMotion ? { scale: 1, y: 0 } : { scale: 0.3, y: -200, x: -100, opacity: 0 }}
        animate={
          phase === 'flight' && !prefersReducedMotion
            ? { scale: 0.8, y: -50, x: 0, opacity: 1 }
            : phase === 'landing' && !prefersReducedMotion
            ? { scale: 1, y: 0, x: 0 }
            : { scale: 1, y: 0, x: 0, opacity: 1 }
        }
        transition={{
          duration: phase === 'flight' ? 2 : 1.5,
          ease: phase === 'flight' ? [0.34, 1.56, 0.64, 1] : 'easeOut'
        }}
        whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
        onClick={() => {
          // Open Môra Chat
          const chatButton = document.querySelector('[aria-label*="Môra"]');
          if (chatButton instanceof HTMLElement) chatButton.click();
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          style={{
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.5) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Core Orb - Gradient Sphere */}
        <motion.div
          className="relative rounded-full flex items-center justify-center overflow-hidden"
          style={{
            width: 180,
            height: 180,
            background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4B483 70%, #E6C897 100%)',
            boxShadow: `
              0 20px 60px rgba(74, 103, 65, 0.4),
              inset 0 -30px 40px rgba(0, 0, 0, 0.3),
              inset 0 30px 40px rgba(255, 255, 255, 0.15)
            `
          }}
          animate={
            prefersReducedMotion
              ? {}
              : phase === 'breathing'
              ? {
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 20px 60px rgba(74, 103, 65, 0.4), inset 0 -30px 40px rgba(0, 0, 0, 0.3), inset 0 30px 40px rgba(255, 255, 255, 0.15)',
                    '0 25px 70px rgba(74, 103, 65, 0.5), inset 0 -30px 40px rgba(0, 0, 0, 0.25), inset 0 30px 40px rgba(255, 255, 255, 0.2)',
                    '0 20px 60px rgba(74, 103, 65, 0.4), inset 0 -30px 40px rgba(0, 0, 0, 0.3), inset 0 30px 40px rgba(255, 255, 255, 0.15)'
                  ]
                }
              : {}
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Highlight - 3D effect */}
          <div
            className="absolute rounded-full"
            style={{
              top: '15%',
              left: '20%',
              width: '35%',
              height: '35%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
              filter: 'blur(15px)'
            }}
          />

          {/* Eyes Container */}
          <div className="relative flex gap-8 z-10">
            {/* Left Eye */}
            <motion.div
              className="relative"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1],
                      y: [0, 0, 0, -2, 2, 0]
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 1]
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: 22,
                  height: 28,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Pupil */}
                <motion.div
                  className="absolute top-1/2 left-1/2 rounded-full bg-slate-800"
                  style={{
                    width: 10,
                    height: 10,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          x: [0, 2, -2, 0],
                          y: [0, 1, -1, 0]
                        }
                  }
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>

            {/* Right Eye */}
            <motion.div
              className="relative"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1],
                      y: [0, 0, 0, -2, 2, 0]
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 1],
                delay: 0.05
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: 22,
                  height: 28,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Pupil */}
                <motion.div
                  className="absolute top-1/2 left-1/2 rounded-full bg-slate-800"
                  style={{
                    width: 10,
                    height: 10,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          x: [0, 2, -2, 0],
                          y: [0, 1, -1, 0]
                        }
                  }
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Sparkles around orb */}
          {phase === 'breathing' && !prefersReducedMotion && (
            <>
              <motion.div
                className="absolute"
                style={{ top: '10%', right: '15%' }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute"
                style={{ bottom: '12%', left: '18%' }}
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-[#D4B483]" />
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Hover hint */}
      {phase === 'breathing' && (
        <motion.div
          className="absolute bottom-0 text-center text-white/60 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Klicke mich an
        </motion.div>
      )}
    </div>
  );
}
