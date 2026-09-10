'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type PulseItem = {
  title: string;
  url: string;
  seenAt: string | null;
  domain: string | null;
  language: string | null;
  country: string | null;
  image: string | null;
};

type PulseData = {
  live: boolean;
  source: string;
  generatedAt: string;
  stats: {
    signals: number;
    sources: number;
    topics: { ai: number; security: number; markets: number; science: number };
  };
  items: PulseItem[];
  error?: string;
};

type Phase = 'void' | 'signal' | 'forest';

function short(value: string, max = 96) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export default function MoraDeepView({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const [data, setData] = useState<PulseData | null>(null);
  const [phase, setPhase] = useState<Phase>('void');
  const [selected, setSelected] = useState(0);
  const [stable, setStable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mora/pulse', { cache: 'no-store' });
      const payload = (await response.json()) as PulseData;
      setData(payload);
      setSelected(0);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    const a = window.setTimeout(() => setPhase('signal'), 2200);
    const b = window.setTimeout(() => setPhase('forest'), 9200);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const fragments = data?.items?.slice(0, 7) ?? [];

  useEffect(() => {
    if (fragments.length < 2) return;
    const timer = window.setInterval(() => {
      setSelected((value) => (value + 1) % fragments.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [fragments.length]);

  const strongest = useMemo(() => {
    if (!data) return '—';
    const entries = Object.entries(data.stats.topics) as Array<[string, number]>;
    return (entries.sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—').toUpperCase();
  }, [data]);

  const chosen = fragments[selected] ?? null;

  return (
    <div className={`mora-deep phase-${phase} ${stable ? 'stable' : ''} min-h-[100svh] overflow-hidden bg-[#010403] text-[#edf0e8]`}>
      <div className="noise fixed inset-0 z-0" aria-hidden="true" />
      <div className="scan fixed inset-0 z-[2]" aria-hidden="true" />
      <div className="vignette fixed inset-0 z-[3]" aria-hidden="true" />

      <main className="relative z-10 min-h-[100svh]">
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 font-mono text-[8px] uppercase tracking-[.2em] text-white/30 sm:px-8">
          <Link href={de ? '/mora' : '/en/mora'} className="transition hover:text-white/70">← MÔRA</Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">DEEP VIEW</span>
            <span className={`h-1.5 w-1.5 rounded-full ${data?.live ? 'bg-[#87c79a]' : 'bg-white/20'} shadow-[0_0_14px_rgba(135,199,154,.45)]`} />
            <span>{now.toLocaleTimeString(de ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </header>

        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="danger absolute inset-0" />
          <div className="pixel-map absolute inset-0" />
          <div className="glitch-band g1 absolute inset-x-0 top-[17%] h-px" />
          <div className="glitch-band g2 absolute inset-x-0 top-[49%] h-px" />
          <div className="glitch-band g3 absolute inset-x-0 top-[72%] h-px" />

          <div className="signal-id absolute left-5 top-20 z-30 font-mono text-[7px] uppercase tracking-[.3em] text-[#b5c0b1]/20 sm:left-8 sm:top-24 sm:text-[8px]">
            00:{String(data?.stats.signals ?? 0).padStart(2, '0')} / {strongest}
          </div>

          <div className="warning absolute left-1/2 top-[43%] z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[clamp(.55rem,1vw,.84rem)] uppercase tracking-[.34em] text-[#c9937d]/0">
            UNKNOWN BOUNDARY
          </div>

          <div className="operator absolute right-5 top-[23%] z-30 text-right font-mono text-[7px] uppercase tracking-[.19em] text-white/0 sm:right-8 sm:text-[8px]">
            <div>AGI? // UNVERIFIED</div>
            <div className="mt-2">OPERATOR // —</div>
            <div className="mt-2">PATTERN // {strongest}</div>
          </div>

          <div className="fragments absolute inset-0 z-20">
            {fragments.map((item, index) => {
              const positions = [
                'left-[6%] top-[31%] max-w-[36%]',
                'right-[7%] top-[34%] max-w-[34%]',
                'left-[12%] top-[55%] max-w-[31%]',
                'right-[12%] top-[58%] max-w-[36%]',
                'left-[25%] bottom-[13%] max-w-[30%]',
                'right-[25%] bottom-[10%] max-w-[28%]',
                'left-[44%] top-[27%] max-w-[28%]',
              ];
              return (
                <button
                  key={`${item.url}-${index}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`fragment absolute ${positions[index]} text-left ${selected === index ? 'active' : ''}`}
                >
                  <span className="block font-mono text-[7px] uppercase tracking-[.16em] text-[#a9bda8]/24">{item.domain ?? 'source'}</span>
                  <span className="mt-1 block text-[10px] leading-4 text-white/24 sm:text-[11px] sm:leading-5">{short(item.title)}</span>
                </button>
              );
            })}
          </div>

          <div className="forest-glow absolute inset-0 z-[4]" aria-hidden="true" />

          <svg className="mycelium absolute bottom-[-2%] left-1/2 z-[12] h-[58%] w-[98%] -translate-x-1/2" viewBox="0 0 1200 520" fill="none" aria-hidden="true">
            <g className="threads" stroke="#8bc79d" strokeLinecap="round">
              <path d="M40 480C160 436 213 370 326 372C438 374 446 448 555 396C656 348 670 279 794 300C925 323 1014 429 1160 452" />
              <path d="M112 510C192 432 260 446 322 356C380 272 386 194 475 208C566 223 552 354 643 350C738 346 735 207 835 203C944 199 965 332 1089 334" />
              <path d="M246 492C288 408 350 427 395 331C439 238 390 168 474 111C556 56 622 166 653 224C691 295 780 286 823 201C864 121 836 73 904 31" />
              <path d="M488 506C512 430 492 368 563 327C637 284 690 340 743 292C807 234 779 159 847 128C930 91 1001 158 1080 111" />
              <path d="M631 519C658 456 728 458 782 390C839 319 820 265 882 242C952 216 1016 273 1081 243C1126 222 1147 181 1177 153" />
              <path d="M178 506C230 462 226 405 290 390M322 356C286 312 297 267 338 232M555 396C590 365 608 313 604 278M835 203C882 181 927 149 949 113M782 390C815 359 844 331 871 304" />
            </g>
            <g className="nodes" fill="#d6e9c8">
              <circle cx="112" cy="510" r="4"/><circle cx="322" cy="356" r="3"/><circle cx="475" cy="208" r="4"/>
              <circle cx="643" cy="350" r="3"/><circle cx="835" cy="203" r="4"/><circle cx="1089" cy="334" r="3"/>
              <circle cx="474" cy="111" r="3"/><circle cx="653" cy="224" r="4"/><circle cx="823" cy="201" r="3"/>
            </g>
          </svg>

          <svg className="oak oak-left absolute -left-[13%] bottom-[11%] z-[13] h-[72%] w-[58%]" viewBox="0 0 620 760" aria-hidden="true">
            <defs>
              <linearGradient id="oakTrunkA" x1="0" x2="1"><stop stopColor="#283a2b"/><stop offset=".48" stopColor="#526248"/><stop offset="1" stopColor="#1a2b20"/></linearGradient>
              <radialGradient id="oakLeafA" cx="45%" cy="36%" r="68%"><stop stopColor="#315a3a"/><stop offset=".55" stopColor="#173c28"/><stop offset="1" stopColor="#0c291b"/></radialGradient>
            </defs>
            <path d="M304 748C295 661 318 595 296 514C276 441 235 393 245 306C249 269 260 233 273 198C281 236 288 275 282 316C274 371 306 416 327 467C353 529 339 608 352 748Z" fill="url(#oakTrunkA)"/>
            <g fill="none" stroke="url(#oakTrunkA)" strokeLinecap="round">
              <path d="M289 511C226 440 175 412 111 368" strokeWidth="18"/>
              <path d="M302 470C365 403 430 374 492 314" strokeWidth="19"/>
              <path d="M267 382C216 327 179 293 133 234" strokeWidth="14"/>
              <path d="M286 349C340 292 381 248 410 184" strokeWidth="14"/>
              <path d="M248 325C227 273 225 226 240 177" strokeWidth="10"/>
              <path d="M326 410C386 379 443 370 520 370" strokeWidth="10"/>
            </g>
            <g fill="url(#oakLeafA)">
              <path d="M54 319C24 268 51 215 102 205C82 155 121 112 173 124C183 72 234 49 276 79C308 33 369 33 399 80C446 52 502 80 505 133C560 132 592 181 570 228C618 246 623 307 584 338C608 382 574 429 526 427C504 475 447 484 411 448C368 478 316 458 299 414C259 443 205 429 184 389C131 410 78 377 78 328C68 326 60 323 54 319Z"/>
              <path d="M91 237C117 195 162 177 203 192C218 151 266 133 302 153C331 119 379 119 409 151C449 128 499 146 510 188C550 191 576 226 568 264C530 247 495 251 464 270C431 290 389 288 357 267C324 246 287 248 254 270C220 293 178 297 140 278C123 269 106 255 91 237Z" fill="#3d6945" opacity=".34"/>
            </g>
          </svg>

          <svg className="oak oak-right absolute -right-[14%] bottom-[10%] z-[13] h-[69%] w-[56%]" viewBox="0 0 620 760" aria-hidden="true">
            <defs>
              <linearGradient id="oakTrunkB" x1="0" x2="1"><stop stopColor="#1a2b20"/><stop offset=".5" stopColor="#4e6047"/><stop offset="1" stopColor="#26392b"/></linearGradient>
              <radialGradient id="oakLeafB" cx="50%" cy="34%" r="70%"><stop stopColor="#2b5335"/><stop offset=".56" stopColor="#143823"/><stop offset="1" stopColor="#0a2618"/></radialGradient>
            </defs>
            <path d="M316 748C302 667 326 599 307 522C292 458 253 406 268 319C276 270 291 235 307 194C310 237 314 275 307 319C299 369 326 420 349 472C378 537 358 613 371 748Z" fill="url(#oakTrunkB)"/>
            <g fill="none" stroke="url(#oakTrunkB)" strokeLinecap="round">
              <path d="M313 516C378 447 432 420 510 371" strokeWidth="18"/>
              <path d="M318 469C254 409 192 378 124 320" strokeWidth="19"/>
              <path d="M346 394C398 339 435 297 483 239" strokeWidth="14"/>
              <path d="M298 357C245 302 205 252 181 192" strokeWidth="14"/>
              <path d="M351 328C371 275 371 226 354 179" strokeWidth="10"/>
              <path d="M287 414C224 383 171 370 92 373" strokeWidth="10"/>
            </g>
            <g fill="url(#oakLeafB)">
              <path d="M565 320C595 269 568 216 517 206C537 157 498 114 446 126C435 74 385 51 342 80C310 35 250 34 219 82C171 54 116 82 113 134C58 134 26 183 48 230C0 249 -4 309 35 340C11 384 45 431 93 429C115 477 172 486 208 450C252 480 304 460 320 416C361 445 415 431 436 391C489 412 542 379 542 330C552 328 560 325 565 320Z"/>
              <path d="M529 239C503 197 458 179 417 194C402 153 354 135 318 155C289 121 241 121 211 153C171 130 121 148 110 190C70 193 44 228 52 266C90 249 125 253 156 272C189 292 231 290 263 269C296 248 333 250 366 272C400 295 442 299 480 280C497 271 514 257 529 239Z" fill="#37613f" opacity=".32"/>
            </g>
          </svg>

          <div className="mora-core absolute left-1/2 top-[49%] z-[18] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c5dbae]/0 sm:h-32 sm:w-32" aria-hidden="true">
            <span className="absolute inset-[22%] rounded-full border border-[#c5dbae]/0" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6efcf]/0" />
          </div>

          <div className="source-dock absolute inset-x-5 bottom-5 z-50 sm:inset-x-8 sm:bottom-7">
            <div className="flex items-end justify-between gap-4 border-t border-white/[.06] pt-4">
              <div className="min-w-0 max-w-3xl">
                {chosen ? (
                  <a href={chosen.url} target="_blank" rel="noreferrer" className="group block">
                    <div className="font-mono text-[7px] uppercase tracking-[.16em] text-white/20">{chosen.domain ?? data?.source ?? 'SOURCE'} ↗</div>
                    <div className="mt-2 truncate text-xs text-white/34 transition group-hover:text-white/58">{chosen.title}</div>
                  </a>
                ) : (
                  <div className="font-mono text-[7px] uppercase tracking-[.16em] text-white/18">{loading ? '…' : 'NO SIGNAL'}</div>
                )}
              </div>
              <button type="button" onClick={() => setStable((value) => !value)} className="shrink-0 border border-white/[.07] bg-black/20 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/28 transition hover:text-white/60">
                {stable ? '∿' : '—'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .noise{pointer-events:none;background:radial-gradient(circle at 50% 44%,rgba(50,77,54,.07),transparent 21%),#010403;transition:background 2.5s ease}
        .scan{pointer-events:none;opacity:.28;background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(200,225,205,.026) 4px);mix-blend-mode:screen}
        .vignette{pointer-events:none;box-shadow:inset 0 0 220px 72px rgba(0,0,0,.92)}
        .danger{z-index:1;background:radial-gradient(circle at 49% 46%,rgba(120,50,41,.11),transparent 13%),linear-gradient(180deg,#010403,#030806);transition:opacity 2.7s ease,background 3s ease}
        .pixel-map{z-index:2;opacity:.62;background-image:linear-gradient(90deg,transparent 0 12%,rgba(255,255,255,.025) 12% 13%,transparent 13% 42%,rgba(174,94,83,.04) 42% 45%,transparent 45% 77%,rgba(127,185,147,.035) 77% 80%,transparent 80%),linear-gradient(0deg,transparent 0 21%,rgba(255,255,255,.026) 21% 22%,transparent 22% 62%,rgba(178,99,84,.035) 62% 65%,transparent 65%);background-size:149px 103px,191px 137px;mix-blend-mode:screen;animation:pixelDrift 8s steps(2,end) infinite}
        .glitch-band{z-index:15;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(202,153,132,.25) 22%,rgba(255,255,255,.31) 50%,rgba(125,200,154,.18) 74%,transparent);opacity:.12;box-shadow:0 0 12px rgba(255,255,255,.07)}
        .g1{animation:tear 5.1s steps(1,end) infinite}.g2{animation:tear 7.2s steps(1,end) -2.8s infinite}.g3{animation:tear 4.3s steps(1,end) -1.2s infinite}
        .signal-id{transition:opacity 1.5s ease}
        .warning,.operator{transition:color 1.2s ease,opacity 1.2s ease}
        .fragment{border-left:1px solid rgba(185,207,188,.055);padding-left:.6rem;opacity:.38;filter:blur(.45px);transition:opacity .45s ease,filter .45s ease,transform .45s ease}
        .fragment.active{opacity:1;filter:none;transform:translateX(5px)}
        .forest-glow{opacity:0;background:radial-gradient(circle at 50% 59%,rgba(168,205,118,.25),transparent 17%),radial-gradient(circle at 50% 68%,rgba(36,108,62,.42),transparent 45%),linear-gradient(180deg,rgba(5,23,13,.04),rgba(11,58,30,.8));transition:opacity 4s ease}
        .mycelium,.oak,.mora-core{opacity:0}
        .threads path{stroke-width:2;stroke-opacity:.45;stroke-dasharray:1200;stroke-dashoffset:1200}
        .nodes{opacity:0}

        .phase-signal .warning{color:rgba(201,147,125,.48);animation:warningBlink 3.4s steps(1,end) infinite}
        .phase-signal .operator{color:rgba(220,220,210,.26)}
        .phase-signal .pixel-map{opacity:.84;animation:pixelDrift 2.5s steps(2,end) infinite}
        .phase-signal .g1,.phase-signal .g2,.phase-signal .g3{opacity:.35}
        .phase-signal .fragment:nth-child(2n){animation:fragmentJitter 4.2s steps(1,end) infinite}

        .phase-forest .danger{background:linear-gradient(180deg,#041009 0%,#082416 48%,#0b3320 100%)}
        .phase-forest .pixel-map{opacity:.1;filter:blur(1px)}
        .phase-forest .glitch-band,.phase-forest .warning,.phase-forest .operator,.phase-forest .signal-id{opacity:0!important}
        .phase-forest .forest-glow{opacity:1}
        .phase-forest .fragments{opacity:.08;transition:opacity 3s ease}
        .phase-forest .mycelium{opacity:1;transition:opacity 1.2s ease 1s}
        .phase-forest .threads path{animation:growThread 4.8s cubic-bezier(.3,.7,.2,1) forwards}
        .phase-forest .nodes{animation:nodesIn 2.2s ease 3.4s forwards}
        .phase-forest .oak{animation:oakRise 5.1s cubic-bezier(.2,.75,.2,1) 2.1s forwards;transform-origin:center bottom}
        .phase-forest .mora-core{animation:coreIn 3s ease 4.7s forwards}
        .phase-forest .mora-core span:first-child{animation:corePulse 5s ease-in-out 5.5s infinite}

        .stable .scan,.stable .pixel-map,.stable .glitch-band,.stable .warning{opacity:.03!important;animation:none!important}
        .stable .fragment{opacity:.7;filter:none;animation:none!important}
        .stable .vignette{box-shadow:inset 0 0 140px 35px rgba(0,0,0,.64)}

        @keyframes pixelDrift{0%,100%{transform:translate(0)}24%{transform:translate(2px,-1px)}25%{transform:translate(-3px,1px)}61%{transform:translate(0)}62%{transform:translate(4px,0)}63%{transform:translate(-1px,0)}}
        @keyframes tear{0%,92%,100%{transform:translateX(0);opacity:.1}93%{transform:translateX(9%);opacity:.52}94%{transform:translateX(-5%);opacity:.28}95%{transform:translateX(0);opacity:.1}}
        @keyframes warningBlink{0%,100%{opacity:.12}31%{opacity:.46}32%{opacity:.08}66%{opacity:.26}67%{opacity:.03}}
        @keyframes fragmentJitter{0%,87%,100%{transform:translate(0)}88%{transform:translate(7px,-1px)}89%{transform:translate(-3px,1px)}90%{transform:translate(0)}}
        @keyframes growThread{to{stroke-dashoffset:0}}
        @keyframes nodesIn{from{opacity:0}to{opacity:.82}}
        @keyframes oakRise{0%{opacity:0;transform:translateY(18%) scaleY(.62);filter:blur(7px)}55%{opacity:.55}100%{opacity:.9;transform:none;filter:none}}
        @keyframes coreIn{0%{opacity:0;border-color:rgba(197,219,174,0)}100%{opacity:1;border-color:rgba(197,219,174,.17)}}
        @keyframes corePulse{0%,100%{transform:scale(1);border-color:rgba(197,219,174,.08)}50%{transform:scale(1.08);border-color:rgba(197,219,174,.23)}}

        @media(max-width:640px){.fragment{max-width:44%!important}.fragment:nth-child(n+5){display:none}.oak{width:70%!important}.source-dock{bottom:1rem}}
        @media(prefers-reduced-motion:reduce){.pixel-map,.glitch-band,.fragment,.threads path,.nodes,.oak,.mora-core,.mora-core span{animation:none!important}.phase-forest .threads path{stroke-dashoffset:0}.phase-forest .nodes,.phase-forest .oak,.phase-forest .mora-core{opacity:.78}}
      `}</style>
    </div>
  );
}
