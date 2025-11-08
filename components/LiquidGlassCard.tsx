'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'green';
  hover?: boolean;
  className?: string;
}

/**
 * LiquidGlassCard - Glassmorphism Card mit organischen Hover-Effekten
 * Liquid Glass Ästhetik für filmische UI
 */
export default function LiquidGlassCard({
  children,
  variant = 'default',
  hover = true,
  className = ''
}: Props) {
  const variants = {
    default: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      border: '1px solid rgba(255,255,255,0.18)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    gold: {
      background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.15) 0%, rgba(212, 180, 131, 0.08) 100%)',
      border: '1px solid rgba(212, 180, 131, 0.3)',
      shadow: '0 8px 32px rgba(212, 180, 131, 0.15)'
    },
    green: {
      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.12) 0%, rgba(74, 103, 65, 0.06) 100%)',
      border: '1px solid rgba(74, 103, 65, 0.25)',
      shadow: '0 8px 32px rgba(74, 103, 65, 0.12)'
    }
  };

  const style = variants[variant];

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: style.background,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: style.border,
        boxShadow: style.shadow
      }}
      {...(hover && {
        whileHover: {
          y: -8,
          scale: 1.02,
          boxShadow: variant === 'gold'
            ? '0 20px 60px rgba(212, 180, 131, 0.25)'
            : variant === 'green'
            ? '0 20px 60px rgba(74, 103, 65, 0.18)'
            : '0 20px 60px rgba(0, 0, 0, 0.15)'
        },
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20
        }
      })}
    >
      {/* Inner glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: variant === 'gold'
            ? 'radial-gradient(circle at 50% 0%, rgba(212, 180, 131, 0.15) 0%, transparent 70%)'
            : variant === 'green'
            ? 'radial-gradient(circle at 50% 0%, rgba(74, 103, 65, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
