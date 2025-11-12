'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MoraDashboardConnection() {
  const [mounted, setMounted] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [dashboardInView, setDashboardInView] = useState(false);
  const [orbHovering, setOrbHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }
    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOrbHover = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail;
      setOrbHovering(Boolean(detail));
    };
    window.addEventListener('mora-orb-hover', handleOrbHover as EventListener);
    return () => window.removeEventListener('mora-orb-hover', handleOrbHover as EventListener);
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
    if (dashboardInView && orbHovering && !prefersReducedMotion) {
      const timer = setTimeout(() => setShowConnection(true), 150);
      return () => clearTimeout(timer);
    }
    setShowConnection(false);
  }, [dashboardInView, orbHovering, prefersReducedMotion]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {showConnection && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="moraBridgeGradient" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#D4B483" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4A6741" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <motion.path
              d="M90 82 C 76 66, 65 52, 52 36"
              stroke="url(#moraBridgeGradient)"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            <motion.circle
              r="1.4"
              fill="#F4D9A5"
              initial={{ opacity: 0, cx: 90, cy: 82 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [90, 70, 55],
                cy: [82, 62, 40]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          <motion.div
            className="absolute rounded-full"
            style={{
              width: '120px',
              height: '120px',
              right: '1rem',
              bottom: '1rem',
              background: 'radial-gradient(circle, rgba(212, 180, 131, 0.18) 0%, transparent 70%)',
              filter: 'blur(16px)'
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute bottom-32 right-8 px-4 py-2 rounded-xl text-xs font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.92) 0%, rgba(93, 124, 84, 0.9) 100%)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(212, 180, 131, 0.4)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              color: '#fff'
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4B483] animate-pulse" />
              <span>Verbindung zum Dashboard aktiv</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
