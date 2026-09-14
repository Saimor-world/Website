'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, CircleUserRound, Clock3, Radio, RefreshCw, Trophy, WalletCards } from 'lucide-react';

type Fixture = {
  id: number;
  kickoff?: string;
  status: 'LIVE' | 'FT' | 'SCHEDULED';
  finished: boolean;
  matchday: number;
  home: { id?: number; name: string; short: string };
  away: { id?: number; name: string; short: string };
  score: { home: number; away: number };
  goals: Array<{ id: string; minute: number | null; scorer: string; scoreHome: number | null; scoreAway: number | null }>;
};

type Feed = {
  provider: string;
  league: string;
  season: string;
  matchday?: number;
  updatedAt: string;
  fixtures: Fixture[];
  error?: string;
};

type Position = {
  id: string;
  fixtureId: number;
  label: string;
  outcome: string;
  stake: number;
  probability: number;
  potentialReturn: number;
  createdAt: string;
};

const STORAGE_BALANCE = 'matchmarket-demo-balance-v1';
const STORAGE_POSITIONS = 'matchmarket-demo-positions-v1';

function clamp(value: number, min = 0.04, max = 0.92) {
  return Math.max(min, Math.min(max, value));
}

function minutesPlayed(fixture: Fixture) {
  if (fixture.status === 'FT') return 90;
  if (fixture.status !== 'LIVE' || !fixture.kickoff) return 0;
  const started = new Date(fixture.kickoff).getTime();
  return Math.max(1, Math.min(90, Math.floor((Date.now() - started) / 60000)));
}

function threeWay(fixture: Fixture) {
  const minute = minutesPlayed(fixture);
  const diff = fixture.score.home - fixture.score.away;
  const pressure = minute / 90;

  let home = 0.38 + diff * (0.16 + pressure * 0.2);
  let draw = 0.27 - Math.abs(diff) * (0.07 + pressure * 0.08);
  let away = 0.35 - diff * (0.16 + pressure * 0.2);

  if (fixture.status === 'FT') {
    home = diff > 0 ? 0.99 : 0.005;
    draw = diff === 0 ? 0.99 : 0.005;
    away = diff < 0 ? 0.99 : 0.005;
  }

  home = clamp(home, 0.005, 0.99);
  draw = clamp(draw, 0.005, 0.99);
  away = clamp(away, 0.005, 0.99);
  const total = home + draw + away;
  return { home: home / total, draw: draw / total, away: away / total };
}

function over25(fixture: Fixture) {
  const minute = minutesPlayed(fixture);
  const goals = fixture.score.home + fixture.score.away;
  if (fixture.status === 'FT') return goals > 2 ? 0.99 : 0.01;
  let probability = 0.5 + (goals - 1) * 0.14 - (minute / 90) * 0.16;
  if (goals >= 3) probability = 0.98;
  return clamp(probability, 0.06, 0.96);
}

function money(value: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

function kickOffLabel(fixture: Fixture) {
  if (fixture.status === 'LIVE') return `${minutesPlayed(fixture)}'`;
  if (fixture.status === 'FT') return 'Ende';
  if (!fixture.kickoff) return '–';
  return new Intl.DateTimeFormat('de-DE', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(fixture.kickoff));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function MatchMarketClient() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [loading, setLoading] = useState(true);
  const [stale, setStale] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tab, setTab] = useState<'today' | 'portfolio' | 'profile'>('today');
  const [balance, setBalance] = useState(100);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const storedBalance = Number(localStorage.getItem(STORAGE_BALANCE));
    if (Number.isFinite(storedBalance) && storedBalance >= 0) setBalance(storedBalance);
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_POSITIONS) || '[]');
      if (Array.isArray(stored)) setPositions(stored);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_BALANCE, String(balance));
    localStorage.setItem(STORAGE_POSITIONS, JSON.stringify(positions));
  }, [balance, positions]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      try {
        const response = await fetch('/api/matchmarket/live', { cache: 'no-store' });
        const data = (await response.json()) as Feed;
        if (cancelled) return;
        if (!response.ok || data.error) {
          setStale(true);
        } else {
          setFeed(data);
          setStale(false);
          if (selectedId === null && data.fixtures.length) {
            const priority = data.fixtures.find((f) => f.status === 'LIVE') ||
              data.fixtures.find((f) => /stuttgart/i.test(`${f.home.name} ${f.away.name}`)) || data.fixtures[0];
            setSelectedId(priority.id);
          }
        }
      } catch {
        if (!cancelled) setStale(true);
      } finally {
        if (!cancelled) {
          setLoading(false);
          const hasLive = feed?.fixtures?.some((fixture) => fixture.status === 'LIVE');
          timer = setTimeout(load, hasLive ? 15000 : 60000);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [selectedId]);

  const fixtures = feed?.fixtures || [];
  const selected = fixtures.find((fixture) => fixture.id === selectedId) || fixtures[0];
  const prices = useMemo(() => (selected ? threeWay(selected) : null), [selected, feed?.updatedAt]);
  const over = useMemo(() => (selected ? over25(selected) : 0.5), [selected, feed?.updatedAt]);
  const deployed = positions.reduce((sum, position) => sum + position.stake, 0);

  function buy(label: string, outcome: string, probability: number, fixture: Fixture) {
    if (fixture.status === 'FT') return;
    const requested = window.prompt(`Einsatz für ${outcome} (Demo-€)`, '10');
    if (requested === null) return;
    const stake = Number(requested.replace(',', '.'));
    if (!Number.isFinite(stake) || stake <= 0 || stake > balance) return;
    const safeProbability = clamp(probability, 0.01, 0.99);
    const potentialReturn = stake / safeProbability;
    const position: Position = {
      id: crypto.randomUUID(),
      fixtureId: fixture.id,
      label,
      outcome,
      stake,
      probability: safeProbability,
      potentialReturn,
      createdAt: new Date().toISOString(),
    };
    setBalance((value) => Math.round((value - stake) * 100) / 100);
    setPositions((value) => [position, ...value]);
  }

  function resetDemo() {
    setBalance(100);
    setPositions([]);
  }

  return (
    <div className="min-h-screen bg-[#080b0d] text-[#f4f6f5] selection:bg-emerald-300/30">
      <div className="mx-auto min-h-screen max-w-6xl border-x border-white/[0.06] bg-[radial-gradient(circle_at_top,_rgba(31,91,73,.22),_transparent_38%)]">
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#080b0d]/90 px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.23em] text-emerald-300/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
                MatchMarket
              </div>
              <div className="mt-0.5 text-xs text-white/45">Bundesliga Prediction Exchange</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold tabular-nums">{money(balance)}</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-amber-200/65">Simulation · kein Echtgeld</div>
            </div>
          </div>
        </header>

        <main className="px-4 pb-28 pt-5 md:px-8">
          {tab === 'today' && (
            <>
              <section className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/35">Bundesliga {feed?.season || '2026/27'}</div>
                  <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Spieltag {feed?.matchday ?? '–'}</h1>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/50">
                  <Radio className={`h-3.5 w-3.5 ${stale ? 'text-amber-300' : 'text-emerald-300'}`} />
                  {stale ? 'Feed verzögert' : feed ? `Live · ${feed.provider}` : 'Verbinde…'}
                </div>
              </section>

              {loading && !feed && (
                <div className="flex min-h-72 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.025]">
                  <RefreshCw className="h-6 w-6 animate-spin text-white/35" />
                </div>
              )}

              {!loading && !feed && (
                <div className="rounded-3xl border border-amber-200/15 bg-amber-100/[0.04] p-6 text-sm text-amber-100/75">
                  Der Livefeed ist gerade nicht erreichbar. Es werden bewusst keine erfundenen Spieldaten angezeigt.
                </div>
              )}

              {feed && (
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
                  <section className="space-y-2">
                    {fixtures.map((fixture) => {
                      const active = selected?.id === fixture.id;
                      const isStuttgart = /stuttgart/i.test(`${fixture.home.name} ${fixture.away.name}`);
                      return (
                        <button
                          key={fixture.id}
                          onClick={() => setSelectedId(fixture.id)}
                          className={`w-full rounded-2xl border p-4 text-left transition ${active ? 'border-emerald-300/30 bg-emerald-100/[0.07]' : 'border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.045]'} ${isStuttgart ? 'ring-1 ring-white/[0.04]' : ''}`}
                        >
                          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.15em]">
                            <span className={fixture.status === 'LIVE' ? 'text-emerald-300' : 'text-white/35'}>{fixture.status === 'LIVE' ? '● Live' : kickOffLabel(fixture)}</span>
                            {isStuttgart && <span className="text-white/35">Fokus</span>}
                          </div>
                          <div className="grid grid-cols-[1fr_auto] items-center gap-3 text-sm">
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-2.5"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold">{initials(fixture.home.short)}</span><span>{fixture.home.short}</span></div>
                              <div className="flex items-center gap-2.5"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold">{initials(fixture.away.short)}</span><span>{fixture.away.short}</span></div>
                            </div>
                            <div className="space-y-1 text-right text-xl font-semibold tabular-nums">
                              <div>{fixture.score.home}</div><div>{fixture.score.away}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </section>

                  {selected && prices && (
                    <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101517] shadow-2xl shadow-black/20">
                      <div className="border-b border-white/[0.07] p-5 md:p-7">
                        <div className="mb-5 flex items-center justify-between">
                          <div className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${selected.status === 'LIVE' ? 'bg-emerald-300/10 text-emerald-300' : 'bg-white/5 text-white/45'}`}>
                            {selected.status === 'LIVE' ? `Live · ${kickOffLabel(selected)}` : selected.status === 'FT' ? 'Abgeschlossen' : kickOffLabel(selected)}
                          </div>
                          <span className="text-[10px] text-white/30">Marktpreise: Simulation</span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                          <div><div className="text-sm text-white/55">{selected.home.short}</div><div className="mt-2 text-5xl font-semibold tabular-nums tracking-[-0.06em]">{selected.score.home}</div></div>
                          <div className="text-xs text-white/20">:</div>
                          <div className="text-right"><div className="text-sm text-white/55">{selected.away.short}</div><div className="mt-2 text-5xl font-semibold tabular-nums tracking-[-0.06em]">{selected.score.away}</div></div>
                        </div>
                      </div>

                      <div className="p-5 md:p-7">
                        <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-medium">Wer gewinnt?</h2><span className="text-[10px] uppercase tracking-[0.14em] text-white/25">Live model</span></div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            ['Heim', selected.home.short, prices.home],
                            ['X', 'Remis', prices.draw],
                            ['Auswärts', selected.away.short, prices.away],
                          ].map(([outcome, name, raw]) => {
                            const probability = Number(raw);
                            return (
                              <button key={String(outcome)} disabled={selected.status === 'FT'} onClick={() => buy(`${selected.home.short} – ${selected.away.short}`, String(outcome), probability, selected)} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 text-left transition hover:border-emerald-300/25 hover:bg-emerald-200/[0.05] disabled:opacity-45">
                                <div className="truncate text-[11px] text-white/40">{name}</div>
                                <div className="mt-3 text-2xl font-semibold tabular-nums">{Math.round(probability * 100)}%</div>
                                <div className="mt-1 text-xs text-emerald-200/55">Quote {(1 / probability).toFixed(2)}</div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/15 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div><div className="text-sm">Über 2,5 Tore?</div><div className="mt-1 text-xs text-white/35">Settlement aus Live-Spielstand</div></div>
                            <div className="text-right"><div className="text-2xl font-semibold tabular-nums">{Math.round(over * 100)}%</div><div className="text-[10px] text-white/30">YES</div></div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <button disabled={selected.status === 'FT'} onClick={() => buy('Über 2,5 Tore', 'YES', over, selected)} className="rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-[#07110d] disabled:opacity-40">YES · {(1 / over).toFixed(2)}</button>
                            <button disabled={selected.status === 'FT'} onClick={() => buy('Über 2,5 Tore', 'NO', 1 - over, selected)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold disabled:opacity-40">NO · {(1 / (1 - over)).toFixed(2)}</button>
                          </div>
                        </div>

                        <div className="mt-5 border-t border-white/[0.06] pt-4">
                          <div className="mb-3 flex items-center gap-2 text-xs text-white/35"><Activity className="h-3.5 w-3.5" /> Live-Ereignisse</div>
                          {selected.goals.length ? (
                            <div className="space-y-2">
                              {[...selected.goals].reverse().map((goal) => <div key={goal.id} className="flex items-center justify-between text-sm"><span>{goal.scorer}</span><span className="text-white/40">{goal.minute ? `${goal.minute}' · ` : ''}{goal.scoreHome}:{goal.scoreAway}</span></div>)}
                            </div>
                          ) : <div className="text-sm text-white/25">Noch keine Tore im Feed.</div>}
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              )}
            </>
          )}

          {tab === 'portfolio' && (
            <section>
              <div className="flex items-end justify-between"><div><div className="text-xs uppercase tracking-[0.16em] text-white/35">Demo Portfolio</div><h1 className="mt-1 text-4xl font-semibold tracking-[-0.05em]">{money(balance)}</h1></div><button onClick={resetDemo} className="text-xs text-white/35 underline decoration-white/15 underline-offset-4">Zurücksetzen</button></div>
              <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="text-xs text-white/35">Eingesetzt</div><div className="mt-2 text-2xl font-semibold">{money(deployed)}</div></div><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="text-xs text-white/35">Positionen</div><div className="mt-2 text-2xl font-semibold">{positions.length}</div></div></div>
              <div className="mt-6 space-y-2">{positions.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-white/30">Noch keine Positionen.</div> : positions.map((position) => <div key={position.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex items-start justify-between gap-4"><div><div className="text-sm font-medium">{position.label}</div><div className="mt-1 text-xs text-white/35">{position.outcome} · Einstieg {Math.round(position.probability * 100)}%</div></div><div className="text-right"><div className="text-sm font-semibold">{money(position.stake)}</div><div className="mt-1 text-xs text-emerald-200/55">max. {money(position.potentialReturn)}</div></div></div></div>)}</div>
            </section>
          )}

          {tab === 'profile' && (
            <section>
              <div className="text-xs uppercase tracking-[0.16em] text-white/35">Forecast Identity</div><h1 className="mt-1 text-4xl font-semibold tracking-[-0.05em]">Rating 500</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/45">Der Skill-Score wird erst nach echten Settlements aussagekräftig. Später trennen wir Forecast-Qualität per Brier Score strikt vom Demo-P&L.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><Trophy className="h-5 w-5 text-amber-200/70" /><div className="mt-5 text-xs text-white/35">Settled Predictions</div><div className="mt-1 text-3xl font-semibold">0</div></div><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><BarChart3 className="h-5 w-5 text-emerald-200/70" /><div className="mt-5 text-xs text-white/35">Brier Score</div><div className="mt-1 text-3xl font-semibold">–</div></div></div>
            </section>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[10px] text-white/25"><span>Live-Spielstände: OpenLigaDB</span><span>{feed?.updatedAt ? `Stand ${new Date(feed.updatedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : 'Kein Feed'}</span></div>
        </main>

        <nav className="fixed bottom-4 left-1/2 z-40 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 grid-cols-3 rounded-2xl border border-white/10 bg-[#111719]/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {[{ id: 'today', label: 'Märkte', icon: Clock3 }, { id: 'portfolio', label: 'Portfolio', icon: WalletCards }, { id: 'profile', label: 'Profil', icon: CircleUserRound }].map((item) => { const Icon = item.icon; const active = tab === item.id; return <button key={item.id} onClick={() => setTab(item.id as typeof tab)} className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] transition ${active ? 'bg-white/[0.07] text-white' : 'text-white/35'}`}><Icon className="h-4 w-4" />{item.label}</button>; })}
        </nav>
      </div>
    </div>
  );
}
