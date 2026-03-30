'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X } from 'lucide-react';
import {
  getAchievementCategoryLabel,
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
    ? { label: 'Neu protokolliert' }
    : { label: 'Logged' };

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, scale: 0.98 }}
        className="fixed right-6 top-24 z-[10001] max-w-sm"
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[24px] p-5 shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(8, 14, 24, 0.98) 0%, rgba(16, 28, 44, 0.96) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 44px rgba(0, 0, 0, 0.34)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-4 top-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(214, 168, 72, 0.9), transparent)',
            }}
          />

          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={locale === 'de' ? 'Hinweis schließen' : 'Dismiss notice'}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex items-start gap-4">
            <motion.div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[18px] text-[28px]"
              style={{
                background: 'linear-gradient(135deg, rgba(214, 168, 72, 0.18) 0%, rgba(117, 198, 160, 0.12) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {achievement.icon}
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6A848]">
                  <Compass className="h-3.5 w-3.5" />
                  {copy.label}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {getAchievementCategoryLabel(achievement.category, locale)}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white">
                {getAchievementTitle(achievement, locale)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/72">
                {getAchievementDescription(achievement, locale)}
              </p>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-px overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, rgba(214, 168, 72, 0.95), rgba(117, 198, 160, 0.8))',
            }}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3.5, ease: 'linear' }}
            onAnimationComplete={onClose}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
