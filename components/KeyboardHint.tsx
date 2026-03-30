'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X } from 'lucide-react';

const STORAGE_KEY = 'saimor-cmd-hint-seen';

export default function KeyboardHint() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMac, setIsMac] = useState(true);

  const locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const copy = locale === 'de'
    ? {
        intro: 'Schnellzugang',
        text: 'Mit',
        end: 'oeffnest du das Kommando-Menue.',
        dismiss: 'Hinweis schliessen',
      }
    : {
        intro: 'Quick access',
        text: 'Use',
        end: 'to open the command menu.',
        dismiss: 'Dismiss keyboard hint',
      };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const hasSeenHint = localStorage.getItem(STORAGE_KEY);
    if (hasSeenHint) return;

    if (typeof navigator !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().includes('MAC'));
    }

    const showTimer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem(STORAGE_KEY, '1');
    }, 7000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 13000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 left-1/2 z-[9996] -translate-x-1/2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <div
            className="flex items-center gap-4 rounded-[20px] px-4 py-3 shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, rgba(9, 16, 27, 0.96) 0%, rgba(14, 24, 38, 0.93) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.24)',
            }}
          >
            <div className="flex items-center gap-3 text-sm text-white/78">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/46">
                {copy.intro}
              </span>
              <span>{copy.text}</span>
              <kbd className="flex items-center gap-1 rounded-lg border border-white/14 bg-white/6 px-2 py-1 text-xs font-mono text-[#D4A857]">
                {isMac ? <Command className="h-3 w-3" /> : 'Ctrl'}
                <span>K</span>
              </kbd>
              <span>{copy.end}</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-white/45 transition-colors hover:bg-white/12 hover:text-white"
              aria-label={copy.dismiss}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
