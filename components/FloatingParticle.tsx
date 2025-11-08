'use client';
import { motion } from 'framer-motion';

interface Props {
  color?: string;
  delay?: number;
  duration?: number;
  size?: number;
  x?: number;
  y?: number;
}

/**
 * FloatingParticle - Schwebende Lichtpartikel für Ambient-Effekte
 * Einzelner Partikel mit organischer Bewegung
 */
export default function FloatingParticle({
  color = 'rgba(212, 180, 131, 0.6)',
  delay = 0,
  duration = 4,
  size = 8,
  x = 0,
  y = 0
}: Props) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        left: `${x}%`,
        top: `${y}%`
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.8, 0.4]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}
