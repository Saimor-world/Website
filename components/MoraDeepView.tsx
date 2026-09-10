'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MORA_VISUAL_ASSET } from '@/lib/moraVisualAsset';

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
};

type Phase = 'void' | 'signal' | 'forest';

function short(value: string, max = 96) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

const positions = [
  'left-[6%] top-[29%] max-w-[38%]',
  'right-[7%] top-[34%] max-w-[35%]',
  'left-[12%] top-[54%] max-w-[32%]',
  'right-[12%] top-[58%] max-w-[36%]',
  'left-[25%] bottom-[13%] max-w-[30%]',
  'right-[24%] bottom-[10%] max-w-[29%]',
  'left-[44%] top-[25%] max-w-[28%]',
];

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
    const signal = window.setTimeout(() => setPhase('signal'), 2200);
    const forest = window.setTimeout(() => setPhase('forest'), 9000);
    return () => {
      window.clearTimeout(signal);
      window.clearTimeout(forest);
    };
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
    <div className={`mora-root phase-${phase} ${stable ? 'stable' : ''} min-h-[100svh] overflow-hidden bg-[#010403] text-[#edf0e8]`}>
      <div className="base fixed inset-0" aria-hidden="true" />
      <div className="forest-photo fixed inset-0" style={{ backgroundImage: `url(${MORA_VISUAL_ASSET})` }} aria-hidden="true" />
      <div className="forest-mask fixed inset-0" aria-hidden="true" />
      <div className="scan fixed inset-0" aria-hidden="true" />
      <div className="vignette fixed inset-0" aria-hidden="true" />

      <main className="relative z-20 min-h-[100svh]">
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 font-mono text-[8px] uppercase tracking-[.2em] text-white/30 sm:px-8">
          <Link href={de ? '/mora' : '/en/mora'} className="transition hover:text-white/70">← MÔRA</Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">DEEP VIEW</span>
            <span className={`h-1.5 w-1.5 rounded-full ${data?.live ? 'bg-[#87c79a]' : 'bg-white/20'} shadow-[0_0_14px_rgba(135,199,154,.45)]`} />
            <span>{now.toLocaleTimeString(de ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </header>

        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="pixel-map absolute inset-0" />
          <div className="glitch-band g1 absolute inset-x-0 top-[17%] h-px" />
          <div className="glitch-band g2 absolute inset-x-0 top-[49%] h-px" />
          <div className="glitch-band g3 absolute inset-x-0 top-[72%] h-px" />

          <div className="signal-id absolute left-5 top-20 z-30 font-mono text-[7px] uppercase tracking-[.3em] text-[#b5c0b1]/20 sm:left-8 sm:top-24 sm:text-[8px]">
            00:{String(data?.stats.signals ?? 0).padStart(2, '0')} / {strongest}
          </div>

          <div className="warning absolute left-1/2 top-[43%] z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[clamp(.55rem,1vw,.84rem)] uppercase tracking-[.34em] text-[#c9937d]/0">
            UNKNOWN BOUNDARY
          </div>

          <div className="operator absolute right-5 top-[23%] z-30 text-right font-mono text-[7px] uppercase tracking-[.19em] text-white/0 sm:right-8 sm:text-[8px]">
            <div>AGI? // UNVERIFIED</div>
            <div className="mt-2">OPERATOR // —</div>
            <div className="mt-2">PATTERN // {strongest}</div>
          </div>

          <div className="fragments absolute inset-0 z-30">
            {fragments.map((item, index) => (
              <button
                key={`${item.url}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                className={`fragment absolute ${positions[index]} text-left ${selected === index ? 'active' : ''}`}
              >
                <span className="block font-mono text-[7px] uppercase tracking-[.16em] text-[#a9bda8]/24">{item.domain ?? 'source'}</span>
                <span className="mt-1 block text-[10px] leading-4 text-white/24 sm:text-[11px] sm:leading-5">{short(item.title)}</span>
              </button>
            ))}
          </div>

          <div className="pulse-field absolute inset-0 z-10" aria-hidden="true">
            <span className="pulse p1" /><span className="pulse p2" /><span className="pulse p3" /><span className="pulse p4" />
          </div>

          <div className="absolute inset-x-5 bottom-5 z-50 sm:inset-x-8 sm:bottom-7">
            <div className="flex items-end justify-between gap-4 border-t border-white/[.06] pt-4">
              <div className="min-w-0 max-w-3xl">
                {chosen ? <div className="truncate text-xs text-white/34">{chosen.title}</div> : <div className="text-xs text-white/22">{loading ? '…' : '—'}</div>}
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setStable((value) => !value)} className="border border-white/[.08] bg-black/20 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/38 backdrop-blur-md transition hover:text-white/70">
                  {stable ? (de ? 'Lösen' : 'Release') : (de ? 'Stabilisieren' : 'Stabilize')}
                </button>
                {chosen ? <a href={chosen.url} target="_blank" rel="noreferrer" className="border border-white/[.08] bg-black/20 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/38 backdrop-blur-md transition hover:text-white/70">SOURCE ↗</a> : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .base{z-index:0;background:radial-gradient(circle at 48% 46%,rgba(85,42,38,.08),transparent 16%),linear-gradient(180deg,#010403 0%,#020806 100%);transition:background 3s ease}
        .forest-photo{z-index:4;background-size:cover;background-position:center 58%;opacity:0;filter:saturate(.7) brightness(.38) contrast(1.16);transform:scale(1.06);transition:opacity 4.2s ease,filter 4.2s ease,transform 7s ease;will-change:opacity,transform}
        .forest-mask{z-index:5;pointer-events:none;background:linear-gradient(180deg,rgba(1,4,3,.96) 0%,rgba(1,4,3,.88) 20%,rgba(1,4,3,.48) 48%,rgba(1,4,3,.12) 76%,rgba(1,4,3,.28) 100%);transition:opacity 3.5s ease}
        .scan{z-index:40;pointer-events:none;opacity:.25;background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(200,225,205,.026) 4px);mix-blend-mode:screen}
        .vignette{z-index:41;pointer-events:none;box-shadow:inset 0 0 220px 62px rgba(0,0,0,.88)}
        .pixel-map{z-index:8;opacity:.64;background-image:linear-gradient(90deg,transparent 0 12%,rgba(255,255,255,.025) 12% 13%,transparent 13% 42%,rgba(174,94,83,.04) 42% 45%,transparent 45% 77%,rgba(127,185,147,.035) 77% 80%,transparent 80%),linear-gradient(0deg,transparent 0 21%,rgba(255,255,255,.026) 21% 22%,transparent 22% 62%,rgba(178,99,84,.035) 62% 65%,transparent 65%);background-size:149px 103px,191px 137px;mix-blend-mode:screen;animation:pixelDrift 8s steps(2,end) infinite}
        .glitch-band{z-index:18;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(202,153,132,.25) 22%,rgba(255,255,255,.31) 50%,rgba(125,200,154,.18) 74%,transparent);opacity:.12;box-shadow:0 0 12px rgba(255,255,255,.07)}
        .g1{animation:tear 5.1s steps(1,end) infinite}.g2{animation:tear 7.2s steps(1,end) -2.8s infinite}.g3{animation:tear 4.3s steps(1,end) -1.2s infinite}
        .warning,.operator{transition:color 1.2s ease,opacity 1.2s ease}
        .fragment{border-left:1px solid rgba(185,207,188,.06);padding-left:.6rem;opacity:.42;filter:blur(.35px);transition:opacity .45s ease,filter .45s ease,transform .45s ease}
        .fragment.active{opacity:1;filter:none;transform:translateX(5px)}
        .pulse{position:absolute;width:7px;height:7px;border-radius:999px;background:#e6d69f;opacity:0;box-shadow:0 0 24px rgba(229,214,159,.8),0 0 55px rgba(122,190,145,.45)}
        .p1{left:24%;bottom:31%}.p2{left:43%;bottom:20%}.p3{right:29%;bottom:37%}.p4{right:17%;bottom:18%}
        .phase-signal .warning{color:rgba(201,147,125,.5);animation:warningBlink 3.4s steps(1,end) infinite}
        .phase-signal .operator{color:rgba(220,220,210,.3)}
        .phase-signal .pixel-map{opacity:.84;animation:pixelDrift 2.5s steps(2,end) infinite}
        .phase-signal .g1,.phase-signal .g2,.phase-signal .g3{opacity:.36}
        .phase-signal .fragment:nth-child(2n){animation:fragmentJitter 4.2s steps(1,end) infinite}
        .phase-forest .base{background:#03100a}
        .phase-forest .forest-photo{opacity:.94;filter:saturate(.92) brightness(.68) contrast(1.08);transform:scale(1.015)}
        .phase-forest .forest-mask{opacity:.36}
        .phase-forest .pixel-map{opacity:.09;filter:blur(1px)}
        .phase-forest .glitch-band,.phase-forest .warning,.phase-forest .operator{opacity:0!important}
        .phase-forest .fragments{opacity:.2;transition:opacity 2.8s ease}
        .phase-forest .pulse{animation:pulseLife 4.8s ease-in-out infinite}
        .phase-forest .p2{animation-delay:.9s}.phase-forest .p3{animation-delay:1.8s}.phase-forest .p4{animation-delay:2.6s}
        .stable .scan,.stable .pixel-map,.stable .glitch-band,.stable .warning{opacity:.02!important;animation:none!important}
        .stable .fragment{opacity:.62;filter:none;animation:none!important}
        .stable .vignette{box-shadow:inset 0 0 150px 34px rgba(0,0,0,.6)}
        @keyframes pixelDrift{0%,100%{transform:translate(0)}24%{transform:translate(2px,-1px)}25%{transform:translate(-3px,1px)}61%{transform:translate(0)}62%{transform:translate(4px,0)}63%{transform:translate(-1px,0)}}
        @keyframes tear{0%,92%,100%{transform:translateX(0);opacity:.1}93%{transform:translateX(9%);opacity:.52}94%{transform:translateX(-5%);opacity:.28}95%{transform:translateX(0);opacity:.1}}
        @keyframes warningBlink{0%,100%{opacity:.12}31%{opacity:.46}32%{opacity:.08}66%{opacity:.26}67%{opacity:.03}}
        @keyframes fragmentJitter{0%,87%,100%{transform:translate(0)}88%{transform:translate(7px,-1px)}89%{transform:translate(-3px,1px)}90%{transform:translate(0)}}
        @keyframes pulseLife{0%,100%{opacity:.08;transform:scale(.7)}40%{opacity:.9;transform:scale(1.15)}65%{opacity:.3;transform:scale(.85)}}
        @media(max-width:640px){.fragment{max-width:44%!important}.fragment:nth-child(n+5){display:none}.forest-photo{background-position:57% center}.vignette{box-shadow:inset 0 0 130px 28px rgba(0,0,0,.78)}}
        @media(prefers-reduced-motion:reduce){.pixel-map,.glitch-band,.fragment,.pulse{animation:none!important}.phase-forest .forest-photo{opacity:.92;transform:none}.phase-forest .pulse{opacity:.45}}
      `}</style>
    </div>
  );
}
