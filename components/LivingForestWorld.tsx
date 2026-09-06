'use client';

import SystemWorldHome from '@/components/SystemWorldHome';

type Props = { locale: 'de' | 'en' };

export default function LivingForestWorld({ locale }: Props) {
  return (
    <div className="relative isolate overflow-hidden bg-[#06100d]">
      <SystemWorldHome locale={locale} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[100svh] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
      >
        <div className="forest-breathe absolute inset-0 bg-[radial-gradient(ellipse_at_8%_22%,rgba(56,132,91,.16),transparent_31%),radial-gradient(ellipse_at_92%_16%,rgba(34,91,67,.20),transparent_31%),radial-gradient(ellipse_at_50%_100%,rgba(37,108,73,.13),transparent_42%)]" />

        <svg
          className="forest-canopy-left absolute -left-[18%] -top-[7%] h-[58%] w-[68%] opacity-[0.72] sm:-left-[8%] sm:h-[68%] sm:w-[54%]"
          viewBox="0 0 680 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="forest-soft-left" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <radialGradient id="leaf-left" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(240 190) rotate(49) scale(340 290)">
              <stop stopColor="#2f7253" stopOpacity=".38" />
              <stop offset=".58" stopColor="#123c2d" stopOpacity=".24" />
              <stop offset="1" stopColor="#06100d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path d="M6 11C110 110 165 194 204 299C236 386 252 489 292 613" stroke="#214b37" strokeOpacity=".34" strokeWidth="9" strokeLinecap="round" />
          <path d="M49 58C137 111 193 159 242 232" stroke="#356d50" strokeOpacity=".22" strokeWidth="4" strokeLinecap="round" />
          <path d="M115 97C207 118 292 165 353 232" stroke="#356d50" strokeOpacity=".17" strokeWidth="3" strokeLinecap="round" />

          <g filter="url(#forest-soft-left)" fill="url(#leaf-left)">
            <ellipse cx="111" cy="86" rx="130" ry="76" transform="rotate(19 111 86)" />
            <ellipse cx="252" cy="74" rx="142" ry="82" transform="rotate(-11 252 74)" />
            <ellipse cx="390" cy="116" rx="135" ry="74" transform="rotate(21 390 116)" />
            <ellipse cx="125" cy="205" rx="151" ry="92" transform="rotate(-17 125 205)" />
            <ellipse cx="304" cy="204" rx="158" ry="88" transform="rotate(13 304 204)" />
            <ellipse cx="474" cy="230" rx="126" ry="75" transform="rotate(-8 474 230)" />
          </g>

          <g fill="#4c8b68" fillOpacity=".12">
            <ellipse cx="299" cy="139" rx="42" ry="15" transform="rotate(-28 299 139)" />
            <ellipse cx="359" cy="189" rx="36" ry="13" transform="rotate(24 359 189)" />
            <ellipse cx="208" cy="238" rx="44" ry="15" transform="rotate(39 208 238)" />
            <ellipse cx="432" cy="283" rx="39" ry="14" transform="rotate(-33 432 283)" />
            <ellipse cx="246" cy="321" rx="31" ry="11" transform="rotate(16 246 321)" />
          </g>
        </svg>

        <svg
          className="forest-canopy-right absolute -right-[23%] -top-[9%] h-[62%] w-[72%] opacity-[0.66] sm:-right-[10%] sm:h-[70%] sm:w-[58%]"
          viewBox="0 0 680 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="forest-soft-right" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <radialGradient id="leaf-right" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(450 180) rotate(130) scale(350 280)">
              <stop stopColor="#396f52" stopOpacity=".32" />
              <stop offset=".55" stopColor="#143c2e" stopOpacity=".23" />
              <stop offset="1" stopColor="#06100d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path d="M671 5C568 99 511 198 476 300C448 383 425 493 386 616" stroke="#214b37" strokeOpacity=".31" strokeWidth="9" strokeLinecap="round" />
          <path d="M628 61C544 110 490 160 444 235" stroke="#356d50" strokeOpacity=".20" strokeWidth="4" strokeLinecap="round" />
          <path d="M569 102C474 123 398 167 335 235" stroke="#356d50" strokeOpacity=".15" strokeWidth="3" strokeLinecap="round" />

          <g filter="url(#forest-soft-right)" fill="url(#leaf-right)">
            <ellipse cx="572" cy="85" rx="139" ry="78" transform="rotate(-20 572 85)" />
            <ellipse cx="425" cy="74" rx="147" ry="82" transform="rotate(12 425 74)" />
            <ellipse cx="287" cy="122" rx="138" ry="76" transform="rotate(-22 287 122)" />
            <ellipse cx="559" cy="207" rx="155" ry="90" transform="rotate(15 559 207)" />
            <ellipse cx="382" cy="207" rx="160" ry="90" transform="rotate(-13 382 207)" />
            <ellipse cx="211" cy="232" rx="126" ry="76" transform="rotate(9 211 232)" />
          </g>

          <g fill="#4c8b68" fillOpacity=".11">
            <ellipse cx="387" cy="142" rx="42" ry="15" transform="rotate(29 387 142)" />
            <ellipse cx="329" cy="192" rx="36" ry="13" transform="rotate(-25 329 192)" />
            <ellipse cx="477" cy="241" rx="44" ry="15" transform="rotate(-40 477 241)" />
            <ellipse cx="253" cy="284" rx="39" ry="14" transform="rotate(34 253 284)" />
          </g>
        </svg>

        <div className="forest-floor absolute inset-x-[-12%] bottom-[-14%] h-[38%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(35,105,70,.20),rgba(10,40,28,.12)_45%,transparent_72%)] blur-[34px]" />
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(to_top,rgba(4,18,12,.72),transparent)]" />

        <span className="forest-spore forest-spore-a absolute left-[14%] top-[31%] h-1 w-1 rounded-full bg-[#bfe4b6]/60 shadow-[0_0_13px_rgba(191,228,182,.45)]" />
        <span className="forest-spore forest-spore-b absolute right-[21%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#8ed7bd]/45 shadow-[0_0_15px_rgba(142,215,189,.38)]" />
        <span className="forest-spore forest-spore-c absolute left-[27%] top-[67%] h-1 w-1 rounded-full bg-[#d9c98c]/45 shadow-[0_0_13px_rgba(217,201,140,.35)]" />
        <span className="forest-spore forest-spore-d absolute right-[13%] top-[62%] h-1 w-1 rounded-full bg-[#bfe4b6]/45 shadow-[0_0_13px_rgba(191,228,182,.35)]" />
      </div>

      <style jsx>{`
        @keyframes forestSwayLeft {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg) scale(1.01); }
          50% { transform: translate3d(1.4%, .8%, 0) rotate(1.2deg) scale(1.035); }
        }
        @keyframes forestSwayRight {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg) scale(1.02); }
          50% { transform: translate3d(-1.2%, .7%, 0) rotate(-1deg) scale(1.04); }
        }
        @keyframes forestBreathe {
          0%, 100% { opacity: .72; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.035); }
        }
        @keyframes forestSpore {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: .22; }
          35% { opacity: .72; }
          65% { transform: translate3d(8px, -18px, 0); opacity: .46; }
        }
        .forest-canopy-left { animation: forestSwayLeft 19s ease-in-out infinite; transform-origin: 16% 10%; }
        .forest-canopy-right { animation: forestSwayRight 23s ease-in-out infinite; transform-origin: 84% 10%; }
        .forest-breathe { animation: forestBreathe 13s ease-in-out infinite; }
        .forest-spore { animation: forestSpore 10s ease-in-out infinite; }
        .forest-spore-b { animation-delay: -2.6s; }
        .forest-spore-c { animation-delay: -5.1s; }
        .forest-spore-d { animation-delay: -7.4s; }
        @media (prefers-reduced-motion: reduce) {
          .forest-canopy-left,
          .forest-canopy-right,
          .forest-breathe,
          .forest-spore { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
