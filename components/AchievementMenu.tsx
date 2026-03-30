'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Lock, Check } from 'lucide-react';
import {
  getAchievementDescription,
  getAchievementTitle,
  type Achievement,
  type AchievementLocale,
} from '@/lib/achievements';

interface Props {
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
  locale?: AchievementLocale;
}

export default function AchievementMenu({
  achievements,
  isOpen,
  onClose,
  locale = 'de',
}: Props) {
  const unlocked = achievements
    .filter((achievement) => achievement.unlocked)
    .sort((left, right) => (right.unlockedAt ?? 0) - (left.unlockedAt ?? 0));
  const locked = achievements
    .filter((achievement) => !achievement.unlocked)
    .sort((left, right) => Number(left.secret) - Number(right.secret));
  const progress = achievements.length === 0
    ? 0
    : Math.round((unlocked.length / achievements.length) * 100);

  const copy = locale === 'de'
    ? {
        title: 'Erfolge',
        unlockedCount: 'freigeschaltet',
        unlocked: 'Freigeschaltet',
        locked: 'Offen',
        hidden: 'Geheimer Erfolg',
      }
    : {
        title: 'Achievements',
        unlockedCount: 'unlocked',
        unlocked: 'Unlocked',
        locked: 'Open',
        hidden: 'Secret achievement',
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10002] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/80"
            style={{ backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2e1a]/98 via-[#4A6741]/95 to-[#2d4a2d]/98 shadow-2xl"
            style={{
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 180, 131, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(212, 180, 131, 0.2)',
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative border-b border-[#D4A857]/20 p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A857] to-[#E6C897] shadow-lg">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2
                    className="mb-1 text-2xl font-bold text-white"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {copy.title}
                  </h2>
                  <p className="text-sm text-white/70">
                    {unlocked.length} / {achievements.length} {copy.unlockedCount}
                  </p>
                </div>
              </div>

              <div className="relative h-3 overflow-hidden rounded-full bg-black/30">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#D4A857] to-[#E6C897]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {progress}%
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
              </div>
            </div>

            <div className="custom-scrollbar max-h-[calc(80vh-180px)] overflow-y-auto p-6">
              {unlocked.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#D4A857]">
                    {copy.unlocked}
                  </h3>
                  <div className="space-y-3">
                    {unlocked.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="flex items-start gap-4 rounded-xl border border-[#D4A857]/20 bg-white/5 p-4 transition-all hover:border-[#D4A857]/40 hover:bg-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <motion.div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A857] to-[#E6C897] text-2xl shadow-lg"
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">
                              {getAchievementTitle(achievement, locale)}
                            </h4>
                            <Check className="h-4 w-4 text-[#D4A857]" />
                          </div>
                          <p className="mb-2 text-sm text-white/70">
                            {getAchievementDescription(achievement, locale)}
                          </p>
                          {achievement.unlockedAt && (
                            <p className="text-xs text-white/50">
                              {new Date(achievement.unlockedAt).toLocaleDateString(
                                locale === 'de' ? 'de-DE' : 'en-US'
                              )}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {locked.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                    {copy.locked}
                  </h3>
                  <div className="space-y-3">
                    {locked.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        className="flex items-start gap-4 rounded-xl border border-white/5 bg-black/20 p-4 opacity-60"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 0.6, x: 0 }}
                        transition={{ delay: (unlocked.length + index) * 0.05 }}
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/30 shadow-lg">
                          {achievement.secret ? (
                            <Lock className="h-6 w-6 text-white/40" />
                          ) : (
                            <span className="text-2xl opacity-40">{achievement.icon}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="mb-1 text-base font-bold text-white/50">
                            {achievement.secret ? '???' : getAchievementTitle(achievement, locale)}
                          </h4>
                          <p className="text-sm text-white/40">
                            {achievement.secret ? copy.hidden : getAchievementDescription(achievement, locale)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
