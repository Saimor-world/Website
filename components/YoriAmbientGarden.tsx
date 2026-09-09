export default function YoriAmbientGarden({ compact = false }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b100d_0%,#151912_50%,#0a0d0b_100%)]" />
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="wood" x1="0" x2="1"><stop stopColor="#2b1e16"/><stop offset=".55" stopColor="#4a2f1f"/><stop offset="1" stopColor="#241810"/></linearGradient>
          <linearGradient id="shoji" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d7bb78" stopOpacity=".78"/><stop offset="1" stopColor="#8b6233" stopOpacity=".22"/></linearGradient>
          <radialGradient id="lantern"><stop stopColor="#f4d28c" stopOpacity=".95"/><stop offset="1" stopColor="#b47732" stopOpacity="0"/></radialGradient>
          <radialGradient id="water"><stop stopColor="#46351f" stopOpacity=".42"/><stop offset="1" stopColor="#0c1210" stopOpacity=".9"/></radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="16"/></filter>
        </defs>

        <circle cx="1190" cy="410" r="250" fill="url(#lantern)" filter="url(#soft)" opacity=".48"/>
        <circle cx="300" cy="740" r="280" fill="#1d2a1d" opacity=".55" filter="url(#soft)"/>

        <path d="M0 620 C220 540 380 590 540 655 C690 716 820 690 980 625 C1150 560 1340 560 1600 650 L1600 1000 L0 1000Z" fill="#111811"/>
        <ellipse cx="820" cy="830" rx="510" ry="155" fill="url(#water)" stroke="#7c5b35" strokeOpacity=".14"/>
        <ellipse cx="865" cy="806" rx="170" ry="35" fill="none" stroke="#c49251" strokeOpacity=".13"/>
        <ellipse cx="865" cy="806" rx="110" ry="23" fill="none" stroke="#c49251" strokeOpacity=".10"/>

        <g opacity=".85">
          <ellipse cx="455" cy="780" rx="100" ry="48" fill="#27251d"/>
          <ellipse cx="570" cy="745" rx="72" ry="37" fill="#322b20"/>
          <ellipse cx="670" cy="718" rx="52" ry="29" fill="#3b3022"/>
          <ellipse cx="1260" cy="780" rx="86" ry="44" fill="#26231c"/>
          <ellipse cx="1360" cy="735" rx="58" ry="32" fill="#31291f"/>
        </g>

        <g opacity=".92">
          <rect x="940" y="180" width="520" height="460" rx="3" fill="#17120e"/>
          <rect x="970" y="210" width="460" height="390" fill="url(#wood)"/>
          <rect x="1015" y="250" width="155" height="285" fill="url(#shoji)"/>
          <rect x="1188" y="250" width="155" height="285" fill="url(#shoji)"/>
          <g stroke="#3b281b" strokeWidth="8" opacity=".8">
            <line x1="1092" y1="250" x2="1092" y2="535"/><line x1="1265" y1="250" x2="1265" y2="535"/>
            <line x1="1015" y1="340" x2="1170" y2="340"/><line x1="1015" y1="430" x2="1170" y2="430"/>
            <line x1="1188" y1="340" x2="1343" y2="340"/><line x1="1188" y1="430" x2="1343" y2="430"/>
          </g>
          <rect x="930" y="610" width="560" height="32" fill="#2b1d13"/>
          <rect x="900" y="642" width="620" height="28" fill="#1b140f"/>
        </g>

        <g transform="translate(1110 556)">
          <rect x="0" y="0" width="46" height="68" rx="3" fill="#2c2017" stroke="#b48349" strokeOpacity=".55"/>
          <rect x="8" y="9" width="30" height="49" fill="#d39a52" opacity=".55"/>
          <circle cx="23" cy="31" r="65" fill="url(#lantern)" opacity=".7"/>
        </g>

        <g transform="translate(1205 520)">
          <rect x="0" y="62" width="110" height="12" rx="6" fill="#35241a"/>
          <rect x="48" y="72" width="10" height="60" fill="#2b1d15"/>
          <path d="M55 4 C92 10 108 31 95 48 C79 68 31 66 12 46 C-3 29 12 11 55 4Z" fill="#233224"/>
          <path d="M52 15 C78 20 89 34 80 44 C69 57 37 56 23 43 C12 32 23 19 52 15Z" fill="#314a32" opacity=".85"/>
          <rect x="51" y="45" width="5" height="18" fill="#5d3b23"/>
        </g>

        <g opacity=".86">
          <path d="M120 670 C180 600 230 585 260 620 C286 651 244 688 190 697 C148 704 112 694 120 670Z" fill="#1d2b1d"/>
          <path d="M180 602 C170 525 206 488 244 506 C280 524 276 572 236 614Z" fill="#263b26"/>
          <path d="M280 640 C310 568 358 548 385 578 C411 607 383 646 332 662Z" fill="#203421"/>
        </g>

        {!compact && <>
          <path d="M725 685 C770 636 820 630 850 664 C871 688 850 720 804 730 C760 740 714 719 725 685Z" fill="#27251e"/>
          <path d="M355 720 C405 687 456 690 478 716 C495 737 470 762 425 768 C385 774 344 752 355 720Z" fill="#302a20"/>
        </>}
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,4,.06),rgba(3,6,4,.18)_55%,rgba(3,6,4,.52)),linear-gradient(90deg,rgba(5,8,6,.55),rgba(5,8,6,.06)_58%,rgba(5,8,6,.16))]" />
    </div>
  );
}
