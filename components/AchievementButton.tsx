'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
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
        open: 'Entdeckungen öffnen',
      }
    : {
        title: 'Discoveries',
        open: 'Open discoveries',
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

  return (
    <>
      {progress.unlocked > 0 && (
        <motion.button
          type="button"
          onClick={openMenu}
          className="group fixed bottom-6 right-6 z-[9998] hidden h-10 w-10 items-center justify-center rounded-full text-white/45 transition-colors hover:text-white/85 focus-visible:text-white/85 lg:flex"
          style={{
            background: 'rgba(8, 14, 22, 0.72)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3, ease: 'easeOut' }}
          aria-label={`${copy.open} (${progress.unlocked} ${locale === 'de' ? 'entdeckt' : 'found'})`}
          title={`${copy.title} · ${progress.unlocked}`}
        >
          <Compass className="h-[17px] w-[17px]" />
          {hasNewAchievement && (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D6A848]/90"
            />
          )}
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
