export default function YoriAmbientGarden({ compact = false }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07110c_0%,#0b1710_46%,#08100c_100%)]" />

      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1a281f"/>
            <stop offset=".46" stopColor="#2a3428"/>
            <stop offset="1" stopColor="#101a14"/>
          </linearGradient>
          <radialGradient id="stoneA" cx="35%" cy="28%" r="75%">
            <stop stopColor="#4c5044"/>
            <stop offset=".48" stopColor="#2d312a"/>
            <stop offset="1" stopColor="#151a16"/>
          </radialGradient>
          <radialGradient id="stoneB" cx="34%" cy="24%" r="78%">
            <stop stopColor="#3f493d"/>
            <stop offset=".52" stopColor="#242d25"/>
            <stop offset="1" stopColor="#111713"/>
          </radialGradient>
          <radialGradient id="moss" cx="50%" cy="45%" r="70%">
            <stop stopColor="#607a4b" stopOpacity=".84"/>
            <stop offset="1" stopColor="#243a24" stopOpacity=".15"/>
          </radialGradient>
          <radialGradient id="light" cx="50%" cy="50%" r="50%">
            <stop stopColor="#d8cf9d" stopOpacity=".34"/>
            <stop offset="1" stopColor="#d8cf9d" stopOpacity="0"/>
          </radialGradient>
          <filter id="blur36"><feGaussianBlur stdDeviation="36"/></filter>
          <filter id="blur18"><feGaussianBlur stdDeviation="18"/></filter>
        </defs>

        <rect width="1600" height="1000" fill="url(#sand)"/>
        <ellipse className="yori-light" cx="1220" cy="290" rx="430" ry="300" fill="url(#light)" filter="url(#blur36)"/>
        <ellipse cx="280" cy="170" rx="280" ry="210" fill="#07110c" opacity=".68" filter="url(#blur36)"/>

        <g fill="none" strokeLinecap="round" opacity=".42">
          <path d="M-120 790C145 610 358 690 548 812C730 928 958 907 1190 768C1370 660 1538 650 1730 726" stroke="#6f7b67" strokeWidth="4"/>
          <path d="M-130 808C144 628 360 707 548 828C735 947 961 925 1192 785C1375 675 1547 668 1738 744" stroke="#65715f" strokeWidth="3.5"/>
          <path d="M-140 826C142 646 361 724 547 844C738 966 966 944 1196 803C1382 691 1555 686 1748 762" stroke="#5f6c59" strokeWidth="3"/>
          <path d="M-148 844C145 664 360 741 546 860C744 985 971 963 1200 820C1390 708 1560 703 1755 780" stroke="#596653" strokeWidth="2.5"/>
        </g>

        <g fill="none" stroke="#788371" strokeLinecap="round" opacity=".5">
          <ellipse cx="1030" cy="566" rx="245" ry="152" strokeWidth="4"/>
          <ellipse cx="1030" cy="566" rx="264" ry="169" strokeWidth="3.7"/>
          <ellipse cx="1030" cy="566" rx="283" ry="187" strokeWidth="3.3"/>
          <ellipse cx="1030" cy="566" rx="302" ry="205" strokeWidth="3"/>
          <ellipse cx="1030" cy="566" rx="321" ry="223" strokeWidth="2.7"/>
        </g>

        <g fill="none" stroke="#697563" strokeLinecap="round" opacity=".34">
          <ellipse cx="565" cy="405" rx="126" ry="78" strokeWidth="3.2"/>
          <ellipse cx="565" cy="405" rx="144" ry="92" strokeWidth="2.8"/>
          <ellipse cx="565" cy="405" rx="163" ry="107" strokeWidth="2.4"/>
        </g>

        <ellipse cx="1030" cy="618" rx="168" ry="45" fill="#050807" opacity=".5" filter="url(#blur18)"/>
        <path d="M870 585C895 510 954 468 1034 466C1120 464 1185 516 1200 581C1212 634 1162 671 1038 678C918 684 853 650 870 585Z" fill="url(#stoneA)"/>
        <path d="M906 506C948 481 1024 474 1085 490C1014 488 946 513 902 557C893 541 895 521 906 506Z" fill="#8b8e78" opacity=".11"/>
        <path d="M919 649C978 663 1089 660 1150 626" stroke="#7d846f" strokeOpacity=".13" strokeWidth="2" fill="none"/>

        <ellipse cx="565" cy="431" rx="96" ry="27" fill="#050807" opacity=".44" filter="url(#blur18)"/>
        <path d="M477 405C487 352 529 321 580 323C638 325 676 359 678 400C679 437 640 459 574 462C510 464 469 443 477 405Z" fill="url(#stoneB)"/>
        <path d="M502 347C535 329 588 328 624 342C573 341 529 355 493 382C489 368 492 356 502 347Z" fill="#8a907a" opacity=".1"/>

        {!compact && (
          <>
            <ellipse cx="1326" cy="316" rx="95" ry="29" fill="#050807" opacity=".38" filter="url(#blur18)"/>
            <path d="M1240 298C1255 250 1297 228 1342 232C1392 237 1421 269 1413 306C1407 340 1368 359 1315 354C1265 349 1229 333 1240 298Z" fill="url(#stoneB)" opacity=".86"/>

            <g opacity=".72">
              <ellipse cx="390" cy="685" rx="104" ry="55" fill="url(#moss)"/>
              <ellipse cx="1455" cy="742" rx="124" ry="64" fill="url(#moss)"/>
              <ellipse cx="1450" cy="175" rx="195" ry="108" fill="#17301f" opacity=".46" filter="url(#blur18)"/>
            </g>

            <g className="yori-branch" fill="#26432d" opacity=".84">
              <path d="M1600 78C1497 108 1453 165 1388 236L1373 222C1434 149 1486 82 1600 45Z"/>
              <ellipse cx="1458" cy="144" rx="48" ry="15" transform="rotate(-24 1458 144)"/>
              <ellipse cx="1515" cy="115" rx="44" ry="14" transform="rotate(18 1515 115)"/>
              <ellipse cx="1418" cy="191" rx="40" ry="13" transform="rotate(-44 1418 191)"/>
              <ellipse cx="1540" cy="168" rx="38" ry="13" transform="rotate(35 1540 168)"/>
            </g>
          </>
        )}
      </svg>

      <div className="yori-mist absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(211,201,152,.09),transparent_24%),radial-gradient(circle_at_55%_66%,rgba(117,145,100,.07),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,5,.08),rgba(3,8,5,.08)_56%,rgba(3,8,5,.5)),linear-gradient(90deg,rgba(3,8,5,.62),rgba(3,8,5,.09)_54%,rgba(3,8,5,.15))]" />

      <style>{`
        .yori-light { animation: yoriLight 11s ease-in-out infinite alternate; transform-origin: center; }
        .yori-mist { animation: yoriMist 15s ease-in-out infinite alternate; }
        .yori-branch { animation: yoriBranch 10s ease-in-out infinite alternate; transform-origin: 1500px 90px; }
        @keyframes yoriLight { from { opacity:.72; transform:translate3d(-18px,8px,0) scale(.98); } to { opacity:1; transform:translate3d(18px,-6px,0) scale(1.03); } }
        @keyframes yoriMist { from { opacity:.5; transform:translateX(-1%); } to { opacity:.9; transform:translateX(1.5%); } }
        @keyframes yoriBranch { from { transform:rotate(-.7deg); } to { transform:rotate(.8deg); } }
        @media(prefers-reduced-motion:reduce){.yori-light,.yori-mist,.yori-branch{animation:none!important}}
      `}</style>
    </div>
  );
}
