'use client';

/**
 * Orbit v2 · Contract v2 ext rendering (owner-only, read-only, no controls).
 * Renders core levels, trailing, FUZZY, meme positions and breakout comets
 * from the bot status `ext`. Renders nothing when ext is absent.
 */

type Num = number | null | undefined;
type Levels = Record<string, Num>;
type Position = {
  qty?: Num;
  entry?: Num;
  last_price?: Num;
  cost_xrp?: Num;
  value_xrp?: Num;
  realized_xrp?: Num;
  levels?: Levels;
};
export type FinanceExt = {
  v: number;
  mode?: string;
  xrp_usd?: Num;
  core?: {
    xrp?: Num;
    levels?: Record<string, { usd?: Num; sell_xrp?: Num; done?: boolean; armed?: boolean; arm_above_usd?: Num; pct?: Num; trigger_usd?: Num }>;
  };
  fuzzy?: Position;
  memes?: Record<string, Position>;
  breakouts?: { enabled?: boolean; watchlist?: Num; open?: Record<string, any>; closed?: any[] };
  total?: { equity_xrp?: Num; equity_usd?: Num; pnl_xrp?: Num };
};

export const STALE_AFTER_S = 600;

const ok = (v: Num): v is number => typeof v === 'number' && Number.isFinite(v);
const de = (v: Num, d = 4) =>
  ok(v) ? v.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—';
/** Small meme prices: significant digits instead of fixed decimals. */
const px = (v: Num) =>
  !ok(v) ? '—' : v >= 0.01 ? de(v, 4) : v.toLocaleString('de-DE', { maximumSignificantDigits: 4 });
const sgn = (v: Num, d = 3) => (!ok(v) ? '—' : (v >= 0 ? '+' : '−') + de(Math.abs(v), d));

const MINT = '#91dec7';
const GOLD = '#e0bd67';
const COPPER = '#e6a77a';

const LADDER_LABEL: Record<string, string> = {
  stop: 'Stopp',
  entry: 'Einstieg',
  add: 'Nachkauf',
  arm_trail_breakeven: 'Trail scharf',
  tp1_20pct: 'TP1',
  tp2_20pct: 'TP2',
  tp3_20pct: 'TP3',
};

function Ladder({ pos }: { pos: Position }) {
  const lv = pos.levels || {};
  const marks = Object.entries(LADDER_LABEL)
    .map(([k, label]) => ({ k, label, v: lv[k] }))
    .filter((m): m is { k: string; label: string; v: number } => ok(m.v) && m.v > 0);
  const last = ok(pos.last_price) && pos.last_price > 0 ? pos.last_price : null;
  const all = [...marks.map((m) => m.v), ...(last ? [last] : [])];
  if (!all.length) return null;
  const lo = Math.log(Math.min(...all) * 0.92);
  const hi = Math.log(Math.max(...all) * 1.08);
  const X = (v: number) => 4 + ((Math.log(v) - lo) / (hi - lo || 1)) * 312;
  const color = (k: string) => (k === 'stop' ? COPPER : k.startsWith('tp') ? MINT : k === 'entry' ? '#F7F4E9' : GOLD);
  return (
    <svg viewBox="0 0 320 54" className="w-full" role="img" aria-label="Preisleiter">
      <line x1="4" x2="316" y1="22" y2="22" stroke="rgba(255,255,255,.18)" />
      {marks.map((m, i) => (
        <g key={m.k}>
          <line x1={X(m.v)} x2={X(m.v)} y1="14" y2="30" stroke={color(m.k)} strokeWidth="1.4" />
          <text x={X(m.v)} y={i % 2 ? 44 : 10} textAnchor="middle" fontSize="7" fill={color(m.k)} fontFamily="monospace">
            {m.label}
          </text>
        </g>
      ))}
      {last && (
        <g>
          <circle cx={X(last)} cy="22" r="4.5" fill={MINT} opacity=".25" />
          <circle cx={X(last)} cy="22" r="2.4" fill="#fffdf2" />
          <text x={X(last)} y="52" textAnchor="middle" fontSize="7" fill="#fffdf2" fontFamily="monospace">
            jetzt
          </text>
        </g>
      )}
    </svg>
  );
}

function PositionCard({ name, pos }: { name: string; pos: Position }) {
  const lv = pos.levels || {};
  const pnl = ok(pos.value_xrp) && ok(pos.cost_xrp) ? pos.value_xrp - pos.cost_xrp + (ok(pos.realized_xrp) ? pos.realized_xrp : 0) : null;
  const tps = ['tp1_20pct', 'tp2_20pct', 'tp3_20pct'].map((k) => px(lv[k])).join(' · ');
  return (
    <article className="border border-white/10 bg-white/[0.02] p-4" data-testid={`pos-${name}`}>
      <header className="flex items-baseline justify-between">
        <h3 className="font-serif text-2xl" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{name}</h3>
        <span className={`font-mono text-xs ${pnl == null ? 'text-white/40' : pnl >= 0 ? 'text-[#91dec7]' : 'text-[#e6a77a]'}`}>
          {pnl == null ? '—' : `${sgn(pnl)} XRP`}
        </span>
      </header>
      <Ladder pos={pos} />
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] text-white/60">
        <dt className="text-white/35">Einstieg</dt><dd className="text-right">{px(pos.entry ?? lv.entry)}</dd>
        <dt className="text-white/35">Stopp</dt><dd className="text-right text-[#e6a77a]">{px(lv.stop)}</dd>
        <dt className="text-white/35">TP</dt><dd className="text-right text-[#91dec7]">{tps}</dd>
        <dt className="text-white/35">Kurs</dt><dd className="text-right">{px(pos.last_price)}</dd>
        {ok(pos.value_xrp) && (<><dt className="text-white/35">Wert</dt><dd className="text-right">{de(pos.value_xrp, 3)} XRP</dd></>)}
        {ok(lv.trail_pct) && (<><dt className="text-white/35">Trail</dt><dd className="text-right">{de(lv.trail_pct, 0)} %</dd></>)}
      </dl>
    </article>
  );
}

/** Core tiers as orbit rings, current XRP/USD as moon, breakouts as comets. */
function CoreOrbit({ ext }: { ext: FinanceExt }) {
  const levels = ext.core?.levels || {};
  const tiers = Object.entries(levels)
    .filter(([k, t]) => k !== 'trailing' && ok(t?.usd))
    .map(([k, t]) => ({ k, usd: t.usd as number, done: Boolean(t.done), sell: t.sell_xrp }))
    .sort((a, b) => a.usd - b.usd);
  const trail = levels.trailing;
  const usd = ok(ext.xrp_usd) ? ext.xrp_usd : null;
  const maxUsd = Math.max(20, ...tiers.map((t) => t.usd), usd || 0);
  const minUsd = Math.min(0.5, usd || 0.5);
  const R = (v: number) => 30 + ((Math.log(v) - Math.log(minUsd)) / (Math.log(maxUsd * 1.1) - Math.log(minUsd))) * 150;
  const C = 200;
  const comets = Object.entries(ext.breakouts?.open || {});
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-[460px]" role="img" aria-label="Kern-Orbit">
      <defs>
        <radialGradient id="ext-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(227,188,99,.45)" />
          <stop offset="100%" stopColor="rgba(214,168,72,0)" />
        </radialGradient>
        <linearGradient id="ext-tail" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(145,222,199,0)" />
          <stop offset="100%" stopColor="rgba(145,222,199,.9)" />
        </linearGradient>
      </defs>
      <circle cx={C} cy={C} r="60" fill="url(#ext-core)" />
      <image href="/owner/finance/sigil.png" x={C - 22} y={C - 22} width="44" height="44" style={{ clipPath: 'circle(50%)' }} />
      {tiers.map((t, i) => (
        <g key={t.k} data-testid={`tier-${t.usd}`}>
          <ellipse cx={C} cy={C} rx={R(t.usd)} ry={R(t.usd) * 0.42}
            fill="none" stroke={t.done ? GOLD : 'rgba(224,189,103,.45)'} strokeWidth={t.done ? 2 : 1} />
          <text x={C + R(t.usd) - 2} y={C - R(t.usd) * 0.42 - 4 - (i % 2) * 8} textAnchor="end" fontSize="9" fill={GOLD} fontFamily="monospace">
            ${de(t.usd, 0)}{t.done ? ' ✓' : ''}{ok(t.sell) ? ` · ${de(t.sell, 2)} XRP` : ''}
          </text>
        </g>
      ))}
      {trail && ok(trail.trigger_usd) && trail.armed && (
        <ellipse cx={C} cy={C} rx={R(trail.trigger_usd)} ry={R(trail.trigger_usd) * 0.42}
          fill="none" stroke={COPPER} strokeDasharray="5 5" strokeWidth="1.4" />
      )}
      {usd && (
        <g data-testid="moon">
          <circle cx={C + R(usd)} cy={C} r="9" fill="rgba(145,222,199,.2)" />
          <circle cx={C + R(usd)} cy={C} r="4.5" fill={MINT} />
          <text x={C + R(usd)} y={C + 20} textAnchor="middle" fontSize="9" fill={MINT} fontFamily="monospace">
            XRP ${de(usd, 3)}
          </text>
        </g>
      )}
      {comets.map(([sym, b], i) => {
        const a = -0.6 + i * 1.3;
        const r = 120 + (i % 3) * 22;
        const x = C + r * Math.cos(a);
        const y = C + r * 0.42 * Math.sin(a) - 30;
        const chg = ok(b?.change_pct) ? b.change_pct : ok(b?.pnl_pct) ? b.pnl_pct : null;
        return (
          <g key={sym} data-testid={`comet-${sym}`} transform={`rotate(${-25 + i * 14} ${x} ${y})`}>
            <path d={`M${x - 46},${y} Q${x - 20},${y - 3} ${x},${y}`} stroke="url(#ext-tail)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx={x} cy={y} r="3.6" fill="#fffdf2" />
            <text x={x + 6} y={y - 6} fontSize="9" fill={MINT} fontFamily="monospace">
              {sym}{chg != null ? ` ${sgn(chg, 1)}%` : ''}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ExtOrbit({ ext, ts, ageS }: { ext: FinanceExt | null | undefined; ts: string | null; ageS: number | null }) {
  if (!ext || typeof ext !== 'object' || typeof ext.v !== 'number') return null;
  const stale = ageS != null && ageS > STALE_AFTER_S;
  const trail = ext.core?.levels?.trailing;
  const memes = Object.entries(ext.memes || {});
  const comets = Object.keys(ext.breakouts?.open || {}).length;
  return (
    <section className="space-y-6 px-[5vw] py-10" aria-label="Bot-Status (ext)" data-testid="ext-orbit">
      {stale && (
        <div role="status" data-testid="stale" className="border border-[#e6a77a]/60 bg-[#e6a77a]/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#e6a77a]">
          Bot-Status älter als 10 Min · letzter Stand {ts ? new Date(ts).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }) : '—'} (Berlin)
        </div>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-white/10 pt-5">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Kern · Stufen · Kometen</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          ext v{ext.v} · {ext.mode || '—'}
          {ok(ext.total?.equity_xrp) ? ` · Gesamt ${de(ext.total!.equity_xrp, 3)} XRP` : ''}
          {ok(ext.total?.pnl_xrp) ? ` · ${sgn(ext.total!.pnl_xrp)} XRP` : ''}
        </span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <CoreOrbit ext={ext} />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
            {trail
              ? trail.armed
                ? `Trailing scharf · ${de(trail.pct, 0)} % · Auslöser $${de(trail.trigger_usd, 3)}`
                : `Trailing ab $${de(trail.arm_above_usd, 0)} · ${de(trail.pct, 0)} %`
              : 'Trailing —'}
            {' · '}
            {comets ? `${comets} Breakout-Kometen` : `keine offenen Breakouts · Watchlist ${de(ext.breakouts?.watchlist, 0)}`}
          </p>
        </div>
        <div className="grid content-start gap-4">
          {ext.fuzzy && <PositionCard name="FUZZY" pos={ext.fuzzy} />}
          {memes.map(([name, pos]) => (
            <PositionCard key={name} name={name} pos={pos} />
          ))}
        </div>
      </div>
    </section>
  );
}
