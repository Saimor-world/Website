'use client';

/**
 * MoraOrbWebsite - Simplified Orb for Website
 * Adapted from SAIMÔR Universe OS
 * 
 * Features:
 * - Pulsing animations based on state
 * - Demo mode (purple pulse)
 * - Fixed bottom-right position
 * - Click handler for interactions
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface MoraOrbWebsiteProps {
  /** Orb state */
  state?: 'idle' | 'demo' | 'thinking' | 'active';
  /** Click handler */
  onClick?: () => void;
  /** Size in pixels */
  size?: number;
}

export function MoraOrbWebsite({ 
  state = 'demo', 
  onClick,
  size = 80
}: MoraOrbWebsiteProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // State-based colors
  const getStateParams = () => {
    switch (state) {
      case 'active':
        return {
          color: '#10B981', // Emerald green
          glow: 'rgba(16, 185, 129, 0.6)',
          duration: 2.0,
          icon: '#D4AF37'
        };
      case 'thinking':
        return {
          color: '#3B82F6', // Blue
          glow: 'rgba(59, 130, 246, 0.6)',
          duration: 1.5,
          icon: '#3B82F6'
        };
      case 'demo':
        return {
          color: '#A855F7', // Purple
          glow: 'rgba(168, 85, 247, 0.6)',
          duration: 3.0,
          icon: '#D4A857'
        };
      case 'idle':
      default:
        return {
          color: '#4A6741', // Dark green
          glow: 'rgba(74, 103, 65, 0.4)',
          duration: 4.0,
          icon: '#4A6741'
        };
    }
  };

  const params = getStateParams();

  return (
    <motion.div
      className="fixed z-50 cursor-pointer group"
      style={{
        bottom: '48px',
        right: '48px',
        width: size,
        height: size
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${params.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: params.duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Orb Body */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${params.color}FF 0%, ${params.color}CC 50%, ${params.color}88 100%)`,
          boxShadow: `
            0 8px 24px ${params.glow},
            0 0 30px ${params.glow},
            inset 0 2px 4px rgba(255,255,255,0.2)
          `,
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: params.duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Inner glow pulse */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${params.glow} 0%, transparent 70%)`,
            opacity: 0.6
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Sparkles Icon */}
        <Sparkles 
          className="relative z-10 text-white drop-shadow-lg" 
          size={size * 0.35}
          style={{ color: params.icon }}
        />
      </motion.div>

      {/* Demo Badge */}
      <AnimatePresence>
        {state === 'demo' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(168, 85, 247, 0.9)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)'
            }}
          >
            Demo
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-full right-0 mb-4 px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(212, 180, 131, 0.4)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
        }}
      >
        <p className="text-sm font-medium text-white">Môra Intelligence</p>
        <p className="text-xs text-white/60">Click for Dashboard</p>
      </motion.div>
    </motion.div>
  );
}

