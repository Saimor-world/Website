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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      router.push(href);
      return;
    }
    setOpening(true);
    window.setTimeout(() => router.push(href), 1450);
  };

  return (
    <>
      <button
        type="button"
        onClick={enter}
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
      </button>

      {opening && (
        <div className="yori-portal fixed inset-0 z-[999] overflow-hidden bg-[#10261d]" aria-hidden="true">
          <div className="yori-forest absolute inset-0 bg-[#112c21]" />
          <div
            className="yori-garden absolute inset-0 scale-[1.08] bg-cover bg-center"
            style={{ backgroundImage: `url(${GARDEN})` }}
          />
          <div className="yori-wash absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(244,223,169,.20),transparent_28%),linear-gradient(180deg,rgba(8,22,16,.10),rgba(11,26,18,.30))]" />

          <div className="yori-vines absolute inset-0">
            <span className="vine vine-a"><i/><i/><i/><i/><i/></span>
            <span className="vine vine-b"><i/><i/><i/><i/></span>
            <span className="vine vine-c"><i/><i/><i/><i/><i/></span>
            <span className="vine vine-d"><i/><i/><i/></span>
          </div>

          <div className="yori-shoji absolute inset-0 opacity-0 [background-image:linear-gradient(rgba(245,236,215,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(245,236,215,.14)_1px,transparent_1px)] [background-size:84px_84px]" />

          <div className="yori-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#f6ead0] opacity-0">
            <div className="font-serif text-5xl tracking-[.16em] sm:text-7xl">YORI</div>
            <div className="mt-3 font-mono text-[9px] tracking-[.28em] text-[#f0d58f]/80">CREATE IN FLOW</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .yori-forest { animation: forestFade 1.3s ease forwards; }
        .yori-garden { clip-path: circle(0% at 84% 88%); animation: gardenReveal 1.45s cubic-bezier(.2,.8,.2,1) forwards; }
        .yori-wash { animation: washIn 1.4s ease forwards; }
        .yori-shoji { animation: shojiIn .55s ease 1.0s forwards; }
        .yori-mark { animation: markIn .42s ease 1.05s forwards; }

        .vine {
          position: absolute;
          display: block;
          width: 4px;
          border-radius: 999px;
          background: linear-gradient(to top, #224d36, #6f8f58 78%, #b4c88d);
          transform-origin: bottom center;
          transform: scaleY(0) rotate(var(--r));
          animation: vineGrow .95s cubic-bezier(.18,.8,.2,1) forwards;
          box-shadow: 0 0 24px rgba(112,151,89,.12);
        }
        .vine i {
          position: absolute;
          width: 22px;
          height: 11px;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg,#436b45,#8ca06a);
          opacity: 0;
          transform: scale(.2) rotate(-26deg);
          animation: leafPop .42s ease forwards;
        }
        .vine i:nth-child(odd) { left: -18px; transform: scale(.2) rotate(22deg); border-radius: 0 100% 0 100%; }
        .vine i:nth-child(even) { right: -18px; }
        .vine i:nth-child(1) { bottom: 18%; animation-delay: .18s; }
        .vine i:nth-child(2) { bottom: 34%; animation-delay: .30s; }
        .vine i:nth-child(3) { bottom: 50%; animation-delay: .42s; }
        .vine i:nth-child(4) { bottom: 67%; animation-delay: .56s; }
        .vine i:nth-child(5) { bottom: 82%; animation-delay: .70s; }

        .vine-a { --r: -12deg; left: 7%; bottom: -6%; height: 78%; animation-delay: 0s; }
        .vine-b { --r: 14deg; right: 8%; bottom: -8%; height: 86%; animation-delay: .08s; }
        .vine-c { --r: -5deg; left: 30%; bottom: -12%; height: 62%; animation-delay: .14s; }
        .vine-d { --r: 7deg; right: 34%; bottom: -14%; height: 54%; animation-delay: .22s; }

        @keyframes gardenReveal {
          0% { clip-path: circle(0% at 84% 88%); transform: scale(1.08); filter: saturate(.85) brightness(.82); }
          62% { clip-path: circle(78% at 70% 65%); }
          100% { clip-path: circle(150% at 50% 50%); transform: scale(1); filter: saturate(1) brightness(1); }
        }
        @keyframes forestFade { 0%,38% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes washIn { 0% { opacity: 0; } 65% { opacity: .38; } 100% { opacity: .72; } }
        @keyframes vineGrow { 0% { transform: scaleY(0) rotate(var(--r)); opacity: 0; } 20% { opacity: 1; } 100% { transform: scaleY(1) rotate(var(--r)); opacity: .98; } }
        @keyframes leafPop { to { opacity: .95; transform: scale(1) rotate(-20deg); } }
        @keyframes shojiIn { to { opacity: .32; } }
        @keyframes markIn { from { opacity: 0; transform: translate(-50%,-46%) scale(.98); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }

        @media (max-width: 639px) {
          .vine-c,.vine-d { opacity: .58; }
          .yori-mark div:first-child { letter-spacing: .11em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .yori-forest,.yori-garden,.yori-wash,.yori-shoji,.yori-mark,.vine,.vine i { animation: none !important; }
        }
      `}</style>
    </>
  );
}
