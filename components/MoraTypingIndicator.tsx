'use client';

import { motion } from 'framer-motion';

interface Props {
  isTyping?: boolean;
  message?: string;
}

export default function MoraTypingIndicator({ isTyping = false, message }: Props) {
  if (!isTyping) return null;

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Môra mini avatar */}
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
        {/* Eyes */}
        <div className="flex gap-1.5">
          <motion.div
            className="h-2 w-1.5 rounded-full bg-white/90"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.15, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <motion.div
            className="h-2 w-1.5 rounded-full bg-white/90"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.15, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </div>
        
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm" />
      </div>

      {/* Typing dots or message */}
      {message ? (
        <span className="text-sm text-emerald-300/90 font-medium">{message}</span>
      ) : (
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
          <span className="ml-2 text-xs text-emerald-400/60 font-medium">
            Môra denkt...
          </span>
        </div>
      )}
    </motion.div>
  );
}

