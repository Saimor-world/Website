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
  signal: 'rgba(214, 168, 72, 0.24)',
  path: 'rgba(117, 198, 160, 0.18)',
  depth: 'rgba(104, 158, 255, 0.18)',
  hidden: 'rgba(255, 255, 255, 0.12)',
} as const;

export default function AchievementMenu({
  achievements,
  isOpen,
  onClose,
  locale = 'de',
}: Props) {
  const orderIndex = new Map(achievements.map((achievement, index) => [achievement.id, index]));
  const progress = achievements.length === 0
    ? 0
    : Math.round((achievements.filter((achievement) => achievement.unlocked).length / achievements.length) * 100);

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
        title: 'Entdeckungslog',
        subtitle: 'Beobachtete Interaktionen, versteckte Ebenen und erkundete Pfade.',
        recorded: 'Protokolliert',
        remaining: 'Offen',
        hidden: 'Verborgen',
        coverage: 'Abdeckung',
        unlockedSection: 'Erfasst',
        lockedSection: 'Noch offen',
        hiddenTitle: 'Verborgener Eintrag',
        hiddenDescription: 'Bleibt verborgen, bis du die passende Interaktion auslöst.',
        close: 'Log schließen',
      }
    : {
        title: 'Discovery Log',
        subtitle: 'Observed interactions, hidden layers, and explored paths.',
        recorded: 'Logged',
        remaining: 'Open',
        hidden: 'Hidden',
        coverage: 'Coverage',
        unlockedSection: 'Logged',
        lockedSection: 'Open',
        hiddenTitle: 'Hidden Entry',
        hiddenDescription: 'Stays hidden until you trigger the matching interaction.',
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
        className="rounded-[24px] border p-4"
        style={{
          background: isUnlocked
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.015) 100%)',
          borderColor: isUnlocked ? 'rgba(255, 255, 255, 0.11)' : 'rgba(255, 255, 255, 0.07)',
          opacity: isUnlocked ? 1 : 0.72,
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: isUnlocked ? 1 : 0.72, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.28, ease: 'easeOut' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[18px] text-2xl"
            style={{
              background: accent,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {achievement.secret && !isUnlocked ? (
              <Lock className="h-5 w-5 text-white/38" />
            ) : (
              achievement.icon
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/56">
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
            <p className="mt-1 text-sm leading-relaxed text-white/68">
              {description}
            </p>

            {isUnlocked && achievement.unlockedAt && (
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/36">
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
            className="absolute inset-0 bg-[#02060d]/80"
            style={{ backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-[32px]"
            style={{
              background: 'linear-gradient(180deg, rgba(7, 12, 20, 0.98) 0%, rgba(11, 18, 31, 0.96) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 28px 80px rgba(0, 0, 0, 0.48)',
              backdropFilter: 'blur(28px)',
            }}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-x-10 top-0 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(214, 168, 72, 0.85), transparent)',
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

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/55">
                    <Compass className="h-4 w-4 text-[#D6A848]" />
                    {copy.title}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold text-white md:text-[2rem]">
                    {achievements.filter((achievement) => achievement.unlocked).length} / {achievements.length} {copy.recorded.toLowerCase()}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/62 md:text-base">
                    {copy.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 md:min-w-[320px]">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">{copy.recorded}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{achievements.filter((achievement) => achievement.unlocked).length}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">{copy.hidden}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{hiddenRemaining}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">{copy.coverage}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{progress}%</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 h-px overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(214, 168, 72, 0.92), rgba(117, 198, 160, 0.86), rgba(104, 158, 255, 0.78))',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="custom-scrollbar max-h-[calc(86vh-220px)] overflow-y-auto px-6 py-6 md:px-8">
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
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
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
