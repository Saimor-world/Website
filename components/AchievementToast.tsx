'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  getAchievementTitle,
  type Achievement,
  type AchievementLocale,
} from '@/lib/achievements';

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
  locale?: AchievementLocale;
}

const VISIBLE_MS = 4200;

/**
 * A quiet, single-line note for deliberate discoveries only.
 * It sits low in the corner, never covers the reading column and
 * fades out on its own.
 */
export default function AchievementToast({
  achievement,
  onClose,
  locale = 'de',
}: Props) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!achievement) return;
    const timer = window.setTimeout(onClose, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [achievement, onClose]);

  const label = locale === 'de' ? 'Entdeckt' : 'Discovered';

  return (
    <AnimatePresence>
      {achievement ? (
        // Placement lives on a wrapper that only fades: framer-motion owns
        // `transform` on the sliding child, which would override translate
        // utilities and push the note off-screen on phones.
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-[10001] flex justify-center px-4 lg:inset-x-auto lg:bottom-[5.5rem] lg:right-6 lg:px-0"
        >
          <motion.div
            role="status"
            aria-live="polite"
            initial={reduceMotion ? false : { y: 8 }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="pointer-events-auto flex min-w-0 max-w-full items-center gap-2.5 rounded-full py-1.5 pl-3 pr-1.5 text-[13px] text-white/80"
            style={{
              background: 'rgba(8, 14, 22, 0.86)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span aria-hidden="true" className="text-[13px] leading-none text-[#D6A848]/80">
              {achievement.icon}
            </span>
            <span className="truncate">
              <span className="text-white/45">{label} · </span>
              {getAchievementTitle(achievement, locale)}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
              aria-label={locale === 'de' ? 'Hinweis schließen' : 'Dismiss notice'}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
