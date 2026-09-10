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
    window.setTimeout(() => router.push(href), 1280);
  };

  return (
    <>
      <a
        href={href}
        onClick={enter}
        aria-label={locale === 'de' ? 'Verborgenen YORI-Garten betreten' : 'Enter the hidden YORI garden'}
        className="yori-gate group fixed left-0 top-[58%] z-[220] h-40 w-16 -translate-y-1/2 overflow-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9c487]/70"
      >
        <span className="absolute inset-y-0 left-0 w-11 rounded-r-[1.45rem] border border-l-0 border-[#cfdcb8]/28 bg-[#0c2319]/95 shadow-[0_0_34px_rgba(141,176,111,.18),inset_-1px_0_0_rgba(255,255,255,.025)] backdrop-blur-md transition-all duration-500 group-hover:w-14 group-focus-visible:w-14">
          <span className="yori-seam absolute inset-y-3 left-0 w-[5px] rounded-r-full bg-[#e3ca84] shadow-[0_0_16px_rgba(227,202,132,.84),0_0_46px_rgba(116,160,94,.34)]" />
          <span className="absolute left-[13px] top-[19px] h-9 w-4 rotate-[-31deg] rounded-[80%_0_80%_0] bg-[#71955f]/78" />
          <span className="absolute bottom-[21px] left-[18px] h-8 w-3 rotate-[29deg] rounded-[0_80%_0_80%] bg-[#a7bc83]/62" />
          <span className="absolute left-[14px] top-1/2 -translate-y-1/2 font-serif text-[17px] text-[#f2e2b0]/88 transition-all duration-500 group-hover:left-[22px] group-focus-visible:left-[22px]">縁</span>
          <span className="yori-spore absolute right-2 top-7 h-1 w-1 rounded-full bg-[#b8d7a2]/75" />
          <span className="yori-spore yori-spore-b absolute bottom-9 right-3 h-1 w-1 rounded-full bg-[#e3ca84]/70" />
        </span>

        <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 translate-x-[-8px] whitespace-nowrap rounded-full border border-[#d7c896]/17 bg-[#0d241a]/96 px-3 py-2 font-mono text-[8px] tracking-[.2em] text-[#efe5c6]/0 opacity-0 shadow-[0_12px_40px_rgba(3,18,11,.44)] backdrop-blur-md transition-all duration-400 group-hover:translate-x-1 group-hover:text-[#efe5c6]/76 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:text-[#efe5c6]/76 group-focus-visible:opacity-100">
          {locale === 'de' ? 'EIN ANDERER WEG' : 'ANOTHER PATH'}
        </span>
      </a>

      {opening ? (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#06130c]" aria-hidden="true">
          <div className="yori-bloom absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(234,211,145,.34),transparent_22%),radial-gradient(circle_at_36%_28%,rgba(113,157,95,.28),transparent_36%),linear-gradient(180deg,#07150e_0%,#173a27_49%,#0a2115_100%)]" />
          <div className="absolute inset-x-[-8%] bottom-[-10%] h-[52%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(111,153,80,.45),rgba(34,79,49,.18)_50%,transparent_74%)]" />
          <div className="yori-door-l absolute inset-y-0 left-0 w-1/2 border-r border-[#efe4c8]/15 bg-[#19150f]/76 backdrop-blur-[2px]" />
          <div className="yori-door-r absolute inset-y-0 right-0 w-1/2 border-l border-[#efe4c8]/15 bg-[#19150f]/76 backdrop-blur-[2px]" />
          <div className="yori-word absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[.28em] text-[#efe3c5]/52">
            {locale === 'de' ? 'WALD → GARTEN' : 'FOREST → GARDEN'}
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .yori-gate { animation: gateArrival 1.25s cubic-bezier(.2,.8,.2,1) .5s both; }
        .yori-seam { animation: yoriSeam 3.2s ease-in-out infinite; }
        .yori-spore { animation: yoriSpore 4.2s ease-in-out infinite; }
        .yori-spore-b { animation-delay: -1.9s; }
        .yori-bloom { animation: yoriBloom 1.16s ease forwards; }
        .yori-door-l { animation: yoriDoorL .74s cubic-bezier(.6,0,.2,1) .34s forwards; }
        .yori-door-r { animation: yoriDoorR .74s cubic-bezier(.6,0,.2,1) .34s forwards; }
        @keyframes gateArrival { from{transform:translate(-78%,-50%);opacity:.18} to{transform:translate(0,-50%);opacity:1} }
        @keyframes yoriSeam { 0%,100%{opacity:.48;transform:scaleY(.86)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes yoriSpore { 0%,100%{transform:translate3d(0,5px,0);opacity:.22} 50%{transform:translate3d(5px,-10px,0);opacity:.86} }
        @keyframes yoriBloom { from{filter:brightness(.5) saturate(.68)} to{filter:brightness(1.04) saturate(1.08)} }
        @keyframes yoriDoorL { to{transform:translateX(-98%)} }
        @keyframes yoriDoorR { to{transform:translateX(98%)} }
        @media(max-width:639px){.yori-gate{top:63%;height:132px;width:52px}.yori-gate>span:first-child{width:38px}.yori-gate>span:nth-child(2){display:none}}
        @media(prefers-reduced-motion:reduce){.yori-gate,.yori-seam,.yori-spore,.yori-bloom,.yori-door-l,.yori-door-r{animation:none!important}}
      `}</style>
    </>
  );
}
