'use client';

import Link from 'next/link';

export default function CreatorSignalEgg({ locale }: { locale: 'de' | 'en' }) {
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const label = locale === 'de' ? 'Ein anderes Signal' : 'Another signal';

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="group fixed bottom-4 right-4 z-30 grid h-9 w-9 place-items-center rounded-full border border-[#d9eadf]/10 bg-[#17372a]/28 text-[#d9eadf]/28 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#e6d39a]/32 hover:bg-[#17372a]/72 hover:text-[#f2de9c]/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d39a]/55 sm:bottom-5 sm:right-5"
    >
      <span className="relative block h-5 w-5 font-serif text-[17px] leading-5" aria-hidden="true">
        ♪
        <span className="absolute -right-1 -top-1 font-mono text-[8px] font-bold">?</span>
      </span>
      <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full border border-[#e6d39a]/18 bg-[#10271e]/92 px-2.5 py-1 font-mono text-[8px] tracking-[.14em] text-[#f0dfaa]/0 opacity-0 shadow-lg transition duration-300 group-hover:text-[#f0dfaa]/72 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}
