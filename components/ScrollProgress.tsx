'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [particles, setParticles] = useState<Array<{ id: number; position: number }>>([]);

  useEffect(() => {
    // Create flowing particles along the progress bar
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = prev
          .map(p => ({ ...p, position: p.position + 0.02 }))
          .filter(p => p.position < 1);

        // Add new particle occasionally
        if (Math.random() > 0.7) {
          newParticles.push({ id: Date.now(), position: 0 });
        }

        return newParticles.slice(-5); // Keep max 5 particles
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Progress Bar Background */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-saimor-green/20 via-saimor-gold/20 to-saimor-green/20 z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[9999]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #4A6741 0%, #D4B483 50%, #4A6741 100%)',
          boxShadow: '0 0 10px rgba(212, 180, 131, 0.5)'
        }}
      />

      {/* Flowing Data Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed top-0 w-3 h-3 rounded-full z-[9999] pointer-events-none"
          style={{
            left: `${particle.position * 100}%`,
            background: 'radial-gradient(circle, #D4B483 0%, #4A6741 100%)',
            boxShadow: '0 0 8px rgba(212, 180, 131, 0.8)',
            marginTop: '-5px'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
}
