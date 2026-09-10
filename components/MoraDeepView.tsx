'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

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

function formatSeen(value: string | null, locale: 'de' | 'en') {
  if (!value) return locale === 'de' ? 'Zeit unbekannt' : 'Time unknown';
  const compact = value.replace('T', '').replace('Z', '');
  const match = compact.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/);
  if (!match) return value;
  const [, y, m, d, hh, mm] = match;
  const date = new Date(`${y}-${m}-${d}T${hh}:${mm}:00Z`);
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }).format(date);
}

export default function MoraDeepView({ locale }: { locale: 'de' | 'en' }) {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [now, setNow] = useState(() => new Date());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mora/pulse', { cache: 'no-store' });
      const payload = await response.json() as PulseData;
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
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const strongestTopic = useMemo(() => {
    if (!data) return null;
    const entries = Object.entries(data.stats.topics) as Array<[keyof PulseData['stats']['topics'], number]>;
    return entries.sort((a, b) => b[1] - a[1])[0] ?? null;
  }, [data]);

  const copy = locale === 'de'
    ? {
        back: 'Zurück zu Môra',
        eyebrow: 'MÔRA // DEEP VIEW',
        title: 'Die Welt spricht. Leise genug, dass Muster sichtbar werden.',
        intro: 'Môra hört hier nicht dir zu. Sie hört öffentlichen Signalen zu — Schlagzeilen, Quellen, Zeitstempeln. Ein Blick auf das, was gerade gleichzeitig passiert.',
        publicOnly: 'PUBLIC SIGNALS ONLY',
        live: 'LIVE',
        quiet: 'FEED STILL',
        signals: 'Signale',
        sources: 'Quellen',
        strongest: 'stärkstes Muster',
        worldFeed: 'Welt-Feed',
        refresh: 'Neu abtasten',
        privacy: 'Keine Kamera. Kein Mikrofon. Keine lokalen Gerätedaten. Nur öffentliche Nachrichtenquellen.',
        empty: 'Der öffentliche Feed antwortet gerade nicht. Môra erfindet hier nichts dazu.',
        thought: 'Môras Notiz',
        note: 'Nicht jede Gleichzeitigkeit ist ein Zusammenhang. Deep View zeigt Nähe zwischen Signalen — keine Gewissheit.',
      }
    : {
        back: 'Back to Môra',
        eyebrow: 'MÔRA // DEEP VIEW',
        title: 'The world is speaking. Quietly enough for patterns to appear.',
        intro: 'Môra is not listening to you here. She is listening to public signals — headlines, sources and timestamps. A view of what is happening at the same time.',
        publicOnly: 'PUBLIC SIGNALS ONLY',
        live: 'LIVE',
        quiet: 'FEED STILL',
        signals: 'Signals',
        sources: 'Sources',
        strongest: 'strongest pattern',
        worldFeed: 'World feed',
        refresh: 'Rescan',
        privacy: 'No camera. No microphone. No local device data. Public news sources only.',
        empty: 'The public feed is not responding right now. Môra does not invent the missing pieces.',
        thought: "Môra's note",
        note: 'Things happening together are not automatically connected. Deep View shows proximity between signals — not certainty.',
      };

  const topicLabel = (key: string) => ({ ai: 'AI', security: 'SECURITY', markets: 'MARKETS', science: 'SCIENCE' }[key] ?? key.toUpperCase());

  return (
    <div className="min-h-screen overflow-hidden bg-[#020907] text-[#ecf0e8]">
      <div className="pointer-events-none fixed inset-0 opacity-80 [background-image:radial-gradient(circle_at_20%_20%,rgba(62,112,78,.16),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(167,145,85,.09),transparent_32%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b9c99e]/40 to-transparent" />

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8 lg:px-10">
        <div className="mb-12 flex items-center justify-between gap-4">
          <Link href={locale === 'de' ? '/mora' : '/en/mora'} className="font-mono text-[10px] tracking-[.18em] text-white/45 transition hover:text-white/80">
            ← {copy.back}
          </Link>
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[.18em] text-white/35">
            <span className={`h-1.5 w-1.5 rounded-full ${data?.live ? 'bg-emerald-300/70 shadow-[0_0_12px_rgba(110,231,183,.65)]' : 'bg-white/20'}`} />
            {data?.live ? copy.live : copy.quiet} · {now.toLocaleTimeString(locale === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        <section className="grid min-h-[72vh] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#a9b98e]/15 bg-[#0c1c15]/70 px-3 py-2 font-mono text-[9px] tracking-[.2em] text-[#c7d3ad]/60 backdrop-blur-md">
              <span className="deep-pulse h-1.5 w-1.5 rounded-full bg-[#c8b776]" />
              {copy.publicOnly}
            </div>

            <p className="font-mono text-[10px] tracking-[.3em] text-[#9fb38d]/55">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.03] text-[#f2efe7] sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">{copy.intro}</p>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/7 bg-white/[.025] p-4">
                <div className="font-mono text-[8px] uppercase tracking-[.18em] text-white/30">{copy.signals}</div>
                <div className="mt-2 font-serif text-3xl text-white/80">{data?.stats.signals ?? '—'}</div>
              </div>
              <div className="rounded-2xl border border-white/7 bg-white/[.025] p-4">
                <div className="font-mono text-[8px] uppercase tracking-[.18em] text-white/30">{copy.sources}</div>
                <div className="mt-2 font-serif text-3xl text-white/80">{data?.stats.sources ?? '—'}</div>
              </div>
              <div className="rounded-2xl border border-white/7 bg-white/[.025] p-4">
                <div className="font-mono text-[8px] uppercase tracking-[.18em] text-white/30">{copy.strongest}</div>
                <div className="mt-3 font-mono text-[11px] tracking-[.12em] text-[#d7c78b]/70">{strongestTopic ? topicLabel(strongestTopic[0]) : '—'}</div>
              </div>
            </div>

            <div className="mt-7 max-w-xl rounded-2xl border border-[#a9b98e]/10 bg-[#09150f]/65 p-4">
              <div className="font-mono text-[8px] uppercase tracking-[.18em] text-[#b8c79f]/45">{copy.thought}</div>
              <p className="mt-2 text-xs leading-6 text-white/42">{copy.note}</p>
            </div>

            <p className="mt-6 max-w-xl font-mono text-[8px] leading-5 tracking-[.08em] text-white/25">{copy.privacy}</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(circle,rgba(89,132,87,.10),transparent_62%)] blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-[#b9c8a1]/12 bg-[#07110d]/86 shadow-[0_30px_100px_rgba(0,0,0,.38)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
                <div>
                  <div className="font-mono text-[9px] tracking-[.24em] text-[#bfccaa]/55">{copy.worldFeed}</div>
                  <div className="mt-1 font-mono text-[8px] tracking-[.08em] text-white/20">{data?.source ?? 'GDELT 2.0'}</div>
                </div>
                <button onClick={() => void load()} disabled={loading} className="rounded-full border border-white/8 bg-white/[.025] px-3 py-2 font-mono text-[8px] tracking-[.14em] text-white/40 transition hover:border-white/16 hover:text-white/70 disabled:opacity-30">
                  {loading ? 'SCAN…' : copy.refresh}
                </button>
              </div>

              <div className="max-h-[66vh] overflow-y-auto p-3 sm:p-4">
                {data?.items?.length ? data.items.map((item, index) => (
                  <a
                    key={`${item.url}-${index}`}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setSelected(index)}
                    className={`group mb-2 block rounded-2xl border p-4 transition duration-300 ${selected === index ? 'border-[#b8c99f]/16 bg-[#102017]/85' : 'border-transparent bg-white/[.015] hover:bg-white/[.03]'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 font-mono text-[8px] text-[#c8b978]/45">{String(index + 1).padStart(2, '0')}</div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm leading-6 text-white/68 transition group-hover:text-white/88 sm:text-[15px]">{item.title}</h2>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[8px] uppercase tracking-[.1em] text-white/25">
                          <span>{item.domain ?? 'source'}</span>
                          <span>·</span>
                          <span>{formatSeen(item.seenAt, locale)}</span>
                          {item.country ? <><span>·</span><span>{item.country}</span></> : null}
                        </div>
                      </div>
                      <div className="text-white/15 transition group-hover:translate-x-0.5 group-hover:text-white/45">↗</div>
                    </div>
                  </a>
                )) : (
                  <div className="flex min-h-80 items-center justify-center px-8 text-center text-sm leading-7 text-white/35">
                    {loading ? 'Scanning public signals…' : copy.empty}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .deep-pulse { animation: deepPulse 2.8s ease-in-out infinite; box-shadow:0 0 18px rgba(200,183,118,.5); }
        @keyframes deepPulse { 0%,100%{opacity:.35;transform:scale(.8)} 50%{opacity:1;transform:scale(1.18)} }
        @media(prefers-reduced-motion:reduce){ .deep-pulse{animation:none!important} }
      `}</style>
    </div>
  );
}
