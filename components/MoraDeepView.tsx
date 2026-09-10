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

function short(value: string, max = 92) {
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
    const a = window.setTimeout(() => setPhase('signal'), 2400);
    const b = window.setTimeout(() => setPhase('forest'), 9000);
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
    }, 3900);
    return () => window.clearInterval(timer);
  }, [fragments.length]);

  const strongest = useMemo(() => {
    if (!data) return '—';
    const entries = Object.entries(data.stats.topics) as Array<[string, number]>;
    return (entries.sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—').toUpperCase();
  }, [data]);

  const chosen = fragments[selected] ?? null;

  const whisper = useMemo(() => {
    if (!data?.items?.length) return de ? 'Kein Signal. Ich erfinde keines.' : 'No signal. I will not invent one.';
    if (strongest === 'AI') {
      return de ? 'Mehrere Systeme verändern gleichzeitig ihre Sprache.' : 'Several systems are changing their language at once.';
    }
    if (strongest === 'SECURITY') {
      return de ? 'Die Sicherheitssignale liegen ungewöhnlich dicht beieinander.' : 'Security signals are unusually close together.';
    }
    return de ? 'Nähe ist noch kein Zusammenhang.' : 'Proximity is not causality.';
  }, [data, de, strongest]);

  return (
    <div className={`mora-deep phase-${phase} ${stable ? 'stable' : ''} min-h-[100svh] overflow-hidden bg-[#010403] text-[#edf0e8]`}>
      <div className="noise fixed inset-0 z-0" aria-hidden="true" />
      <div className="scan fixed inset-0 z-[2]" aria-hidden="true" />
      <div className="vignette fixed inset-0 z-[3]" aria-hidden="true" />

      <main className="relative z-10 min-h-[100svh]">
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 font-mono text-[8px] uppercase tracking-[.2em] text-white/34 sm:px-8">
          <Link href={de ? '/mora' : '/en/mora'} className="transition hover:text-white/70">← MÔRA</Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">ANALOG AFFECT // DEEP VIEW</span>
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

          <div className="absolute left-5 top-20 z-30 max-w-[72vw] sm:left-8 sm:top-24">
            <p className="font-mono text-[8px] uppercase tracking-[.28em] text-[#b1bdac]/34">PUBLIC SIGNALS / REAL SOURCES</p>
            <h1 className="mora-title mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,6.8rem)] font-light leading-[.89] tracking-[-.05em] text-[#eef0e8]/88">
              {phase === 'void'
                ? (de ? 'Da ist etwas.' : 'There is something there.')
                : phase === 'signal'
                  ? (de ? 'Es ordnet sich ohne dich.' : 'It is arranging itself without you.')
                  : (de ? 'Und dann wird es lebendig.' : 'And then it becomes alive.')}
            </h1>
          </div>

          <div className="warning absolute left-1/2 top-[44%] z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[clamp(.55rem,1vw,.86rem)] uppercase tracking-[.34em] text-[#c9937d]/0">
            MODEL BOUNDARY // UNKNOWN
          </div>

          <div className="operator absolute right-5 top-[24%] z-30 text-right font-mono text-[7px] uppercase tracking-[.18em] text-white/0 sm:right-8 sm:text-[8px]">
            <div>AGI // UNVERIFIED</div>
            <div className="mt-2">OPERATOR // ABSENT</div>
            <div className="mt-2">PATTERN // {strongest}</div>
          </div>

          <div className="fragments absolute inset-0 z-20">
            {fragments.map((item, index) => {
              const positions = [
                'left-[6%] top-[36%] max-w-[36%]',
                'right-[7%] top-[34%] max-w-[34%]',
                'left-[12%] top-[57%] max-w-[31%]',
                'right-[12%] top-[59%] max-w-[36%]',
                'left-[25%] bottom-[12%] max-w-[30%]',
                'right-[25%] bottom-[9%] max-w-[28%]',
                'left-[44%] top-[30%] max-w-[28%]',
              ];
              return (
                <button
                  key={`${item.url}-${index}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`fragment absolute ${positions[index]} text-left ${selected === index ? 'active' : ''}`}
                >
                  <span className="block font-mono text-[7px] uppercase tracking-[.16em] text-[#a9bda8]/28">{item.domain ?? 'source'}</span>
                  <span className="mt-1 block text-[10px] leading-4 text-white/26 sm:text-[11px] sm:leading-5">{short(item.title)}</span>
                </button>
              );
            })}
          </div>

          <div className="forest-glow absolute inset-0 z-[4]" aria-hidden="true" />

          <svg className="mycelium absolute bottom-[-2%] left-1/2 z-[12] h-[54%] w-[96%] -translate-x-1/2" viewBox="0 0 1200 520" fill="none" aria-hidden="true">
            <g className="threads" stroke="#8bc79d" strokeLinecap="round">
              <path d="M40 480C160 436 213 370 326 372C438 374 446 448 555 396C656 348 670 279 794 300C925 323 1014 429 1160 452" />
              <path d="M112 510C192 432 260 446 322 356C380 272 386 194 475 208C566 223 552 354 643 350C738 346 735 207 835 203C944 199 965 332 1089 334" />
              <path d="M246 492C288 408 350 427 395 331C439 238 390 168 474 111C556 56 622 166 653 224C691 295 780 286 823 201C864 121 836 73 904 31" />
              <path d="M488 506C512 430 492 368 563 327C637 284 690 340 743 292C807 234 779 159 847 128C930 91 1001 158 1080 111" />
              <path d="M631 519C658 456 728 458 782 390C839 319 820 265 882 242C952 216 1016 273 1081 243C1126 222 1147 181 1177 153" />
            </g>
            <g className="nodes" fill="#d6e9c8">
              <circle cx="112" cy="510" r="4"/><circle cx="322" cy="356" r="3"/><circle cx="475" cy="208" r="4"/>
              <circle cx="643" cy="350" r="3"/><circle cx="835" cy="203" r="4"/><circle cx="1089" cy="334" r="3"/>
              <circle cx="474" cy="111" r="3"/><circle cx="653" cy="224" r="4"/><circle cx="823" cy="201" r="3"/>
            </g>
          </svg>

          <svg className="oak oak-left absolute -left-[9%] bottom-[17%] z-[13] h-[62%] w-[52%]" viewBox="0 0 520 660" aria-hidden="true">
            <g fill="none" stroke="#4f6a4a" strokeLinecap="round">
              <path d="M269 648C260 564 281 490 260 411C245 354 206 301 213 219" strokeWidth="28"/>
              <path d="M257 426C194 374 139 367 84 306" strokeWidth="13"/>
              <path d="M268 370C328 316 376 299 424 238" strokeWidth="14"/>
              <path d="M217 276C164 246 130 206 102 162" strokeWidth="10"/>
              <path d="M251 265C305 215 340 174 359 122" strokeWidth="11"/>
            </g>
            <g fill="#153a28">
              <circle cx="112" cy="176" r="82"/><circle cx="192" cy="126" r="102"/><circle cx="302" cy="121" r="99"/>
              <circle cx="393" cy="189" r="90"/><circle cx="157" cy="254" r="100"/><circle cx="278" cy="239" r="116"/><circle cx="393" cy="282" r="76"/>
            </g>
          </svg>

          <svg className="oak oak-right absolute -right-[11%] bottom-[19%] z-[13] h-[59%] w-[49%]" viewBox="0 0 520 660" aria-hidden="true">
            <g fill="none" stroke="#4b6547" strokeLinecap="round">
              <path d="M257 648C269 560 246 499 268 412C285 347 325 300 313 219" strokeWidth="27"/>
              <path d="M270 425C326 378 384 357 433 307" strokeWidth="13"/>
              <path d="M264 368C210 320 155 300 99 240" strokeWidth="14"/>
              <path d="M312 278C361 242 388 205 417 158" strokeWidth="10"/>
              <path d="M282 263C233 214 201 172 184 122" strokeWidth="11"/>
            </g>
            <g fill="#143725">
              <circle cx="410" cy="177" r="80"/><circle cx="330" cy="127" r="100"/><circle cx="222" cy="122" r="96"/>
              <circle cx="132" cy="190" r="89"/><circle cx="365" cy="252" r="99"/><circle cx="247" cy="240" r="114"/><circle cx="132" cy="283" r="74"/>
            </g>
          </svg>

          <div className="forest-word absolute bottom-[24%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[.28em] text-[#c6dda9]/0 sm:text-[8px]">
            QUERCUS ROBUR / MYCELIUM / SIGNAL BECOMES STRUCTURE
          </div>

          <div className="mora-core absolute left-1/2 top-[47%] z-[18] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c5dbae]/0 sm:h-32 sm:w-32" aria-hidden="true">
            <span className="absolute inset-[22%] rounded-full border border-[#c5dbae]/0" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6efcf]/0" />
          </div>

          <div className="absolute inset-x-5 bottom-5 z-50 sm:inset-x-8 sm:bottom-7">
            <div className="flex items-end justify-between gap-4 border-t border-white/[.06] pt-4">
              <div className="min-w-0 max-w-3xl">
                <div className="font-mono text-[7px] uppercase tracking-[.16em] text-white/24">MÔRA › {whisper}</div>
                {chosen ? <div className="mt-2 truncate text-xs text-white/34">{chosen.title}</div> : null}
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setStable((value) => !value)} className="border border-white/[.08] bg-black/20 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/38 transition hover:text-white/70">
                  {stable ? (de ? 'Störung lösen' : 'Release') : (de ? 'Signal stabilisieren' : 'Stabilize')}
                </button>
                {chosen ? <a href={chosen.url} target="_blank" rel="noreferrer" className="border border-white/[.08] bg-black/20 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/38 transition hover:text-white/70">SOURCE ↗</a> : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .noise{pointer-events:none;background:radial-gradient(circle at 50% 44%,rgba(50,77,54,.07),transparent 21%),#010403;transition:background 2.5s ease}
        .scan{pointer-events:none;opacity:.28;background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(200,225,205,.026) 4px);mix-blend-mode:screen}
        .vignette{pointer-events:none;box-shadow:inset 0 0 210px 65px rgba(0,0,0,.9)}
        .danger{z-index:1;background:radial-gradient(circle at 49% 46%,rgba(120,50,41,.11),transparent 13%),linear-gradient(180deg,#010403,#030806);transition:opacity 2.7s ease,background 3s ease}
        .pixel-map{z-index:2;opacity:.62;background-image:linear-gradient(90deg,transparent 0 12%,rgba(255,255,255,.025) 12% 13%,transparent 13% 42%,rgba(174,94,83,.04) 42% 45%,transparent 45% 77%,rgba(127,185,147,.035) 77% 80%,transparent 80%),linear-gradient(0deg,transparent 0 21%,rgba(255,255,255,.026) 21% 22%,transparent 22% 62%,rgba(178,99,84,.035) 62% 65%,transparent 65%);background-size:149px 103px,191px 137px;mix-blend-mode:screen;animation:pixelDrift 8s steps(2,end) infinite}
        .glitch-band{z-index:15;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(202,153,132,.25) 22%,rgba(255,255,255,.31) 50%,rgba(125,200,154,.18) 74%,transparent);opacity:.12;box-shadow:0 0 12px rgba(255,255,255,.07)}
        .g1{animation:tear 5.1s steps(1,end) infinite}.g2{animation:tear 7.2s steps(1,end) -2.8s infinite}.g3{animation:tear 4.3s steps(1,end) -1.2s infinite}
        .mora-title{text-shadow:0 0 34px rgba(225,236,218,.04);transition:all 1.4s ease}
        .warning,.operator{transition:color 1.2s ease,opacity 1.2s ease}
        .fragment{border-left:1px solid rgba(185,207,188,.06);padding-left:.6rem;opacity:.42;filter:blur(.35px);transition:opacity .45s ease,filter .45s ease,transform .45s ease}
        .fragment.active{opacity:1;filter:none;transform:translateX(5px)}
        .forest-glow{opacity:0;background:radial-gradient(circle at 50% 58%,rgba(168,205,118,.27),transparent 18%),radial-gradient(circle at 50% 67%,rgba(36,108,62,.42),transparent 45%),linear-gradient(180deg,rgba(5,23,13,.04),rgba(11,58,30,.78));transition:opacity 3.8s ease}
        .mycelium,.oak,.forest-word,.mora-core{opacity:0}
        .threads path{stroke-width:2;stroke-opacity:.45;stroke-dasharray:1200;stroke-dashoffset:1200}
        .nodes{opacity:0}

        .phase-signal .warning{color:rgba(201,147,125,.5);animation:warningBlink 3.4s steps(1,end) infinite}
        .phase-signal .operator{color:rgba(220,220,210,.3)}
        .phase-signal .pixel-map{opacity:.82;animation:pixelDrift 2.5s steps(2,end) infinite}
        .phase-signal .g1,.phase-signal .g2,.phase-signal .g3{opacity:.35}
        .phase-signal .mora-title{transform:translateX(1px);text-shadow:-1px 0 rgba(182,91,76,.25),1px 0 rgba(91,170,137,.22)}
        .phase-signal .fragment:nth-child(2n){animation:fragmentJitter 4.2s steps(1,end) infinite}

        .phase-forest .danger{background:linear-gradient(180deg,#041009 0%,#082416 48%,#0b3320 100%)}
        .phase-forest .pixel-map{opacity:.14;filter:blur(1px)}
        .phase-forest .glitch-band,.phase-forest .warning,.phase-forest .operator{opacity:0!important}
        .phase-forest .forest-glow{opacity:1}
        .phase-forest .fragments{opacity:.15;transition:opacity 2.8s ease}
        .phase-forest .mycelium{opacity:1;transition:opacity 1.2s ease 1s}
        .phase-forest .threads path{animation:growThread 4.7s cubic-bezier(.3,.7,.2,1) forwards}
        .phase-forest .nodes{animation:nodesIn 2.2s ease 3.4s forwards}
        .phase-forest .oak{animation:oakRise 4.4s cubic-bezier(.2,.75,.2,1) 2.4s forwards;transform-origin:center bottom}
        .phase-forest .forest-word{animation:wordIn 2s ease 5.5s forwards}
        .phase-forest .mora-core{animation:coreIn 3s ease 4.6s forwards}
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
        @keyframes oakRise{0%{opacity:0;transform:translateY(22%) scaleY(.55);filter:blur(5px)}100%{opacity:.82;transform:none;filter:none}}
        @keyframes wordIn{from{opacity:0;letter-spacing:.42em}to{opacity:.36;letter-spacing:.28em}}
        @keyframes coreIn{0%{opacity:0;border-color:rgba(197,219,174,0)}100%{opacity:1;border-color:rgba(197,219,174,.18)}}
        @keyframes corePulse{0%,100%{transform:scale(1);border-color:rgba(197,219,174,.08)}50%{transform:scale(1.08);border-color:rgba(197,219,174,.24)}}

        @media(max-width:640px){.fragment{max-width:44%!important}.fragment:nth-child(n+5){display:none}.oak{width:65%!important}.forest-word{bottom:29%}}
        @media(prefers-reduced-motion:reduce){.pixel-map,.glitch-band,.fragment,.threads path,.nodes,.oak,.forest-word,.mora-core,.mora-core span{animation:none!important}.phase-forest .threads path{stroke-dashoffset:0}.phase-forest .nodes,.phase-forest .oak,.phase-forest .forest-word,.phase-forest .mora-core{opacity:.75}}
      `}</style>
    </div>
  );
}
