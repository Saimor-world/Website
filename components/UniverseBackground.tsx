'use client';

/**
 * UniverseBackground - Living Space Background
 * Adapted from SAIMÔR Universe OS for Website
 * 
 * Features:
 * - Animated twinkling stars (emerald/cyan/white)
 * - Lighter green nebula gradient
 * - Neural grid overlay (Tesla/SpaceX style)
 * - Performance optimized with CSS animations
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface UniverseBackgroundProps {
  /** Intensity of the effect (0.5 = subtle, 1 = full) */
  intensity?: number;
  /** Show neural grid overlay */
  showGrid?: boolean;
}

export function UniverseBackground({ 
  intensity = 1, 
  showGrid = true 
}: UniverseBackgroundProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stars once on mount
  const stars = useMemo(() => {
    if (!mounted) return [];
    const count = Math.floor(20 * intensity); // Reduced to 20 stars
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      color: i % 2 === 0 
        ? 'rgba(16, 185, 129, 0.7)' // Emerald
        : 'rgba(255, 255, 255, 0.6)' // White
    }));
  }, [mounted, intensity]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base - Space Black with Emerald Tint */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #081410 0%, #020504 100%)'
        }}
      />

      {/* Nebula Glow - Lighter Green (Universe OS Style) */}
      <motion.div
        animate={{
          opacity: [0.15, 0.20, 0.15],
          scale: [1.0, 1.02, 1.0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(16, 185, 129, ${0.12 * intensity}) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6, 182, 212, ${0.08 * intensity}) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(212, 175, 55, ${0.05 * intensity}) 0%, transparent 40%)
          `
        }}
      />

      {/* Animated Twinkling Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px ${star.color.replace('0.9', '0.3').replace('0.8', '0.3').replace('0.7', '0.3')}`
            }}
            animate={{
              opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Neural Grid Overlay (Tesla/SpaceX Style) */}
      {showGrid && (
        <div className="absolute inset-0">
          {/* Subtle scanning lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, ${0.1 * intensity}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, ${0.1 * intensity}) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
            animate={{
              opacity: [0.02, 0.04, 0.02]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Scanning beam effect */}
          <motion.div
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent blur-[2px]"
            style={{ top: '30%' }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      )}

      {/* Soft Vignette */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
}

