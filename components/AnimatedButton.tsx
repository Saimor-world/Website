'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
import { MatomoEvents } from '@/lib/matomo';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-emerald-500 to-cyan-500 
    text-white font-semibold
    shadow-lg shadow-emerald-500/25
    hover:shadow-emerald-500/40 hover:shadow-xl
  `,
  secondary: `
    bg-white/10 backdrop-blur-md
    text-white font-medium
    border border-white/20
    hover:bg-white/20 hover:border-white/30
  `,
  ghost: `
    bg-transparent
    text-white/70 font-medium
    hover:text-white hover:bg-white/5
  `,
  outline: `
    bg-transparent
    text-emerald-400 font-medium
    border border-emerald-500/30
    hover:bg-emerald-500/10 hover:border-emerald-500/50
  `,
  gradient: `
    bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
    text-white font-bold
    shadow-lg shadow-emerald-500/30
    hover:shadow-emerald-500/50 hover:shadow-xl
    relative overflow-hidden
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-2xl gap-3',
};

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      loading = false,
      fullWidth = false,
      href,
      external,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      relative inline-flex items-center justify-center
      transition-all duration-300 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    const content = (
      <>
        {/* Shimmer effect for gradient variant */}
        {variant === 'gradient' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 3,
            }}
          />
        )}

        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}

        {/* Content */}
        <span className={`relative z-10 flex items-center ${sizes[size].includes('gap') ? '' : 'gap-2'} ${loading ? 'opacity-0' : ''}`}>
          {icon && iconPosition === 'left' && (
            <motion.span
              className="flex-shrink-0"
              initial={false}
              whileHover={{ x: -2 }}
            >
              {icon}
            </motion.span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <motion.span
              className="flex-shrink-0"
              initial={false}
              whileHover={{ x: 2 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </>
    );

    // If href is provided, render as anchor
    if (href) {
      return (
        <motion.a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={baseClasses}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            MatomoEvents.ctaClick('Button', href);
          }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          // Track CTA clicks on buttons without href
          if (!href && !disabled && !loading) {
            MatomoEvents.ctaClick('Button', props['aria-label'] || String(children));
          }
          props.onClick?.(e as any);
        }}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;

// Magnetic button effect for special CTAs
export function MagneticButton({ children, className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      className="relative"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 blur-xl opacity-0"
        variants={{
          hover: { opacity: 0.5, scale: 1.1 },
        }}
        transition={{ duration: 0.3 }}
      />
      <AnimatedButton
        variant="gradient"
        className={`relative z-10 ${className}`}
        {...props}
      >
        {children}
      </AnimatedButton>
    </motion.div>
  );
}

// Ripple effect button
export function RippleButton({
  children,
  onClick,
  className = '',
  ...props
}: AnimatedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'absolute rounded-full bg-white/30 animate-ripple pointer-events-none';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0';
    ripple.style.height = '0';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
    
    onClick?.(e as any);
  };

  return (
    <AnimatedButton
      onClick={handleClick}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </AnimatedButton>
  );
}

