'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function YoriGate({ locale }: { locale: 'de' | 'en' }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';

  useEffect(() => {
    const reveal = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const threshold = Math.min(620, max * 0.1);
      if (window.scrollY >= threshold) setVisible(true);
    };

    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  const enter = () => {
    if (opening) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }

    setOpening(true);
    window.setTimeout(() => router.push(href), 1250);
  };

  return (
    <>
      <button
        type="button"
        onClick={enter}
        aria-label={locale === 'de' ? 'Verborgenen YORI-Garten betreten' : 'Enter the hidden YORI garden'}
        className={`group fixed left-0 top-[61%] z-[120] h-36 w-14 -translate-y-1/2 overflow-visible transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c487]/70 ${
          visible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0 pointer-events-none'
        }`}
      >
        <span className="absolute inset-y-0 left-0 w-10 rounded-r-[1.3rem] border border-l-0 border-[#cfdcb8]/25 bg-[#10271d]/92 shadow-[0_0_32px_rgba(141,176,111,.16)] backdrop-blur-md transition-all duration-500 group-hover:w-12 group-focus-visible:w-12">
          <span className="yori-seam absolute inset-y-3 left-0 w-[5px] rounded-r-full bg-[#d9c487] shadow-[0_0_16px_rgba(217,196,135,.72),0_0_38px_rgba(116,160,94,.3)]" />
          <span className="absolute left-[13px] top-[22px] h-8 w-4 rotate-[-28deg] rounded-[80%_0_80%_0] bg-[#749665]/70" />
          <span className="absolute bottom-[22px] left-[17px] h-7 w-3 rotate-[28deg] rounded-[0_80%_0_80%] bg-[#a7bc83]/55" />
          <span className="absolute left-[13px] top-1/2 -translate-y-1/2 font-serif text-base text-[#efe0ae]/80 transition-all duration-500 group-hover:left-[18px] group-focus-visible:left-[18px]">縁</span>
        </span>

        <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 translate-x-[-6px] whitespace-nowrap rounded-full border border-[#d7c896]/15 bg-[#10271d]/94 px-3 py-2 font-mono text-[8px] tracking-[.2em] text-[#efe5c6]/0 opacity-0 shadow-[0_12px_40px_rgba(3,18,11,.4)] backdrop-blur-md transition-all duration-400 group-hover:translate-x-1 group-hover:text-[#efe5c6]/70 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:text-[#efe5c6]/70 group-focus-visible:opacity-100">
          {locale === 'de' ? 'EIN ANDERER WEG' : 'ANOTHER PATH'}
        </span>
      </button>

      {opening ? (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#07130d]" aria-hidden="true">
          <div className="yori-bloom absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(223,198,127,.28),transparent_24%),radial-gradient(circle_at_36%_28%,rgba(113,157,95,.24),transparent_36%),linear-gradient(180deg,#0b2116_0%,#173424_48%,#081c12_100%)]" />
          <div className="yori-door-l absolute inset-y-0 left-0 w-1/2 border-r border-[#efe4c8]/15 bg-[#1b1711]/70 backdrop-blur-[2px]" />
          <div className="yori-door-r absolute inset-y-0 right-0 w-1/2 border-l border-[#efe4c8]/15 bg-[#1b1711]/70 backdrop-blur-[2px]" />
          <div className="yori-word absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[.28em] text-[#efe3c5]/45">
            {locale === 'de' ? 'WALD → GARTEN' : 'FOREST → GARDEN'}
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .yori-seam { animation: yoriSeam 3.2s ease-in-out infinite; }
        .yori-bloom { animation: yoriBloom 1.15s ease forwards; }
        .yori-door-l { animation: yoriDoorL .72s cubic-bezier(.6,0,.2,1) .34s forwards; }
        .yori-door-r { animation: yoriDoorR .72s cubic-bezier(.6,0,.2,1) .34s forwards; }
        @keyframes yoriSeam { 0%,100%{opacity:.48;transform:scaleY(.86)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes yoriBloom { from{filter:brightness(.62) saturate(.78)} to{filter:brightness(1) saturate(1.04)} }
        @keyframes yoriDoorL { to{transform:translateX(-98%)} }
        @keyframes yoriDoorR { to{transform:translateX(98%)} }
        @media(max-width:639px){ button{top:66%;height:124px;width:48px} }
        @media(prefers-reduced-motion:reduce){ .yori-seam,.yori-bloom,.yori-door-l,.yori-door-r{animation:none!important} }
      `}</style>
    </>
  );
}
