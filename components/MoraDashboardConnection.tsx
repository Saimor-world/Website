'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MoraDashboardConnection() {
  const [mounted, setMounted] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [dashboardInView, setDashboardInView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track if dashboard is in view
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id === 'mora-showcase' || entry.target.querySelector('[id*="dashboard"]')) {
            setDashboardInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe the dashboard section
    const dashboardElement = document.querySelector('#mora-showcase') ||
                            document.querySelector('[id*="dashboard"]');

    if (dashboardElement) {
      observer.observe(dashboardElement);
    }

    return () => observer.disconnect();
  }, [mounted]);

  // Show connection when dashboard is in view
  useEffect(() => {
    if (dashboardInView) {
      const timer = setTimeout(() => setShowConnection(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowConnection(false);
    }
  }, [dashboardInView]);

  if (!mounted || !showConnection) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Floating light particles from Orb to Dashboard */}
      <AnimatePresence>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: 'radial-gradient(circle, #D4B483 0%, transparent 70%)',
              boxShadow: '0 0 8px rgba(212, 180, 131, 0.6)',
              right: '5.5rem', // Near the orb (bottom-6 right-6 + half of w-20)
              bottom: '4.5rem'
            }}
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: [0, -200 - i * 100, -400 - i * 150],
              y: [0, -300 - i * 80, -600 - i * 120]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Subtle glow pulse near orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '120px',
          height: '120px',
          right: '1rem',
          bottom: '1rem',
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tooltip hint */}
      <motion.div
        className="absolute bottom-32 right-8 px-4 py-2 rounded-xl text-xs font-medium"
        style={{
          background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 100%)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(212, 180, 131, 0.4)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          color: '#fff'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4B483] animate-pulse" />
          <span>Mit Dashboard verbunden</span>
        </div>
      </motion.div>
    </div>
  );
}
