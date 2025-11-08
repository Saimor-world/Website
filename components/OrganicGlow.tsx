'use client';
import { motion } from 'framer-motion';

interface Props {
  color?: 'gold' | 'green' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

/**
 * OrganicGlow - Organische Licht-Orbs für atmosphärischen Hintergrund
 * Ergänzt HeroAmbient für weitere Sections
 */
export default function OrganicGlow({
  color = 'gold',
  size = 'md',
  intensity = 'medium',
  className = ''
}: Props) {
  const colors = {
    gold: 'rgba(212, 180, 131, 0.6)',
    green: 'rgba(74, 103, 65, 0.5)',
    white: 'rgba(255, 255, 255, 0.4)'
  };

  const sizes = {
    sm: '128px',
    md: '256px',
    lg: '384px',
    xl: '512px'
  };

  const opacities = {
    subtle: [0.1, 0.2, 0.1],
    medium: [0.15, 0.3, 0.15],
    strong: [0.2, 0.4, 0.2]
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: sizes[size],
        height: sizes[size],
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: 'blur(60px)'
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: opacities[intensity]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}
