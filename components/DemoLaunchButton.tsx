'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface Props {
  /** Text shown on the button */
  label?: string;
  /** Tailwind class overrides */
  className?: string;
  locale?: 'de' | 'en';
}

/**
 * The public OS demo is currently behind a security check and not open.
 * Instead of sending visitors to a broken endpoint, this links to the
 * Deep View experience within the marketing site.
 */
export function DemoLaunchButton({
  label,
  className,
  locale = 'de',
}: Props) {
  const deepViewHref = locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view';
  const buttonLabel = label ?? (locale === 'de' ? 'Deep View erleben' : 'Experience Deep View');

  return (
    <Link
      href={deepViewHref}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-xl border border-[#d6a848]/30 bg-[#d6a848]/10 px-6 py-3 text-sm font-semibold text-[#f0e4c4] transition-all hover:bg-[#d6a848]/20'
      }
    >
      <Sparkles size={16} />
      {buttonLabel}
    </Link>
  );
}
