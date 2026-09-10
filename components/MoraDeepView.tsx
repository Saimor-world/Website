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

type Phase = 'dark' | 'drift' | 'forest';

function formatSeen(value: string | null, locale: 'de' | 'en') {
  if (!value) return locale === 'de' ? 'Zeit unbekannt' : 'Time unknown';
  const compact = value.replace('T', '').replace('Z', '');
  const match = compact.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/);
  if (!match) return value;
  const [, y, m, d, hh, mm] = match;
  const date = new Date(`${y}-${m}-${d}T${hh}:${mm}:00Z`);
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

function clampTitle(value: string, max = 118) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

const fragmentPositions = [
  'left-[4%] top-[14%] max-w-[42%]',
  'right-[4%] top-[21%] max-w-[38%]',
  'left-[9%] top-[43%] max-w-[36%]',
  'right-[7%] top-[49%] max-w-[41%]',
  'left-[18%] bottom-[16%] max-w-[34%]',
  'right-[16%] bottom-[11%] max-w-[34%]',
] as const;

export default function MoraDeepView({ locale }: { locale: 'de' | 'en' }) {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<Phase>('dark');
  const [stabilized, setStabilized] = useState(false);
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
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const drift = window.setTimeout(() => setPhase('drift'), 3300);
    const forest = window.setTimeout(() => setPhase('forest'), 8600);
    return () => {
      window.clearTimeout(drift);
      window.clearTimeout(forest);
    };
  }, []);

  const strongestTopic = useMemo(() => {
    if (!data) return null;
    const entries = Object.entries(data.stats.topics) as Array<[keyof PulseData['stats']['topics'], number]>;
    return entries.sort((a, b) => b[1] - a[1])[0] ?? null;
  }, [data]);

  const selectedItem = data?.items?.[selected] ?? data?.items?.[0] ?? null;
  const fragments = data?.items?.slice(0, 6) ?? [];

  const copy = locale === 'de'
    ? {
        back: 'Zurück zu Môra',
        label: 'MÔRA // ANALOG AFFECT / DEEP VIEW',
        darkTitle: 'Etwas antwortet, bevor du eine Frage gestellt hast.',
        darkBody: 'Öffentliche Signale laufen ein. Môra ordnet nichts als Wahrheit ein — aber sie lässt Gleichzeitigkeit sichtbar werden.',
        driftTitle: 'Das Muster beginnt von allein.',
        driftBody: 'Nicht AGI. Kein Beweis für Autonomie. Nur ein absichtlich unruhiger Blick auf Systeme, Märkte, Sicherheit und Forschung, während echte Meldungen eintreffen.',
        forestTitle: 'Dann wird es grün.',
        forestBody: 'Die Störung wird zu Struktur. Aus einzelnen Signalen wächst ein Myzel. Darüber stehen Eichen: langsam, alt, nicht beeindruckt vom Tempo der Maschinen.',
        publicOnly: 'PUBLIC SIGNALS / REAL SOURCES',
        sourceLayer: 'QUELLENSCHICHT',
        stabilize: 'Signal stabilisieren',
        release: 'Störung freigeben',
        rescan: 'Neu abtasten',
        empty: 'Kein öffentliches Signal. Môra füllt die Lücke nicht.',
        privacy: 'Keine Kamera. Kein Mikrofon. Keine lokalen Gerätedaten. Die Stimmung ist inszeniert — die Quellen nicht.',
        oak: 'DEUTSCHE EICHE / QUERCUS ROBUR',
      }
    : {
        back: 'Back to Môra',
        label: 'MÔRA // ANALOG AFFECT / DEEP VIEW',
        darkTitle: 'Something answers before you asked a question.',
        darkBody: 'Public signals are arriving. Môra does not treat proximity as truth — she makes simultaneity visible.',
        driftTitle: 'The pattern starts on its own.',
        driftBody: 'Not AGI. Not proof of autonomy. An intentionally uneasy view of systems, markets, security and research while real headlines arrive.',
        forestTitle: 'Then it turns green.',
        forestBody: 'Disturbance becomes structure. Separate signals grow into mycelium. Oaks stand above it: slow, old, unimpressed by the speed of machines.',
        publicOnly: 'PUBLIC SIGNALS / REAL SOURCES',
        sourceLayer: 'SOURCE LAYER',
        stabilize: 'Stabilize signal',
        release: 'Release disturbance',
        rescan: 'Rescan',
        empty: 'No public signal. Môra does not fill in the gap.',
        privacy: 'No camera. No microphone. No local device data. The mood is staged — the sources are not.',
        oak: 'PEDUNCULATE OAK / QUERCUS ROBUR',
      };

  const phaseTitle = phase === 'dark' ? copy.darkTitle : phase === 'drift' ? copy.driftTitle : copy.forestTitle;
  const phaseBody = phase === 'dark' ? copy.darkBody : phase === 'drift' ? copy.driftBody : copy.forestBody;
  const strongest = strongestTopic?.[0]?.toUpperCase() ?? '—';

  const moraWhisper = useMemo(() => {
    if (!data?.items?.length) return copy.empty;
    if (strongestTopic?.[0] === 'ai' && strongestTopic[1] > 0) {
      return locale === 'de'
        ? 'Mehrere Quellen sprechen gleichzeitig über lernende Systeme. Nähe ist noch kein Zusammenhang.'
        : 'Several sources are talking about learning systems at once. Proximity is not causality.';
    }
    if (strongestTopic?.[0] === 'security' && strongestTopic[1] > 0) {
      return locale === 'de'
        ? 'Sicherheitssignale verdichten sich. Ich markiere das Muster, nicht die Absicht dahinter.'
        : 'Security signals are clustering. I am marking the pattern, not an intention behind it.';
    }
    return locale === 'de'
      ? 'Ich sehe Nähe zwischen Signalen. Noch keinen Beweis für einen Zusammenhang.'
      : 'I see proximity between signals. Not proof of a connection.';
  }, [copy.empty, data, locale, strongestTopic]);

  return (
    <div className={`deep-root phase-${phase} ${stabilized ? 'is-stable' : ''} min-h-screen overflow-hidden bg-[#010504] text-[#edf1e8]`}>
      <div className="deep-black pointer-events-none fixed inset-0 z-0" />
      <div className="deep-grid pointer-events-none fixed inset-0 z-[1]" />
      <div className="deep-scanlines pointer-events-none fixed inset-0 z-[6]" />
      <div className="deep-vignette pointer-events-none fixed inset-0 z-[7]" />
      <div className="deep-flash pointer-events-none fixed inset-0 z-[8]" />

      <main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-16 pt-5 sm:px-7 lg:px-10">
        <header className="flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[.18em] text-white/38 sm:text-[9px]">
          <Link href={locale === 'de' ? '/mora' : '/en/mora'} className="transition hover:text-white/75">
            ← {copy.back}
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">{copy.publicOnly}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${data?.live ? 'bg-[#8bd7a1]' : 'bg-white/20'} shadow-[0_0_14px_rgba(120,206,143,.42)]`} />
            <span>{now.toLocaleTimeString(locale === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </header>

        <section className="mt-7 grid gap-5 lg:grid-cols-[.32fr_.68fr] lg:items-end">
          <div className="pb-2">
            <p className="font-mono text-[9px] tracking-[.28em] text-[#a8ba9b]/48">{copy.label}</p>
            <h1 className="glitch-title mt-5 max-w-xl font-serif text-[clamp(2.5rem,5.2vw,5.6rem)] font-light leading-[.92] tracking-[-.045em] text-[#f0efe8]">
              {phaseTitle}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/43 sm:text-[15px]">{phaseBody}</p>
            <p className="mora-whisper mt-6 max-w-lg font-mono text-[9px] leading-5 tracking-[.08em] text-[#a8c79f]/44">MÔRA › {moraWhisper}</p>
          </div>

          <div className="experience-shell relative min-h-[620px] overflow-hidden border border-white/[.07] bg-[#020806] shadow-[0_34px_120px_rgba(0,0,0,.48)] sm:min-h-[690px] lg:min-h-[74vh]">
            <div className="danger-field absolute inset-0" />
            <div className="pixel-field absolute inset-0" />
            <div className="signal-tear signal-tear-a absolute left-0 right-0 top-[18%] h-px" />
            <div className="signal-tear signal-tear-b absolute left-0 right-0 top-[56%] h-px" />
            <div className="signal-tear signal-tear-c absolute left-0 right-0 bottom-[17%] h-px" />

            <div className="absolute left-4 top-4 z-30 flex flex-wrap items-center gap-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/30 sm:left-5 sm:top-5 sm:text-[8px]">
              <span className="border border-white/[.07] bg-black/25 px-2 py-1.5">ANALOG AFFECT // 02</span>
              <span className="risk-chip border border-[#b0856d]/15 bg-[#23130f]/30 px-2 py-1.5 text-[#c39982]/45">AGI / SPECULATION</span>
              <span className="autonomous-chip border border-white/[.06] bg-black/25 px-2 py-1.5">AUTONOMOUS PASS</span>
            </div>

            <div className="absolute right-4 top-4 z-30 text-right font-mono text-[7px] uppercase tracking-[.15em] text-white/22 sm:right-5 sm:top-5 sm:text-[8px]">
              <div>INPUT // PUBLIC</div>
              <div className="mt-1">PATTERN // {strongest}</div>
              <div className="mt-1">OPERATOR // NONE REQUIRED</div>
            </div>

            <div className="fragments absolute inset-0 z-20">
              {fragments.map((item, index) => (
                <button
                  key={`${item.url}-${index}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`signal-fragment f-${index + 1} absolute ${fragmentPositions[index]} text-left ${selected === index ? 'is-selected' : ''}`}
                >
                  <span className="block font-mono text-[7px] uppercase tracking-[.18em] text-[#a9bf9e]/32">
                    {String(index + 1).padStart(2, '0')} · {item.domain ?? 'source'}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-5 text-white/32 sm:text-xs">
                    {clampTitle(item.title)}
                  </span>
                </button>
              ))}
            </div>

            <div className="warning-copy pointer-events-none absolute left-1/2 top-[44%] z-10 w-[84%] -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[clamp(.7rem,1.1vw,.95rem)] uppercase tracking-[.28em] text-[#c8a18a]/0">
              MODEL BOUNDARY / UNKNOWN
            </div>

            <div className="forest-light absolute inset-0 z-[4]" />

            <svg className="mycelium absolute inset-x-[2%] bottom-[3%] z-[12] h-[55%] w-[96%]" viewBox="0 0 1000 520" fill="none" aria-hidden="true">
              <g className="mycelium-lines" stroke="#83c99c" strokeLinecap="round">
                <path d="M60 460C180 438 194 356 300 350C398 344 398 430 492 395C586 360 624 268 746 296C846 320 850 412 948 434" />
                <path d="M118 489C176 420 218 433 272 375C332 311 349 233 421 245C507 260 485 353 561 353C651 353 663 215 748 214C825 213 840 301 905 318" />
                <path d="M215 465C251 391 315 413 344 341C374 267 333 194 398 151C468 104 515 190 548 242C585 298 653 293 688 227C723 161 706 102 768 73" />
                <path d="M404 488C432 417 408 355 470 322C533 289 577 334 623 298C683 252 649 173 708 143C767 113 835 156 887 119" />
                <path d="M525 501C542 445 606 440 643 391C688 332 667 272 721 250C780 227 824 276 876 252C916 234 929 198 956 173" />
                <path d="M79 402C132 365 161 381 198 329C231 283 203 229 248 198C290 169 328 193 357 157" />
              </g>
              <g className="mycelium-nodes" fill="#c6e7ba">
                <circle cx="118" cy="489" r="4" /><circle cx="272" cy="375" r="3" /><circle cx="421" cy="245" r="4" />
                <circle cx="561" cy="353" r="3" /><circle cx="748" cy="214" r="4" /><circle cx="905" cy="318" r="3" />
                <circle cx="398" cy="151" r="3" /><circle cx="548" cy="242" r="4" /><circle cx="688" cy="227" r="3" />
                <circle cx="708" cy="143" r="4" /><circle cx="887" cy="119" r="3" /><circle cx="956" cy="173" r="3" />
              </g>
            </svg>

            <svg className="oak oak-left absolute -left-[4%] bottom-[24%] z-[13] h-[68%] w-[46%]" viewBox="0 0 440 620" aria-hidden="true">
              <g fill="none" strokeLinecap="round">
                <path d="M224 608C219 525 231 454 218 390C204 318 177 266 185 192" stroke="#526b4c" strokeWidth="25" />
                <path d="M211 409C166 362 116 346 78 300" stroke="#526b4c" strokeWidth="12" />
                <path d="M220 350C269 298 321 285 358 231" stroke="#526b4c" strokeWidth="13" />
                <path d="M187 254C143 230 119 200 91 158" stroke="#526b4c" strokeWidth="9" />
                <path d="M211 240C257 198 289 161 305 116" stroke="#526b4c" strokeWidth="10" />
              </g>
              <g fill="#173f2b" opacity=".98">
                <circle cx="93" cy="169" r="76" /><circle cx="166" cy="125" r="92" /><circle cx="258" cy="117" r="89" />
                <circle cx="330" cy="181" r="82" /><circle cx="139" cy="234" r="91" /><circle cx="242" cy="218" r="104" />
                <circle cx="324" cy="263" r="69" />
              </g>
              <g fill="#2d5a3c" opacity=".58">
                <circle cx="123" cy="127" r="32" /><circle cx="234" cy="86" r="36" /><circle cx="292" cy="183" r="39" />
                <circle cx="182" cy="220" r="43" /><circle cx="327" cy="245" r="30" />
              </g>
            </svg>

            <svg className="oak oak-right absolute -right-[5%] bottom-[25%] z-[13] h-[65%] w-[43%]" viewBox="0 0 440 620" aria-hidden="true">
              <g fill="none" strokeLinecap="round">
                <path d="M220 608C226 520 211 461 226 390C239 324 274 276 264 196" stroke="#4d6849" strokeWidth="24" />
                <path d="M232 411C274 366 329 342 365 301" stroke="#4d6849" strokeWidth="12" />
                <path d="M225 349C178 301 132 286 92 236" stroke="#4d6849" strokeWidth="13" />
                <path d="M262 258C303 228 326 198 351 152" stroke="#4d6849" strokeWidth="9" />
                <path d="M238 238C197 195 168 162 155 116" stroke="#4d6849" strokeWidth="10" />
              </g>
              <g fill="#153a28" opacity=".98">
                <circle cx="342" cy="167" r="72" /><circle cx="274" cy="122" r="91" /><circle cx="184" cy="116" r="86" />
                <circle cx="111" cy="179" r="81" /><circle cx="300" cy="235" r="89" /><circle cx="201" cy="218" r="102" />
                <circle cx="114" cy="262" r="67" />
              </g>
              <g fill="#2b573a" opacity=".54">
                <circle cx="314" cy="129" r="31" /><circle cx="207" cy="88" r="35" /><circle cx="145" cy="183" r="38" />
                <circle cx="260" cy="221" r="42" /><circle cx="111" cy="244" r="29" />
              </g>
            </svg>

            <div className="oak-label absolute bottom-[31%] left-1/2 z-[18] -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[.25em] text-[#b4d29e]/0 sm:text-[8px]">
              {copy.oak}
            </div>

            <div className="mora-core absolute left-1/2 top-[46%] z-[17] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b9d5a7]/0 sm:h-32 sm:w-32">
              <span className="absolute inset-[20%] rounded-full border border-[#b3d39f]/0" />
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8e9bd]/0 shadow-[0_0_45px_rgba(199,227,178,.0)]" />
            </div>

            <div className="absolute inset-x-4 bottom-4 z-40 sm:inset-x-5 sm:bottom-5">
              <div className="source-strip border border-white/[.07] bg-[#030907]/82 p-3 backdrop-blur-md sm:p-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/25 sm:text-[8px]">
                      <span>{copy.sourceLayer}</span>
                      <span>·</span>
                      <span>{data?.source ?? '—'}</span>
                      {selectedItem?.domain ? <><span>·</span><span>{selectedItem.domain}</span></> : null}
                      {selectedItem?.seenAt ? <><span>·</span><span>{formatSeen(selectedItem.seenAt, locale)}</span></> : null}
                    </div>
                    <div className="mt-2 max-w-3xl text-xs leading-5 text-white/48 sm:text-sm sm:leading-6">
                      {selectedItem ? selectedItem.title : (loading ? 'Scanning public signals…' : copy.empty)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setStabilized((value) => !value)}
                      className="border border-[#9fbe98]/14 bg-[#173124]/55 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-[#c9ddbf]/52 transition hover:border-[#b5d0ad]/28 hover:text-[#e3f0dc]/80 sm:text-[8px]"
                    >
                      {stabilized ? copy.release : copy.stabilize}
                    </button>
                    <button
                      type="button"
                      onClick={() => void load()}
                      disabled={loading}
                      className="border border-white/[.07] bg-black/30 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/36 transition hover:text-white/68 disabled:opacity-30 sm:text-[8px]"
                    >
                      {loading ? 'SCAN…' : copy.rescan}
                    </button>
                    {selectedItem ? (
                      <a
                        href={selectedItem.url}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-white/[.07] bg-black/30 px-3 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-white/36 transition hover:text-white/68 sm:text-[8px]"
                      >
                        SOURCE ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 flex flex-col gap-2 border-t border-white/[.05] pt-4 font-mono text-[7px] uppercase tracking-[.14em] text-white/20 sm:flex-row sm:items-center sm:justify-between sm:text-[8px]">
          <span>{copy.privacy}</span>
          <span>{data?.stats.signals ?? 0} SIGNALS · {data?.stats.sources ?? 0} SOURCES · {strongest}</span>
        </div>
      </main>

      <style jsx>{`
        .deep-black {
          background:
            radial-gradient(circle at 48% 42%, rgba(54,79,57,.055), transparent 19%),
            radial-gradient(circle at 16% 24%, rgba(111,67,55,.04), transparent 27%),
            #010504;
          transition: background 2.2s ease;
        }
        .deep-grid {
          opacity:.075;
          background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
          background-size:31px 31px;
          transform:perspective(900px) rotateX(64deg) scale(1.25) translateY(14%);
          transform-origin:center bottom;
          transition:opacity 1.8s ease,filter 1.8s ease;
        }
        .deep-scanlines { opacity:.22; background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(180,215,188,.025) 4px); mix-blend-mode:screen; }
        .deep-vignette { box-shadow:inset 0 0 180px 45px rgba(0,0,0,.82); }
        .deep-flash { background:rgba(217,225,208,.05); opacity:0; }
        .experience-shell { isolation:isolate; }
        .experience-shell::before { content:'';position:absolute;inset:0;z-index:5;pointer-events:none;background:linear-gradient(90deg,rgba(255,0,0,.018),transparent 18%,transparent 82%,rgba(0,170,255,.018));mix-blend-mode:screen; }
        .danger-field { z-index:2;background:radial-gradient(circle at 50% 43%,rgba(122,64,50,.085),transparent 18%),linear-gradient(180deg,#020504 0%,#030806 100%);transition:opacity 2s ease,background 2.6s ease; }
        .pixel-field { z-index:3;opacity:.52;background-image:linear-gradient(90deg,transparent 0 9%,rgba(180,196,180,.03) 9% 10%,transparent 10% 38%,rgba(184,118,101,.045) 38% 41%,transparent 41% 75%,rgba(141,185,154,.03) 75% 77%,transparent 77%),linear-gradient(0deg,transparent 0 13%,rgba(255,255,255,.025) 13% 14%,transparent 14% 63%,rgba(168,92,77,.035) 63% 66%,transparent 66%);background-size:137px 91px,173px 127px;mix-blend-mode:screen; }
        .signal-tear { z-index:24;background:linear-gradient(90deg,transparent,rgba(203,164,143,.22) 18%,rgba(255,255,255,.32) 49%,rgba(122,206,164,.18) 74%,transparent);opacity:.18;box-shadow:0 0 13px rgba(255,255,255,.08); }
        .signal-fragment { border-left:1px solid rgba(190,211,193,.07);padding-left:.65rem;filter:blur(.15px);opacity:.66;transition:opacity .4s ease,color .4s ease,transform .4s ease,filter .4s ease; }
        .signal-fragment:hover,.signal-fragment.is-selected { opacity:1;filter:none;transform:translateX(3px); }
        .signal-fragment.is-selected span:last-child { color:rgba(235,241,229,.62); }
        .forest-light { opacity:0;background:radial-gradient(circle at 50% 51%,rgba(164,208,120,.24),transparent 17%),radial-gradient(circle at 50% 64%,rgba(47,113,70,.35),transparent 45%),linear-gradient(180deg,rgba(9,30,18,.1),rgba(18,66,38,.72));transition:opacity 3.2s ease; }
        .mycelium,.oak,.oak-label,.mora-core { opacity:0; }
        .mycelium-lines path { stroke-width:2;stroke-opacity:.46;stroke-dasharray:1200;stroke-dashoffset:1200; }
        .mycelium-nodes circle { opacity:0; }

        .phase-dark .glitch-title { animation:titleGlitch 4.1s steps(1,end) infinite; }
        .phase-dark .pixel-field { animation:pixelDrift .28s steps(2,end) infinite; }
        .phase-dark .signal-tear-a { animation:tearA 2.2s steps(1,end) infinite; }
        .phase-dark .signal-tear-b { animation:tearB 3.15s steps(1,end) infinite; }
        .phase-dark .signal-tear-c { animation:tearC 2.7s steps(1,end) infinite; }
        .phase-dark .signal-fragment:nth-child(odd) { animation:fragmentJitter 2.6s steps(1,end) infinite; }
        .phase-dark .deep-flash { animation:flash 5.6s steps(1,end) infinite; }

        .phase-drift .danger-field { background:radial-gradient(circle at 50% 43%,rgba(142,66,47,.14),transparent 21%),radial-gradient(circle at 70% 70%,rgba(55,108,70,.07),transparent 30%),#020605; }
        .phase-drift .pixel-field { opacity:.72;animation:pixelDrift .2s steps(2,end) infinite; }
        .phase-drift .warning-copy { animation:warningReveal 4.8s steps(1,end) infinite; }
        .phase-drift .autonomous-chip { color:rgba(222,200,172,.7);border-color:rgba(195,150,117,.16); }
        .phase-drift .signal-fragment { animation:fragmentJitter 1.9s steps(1,end) infinite; }
        .phase-drift .glitch-title { animation:titleGlitch 2.8s steps(1,end) infinite; }
        .phase-drift .deep-flash { animation:flash 3.7s steps(1,end) infinite; }
        .phase-drift .signal-tear { opacity:.36;animation:tearB 2.1s steps(1,end) infinite; }

        .phase-forest .deep-black { background:radial-gradient(circle at 50% 52%,rgba(50,110,66,.16),transparent 29%),radial-gradient(circle at 50% 100%,rgba(26,82,48,.28),transparent 52%),#020907; }
        .phase-forest .deep-grid { opacity:.04;filter:hue-rotate(12deg); }
        .phase-forest .danger-field { opacity:.22;background:#07120c; }
        .phase-forest .pixel-field { opacity:.11;animation:none; }
        .phase-forest .signal-tear { opacity:.07; }
        .phase-forest .forest-light { opacity:1; }
        .phase-forest .mycelium { opacity:1;transition:opacity 1.2s ease .4s; }
        .phase-forest .mycelium-lines path { animation:growLine 3.6s cubic-bezier(.2,.78,.2,1) forwards; }
        .phase-forest .mycelium-lines path:nth-child(2){animation-delay:.35s}.phase-forest .mycelium-lines path:nth-child(3){animation-delay:.7s}.phase-forest .mycelium-lines path:nth-child(4){animation-delay:1.05s}.phase-forest .mycelium-lines path:nth-child(5){animation-delay:1.35s}.phase-forest .mycelium-lines path:nth-child(6){animation-delay:1.65s}
        .phase-forest .mycelium-nodes circle { animation:nodeBloom .8s ease forwards 2.3s; }
        .phase-forest .oak-left { animation:oakRise 3.2s cubic-bezier(.16,.84,.22,1) forwards 1.25s;transform-origin:50% 100%; }
        .phase-forest .oak-right { animation:oakRise 3.5s cubic-bezier(.16,.84,.22,1) forwards 1.55s;transform-origin:50% 100%; }
        .phase-forest .oak-label { animation:oakLabel 1.4s ease forwards 3.3s; }
        .phase-forest .mora-core { animation:coreAppear 2.5s ease forwards 2.7s; }
        .phase-forest .mora-core span:first-child { animation:coreRing 8s ease-in-out infinite 3s; }
        .phase-forest .mora-core span:last-child { animation:coreDot 5.4s ease-in-out infinite 3s; }
        .phase-forest .signal-fragment { animation:none;opacity:.28;filter:none; }
        .phase-forest .signal-fragment.is-selected,.phase-forest .signal-fragment:hover { opacity:.78; }
        .phase-forest .risk-chip { opacity:.35; }

        .is-stable .pixel-field,.is-stable .signal-tear,.is-stable .deep-scanlines { opacity:.015!important;animation:none!important; }
        .is-stable .glitch-title,.is-stable .signal-fragment,.is-stable .deep-flash { animation:none!important;filter:none!important; }
        .is-stable .signal-fragment { opacity:.48!important; }
        .is-stable .signal-fragment.is-selected { opacity:1!important; }
        .is-stable .warning-copy { display:none; }

        @keyframes titleGlitch {
          0%,84%,100%{transform:translate(0);text-shadow:none;clip-path:inset(0)}
          86%{transform:translate(-2px,1px);text-shadow:3px 0 rgba(116,205,160,.18),-3px 0 rgba(188,98,82,.16);clip-path:inset(11% 0 61% 0)}
          87%{transform:translate(3px,-1px);clip-path:inset(62% 0 9% 0)}
          88%{transform:translate(0);clip-path:inset(0)}
          94%{transform:translate(1px,0);text-shadow:-2px 0 rgba(188,98,82,.12)}
          95%{transform:translate(0);text-shadow:none}
        }
        @keyframes pixelDrift { 0%{transform:translate(0)}25%{transform:translate(2px,-1px)}50%{transform:translate(-1px,1px)}75%{transform:translate(1px,2px)}100%{transform:translate(0)} }
        @keyframes fragmentJitter { 0%,88%,100%{transform:translate(0)}89%{transform:translate(3px,-1px)}90%{transform:translate(-2px,1px)}91%{transform:translate(0)} }
        @keyframes tearA { 0%,86%,100%{transform:translateY(0) scaleX(1);opacity:.12}87%{transform:translateY(12px) scaleX(.72);opacity:.62}88%{transform:translateY(-6px) scaleX(1.13);opacity:.18} }
        @keyframes tearB { 0%,72%,100%{transform:translateY(0);opacity:.13}73%{transform:translateY(-19px);opacity:.48}74%{transform:translateY(7px);opacity:.23}75%{transform:translateY(0);opacity:.13} }
        @keyframes tearC { 0%,91%,100%{transform:translateY(0);opacity:.11}92%{transform:translateY(22px);opacity:.41}93%{transform:translateY(0);opacity:.11} }
        @keyframes flash { 0%,94%,100%{opacity:0}95%{opacity:.09}96%{opacity:0}97%{opacity:.035}98%{opacity:0} }
        @keyframes warningReveal { 0%,58%,100%{color:rgba(200,161,138,0);filter:blur(4px)}59%,62%{color:rgba(200,161,138,.38);filter:blur(.2px)}63%{color:rgba(200,161,138,0)} }
        @keyframes growLine { to{stroke-dashoffset:0} }
        @keyframes nodeBloom { from{opacity:0;transform:scale(.2)} to{opacity:.72;transform:scale(1)} }
        @keyframes oakRise { 0%{opacity:0;transform:translateY(8%) scaleY(.88);filter:blur(4px)}100%{opacity:.92;transform:translateY(0) scaleY(1);filter:blur(0)} }
        @keyframes oakLabel { to{color:rgba(180,210,158,.52)} }
        @keyframes coreAppear { 0%{opacity:0;border-color:rgba(185,213,167,0)}100%{opacity:1;border-color:rgba(185,213,167,.12)} }
        @keyframes coreRing { 0%,100%{border-color:rgba(179,211,159,.09);transform:scale(.86)}50%{border-color:rgba(179,211,159,.31);transform:scale(1.08)} }
        @keyframes coreDot { 0%,100%{background:rgba(216,233,189,.28);box-shadow:0 0 22px rgba(199,227,178,.16)}50%{background:rgba(226,240,205,.9);box-shadow:0 0 58px rgba(199,227,178,.58)} }

        @media(max-width:700px){
          .signal-fragment{max-width:62%!important}.f-2,.f-4,.f-6{right:4%!important}.f-3,.f-5{left:5%!important}.oak-left{left:-18%!important;width:64%!important}.oak-right{right:-20%!important;width:62%!important}.oak-label{bottom:34%!important}.mora-core{top:48%!important}
        }
        @media(prefers-reduced-motion:reduce){
          .glitch-title,.pixel-field,.signal-tear,.signal-fragment,.deep-flash,.warning-copy,.mycelium-lines path,.mycelium-nodes circle,.oak,.oak-label,.mora-core,.mora-core span{animation:none!important}
          .forest-light,.mycelium,.oak,.mora-core{opacity:1!important}.mycelium-lines path{stroke-dashoffset:0!important}.mycelium-nodes circle{opacity:.6!important}.oak-label{color:rgba(180,210,158,.52)!important}
        }
      `}</style>
    </div>
  );
}
