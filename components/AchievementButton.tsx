'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { getAchievementManager } from '@/lib/achievements';
import AchievementMenu from './AchievementMenu';

export default function AchievementButton() {
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [progress, setProgress] = useState({ unlocked: 0, total: 0, percentage: 0 });
  const [hasNewAchievement, setHasNewAchievement] = useState(false);
  const [achievements, setAchievements] = useState<any[]>([]);

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
      
      // Clear the "new" indicator after 5 seconds
      setTimeout(() => setHasNewAchievement(false), 5000);
    });
    
    return () => { void unsubscribe(); };
  }, [mounted]);

  const handleOpen = useCallback(() => {
    setShowMenu(true);
    setHasNewAchievement(false);
  }, []);

  if (!mounted) return null;

  // Only show if user has at least 1 achievement
  if (progress.unlocked === 0) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-[9998] group"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse effect when new achievement */}
        <AnimatePresence>
          {hasNewAchievement && (
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-400"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        {/* Button background */}
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hasNewAchievement 
              ? 'linear-gradient(135deg, #D4A857 0%, #E6C897 100%)'
              : 'linear-gradient(135deg, rgba(26, 46, 26, 0.95) 0%, rgba(74, 103, 65, 0.9) 100%)',
            border: hasNewAchievement 
              ? '2px solid rgba(212, 180, 131, 0.8)'
              : '2px solid rgba(212, 180, 131, 0.3)',
            boxShadow: hasNewAchievement
              ? '0 8px 32px rgba(212, 180, 131, 0.5)'
              : '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {hasNewAchievement ? (
            <Sparkles className="w-6 h-6 text-white" />
          ) : (
            <Trophy className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
          )}

          {/* Progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="rgba(212, 180, 131, 0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#D4A857"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress.percentage / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                strokeDasharray: '163.36',
              }}
            />
          </svg>
        </div>

        {/* Badge with count */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#081410] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">{progress.unlocked}</span>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-3 py-2 rounded-lg bg-black/90 border border-white/10 text-xs text-white whitespace-nowrap">
            <span className="text-amber-400 font-bold">{progress.unlocked}</span>
            <span className="text-white/50">/{progress.total}</span>
            <span className="text-white/70 ml-2">Erfolge</span>
          </div>
        </div>
      </motion.button>

      {/* Achievement Menu */}
      <AchievementMenu
        achievements={achievements}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
}

