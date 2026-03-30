'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Compass, Lock, X } from 'lucide-react';
import {
  ACHIEVEMENT_CATEGORY_ORDER,
  getAchievementCategoryLabel,
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

const categoryAccentMap = {
  signal: 'rgba(214, 168, 72, 0.18)',
  path: 'rgba(117, 198, 160, 0.16)',
  depth: 'rgba(104, 158, 255, 0.16)',
  hidden: 'rgba(255, 255, 255, 0.1)',
} as const;

export default function AchievementMenu({
  achievements,
  isOpen,
  onClose,
  locale = 'de',
}: Props) {
  const orderIndex = new Map(achievements.map((achievement, index) => [achievement.id, index]));
  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length;
  const progress = achievements.length === 0
    ? 0
    : Math.round((unlockedCount / achievements.length) * 100);

  const unlocked = achievements
    .filter((achievement) => achievement.unlocked)
    .sort((left, right) => {
      const categoryDelta = ACHIEVEMENT_CATEGORY_ORDER.indexOf(left.category)
        - ACHIEVEMENT_CATEGORY_ORDER.indexOf(right.category);
      if (categoryDelta !== 0) return categoryDelta;
      return (right.unlockedAt ?? 0) - (left.unlockedAt ?? 0);
    });

  const locked = achievements
    .filter((achievement) => !achievement.unlocked)
    .sort((left, right) => {
      const categoryDelta = ACHIEVEMENT_CATEGORY_ORDER.indexOf(left.category)
        - ACHIEVEMENT_CATEGORY_ORDER.indexOf(right.category);
      if (categoryDelta !== 0) return categoryDelta;
      return (orderIndex.get(left.id) ?? 0) - (orderIndex.get(right.id) ?? 0);
    });

  const hiddenRemaining = locked.filter((achievement) => achievement.secret).length;

  const copy = locale === 'de'
    ? {
        title: 'Log',
        subtitle: 'Signale, Pfade und Tiefen, die bereits sichtbar geworden sind.',
        recorded: 'Im Log',
        hidden: 'Verdeckt',
        coverage: 'Stand',
        unlockedSection: 'Freigelegt',
        lockedSection: 'Noch verdeckt',
        hiddenTitle: 'Verdeckter Eintrag',
        hiddenDescription: 'Wird erst sichtbar, wenn du die passende Interaktion ausloest.',
        close: 'Log schliessen',
      }
    : {
        title: 'Log',
        subtitle: 'Signals, paths, and depths that have already become visible.',
        recorded: 'Logged',
        hidden: 'Hidden',
        coverage: 'Coverage',
        unlockedSection: 'Visible',
        lockedSection: 'Still hidden',
        hiddenTitle: 'Hidden Entry',
        hiddenDescription: 'Becomes visible once you trigger the matching interaction.',
        close: 'Close log',
      };

  const renderCard = (achievement: Achievement, state: 'unlocked' | 'locked', index: number) => {
    const isUnlocked = state === 'unlocked';
    const accent = categoryAccentMap[achievement.category];
    const title = achievement.secret && !isUnlocked
      ? copy.hiddenTitle
      : getAchievementTitle(achievement, locale);
    const description = achievement.secret && !isUnlocked
      ? copy.hiddenDescription
      : getAchievementDescription(achievement, locale);

    return (
      <motion.div
        key={achievement.id}
        className="rounded-[22px] border p-4"
        style={{
          background: isUnlocked
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.025) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, rgba(255, 255, 255, 0.012) 100%)',
          borderColor: isUnlocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.06)',
          opacity: isUnlocked ? 1 : 0.72,
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isUnlocked ? 1 : 0.72, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.24, ease: 'easeOut' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[16px] text-xl"
            style={{
              background: accent,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {achievement.secret && !isUnlocked ? (
              <Lock className="h-4.5 w-4.5 text-white/35" />
            ) : (
              achievement.icon
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/52">
                {getAchievementCategoryLabel(achievement.category, locale)}
              </span>
              {isUnlocked && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#75C6A0]">
                  <Check className="h-3.5 w-3.5" />
                  {copy.recorded}
                </span>
              )}
            </div>

            <h4 className="text-base font-semibold text-white">
              {title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-white/66">
              {description}
            </p>

            {isUnlocked && achievement.unlockedAt && (
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/34">
                {new Date(achievement.unlockedAt).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
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
            className="absolute inset-0 bg-[#02060d]/82"
            style={{ backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[86vh] w-full max-w-4xl overflow-hidden rounded-[30px]"
            style={{
              background: 'linear-gradient(180deg, rgba(7, 12, 20, 0.98) 0%, rgba(11, 18, 31, 0.96) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              boxShadow: '0 28px 80px rgba(0, 0, 0, 0.48)',
              backdropFilter: 'blur(28px)',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.985 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-x-10 top-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(214, 168, 72, 0.78), transparent)',
              }}
            />

            <div className="border-b border-white/8 px-6 py-6 md:px-8">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={copy.close}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/52">
                  <Compass className="h-4 w-4 text-[#D6A848]" />
                  {copy.title}
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white md:text-[2rem]">
                  {unlockedCount} / {achievements.length}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                  {copy.subtitle}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/42">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {copy.recorded}: {unlockedCount}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {copy.hidden}: {hiddenRemaining}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {copy.coverage}: {progress}%
                </span>
              </div>

              <div className="mt-4 h-px overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(214, 168, 72, 0.9), rgba(117, 198, 160, 0.82), rgba(104, 158, 255, 0.72))',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="custom-scrollbar max-h-[calc(86vh-210px)] overflow-y-auto px-6 py-6 md:px-8">
              {unlocked.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#75C6A0]">
                      {copy.unlockedSection}
                    </span>
                    <div className="h-px flex-1 bg-white/8" />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {unlocked.map((achievement, index) => renderCard(achievement, 'unlocked', index))}
                  </div>
                </section>
              )}

              {locked.length > 0 && (
                <section className={unlocked.length > 0 ? 'mt-8' : ''}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">
                      {copy.lockedSection}
                    </span>
                    <div className="h-px flex-1 bg-white/8" />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {locked.map((achievement, index) => renderCard(achievement, 'locked', index))}
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
