'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Progress Bar Background */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[9999] pointer-events-none" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999] pointer-events-none"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)'
        }}
      />

      {/* Simple CSS-based pulsing indicator - much smoother */}
      <div className="fixed top-1 left-2 flex items-center gap-1.5 z-[9999] pointer-events-none">
        <div className="scroll-dot scroll-dot-1" />
        <div className="scroll-dot scroll-dot-2" />
        <div className="scroll-dot scroll-dot-3" />
      </div>

      <style jsx>{`
        .scroll-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 8px #10B981;
          animation: pulse 2s ease-in-out infinite;
        }
        .scroll-dot-1 { animation-delay: 0s; }
        .scroll-dot-2 { animation-delay: 0.3s; }
        .scroll-dot-3 { animation-delay: 0.6s; }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
}
