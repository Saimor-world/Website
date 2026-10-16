'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Skip Link for Accessibility
 * Allows keyboard users to skip to main content
 */
export default function SkipLink() {
  const pathname = usePathname();
  const label = pathname?.startsWith('/en') ? 'Skip to main content' : 'Zum Hauptinhalt springen';
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg focus:font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#081410]"
      aria-label={label}
    >
      {label}
    </Link>
  );
}

