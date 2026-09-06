'use client';

import SystemWorldHome from '@/components/SystemWorldHome';

type Props = { locale: 'de' | 'en' };

export default function LivingForestWorld({ locale }: Props) {
  return (
    <div className="relative isolate overflow-hidden bg-[#112c21]">
      <SystemWorldHome locale={locale} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_8%,rgba(115,185,135,.18),transparent_31%),radial-gradient(ellipse_at_100%_12%,rgba(100,163,119,.18),transparent_30%),linear-gradient(to_bottom,rgba(86,151,109,.06),transparent_58%)]" />

        <svg
          className="forest-canopy-left absolute -left-[22%] -top-[8%] h-[48%] w-[66%] opacity-[0.52] sm:-left-[9%] sm:h-[58%] sm:w-[50%] sm:opacity-[0.58]"
          viewBox="0 0 600 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 2C115 102 166 205 205 332C221 383 235 441 267 518" stroke="#4f8a65" strokeOpacity=".34" strokeWidth="8" strokeLinecap="round" />
          <path d="M34 54C135 101 206 163 259 238" stroke="#77a884" strokeOpacity=".24" strokeWidth="3" strokeLinecap="round" />
          <g fill="#5f9f74" fillOpacity=".18">
            <ellipse cx="92" cy="78" rx="108" ry="61" transform="rotate(16 92 78)" />
            <ellipse cx="221" cy="66" rx="120" ry="68" transform="rotate(-10 221 66)" />
            <ellipse cx="349" cy="111" rx="116" ry="66" transform="rotate(17 349 111)" />
            <ellipse cx="119" cy="183" rx="132" ry="78" transform="rotate(-15 119 183)" />
            <ellipse cx="285" cy="189" rx="132" ry="75" transform="rotate(12 285 189)" />
          </g>
          <g fill="#9fc3a8" fillOpacity=".16">
            <ellipse cx="292" cy="138" rx="40" ry="13" transform="rotate(-27 292 138)" />
            <ellipse cx="356" cy="202" rx="34" ry="11" transform="rotate(26 356 202)" />
            <ellipse cx="216" cy="252" rx="38" ry="12" transform="rotate(38 216 252)" />
          </g>
        </svg>

        <svg
          className="forest-canopy-right absolute -right-[25%] -top-[10%] h-[50%] w-[69%] opacity-[0.46] sm:-right-[10%] sm:h-[60%] sm:w-[52%] sm:opacity-[0.54]"
          viewBox="0 0 600 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M592 3C493 98 441 205 404 329C388 385 371 445 339 517" stroke="#4f8a65" strokeOpacity=".31" strokeWidth="8" strokeLinecap="round" />
          <path d="M565 55C470 104 399 162 347 239" stroke="#77a884" strokeOpacity=".22" strokeWidth="3" strokeLinecap="round" />
          <g fill="#5f9f74" fillOpacity=".16">
            <ellipse cx="509" cy="78" rx="108" ry="61" transform="rotate(-16 509 78)" />
            <ellipse cx="380" cy="66" rx="120" ry="68" transform="rotate(10 380 66)" />
            <ellipse cx="251" cy="111" rx="116" ry="66" transform="rotate(-17 251 111)" />
            <ellipse cx="481" cy="183" rx="132" ry="78" transform="rotate(15 481 183)" />
            <ellipse cx="315" cy="189" rx="132" ry="75" transform="rotate(-12 315 189)" />
          </g>
          <g fill="#9fc3a8" fillOpacity=".14">
            <ellipse cx="307" cy="138" rx="40" ry="13" transform="rotate(27 307 138)" />
            <ellipse cx="243" cy="202" rx="34" ry="11" transform="rotate(-26 243 202)" />
            <ellipse cx="383" cy="252" rx="38" ry="12" transform="rotate(-38 383 252)" />
          </g>
        </svg>

        <div className="absolute inset-x-[-10%] bottom-[-6%] h-[26%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(92,163,116,.16),rgba(42,94,65,.09)_48%,transparent_72%)]" />

        <span className="forest-spore forest-spore-a absolute left-[15%] top-[32%] h-1 w-1 rounded-full bg-[#d7edce]/70" />
        <span className="forest-spore forest-spore-b absolute right-[20%] top-[39%] h-1.5 w-1.5 rounded-full bg-[#a7dfc8]/60" />
        <span className="forest-spore forest-spore-c absolute left-[28%] top-[66%] h-1 w-1 rounded-full bg-[#e4d69c]/55" />
      </div>

      <style jsx>{`
        @keyframes forestSwayLeft {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-.4deg); }
          50% { transform: translate3d(1.2%, .5%, 0) rotate(.6deg); }
        }
        @keyframes forestSwayRight {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(.4deg); }
          50% { transform: translate3d(-1%, .5%, 0) rotate(-.5deg); }
        }
        @keyframes forestSpore {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: .28; }
          50% { transform: translate3d(5px, -12px, 0); opacity: .72; }
        }

        .forest-canopy-left,
        .forest-canopy-right,
        .forest-spore { animation: none; }

        @media (min-width: 640px) {
          .forest-canopy-left { animation: forestSwayLeft 26s ease-in-out infinite; transform-origin: 16% 10%; }
          .forest-canopy-right { animation: forestSwayRight 30s ease-in-out infinite; transform-origin: 84% 10%; }
          .forest-spore { animation: forestSpore 12s ease-in-out infinite; }
          .forest-spore-b { animation-delay: -4s; }
          .forest-spore-c { animation-delay: -8s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .forest-canopy-left,
          .forest-canopy-right,
          .forest-spore { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
