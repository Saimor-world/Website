'use client';

import SystemWorldHome from '@/components/SystemWorldHome';

type Props = { locale: 'de' | 'en' };

export default function LivingForestWorld({ locale }: Props) {
  return (
    <div className="relative isolate overflow-hidden bg-[#0c1d16]">
      <div className="relative z-0 brightness-[1.08] saturate-[1.08]">
        <SystemWorldHome locale={locale} />
      </div>

      {/* Lift the whole world out of near-black without turning it into a light theme. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.58] mix-blend-screen"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,70,48,.24)_0%,rgba(16,56,41,.16)_36%,rgba(12,42,32,.13)_70%,rgba(20,67,48,.19)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_14%,rgba(94,169,126,.17),transparent_31%),radial-gradient(ellipse_at_86%_22%,rgba(150,132,71,.12),transparent_27%),radial-gradient(ellipse_at_50%_64%,rgba(71,145,108,.12),transparent_38%)]" />
      </div>

      {/* Hero canopy: visible nature, still abstract enough to belong to the OS world. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[100svh] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
      >
        <div className="forest-breathe absolute inset-0 bg-[radial-gradient(ellipse_at_7%_20%,rgba(78,161,112,.24),transparent_32%),radial-gradient(ellipse_at_94%_18%,rgba(49,119,86,.28),transparent_33%),radial-gradient(ellipse_at_50%_100%,rgba(57,132,91,.20),transparent_44%)]" />

        <svg className="forest-canopy-left absolute -left-[20%] -top-[8%] h-[61%] w-[74%] opacity-[0.9] sm:-left-[9%] sm:h-[70%] sm:w-[57%]" viewBox="0 0 680 620" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="forest-soft-left" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter>
            <radialGradient id="leaf-left" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(238 184) rotate(46) scale(360 300)">
              <stop stopColor="#4a946d" stopOpacity=".48" />
              <stop offset=".55" stopColor="#20523d" stopOpacity=".34" />
              <stop offset="1" stopColor="#0c1d16" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M7 8C109 109 168 199 206 302C239 391 252 490 293 616" stroke="#4f8b68" strokeOpacity=".38" strokeWidth="10" strokeLinecap="round" />
          <path d="M48 57C137 111 194 160 243 234" stroke="#69a27f" strokeOpacity=".27" strokeWidth="4" strokeLinecap="round" />
          <g filter="url(#forest-soft-left)" fill="url(#leaf-left)">
            <ellipse cx="111" cy="86" rx="136" ry="79" transform="rotate(19 111 86)" />
            <ellipse cx="255" cy="74" rx="148" ry="84" transform="rotate(-11 255 74)" />
            <ellipse cx="398" cy="119" rx="141" ry="78" transform="rotate(21 398 119)" />
            <ellipse cx="127" cy="209" rx="157" ry="96" transform="rotate(-17 127 209)" />
            <ellipse cx="309" cy="205" rx="164" ry="92" transform="rotate(13 309 205)" />
          </g>
          <g fill="#78af8d" fillOpacity=".18">
            <ellipse cx="300" cy="139" rx="44" ry="15" transform="rotate(-28 300 139)" />
            <ellipse cx="360" cy="190" rx="38" ry="13" transform="rotate(24 360 190)" />
            <ellipse cx="210" cy="240" rx="46" ry="15" transform="rotate(39 210 240)" />
          </g>
        </svg>

        <svg className="forest-canopy-right absolute -right-[25%] -top-[10%] h-[64%] w-[76%] opacity-[0.84] sm:-right-[11%] sm:h-[72%] sm:w-[60%]" viewBox="0 0 680 620" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="forest-soft-right" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" /></filter>
            <radialGradient id="leaf-right" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(448 180) rotate(132) scale(365 295)">
              <stop stopColor="#4d8967" stopOpacity=".44" />
              <stop offset=".55" stopColor="#1d503a" stopOpacity=".32" />
              <stop offset="1" stopColor="#0c1d16" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M672 5C568 100 510 198 476 301C448 386 426 494 386 617" stroke="#4b8765" strokeOpacity=".36" strokeWidth="10" strokeLinecap="round" />
          <path d="M629 61C544 111 490 161 444 236" stroke="#67a17d" strokeOpacity=".25" strokeWidth="4" strokeLinecap="round" />
          <g filter="url(#forest-soft-right)" fill="url(#leaf-right)">
            <ellipse cx="572" cy="85" rx="145" ry="81" transform="rotate(-20 572 85)" />
            <ellipse cx="425" cy="74" rx="153" ry="85" transform="rotate(12 425 74)" />
            <ellipse cx="287" cy="122" rx="144" ry="80" transform="rotate(-22 287 122)" />
            <ellipse cx="559" cy="207" rx="160" ry="94" transform="rotate(15 559 207)" />
            <ellipse cx="382" cy="207" rx="166" ry="94" transform="rotate(-13 382 207)" />
          </g>
          <g fill="#77ab8a" fillOpacity=".17">
            <ellipse cx="388" cy="143" rx="44" ry="15" transform="rotate(29 388 143)" />
            <ellipse cx="329" cy="193" rx="38" ry="13" transform="rotate(-25 329 193)" />
            <ellipse cx="478" cy="242" rx="46" ry="15" transform="rotate(-40 478 242)" />
          </g>
        </svg>

        <div className="forest-floor absolute inset-x-[-14%] bottom-[-13%] h-[42%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(69,151,102,.28),rgba(24,75,53,.18)_46%,transparent_74%)] blur-[30px]" />
        <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[linear-gradient(to_top,rgba(13,54,38,.36),transparent)]" />

        <span className="forest-spore forest-spore-a absolute left-[14%] top-[31%] h-1.5 w-1.5 rounded-full bg-[#d2efc8]/70 shadow-[0_0_14px_rgba(210,239,200,.50)]" />
        <span className="forest-spore forest-spore-b absolute right-[21%] top-[38%] h-2 w-2 rounded-full bg-[#a8e6ce]/55 shadow-[0_0_17px_rgba(168,230,206,.44)]" />
        <span className="forest-spore forest-spore-c absolute left-[27%] top-[67%] h-1.5 w-1.5 rounded-full bg-[#ead79c]/55 shadow-[0_0_15px_rgba(234,215,156,.40)]" />
        <span className="forest-spore forest-spore-d absolute right-[13%] top-[62%] h-1.5 w-1.5 rounded-full bg-[#d2efc8]/55 shadow-[0_0_15px_rgba(210,239,200,.38)]" />
      </div>

      <style jsx>{`
        @keyframes forestSwayLeft { 0%,100% { transform: translate3d(0,0,0) rotate(-1deg) scale(1.01); } 50% { transform: translate3d(1.5%,.8%,0) rotate(1.2deg) scale(1.04); } }
        @keyframes forestSwayRight { 0%,100% { transform: translate3d(0,0,0) rotate(1deg) scale(1.02); } 50% { transform: translate3d(-1.3%,.8%,0) rotate(-1deg) scale(1.045); } }
        @keyframes forestBreathe { 0%,100% { opacity: .76; transform: scale(1); } 50% { opacity: 1; transform: scale(1.04); } }
        @keyframes forestSpore { 0%,100% { transform: translate3d(0,0,0); opacity: .28; } 35% { opacity: .82; } 65% { transform: translate3d(9px,-20px,0); opacity: .54; } }
        .forest-canopy-left { animation: forestSwayLeft 19s ease-in-out infinite; transform-origin: 16% 10%; }
        .forest-canopy-right { animation: forestSwayRight 23s ease-in-out infinite; transform-origin: 84% 10%; }
        .forest-breathe { animation: forestBreathe 13s ease-in-out infinite; }
        .forest-spore { animation: forestSpore 10s ease-in-out infinite; }
        .forest-spore-b { animation-delay: -2.6s; }
        .forest-spore-c { animation-delay: -5.1s; }
        .forest-spore-d { animation-delay: -7.4s; }
        @media (prefers-reduced-motion: reduce) { .forest-canopy-left,.forest-canopy-right,.forest-breathe,.forest-spore { animation: none !important; } }
      `}</style>
    </div>
  );
}
