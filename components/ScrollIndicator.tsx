'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Props {
  label?: string;
  targetId?: string;
  variant?: 'default' | 'minimal' | 'prominent';
}

/**
 * ScrollIndicator - Eleganter Scroll-Hinweis
 * Subtil, filmisch, nicht aufdringlich
 */
export default function ScrollIndicator({
  label = 'Scroll to explore',
  targetId,
  variant = 'default'
}: Props) {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={handleClick}
        className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label={label}
      >
        <motion.div
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <ChevronDown size={24} className="text-white/60" />
        </motion.div>
      </motion.button>
    );
  }

  if (variant === 'prominent') {
    return (
      <motion.button
        onClick={handleClick}
        className="flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
        aria-label={label}
      >
        <p className="text-sm text-white/70 font-medium tracking-wide">{label}</p>
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="w-2 h-3 bg-white/70 rounded-full"
            animate={{
              opacity: [0.7, 1, 0.7],
              scaleY: [1, 1.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </motion.button>
    );
  }

  // Default variant
  return (
    <motion.button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      whileHover={{ y: 4 }}
      aria-label={label}
    >
      <span className="text-xs text-white/60 uppercase tracking-wider">{label}</span>
      <motion.div
        animate={{
          y: [0, 8, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <ChevronDown size={20} className="text-white/60" />
      </motion.div>
    </motion.button>
  );
}
