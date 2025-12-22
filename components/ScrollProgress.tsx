'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 40,
    restDelta: 0.001
  });

  const [particles, setParticles] = useState<Array<{ id: number; position: number }>>([]);

  useEffect(() => {
    // Create flowing particles along the progress bar (ruhiger)
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = prev
          .map(p => ({ ...p, position: p.position + 0.008 }))
          .filter(p => p.position < 1);

        // Add new particle occasionally (weniger häufig)
        if (Math.random() > 0.85) {
          newParticles.push({ id: Date.now(), position: 0 });
        }

        return newParticles.slice(-3); // Keep max 3 particles (weniger)
      });
    }, 200);

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
          background: 'linear-gradient(90deg, #4A6741 0%, #D4A857 50%, #4A6741 100%)',
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
            background: 'radial-gradient(circle, #D4A857 0%, #4A6741 100%)',
            boxShadow: '0 0 8px rgba(212, 180, 131, 0.8)',
            marginTop: '-5px'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
}
