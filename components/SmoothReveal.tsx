'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
}

/**
 * SmoothReveal - Elegante Scroll-triggered Animations
 * Disney/Pixar-Style: smooth, organic, nicht hektisch
 */
export default function SmoothReveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  className = ''
}: Props) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    fade: { x: 0, y: 0 }
  };

  const initial = {
    opacity: 0,
    ...directions[direction]
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for organic feel
        type: 'spring',
        stiffness: 50,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
