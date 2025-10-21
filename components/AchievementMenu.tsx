'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Lock, Check } from 'lucide-react';
import type { Achievement } from '@/lib/achievements';

interface Props {
  achievements: Achievement[];
  isOpen: boolean;
  onClose: () => void;
  locale?: 'de' | 'en';
}

export default function AchievementMenu({ achievements, isOpen, onClose, locale = 'de' }: Props) {
  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);
  const progress = Math.round((unlocked.length / achievements.length) * 100);

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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            style={{ backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Menu */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[80vh] bg-gradient-to-br from-[#1a2e1a]/98 via-[#4A6741]/95 to-[#2d4a2d]/98 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 180, 131, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(212, 180, 131, 0.2)'
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-[#D4B483]/20">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4B483] to-[#E6C897] flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {locale === 'de' ? 'Erfolge' : 'Achievements'}
                  </h2>
                  <p className="text-sm text-white/70">
                    {unlocked.length} / {achievements.length} freigeschaltet
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4B483] to-[#E6C897] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                  {progress}%
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)] custom-scrollbar">
              {/* Unlocked */}
              {unlocked.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[#D4B483] uppercase tracking-wider mb-3">
                    {locale === 'de' ? 'Freigeschaltet' : 'Unlocked'}
                  </h3>
                  <div className="space-y-3">
                    {unlocked.map((achievement, i) => (
                      <motion.div
                        key={achievement.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-[#D4B483]/20 hover:bg-white/10 hover:border-[#D4B483]/40 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4B483] to-[#E6C897] flex items-center justify-center text-2xl shadow-lg">
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-base font-bold text-white">
                              {achievement.nameDE}
                            </h4>
                            <Check className="w-4 h-4 text-[#D4B483]" />
                          </div>
                          <p className="text-sm text-white/70 mb-2">
                            {achievement.descriptionDE}
                          </p>
                          {achievement.unlockedAt && (
                            <p className="text-xs text-white/50">
                              {new Date(achievement.unlockedAt).toLocaleDateString('de-DE')}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked */}
              {locked.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                    {locale === 'de' ? 'Gesperrt' : 'Locked'}
                  </h3>
                  <div className="space-y-3">
                    {locked.map((achievement, i) => (
                      <motion.div
                        key={achievement.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5 opacity-60"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 0.6, x: 0 }}
                        transition={{ delay: (unlocked.length + i) * 0.05 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/30 flex items-center justify-center shadow-lg">
                          {achievement.secret ? (
                            <Lock className="w-6 h-6 text-white/40" />
                          ) : (
                            <span className="text-2xl opacity-40">{achievement.icon}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-white/50 mb-1">
                            {achievement.secret ? '???' : achievement.nameDE}
                          </h4>
                          <p className="text-sm text-white/40">
                            {achievement.secret ? 'Geheimer Erfolg' : achievement.descriptionDE}
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
