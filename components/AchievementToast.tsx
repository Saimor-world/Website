'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import type { Achievement } from '@/lib/achievements';

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementToast({ achievement, onClose }: Props) {
  if (!achievement) return null;

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
          className="relative rounded-2xl p-5 shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 46, 26, 0.98) 0%, rgba(74, 103, 65, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(212, 180, 131, 0.5)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <motion.div
              className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-4xl bg-gradient-to-br from-[#D4A857] to-[#E6C897] shadow-lg"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {achievement.icon}
            </motion.div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-[#D4A857]" />
                <span className="text-xs font-semibold text-[#D4A857] uppercase tracking-wider">
                  Achievement freigeschaltet!
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {achievement.nameDE}
              </h3>
              <p className="text-sm text-white/80">
                {achievement.descriptionDE}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#D4A857] to-[#E6C897]"
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
