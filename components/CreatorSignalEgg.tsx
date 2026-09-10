'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreatorSignalEgg({ locale }: { locale: 'de' | 'en' }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const label = locale === 'de' ? 'Verborgenen Garten betreten' : 'Enter the hidden garden';

  useEffect(() => {
    const reveal = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (window.scrollY / max > 0.22) setDiscovered(true);
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
    window.setTimeout(() => router.push(href), 1850);
  };

  return (
    <>
      <button
        type="button"
        onClick={enter}
        aria-label={label}
        className={`garden-gate group fixed left-0 top-[57%] z-30 h-40 w-12 -translate-y-1/2 overflow-visible transition-[opacity,transform] duration-1000 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ead08a]/60 sm:w-14 ${
          discovered ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'
        }`}
      >
        <span className="gate-frame absolute inset-y-2 left-0 w-8 rounded-r-[1.1rem] border border-l-0 border-[#ead9a5]/18 bg-[#132c21]/82 shadow-[0_0_26px_rgba(230,200,126,.12)] backdrop-blur-md transition-all duration-500 group-hover:w-12 group-hover:border-[#ead9a5]/32 group-focus-visible:w-12 group-focus-visible:border-[#ead9a5]/32 sm:w-9 sm:group-hover:w-14 sm:group-focus-visible:w-14">
          <span className="gate-light absolute inset-y-3 left-0 w-[4px] rounded-r-full bg-[#f2d28b]/82 shadow-[0_0_18px_rgba(242,210,139,.62),0_0_52px_rgba(179,211,143,.22)]" />
          <span className="absolute inset-y-3 left-[9px] w-px bg-[#eadfca]/10" />
          <span className="absolute left-[12px] top-7 h-8 w-4 rotate-[-24deg] rounded-[80%_0_80%_0] bg-[#87a96f]/52" />
          <span className="absolute bottom-8 left-[15px] h-7 w-3 rotate-[26deg] rounded-[0_80%_0_80%] bg-[#b2c98d]/44" />
          <span className="absolute left-[11px] top-1/2 -translate-y-1/2 font-serif text-sm text-[#f0d99e]/60 transition-all duration-500 group-hover:left-[20px] group-hover:text-[#f6e5b8]/90 group-focus-visible:left-[20px] group-focus-visible:text-[#f6e5b8]/90">縁</span>
        </span>
        <span className="gate-whisper pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#ead9a5]/14 bg-[#10271d]/90 px-3 py-2 font-mono text-[7px] tracking-[.2em] text-[#f1e2ba]/0 opacity-0 shadow-[0_12px_38px_rgba(4,18,12,.28)] backdrop-blur-md transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#f1e2ba]/66 group-hover:opacity-100 group-focus-visible:translate-x-2 group-focus-visible:text-[#f1e2ba]/66 group-focus-visible:opacity-100 sm:left-12">
          {locale === 'de' ? 'EIN ANDERER WEG' : 'ANOTHER PATH'}
        </span>
        <span className="sr-only">{label}</span>
      </button>

      {opening && (
        <div className="yori-portal fixed inset-0 z-[999] overflow-hidden bg-[#07140e]" aria-hidden="true">
          <div className="forest-memory absolute inset-0 bg-[#10291e]" />
          <div className="garden-light absolute inset-0" />
          <div className="garden-floor absolute inset-x-[-10%] bottom-[-16%] h-[58%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(117,153,86,.48),rgba(33,75,48,.44)_45%,rgba(8,27,18,.1)_70%,transparent_76%)]" />
          <div className="garden-orb garden-orb-a absolute left-[18%] top-[28%] h-2 w-2 rounded-full bg-[#f1db9b]/70 shadow-[0_0_22px_rgba(241,219,155,.55)]" />
          <div className="garden-orb garden-orb-b absolute right-[23%] top-[36%] h-1.5 w-1.5 rounded-full bg-[#b8d7a2]/70 shadow-[0_0_18px_rgba(184,215,162,.48)]" />
          <div className="vine-field absolute inset-0">
            <span className="vine vine-a"><i/><i/><i/><i/><i/><i/></span>
            <span className="vine vine-b"><i/><i/><i/><i/><i/></span>
            <span className="vine vine-c"><i/><i/><i/><i/></span>
            <span className="vine vine-d"><i/><i/><i/><i/><i/></span>
          </div>
          <div className="shoji shoji-l absolute inset-y-0 left-0 w-1/2 border-r border-[#f1e7cd]/16 bg-[#241b13]/66 backdrop-blur-[2px]" />
          <div className="shoji shoji-r absolute inset-y-0 right-0 w-1/2 border-l border-[#f1e7cd]/16 bg-[#241b13]/66 backdrop-blur-[2px]" />
          <div className="grid-lines absolute inset-0 opacity-0 [background-image:linear-gradient(rgba(245,236,215,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(245,236,215,.13)_1px,transparent_1px)] [background-size:88px_88px]" />
          <div className="threshold absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] tracking-[.28em] text-[#f4e7c5]/0">FOREST → GARDEN</div>
        </div>
      )}

      <style jsx>{`
        .gate-light { animation: seamBreath 5.8s ease-in-out infinite; }
        .garden-gate::after { content:''; position:absolute; left:0; top:50%; width:46px; height:112%; transform:translateY(-50%); background:radial-gradient(ellipse at left,rgba(236,207,133,.14),transparent 72%); opacity:.52; transition:opacity .5s ease,width .5s ease; pointer-events:none; }
        .garden-gate:hover::after,.garden-gate:focus-visible::after { width:92px; opacity:.92; }
        .forest-memory { animation: forestMemory 1.35s ease forwards; }
        .garden-light { background:radial-gradient(circle at 50% 58%,rgba(236,196,116,.30),transparent 26%),radial-gradient(circle at 38% 30%,rgba(128,177,116,.20),transparent 34%),linear-gradient(180deg,#0d2418 0%,#173524 47%,#0b2116 100%); animation:gardenLight 1.45s ease forwards; }
        .garden-orb-a { animation: orbDriftA 2.2s ease-in-out infinite alternate; }
        .garden-orb-b { animation: orbDriftB 2.6s ease-in-out infinite alternate; }
        .shoji-l { transform:translateX(0); animation:doorLeft .92s cubic-bezier(.6,0,.2,1) .68s forwards; }
        .shoji-r { transform:translateX(0); animation:doorRight .92s cubic-bezier(.6,0,.2,1) .68s forwards; }
        .grid-lines { animation:gridFade .55s ease .48s forwards; }
        .threshold { animation:thresholdIn .45s ease 1.18s forwards; }
        .vine { position:absolute; display:block; width:4px; border-radius:999px; background:linear-gradient(to top,#173f2b,#5f8150 72%,#b6c68c); transform-origin:bottom center; transform:scaleY(0) rotate(var(--r)); animation:vineGrow 1.05s cubic-bezier(.16,.82,.18,1) forwards; box-shadow:0 0 30px rgba(112,151,89,.13); }
        .vine i { position:absolute; width:24px; height:12px; border-radius:100% 0 100% 0; background:linear-gradient(135deg,#315f3d,#8fa36b); opacity:0; transform:scale(.15) rotate(-24deg); animation:leafPop .45s ease forwards; }
        .vine i:nth-child(odd){left:-20px;transform:scale(.15) rotate(24deg);border-radius:0 100% 0 100%;}.vine i:nth-child(even){right:-20px}
        .vine i:nth-child(1){bottom:14%;animation-delay:.18s}.vine i:nth-child(2){bottom:29%;animation-delay:.3s}.vine i:nth-child(3){bottom:44%;animation-delay:.42s}.vine i:nth-child(4){bottom:59%;animation-delay:.55s}.vine i:nth-child(5){bottom:74%;animation-delay:.68s}.vine i:nth-child(6){bottom:88%;animation-delay:.8s}
        .vine-a{--r:-13deg;left:7%;bottom:-8%;height:86%}.vine-b{--r:15deg;right:7%;bottom:-9%;height:92%;animation-delay:.06s}.vine-c{--r:-6deg;left:28%;bottom:-12%;height:64%;animation-delay:.13s}.vine-d{--r:7deg;right:29%;bottom:-12%;height:68%;animation-delay:.18s}
        @keyframes seamBreath{0%,100%{opacity:.46;transform:scaleY(.9)}50%{opacity:1;transform:scaleY(1)}}
        @keyframes forestMemory{0%,28%{opacity:1}100%{opacity:0}}
        @keyframes gardenLight{from{filter:brightness(.55) saturate(.75)}to{filter:brightness(1) saturate(1.03)}}
        @keyframes vineGrow{0%{transform:scaleY(0) rotate(var(--r));opacity:0}18%{opacity:1}100%{transform:scaleY(1) rotate(var(--r));opacity:.96}}
        @keyframes leafPop{to{opacity:.94;transform:scale(1) rotate(-18deg)}}
        @keyframes gridFade{to{opacity:.22}}
        @keyframes doorLeft{to{transform:translateX(-96%)}}
        @keyframes doorRight{to{transform:translateX(96%)}}
        @keyframes thresholdIn{to{color:rgba(244,231,197,.38)}}
        @keyframes orbDriftA{to{transform:translate(9px,-11px);opacity:.95}}
        @keyframes orbDriftB{to{transform:translate(-8px,10px);opacity:.9}}
        @media(max-width:639px){.garden-gate{top:64%;height:132px}.gate-whisper{display:none}.vine-c,.vine-d{opacity:.56}}
        @media(prefers-reduced-motion:reduce){.gate-light,.forest-memory,.garden-light,.garden-orb-a,.garden-orb-b,.shoji,.grid-lines,.threshold,.vine,.vine i{animation:none!important}}
      `}</style>
    </>
  );
}
