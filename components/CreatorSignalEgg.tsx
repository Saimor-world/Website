'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const GARDEN = 'https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/outside-golden-hour.png';

export default function CreatorSignalEgg({ locale }: { locale: 'de' | 'en' }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const label = locale === 'de' ? 'Ein anderes Signal' : 'Another signal';

  const enter = () => {
    if (opening) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }
    setOpening(true);
    window.setTimeout(() => router.push(href), 2050);
  };

  return (
    <>
      <button
        type="button"
        onClick={enter}
        aria-label={label}
        title={label}
        className="creator-signal group fixed bottom-4 right-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9eadf]/10 bg-[#102c20]/30 text-[#d9eadf]/34 shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-[#e8d39b]/40 hover:bg-[#17372a]/80 hover:text-[#f2de9c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6d39a]/55 sm:bottom-5 sm:right-5"
      >
        <span className="signal-ring absolute inset-[5px] rounded-full border border-current/15" aria-hidden="true" />
        <span className="relative block h-5 w-5 font-serif text-[16px] leading-5" aria-hidden="true">
          ♪
          <span className="absolute -right-1 -top-1 font-mono text-[7px] font-bold">?</span>
        </span>
        <span className="pointer-events-none absolute bottom-full right-0 mb-2.5 whitespace-nowrap rounded-full border border-[#e6d39a]/18 bg-[#0b2118]/94 px-3 py-1.5 font-mono text-[8px] tracking-[.16em] text-[#f0dfaa]/0 opacity-0 shadow-xl transition duration-300 group-hover:text-[#f0dfaa]/80 group-hover:opacity-100">
          {label}
        </span>
      </button>

      {opening && (
        <div className="yori-portal fixed inset-0 z-[999] overflow-hidden bg-[#07140e]" aria-hidden="true">
          <div className="forest-memory absolute inset-0 bg-[#10291e]" />
          <div className="warmth absolute inset-0" />
          <div className="vine-field absolute inset-0">
            <span className="vine vine-a"><i/><i/><i/><i/><i/><i/></span>
            <span className="vine vine-b"><i/><i/><i/><i/><i/></span>
            <span className="vine vine-c"><i/><i/><i/><i/></span>
            <span className="vine vine-d"><i/><i/><i/><i/><i/></span>
            <span className="vine vine-e"><i/><i/><i/></span>
          </div>
          <div className="garden-door absolute inset-0">
            <div className="garden absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${GARDEN})` }} />
            <div className="garden-grade absolute inset-0 bg-[radial-gradient(circle_at_58%_43%,rgba(250,221,158,.24),transparent_25%),linear-gradient(180deg,rgba(5,15,10,.05),rgba(7,18,12,.28))]" />
          </div>
          <div className="shoji shoji-l absolute inset-y-0 left-0 w-1/2 border-r border-[#f1e7cd]/16 bg-[#241b13]/42 backdrop-blur-[1px]" />
          <div className="shoji shoji-r absolute inset-y-0 right-0 w-1/2 border-l border-[#f1e7cd]/16 bg-[#241b13]/42 backdrop-blur-[1px]" />
          <div className="grid-lines absolute inset-0 opacity-0 [background-image:linear-gradient(rgba(245,236,215,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(245,236,215,.13)_1px,transparent_1px)] [background-size:88px_88px]" />
          <div className="yori-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#fff4d8] opacity-0 drop-shadow-[0_12px_40px_rgba(0,0,0,.35)]">
            <div className="font-serif text-5xl tracking-[.16em] sm:text-7xl">YORI</div>
            <div className="mt-3 font-mono text-[8px] tracking-[.34em] text-[#f0d58f]/86">THE CREATIVE HOUSE</div>
          </div>
          <div className="threshold absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-[.28em] text-[#f4e7c5]/0">FOREST → GARDEN</div>
        </div>
      )}

      <style jsx>{`
        .creator-signal::after { content:''; position:absolute; inset:-8px; border:1px solid rgba(232,211,155,.0); border-radius:999px; transition:.5s ease; }
        .creator-signal:hover::after { inset:-5px; border-color:rgba(232,211,155,.18); }
        .signal-ring { animation: signalBreath 4.8s ease-in-out infinite; }
        .forest-memory { animation: forestMemory 1.55s ease forwards; }
        .warmth { background:radial-gradient(circle at 50% 70%,rgba(224,177,94,.24),transparent 38%); animation:warmthIn 1.15s ease forwards; }
        .garden-door { clip-path:circle(0% at 84% 88%); animation:gardenOpen 1.75s cubic-bezier(.16,.8,.18,1) .2s forwards; }
        .garden { transform:scale(1.12); filter:saturate(.82) brightness(.78); animation:gardenSettle 1.8s cubic-bezier(.16,.8,.18,1) .2s forwards; }
        .shoji-l { transform:translateX(0); animation:doorLeft .9s cubic-bezier(.6,0,.2,1) 1.05s forwards; }
        .shoji-r { transform:translateX(0); animation:doorRight .9s cubic-bezier(.6,0,.2,1) 1.05s forwards; }
        .grid-lines { animation:gridFade .65s ease .78s forwards; }
        .yori-mark { animation:markIn .55s ease 1.28s forwards; }
        .threshold { animation:thresholdIn .4s ease 1.55s forwards; }
        .vine { position:absolute; display:block; width:4px; border-radius:999px; background:linear-gradient(to top,#173f2b,#5f8150 72%,#b6c68c); transform-origin:bottom center; transform:scaleY(0) rotate(var(--r)); animation:vineGrow 1.1s cubic-bezier(.16,.82,.18,1) forwards; box-shadow:0 0 30px rgba(112,151,89,.13); }
        .vine i { position:absolute; width:24px; height:12px; border-radius:100% 0 100% 0; background:linear-gradient(135deg,#315f3d,#8fa36b); opacity:0; transform:scale(.15) rotate(-24deg); animation:leafPop .45s ease forwards; }
        .vine i:nth-child(odd){left:-20px;transform:scale(.15) rotate(24deg);border-radius:0 100% 0 100%;}.vine i:nth-child(even){right:-20px}
        .vine i:nth-child(1){bottom:14%;animation-delay:.18s}.vine i:nth-child(2){bottom:29%;animation-delay:.3s}.vine i:nth-child(3){bottom:44%;animation-delay:.42s}.vine i:nth-child(4){bottom:59%;animation-delay:.55s}.vine i:nth-child(5){bottom:74%;animation-delay:.68s}.vine i:nth-child(6){bottom:88%;animation-delay:.8s}
        .vine-a{--r:-13deg;left:5%;bottom:-8%;height:92%}.vine-b{--r:15deg;right:6%;bottom:-9%;height:98%;animation-delay:.06s}.vine-c{--r:-6deg;left:26%;bottom:-12%;height:70%;animation-delay:.13s}.vine-d{--r:7deg;right:27%;bottom:-12%;height:74%;animation-delay:.18s}.vine-e{--r:-2deg;left:50%;bottom:-16%;height:55%;animation-delay:.24s}
        @keyframes signalBreath{0%,100%{opacity:.35;transform:scale(.86)}50%{opacity:.9;transform:scale(1)}}
        @keyframes forestMemory{0%,32%{opacity:1}100%{opacity:0}}
        @keyframes warmthIn{from{opacity:0}to{opacity:1}}
        @keyframes gardenOpen{0%{clip-path:circle(0% at 84% 88%)}62%{clip-path:circle(74% at 70% 64%)}100%{clip-path:circle(150% at 50% 50%)}}
        @keyframes gardenSettle{to{transform:scale(1);filter:saturate(1.04) brightness(1)}}
        @keyframes vineGrow{0%{transform:scaleY(0) rotate(var(--r));opacity:0}18%{opacity:1}100%{transform:scaleY(1) rotate(var(--r));opacity:.96}}
        @keyframes leafPop{to{opacity:.94;transform:scale(1) rotate(-18deg)}}
        @keyframes gridFade{to{opacity:.24}}
        @keyframes doorLeft{to{transform:translateX(-93%)}}
        @keyframes doorRight{to{transform:translateX(93%)}}
        @keyframes markIn{from{opacity:0;transform:translate(-50%,-45%) scale(.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
        @keyframes thresholdIn{to{color:rgba(244,231,197,.38)}}
        @media(max-width:639px){.vine-c,.vine-d,.vine-e{opacity:.58}.yori-mark div:first-child{letter-spacing:.11em}}
        @media(prefers-reduced-motion:reduce){.signal-ring,.forest-memory,.warmth,.garden-door,.garden,.shoji,.grid-lines,.yori-mark,.threshold,.vine,.vine i{animation:none!important}}
      `}</style>
    </>
  );
}
