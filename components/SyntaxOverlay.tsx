'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * SyntaxOverlay - Pfadästhetik wie ein Dateisystem
 * Zeigt organische "Pfade" als subtile Overlays
 */

const paths = [
  '/mora/core/001',
  '/mora/network/pulse/042',
  '/mora/resonance/active',
  '/mora/field/clarity',
  '/mora/breath/cycle/3',
  '/mora/connection/nodes/12'
];

export default function SyntaxOverlay() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activePaths, setActivePaths] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * paths.length);
      setActivePaths((prev) => {
        const newPaths = [...prev, randomIndex];
        // Keep max 3 visible
        return newPaths.slice(-3);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top-left syntax */}
      <motion.div
        className="absolute top-8 left-8 font-mono text-xs opacity-0"
        initial={{ opacity: 0, x: -20 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.3, x: 0 }
            : {
                opacity: [0, 0.4, 0.4, 0],
                x: [-20, 0, 0, 20]
              }
        }
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 4 }}
        style={{
          color: 'rgba(212, 180, 131, 0.7)',
          textShadow: '0 0 10px rgba(212, 180, 131, 0.5)'
        }}
      >
        {paths[0]}
      </motion.div>

      {/* Top-right syntax */}
      <motion.div
        className="absolute top-12 right-12 font-mono text-xs opacity-0"
        initial={{ opacity: 0, x: 20 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.25, x: 0 }
            : {
                opacity: [0, 0.35, 0.35, 0],
                x: [20, 0, 0, -20]
              }
        }
        transition={{ duration: 7, repeat: Infinity, repeatDelay: 3, delay: 1.5 }}
        style={{
          color: 'rgba(139, 181, 129, 0.6)',
          textShadow: '0 0 8px rgba(139, 181, 129, 0.4)'
        }}
      >
        {paths[1]}
      </motion.div>

      {/* Bottom-left syntax */}
      <motion.div
        className="absolute bottom-16 left-16 font-mono text-xs opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.28, y: 0 }
            : {
                opacity: [0, 0.38, 0.38, 0],
                y: [20, 0, 0, -10]
              }
        }
        transition={{ duration: 6.5, repeat: Infinity, repeatDelay: 5, delay: 2 }}
        style={{
          color: 'rgba(230, 200, 151, 0.65)',
          textShadow: '0 0 10px rgba(230, 200, 151, 0.45)'
        }}
      >
        {paths[2]}
      </motion.div>

      {/* Dynamic paths from activity */}
      {activePaths.map((pathIndex, i) => (
        <motion.div
          key={`${pathIndex}-${i}`}
          className="absolute font-mono text-xs"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            color: 'rgba(212, 180, 131, 0.6)',
            textShadow: '0 0 8px rgba(212, 180, 131, 0.5)'
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1, 1.1], y: [10, 0, -10] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          {paths[pathIndex]}
        </motion.div>
      ))}

      {/* Connection lines between syntax (subtle) */}
      {!prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.line
            x1="10%"
            y1="5%"
            x2="30%"
            y2="50%"
            stroke="rgba(212, 180, 131, 0.3)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="90%"
            y1="8%"
            x2="70%"
            y2="45%"
            stroke="rgba(139, 181, 129, 0.25)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </svg>
      )}
    </div>
  );
}
