'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { getAchievementManager, type Achievement } from '@/lib/achievements';
import AchievementMenu from './AchievementMenu';

export default function AchievementButton() {
  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [progress, setProgress] = useState({ unlocked: 0, total: 0, percentage: 0 });
  const [hasNewAchievement, setHasNewAchievement] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const copy = locale === 'de'
    ? {
        title: 'Erfolge',
        progress: 'Fortschritt',
        newLabel: 'Neu',
      }
    : {
        title: 'Achievements',
        progress: 'Progress',
        newLabel: 'New',
      };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const manager = getAchievementManager();

    const updateProgress = () => {
      setProgress(manager.getProgress());
      setAchievements(manager.getAll());
    };

    updateProgress();

    const unsubscribe = manager.subscribe(() => {
      setHasNewAchievement(true);
      updateProgress();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setHasNewAchievement(false);
        timeoutRef.current = null;
      }, 4800);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      void unsubscribe();
    };
  }, [mounted]);

  useEffect(() => {
    const handleOpen = () => {
      setShowMenu(true);
      setHasNewAchievement(false);
    };

    window.addEventListener('saimor-achievement-menu-open', handleOpen);
    return () => window.removeEventListener('saimor-achievement-menu-open', handleOpen);
  }, []);

  const openMenu = useCallback(() => {
    setShowMenu(true);
    setHasNewAchievement(false);
  }, []);

  if (!mounted) return null;

  const shouldShowButton = progress.unlocked > 0;

  return (
    <>
      {shouldShowButton && (
        <motion.button
          onClick={openMenu}
          className="group fixed bottom-6 right-6 z-[9998]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.35, ease: 'easeOut' }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          aria-label={copy.title}
        >
          <div
            className="relative flex min-w-[148px] items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300"
            style={{
              background: hasNewAchievement
                ? 'linear-gradient(135deg, rgba(42, 65, 45, 0.96) 0%, rgba(110, 93, 53, 0.96) 100%)'
                : 'linear-gradient(135deg, rgba(15, 28, 22, 0.95) 0%, rgba(28, 48, 36, 0.92) 100%)',
              border: hasNewAchievement
                ? '1px solid rgba(212, 180, 131, 0.55)'
                : '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(22px)',
              boxShadow: hasNewAchievement
                ? '0 14px 36px rgba(0, 0, 0, 0.28)'
                : '0 12px 28px rgba(0, 0, 0, 0.22)',
            }}
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
              style={{
                background: hasNewAchievement
                  ? 'linear-gradient(135deg, rgba(212, 180, 131, 0.35) 0%, rgba(230, 200, 151, 0.18) 100%)'
                  : 'rgba(212, 180, 131, 0.12)',
                border: '1px solid rgba(212, 180, 131, 0.24)',
              }}
            >
              {hasNewAchievement ? (
                <Sparkles className="h-5 w-5 text-[#F2D39A]" />
              ) : (
                <Trophy className="h-5 w-5 text-[#D4A857]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                  {copy.title}
                </span>
                {hasNewAchievement && (
                  <span className="rounded-full bg-[#D4A857]/18 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F2D39A]">
                    {copy.newLabel}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-lg font-semibold text-white">
                  {progress.unlocked}
                </span>
                <span className="text-xs text-white/45">
                  / {progress.total}
                </span>
                <span className="text-xs text-white/55">
                  {copy.progress}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4A857] via-[#E6C897] to-[#7CBF95]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percentage}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.button>
      )}

      <AchievementMenu
        achievements={achievements}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        locale={locale}
      />
    </>
  );
}
