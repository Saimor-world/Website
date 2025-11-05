'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * HeroAmbient - Wald-/Licht-Stimmung für filmischen Hero
 * Rein CSS-basiert (kein Video), optimiert für Performance
 */
export default function HeroAmbient() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base Gradient - Deep Forest */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(14, 26, 27, 0.98) 0%,
              rgba(26, 46, 38, 0.95) 20%,
              rgba(15, 30, 24, 0.97) 50%,
              rgba(26, 46, 38, 0.95) 80%,
              rgba(14, 26, 27, 0.98) 100%
            )
          `
        }}
      />

      {/* Atmospheric Layers - Subtle Light Rays */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 0.6 : [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 20% 30%,
              rgba(139, 181, 129, 0.12) 0%,
              transparent 50%
            ),
            radial-gradient(ellipse 100% 70% at 80% 60%,
              rgba(212, 180, 131, 0.08) 0%,
              transparent 50%
            )
          `,
          mixBlendMode: 'screen'
        }}
      />

      {/* Floating Light Particles */}
      {!prefersReducedMotion && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background:
                  i % 3 === 0
                    ? 'rgba(212, 180, 131, 0.4)'
                    : i % 3 === 1
                    ? 'rgba(139, 181, 129, 0.3)'
                    : 'rgba(230, 200, 151, 0.25)',
                boxShadow: `0 0 ${8 + i * 2}px currentColor`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -(30 + i * 10), 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 6 + i * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
            />
          ))}
        </>
      )}

      {/* Organic Glow Orbs - Background Depth */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          top: '20%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.3, 0.15],
                x: [0, 40, 0],
                y: [0, -50, 0]
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-[28rem] h-[28rem] rounded-full opacity-15 pointer-events-none"
        style={{
          bottom: '25%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(139, 181, 129, 0.35) 0%, transparent 70%)',
          filter: 'blur(90px)'
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.25, 0.12],
                x: [0, -30, 0],
                y: [0, 40, 0]
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vignette - Frame the scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center,
              transparent 0%,
              transparent 40%,
              rgba(14, 26, 27, 0.4) 80%,
              rgba(14, 26, 27, 0.7) 100%
            )
          `
        }}
      />

      {/* Subtle Noise Texture (optional enhancement) */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
}
