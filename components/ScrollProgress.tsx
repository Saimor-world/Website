'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-px bg-white/[0.035]" />
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-px origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, rgba(214,168,72,.78) 0%, rgba(127,212,193,.82) 100%)',
          boxShadow: '0 0 12px rgba(127,212,193,.18)',
        }}
      />
    </>
  );
}
