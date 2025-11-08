'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  offset?: number;
  className?: string;
}

/**
 * ParallaxSection - Adds subtle parallax depth to sections
 * Filmische Tiefe durch scroll-basierte Bewegung
 */
export default function ParallaxSection({ children, offset = 50, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
