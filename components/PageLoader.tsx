'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  isLoading?: boolean;
}

export default function PageLoader({ isLoading = false }: Props) {
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      setProgress(0);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 150);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => {
        setShowLoader(false);
        setProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#081410]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-cyan-900/10" />

          {/* Content */}
          <div className="relative flex flex-col items-center">
            {/* Animated Orb */}
            <motion.div
              className="relative w-20 h-20 mb-8"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                }}
              />

              {/* Inner orb */}
              <motion.div
                className="relative w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #06B6D4 100%)',
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(16, 185, 129, 0.5)',
                    '0 0 60px rgba(16, 185, 129, 0.7)',
                    '0 0 40px rgba(16, 185, 129, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Eyes */}
                <div className="flex gap-3">
                  <motion.div
                    className="h-4 w-3 rounded-full bg-white/90"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 0.15, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <motion.div
                    className="h-4 w-3 rounded-full bg-white/90"
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 0.15, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="mt-4 text-xs text-white/50 font-medium tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              LADEN...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for page transitions
export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
}

