'use client';

/**
 * UniverseDock - Bottom Navigation Dock
 * Inspired by SAIMÔR Universe OS & macOS Dynamic Island
 * 
 * Features:
 * - Bottom-center fixed position
 * - Glass morphism style
 * - Hover expansion with labels
 * - Icon-based navigation
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Grid3x3, 
  Clock, 
  User, 
  Settings,
  Sparkles
} from 'lucide-react';

interface DockItem {
  id: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
  badge?: number;
}

interface UniverseDockProps {
  items?: DockItem[];
  onItemClick?: (itemId: string) => void;
}

const defaultItems: DockItem[] = [
  { id: 'chat', label: 'Môra Chat', icon: MessageSquare },
  { id: 'apps', label: 'Dashboard', icon: Grid3x3 },
  { id: 'recent', label: 'Activity', icon: Clock },
  { id: 'user', label: 'Account', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function UniverseDock({ 
  items = defaultItems,
  onItemClick 
}: UniverseDockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed z-50 left-1/2 -translate-x-1/2"
      style={{
        bottom: '24px'
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Dock Container - Glass Morphism */}
      <motion.div
        className="relative flex items-center gap-2 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(10, 20, 15, 0.85)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-30 mix-blend-overlay rounded-2xl" />

        {/* Dock Items */}
        <div className="relative flex items-center gap-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;

            return (
              <motion.div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Icon Button */}
                <motion.button
                  onClick={() => {
                    item.onClick?.();
                    onItemClick?.(item.id);
                  }}
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center group"
                  style={{
                    background: isHovered 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: isHovered 
                      ? '1px solid rgba(16, 185, 129, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {/* Icon */}
                  <Icon 
                    className="relative z-10 transition-colors" 
                    size={20}
                    style={{ 
                      color: isHovered ? '#10B981' : 'rgba(255, 255, 255, 0.7)' 
                    }}
                  />

                  {/* Badge */}
                  {item.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{
                        background: '#EF4444',
                        color: 'white',
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                      }}
                    >
                      {item.badge}
                    </motion.div>
                  )}

                  {/* Hover Glow */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                        filter: 'blur(8px)'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>

                {/* Label on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -60, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg whitespace-nowrap"
                      style={{
                        background: 'rgba(0, 0, 0, 0.95)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      <p className="text-sm font-medium text-white">{item.label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Môra Indicator (optional pulsing dot) */}
        <div className="w-px h-6 bg-white/10 mx-1" />
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            background: '#10B981',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}

