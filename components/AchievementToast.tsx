'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import {
  getAchievementDescription,
  getAchievementTitle,
  type Achievement,
  type AchievementLocale,
} from '@/lib/achievements';

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
  locale?: AchievementLocale;
}

export default function AchievementToast({
  achievement,
  onClose,
  locale = 'de',
}: Props) {
  if (!achievement) return null;

  const copy = locale === 'de'
    ? { label: 'Erfolg freigeschaltet!' }
    : { label: 'Achievement unlocked!' };

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        className="fixed top-24 right-6 z-[10001] max-w-sm"
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl p-5 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 46, 26, 0.98) 0%, rgba(74, 103, 65, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(212, 180, 131, 0.5)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex items-start gap-4">
            <motion.div
              className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#D4A857] to-[#E6C897] text-4xl shadow-lg"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              />
              <span className="relative z-10">{achievement.icon}</span>
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#D4A857]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A857]">
                  {copy.label}
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {getAchievementTitle(achievement, locale)}
              </h3>
              <p className="text-sm text-white/80">
                {getAchievementDescription(achievement, locale)}
              </p>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 overflow-hidden bg-gradient-to-r from-[#D4A857] to-[#E6C897]"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3.5, ease: 'linear' }}
            onAnimationComplete={onClose}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
