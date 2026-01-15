'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X } from 'lucide-react';

export default function KeyboardHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    // Check if already shown
    const hasSeenHint = localStorage.getItem('saimor-cmd-hint-seen');
    if (hasSeenHint) return;

    // Detect OS
    if (typeof navigator !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }

    // Show after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('saimor-cmd-hint-seen', 'true');
      
      // Auto-hide after 8 seconds
      setTimeout(() => setIsVisible(false), 8000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 left-1/2 z-[9996]"
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div
            className="flex items-center gap-4 px-5 py-3 rounded-2xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className="text-emerald-400">💡</span>
              <span>Tipp: Drücke</span>
              <kbd className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs font-mono text-emerald-300">
                {isMac ? <Command className="w-3 h-3" /> : 'Ctrl'}
                <span>K</span>
              </kbd>
              <span>für Schnellnavigation</span>
            </div>
            <button
              onClick={dismiss}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

