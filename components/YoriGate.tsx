'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function YoriGate({ locale }: { locale: 'de' | 'en' }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';

  const enter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (opening) {
      event.preventDefault();
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    setOpening(true);
    window.setTimeout(() => router.push(href), 1180);
  };

  return (
    <>
      <a
        href={href}
        onClick={enter}
        aria-label={locale === 'de' ? 'Verborgenen YORI-Weg öffnen' : 'Open the hidden YORI path'}
        className="yori-edge group fixed left-0 top-[64%] z-[220] h-28 w-8 -translate-y-1/2 focus-visible:outline-none"
      >
        <span className="absolute left-0 top-1/2 h-20 w-[3px] -translate-y-1/2 rounded-r-full bg-[#d6bd7a]/85 shadow-[0_0_9px_rgba(214,189,122,.52),0_0_24px_rgba(111,150,91,.18)] transition-all duration-500 group-hover:h-24 group-hover:w-[4px]" />
        <span className="absolute left-[5px] top-[32%] h-5 w-2.5 rotate-[-28deg] rounded-[80%_0_80%_0] bg-[#789468]/70 opacity-75 transition-all duration-500 group-hover:left-[9px] group-hover:opacity-100" />
        <span className="absolute bottom-[30%] left-[6px] h-4 w-2 rotate-[28deg] rounded-[0_80%_0_80%] bg-[#9cad77]/55 opacity-70 transition-all duration-500 group-hover:left-[10px] group-hover:opacity-100" />
        <span className="yori-dot absolute left-[6px] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#ead699]/80 opacity-70" />

        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 translate-x-[-7px] whitespace-nowrap border border-[#d7c896]/12 bg-[#0b2118]/94 px-3 py-2 font-mono text-[7px] tracking-[.19em] text-[#efe5c6]/0 opacity-0 shadow-[0_12px_36px_rgba(3,18,11,.38)] backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#efe5c6]/68 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:text-[#efe5c6]/68 group-focus-visible:opacity-100">
          {locale === 'de' ? 'EIN ANDERER WEG' : 'ANOTHER PATH'}
        </span>
      </a>

      {opening ? (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#06130c]" aria-hidden="true">
          <div className="yori-bloom absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(234,211,145,.28),transparent_22%),radial-gradient(circle_at_36%_28%,rgba(113,157,95,.24),transparent_36%),linear-gradient(180deg,#07150e_0%,#173a27_49%,#0a2115_100%)]" />
          <div className="yori-door-l absolute inset-y-0 left-0 w-1/2 border-r border-[#efe4c8]/12 bg-[#19150f]/78" />
          <div className="yori-door-r absolute inset-y-0 right-0 w-1/2 border-l border-[#efe4c8]/12 bg-[#19150f]/78" />
          <div className="yori-word absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[.28em] text-[#efe3c5]/46">
            {locale === 'de' ? 'WALD → YORI' : 'FOREST → YORI'}
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .yori-edge { animation: edgeArrival 1s ease .45s both; }
        .yori-dot { animation: edgePulse 3.4s ease-in-out infinite; }
        .yori-bloom { animation: yoriBloom 1.05s ease forwards; }
        .yori-door-l { animation: yoriDoorL .7s cubic-bezier(.6,0,.2,1) .28s forwards; }
        .yori-door-r { animation: yoriDoorR .7s cubic-bezier(.6,0,.2,1) .28s forwards; }
        @keyframes edgeArrival { from{transform:translate(-70%,-50%);opacity:0} to{transform:translate(0,-50%);opacity:1} }
        @keyframes edgePulse { 0%,100%{opacity:.28;transform:translateY(-50%) scale(.8)} 50%{opacity:1;transform:translateY(-50%) scale(1.2)} }
        @keyframes yoriBloom { from{filter:brightness(.48) saturate(.7)} to{filter:brightness(1.02) saturate(1.05)} }
        @keyframes yoriDoorL { to{transform:translateX(-99%)} }
        @keyframes yoriDoorR { to{transform:translateX(99%)} }
        @media(max-width:639px){.yori-edge{top:69%;height:96px;width:26px}.yori-edge>span:nth-child(5){display:none}}
        @media(prefers-reduced-motion:reduce){.yori-edge,.yori-dot,.yori-bloom,.yori-door-l,.yori-door-r{animation:none!important}}
      `}</style>
    </>
  );
}
