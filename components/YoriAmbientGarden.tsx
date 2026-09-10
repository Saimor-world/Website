export default function YoriAmbientGarden({ compact = false }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07110c_0%,#0b1710_46%,#08100c_100%)]" />

      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#17241c"/>
            <stop offset=".44" stopColor="#2b3529"/>
            <stop offset="1" stopColor="#101a14"/>
          </linearGradient>
          <radialGradient id="stoneA" cx="34%" cy="26%" r="78%">
            <stop stopColor="#666958"/>
            <stop offset=".18" stopColor="#4c5145"/>
            <stop offset=".53" stopColor="#2b312a"/>
            <stop offset="1" stopColor="#121914"/>
          </radialGradient>
          <radialGradient id="stoneB" cx="34%" cy="24%" r="79%">
            <stop stopColor="#555f50"/>
            <stop offset=".22" stopColor="#3d473c"/>
            <stop offset=".55" stopColor="#242d25"/>
            <stop offset="1" stopColor="#101612"/>
          </radialGradient>
          <radialGradient id="moss" cx="48%" cy="42%" r="72%">
            <stop stopColor="#6f8756" stopOpacity=".86"/>
            <stop offset=".52" stopColor="#405a39" stopOpacity=".55"/>
            <stop offset="1" stopColor="#203323" stopOpacity=".06"/>
          </radialGradient>
          <radialGradient id="light" cx="50%" cy="50%" r="50%">
            <stop stopColor="#d8cf9d" stopOpacity=".33"/>
            <stop offset="1" stopColor="#d8cf9d" stopOpacity="0"/>
          </radialGradient>
          <pattern id="grain" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="4" r=".7" fill="#d5cfaa" opacity=".09"/>
            <circle cx="12" cy="8" r=".55" fill="#e7dfba" opacity=".07"/>
            <circle cx="7" cy="15" r=".45" fill="#0a100c" opacity=".18"/>
          </pattern>
          <filter id="blur36"><feGaussianBlur stdDeviation="36"/></filter>
          <filter id="blur18"><feGaussianBlur stdDeviation="18"/></filter>
          <filter id="softStone"><feGaussianBlur stdDeviation="2.2"/></filter>
        </defs>

        <rect width="1600" height="1000" fill="url(#sand)"/>
        <rect width="1600" height="1000" fill="url(#grain)" opacity=".48"/>
        <ellipse className="yori-light" cx="1215" cy="282" rx="460" ry="320" fill="url(#light)" filter="url(#blur36)"/>
        <ellipse cx="265" cy="160" rx="300" ry="225" fill="#07110c" opacity=".7" filter="url(#blur36)"/>

        <g className="rake-flow" fill="none" strokeLinecap="round" opacity=".44">
          <path d="M-140 790C105 617 326 675 526 803C727 932 956 920 1190 779C1381 664 1548 652 1740 730" stroke="#75806e" strokeWidth="4"/>
          <path d="M-150 809C110 636 330 694 527 822C731 952 961 940 1194 797C1386 681 1555 671 1748 748" stroke="#697562" strokeWidth="3.5"/>
          <path d="M-160 828C116 655 334 714 528 842C738 973 968 959 1199 817C1391 699 1561 689 1756 767" stroke="#606d5a" strokeWidth="3"/>
          <path d="M-167 847C122 675 337 734 529 861C744 993 975 979 1205 836C1398 718 1567 708 1762 786" stroke="#596653" strokeWidth="2.5"/>
          <path d="M-173 866C128 696 341 754 531 880C752 1013 982 998 1212 855C1404 738 1574 728 1770 805" stroke="#52604d" strokeWidth="2"/>
        </g>

        <g fill="none" stroke="#7f8978" strokeLinecap="round" opacity=".5">
          <ellipse cx="1030" cy="566" rx="245" ry="152" strokeWidth="4"/>
          <ellipse cx="1030" cy="566" rx="264" ry="169" strokeWidth="3.7"/>
          <ellipse cx="1030" cy="566" rx="283" ry="187" strokeWidth="3.3"/>
          <ellipse cx="1030" cy="566" rx="302" ry="205" strokeWidth="3"/>
          <ellipse cx="1030" cy="566" rx="321" ry="223" strokeWidth="2.7"/>
          <ellipse cx="1030" cy="566" rx="340" ry="242" strokeWidth="2.2"/>
        </g>

        <g fill="none" stroke="#6d7967" strokeLinecap="round" opacity=".34">
          <ellipse cx="565" cy="405" rx="126" ry="78" strokeWidth="3.2"/>
          <ellipse cx="565" cy="405" rx="144" ry="92" strokeWidth="2.8"/>
          <ellipse cx="565" cy="405" rx="163" ry="107" strokeWidth="2.4"/>
          <ellipse cx="565" cy="405" rx="181" ry="121" strokeWidth="2"/>
        </g>

        <ellipse cx="1030" cy="622" rx="180" ry="48" fill="#030605" opacity=".56" filter="url(#blur18)"/>
        <path d="M866 586C891 506 951 462 1034 461C1123 459 1190 513 1204 580C1217 638 1163 677 1037 684C913 691 847 654 866 586Z" fill="url(#stoneA)"/>
        <path d="M902 500C950 472 1026 469 1091 485C1019 483 947 507 899 552C889 534 890 516 902 500Z" fill="#ddd7b7" opacity=".07" filter="url(#softStone)"/>
        <path d="M918 655C982 671 1094 666 1156 628" stroke="#8d927c" strokeOpacity=".12" strokeWidth="2" fill="none"/>
        <ellipse cx="1090" cy="520" rx="68" ry="25" fill="url(#moss)" opacity=".26"/>

        <ellipse cx="565" cy="434" rx="102" ry="29" fill="#030605" opacity=".49" filter="url(#blur18)"/>
        <path d="M474 405C484 348 528 316 581 318C641 320 681 357 681 400C681 440 640 464 573 467C506 469 465 445 474 405Z" fill="url(#stoneB)"/>
        <path d="M500 341C535 323 591 322 629 337C575 336 530 350 490 379C487 363 490 351 500 341Z" fill="#d9d6b7" opacity=".06" filter="url(#softStone)"/>
        <ellipse cx="535" cy="347" rx="45" ry="21" fill="url(#moss)" opacity=".18"/>

        {!compact && (
          <>
            <ellipse cx="1328" cy="318" rx="101" ry="31" fill="#030605" opacity=".42" filter="url(#blur18)"/>
            <path d="M1237 298C1252 247 1296 223 1343 228C1396 233 1427 268 1418 307C1411 343 1370 364 1314 359C1260 354 1225 334 1237 298Z" fill="url(#stoneB)" opacity=".9"/>
            <path d="M1263 257C1291 236 1340 235 1373 248C1335 246 1299 257 1264 278C1258 270 1258 263 1263 257Z" fill="#e4dfbf" opacity=".05"/>

            <g opacity=".72">
              <ellipse cx="390" cy="686" rx="110" ry="58" fill="url(#moss)"/>
              <ellipse cx="1452" cy="742" rx="130" ry="67" fill="url(#moss)"/>
              <ellipse cx="1445" cy="172" rx="205" ry="115" fill="#17301f" opacity=".47" filter="url(#blur18)"/>
            </g>

            <g className="yori-branch" opacity=".82">
              <path d="M1608 72C1510 105 1467 151 1401 231" fill="none" stroke="#314d35" strokeWidth="18" strokeLinecap="round"/>
              <path d="M1508 105C1480 146 1452 170 1417 191M1540 100C1549 135 1564 159 1584 181" fill="none" stroke="#2d4932" strokeWidth="8" strokeLinecap="round"/>
              <g fill="#355a3b">
                <path d="M1468 140C1435 126 1409 141 1414 163C1419 183 1453 182 1477 158C1485 150 1482 145 1468 140Z"/>
                <path d="M1525 118C1503 91 1475 91 1469 112C1464 132 1494 148 1525 140C1537 136 1538 131 1525 118Z"/>
                <path d="M1427 188C1397 169 1370 182 1374 203C1378 223 1409 227 1438 204C1448 196 1444 193 1427 188Z"/>
                <path d="M1570 151C1544 128 1516 137 1517 158C1518 179 1549 188 1579 170C1591 163 1586 157 1570 151Z"/>
              </g>
            </g>

            <g className="foreground-grass" stroke="#29452e" strokeLinecap="round" fill="none" opacity=".38">
              <path d="M70 1030C92 925 115 866 153 810M98 1030C126 938 170 878 220 836M149 1030C167 934 186 880 214 823" strokeWidth="5"/>
              <path d="M1510 1030C1486 925 1460 868 1416 815M1544 1030C1516 938 1480 879 1436 842" strokeWidth="5"/>
            </g>
          </>
        )}
      </svg>

      <div className="yori-mist absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(211,201,152,.09),transparent_24%),radial-gradient(circle_at_55%_66%,rgba(117,145,100,.07),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,5,.08),rgba(3,8,5,.08)_56%,rgba(3,8,5,.5)),linear-gradient(90deg,rgba(3,8,5,.62),rgba(3,8,5,.09)_54%,rgba(3,8,5,.15))]" />

      <style>{`
        .yori-light { animation: yoriLight 12s ease-in-out infinite alternate; transform-origin: center; }
        .yori-mist { animation: yoriMist 17s ease-in-out infinite alternate; }
        .yori-branch { animation: yoriBranch 11s ease-in-out infinite alternate; transform-origin: 1510px 92px; }
        .rake-flow { animation: rakeBreath 14s ease-in-out infinite alternate; }
        .foreground-grass { animation: grassMove 10s ease-in-out infinite alternate; transform-origin: bottom; }
        @keyframes yoriLight { from { opacity:.68; transform:translate3d(-20px,9px,0) scale(.98); } to { opacity:1; transform:translate3d(20px,-7px,0) scale(1.035); } }
        @keyframes yoriMist { from { opacity:.48; transform:translateX(-1%); } to { opacity:.88; transform:translateX(1.5%); } }
        @keyframes yoriBranch { from { transform:rotate(-.6deg); } to { transform:rotate(.75deg); } }
        @keyframes rakeBreath { from { opacity:.36; } to { opacity:.52; } }
        @keyframes grassMove { from { transform:rotate(-.25deg); } to { transform:rotate(.4deg); } }
        @media(prefers-reduced-motion:reduce){.yori-light,.yori-mist,.yori-branch,.rake-flow,.foreground-grass{animation:none!important}}
      `}</style>
    </div>
  );
}
