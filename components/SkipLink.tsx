'use client';

/**
 * Skip Link for Accessibility
 * Allows keyboard users to skip to main content
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg focus:font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#081410]"
      aria-label="Zum Hauptinhalt springen"
    >
      Zum Hauptinhalt springen
    </a>
  );
}

