'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
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
        title: 'Entdeckungen',
        progress: 'protokolliert',
        idle: 'bereit',
        newLabel: 'Neu',
        open: 'Entdeckungslog öffnen',
      }
    : {
        title: 'Discoveries',
        progress: 'logged',
        idle: 'ready',
        newLabel: 'New',
        open: 'Open discovery log',
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

  const summary = progress.unlocked > 0
    ? `${progress.unlocked} / ${progress.total} ${copy.progress}`
    : `${progress.total} ${copy.idle}`;

  return (
    <>
      <motion.button
        onClick={openMenu}
        className="group fixed bottom-6 right-6 z-[9998]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: progress.unlocked > 0 ? 1 : 0.82, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35, ease: 'easeOut' }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        aria-label={copy.open}
      >
        <div
          className="relative flex min-w-[176px] items-center gap-3 rounded-[24px] px-4 py-3 text-left transition-all duration-300"
          style={{
            background: hasNewAchievement
              ? 'linear-gradient(180deg, rgba(11, 18, 31, 0.98) 0%, rgba(16, 28, 44, 0.96) 100%)'
              : 'linear-gradient(180deg, rgba(7, 12, 20, 0.96) 0%, rgba(12, 20, 33, 0.94) 100%)',
            border: hasNewAchievement
              ? '1px solid rgba(214, 168, 72, 0.34)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(22px)',
            boxShadow: hasNewAchievement
              ? '0 16px 40px rgba(0, 0, 0, 0.32)'
              : '0 14px 34px rgba(0, 0, 0, 0.24)',
          }}
        >
          <div
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[18px]"
            style={{
              background: hasNewAchievement
                ? 'linear-gradient(135deg, rgba(214, 168, 72, 0.22) 0%, rgba(117, 198, 160, 0.14) 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {hasNewAchievement ? (
              <Sparkles className="h-5 w-5 text-[#D6A848]" />
            ) : (
              <Compass className="h-5 w-5 text-white/72" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">
                {copy.title}
              </span>
              {hasNewAchievement && (
                <span className="rounded-full border border-[#D6A848]/20 bg-[#D6A848]/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E9C981]">
                  {copy.newLabel}
                </span>
              )}
            </div>

            <div className="mt-1 text-sm font-medium text-white/88">
              {summary}
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(214, 168, 72, 0.95), rgba(117, 198, 160, 0.82), rgba(104, 158, 255, 0.72))',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(progress.percentage, progress.unlocked === 0 ? 8 : progress.percentage)}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </motion.button>

      <AchievementMenu
        achievements={achievements}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        locale={locale}
      />
    </>
  );
}
