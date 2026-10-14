import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const XRPL_HTTP = 'https://xrplcluster.com';
const RLUSD_CURRENCY = '524C555344000000000000000000000000000000';
const RLUSD_ISSUER = 'rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De';

/** Public observation params (no secrets). Orbit v2 display defaults. */
const OBS = {
  starting_xrp: 10,
  grid_step_pct: 0.5,
  trade_xrp: 2,
  max_trades_per_day: 20,
  /** When null/undefined, UI shows "unbekannt". */
  hard_stop_loss_xrp: 3.0 as number | null,
  currency_label: 'RLUSD',
};

async function xrpl(method: string, params: Record<string, unknown>) {
  const res = await fetch(XRPL_HTTP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method, params: [params] }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`xrpl http ${res.status}`);
  const json = await res.json();
  if (json.result?.status === 'error' || json.error) {
    throw new Error(json.result?.error_message || json.error_message || json.error || 'xrpl error');
  }
  return json.result;
}

function isIOU(a: unknown): a is { currency: string; issuer: string; value: string } {
  return Boolean(a && typeof a === 'object' && 'currency' in (a as object));
}
function xrpOf(a: unknown) {
  if (typeof a === 'string' || typeof a === 'number') return Number(a) / 1e6;
  return 0;
}
function isRlusd(a: unknown) {
  return isIOU(a) && (a.currency === RLUSD_CURRENCY || a.currency === 'RLUSD') && a.issuer === RLUSD_ISSUER;
}

type Trade = {
  kind: string;
  title: string;
  detail: string;
  date: string | null;
  xrp: number | null;
  rlusd: number | null;
  price: number | null;
  hash?: string;
};

function classifyPayment(t: any, meta: any, wallet: string): Trade {
  const acct = t.Account || '';
  const dest = t.Destination || '';
  const self = acct === wallet && dest === wallet;
  const amount = meta?.delivered_amount || meta?.DeliveredAmount || t.Amount;
  const sendMax = t.SendMax;
  const date =
    t.date != null ? new Date((t.date + 946684800) * 1000).toISOString() : null;

  if (t.TransactionType === 'TrustSet') {
    return { kind: 'trust', title: 'TrustLine', detail: 'RLUSD', date, xrp: null, rlusd: null, price: null };
  }
  if (t.TransactionType !== 'Payment') {
    return { kind: 'other', title: t.TransactionType || 'Tx', detail: '', date, xrp: null, rlusd: null, price: null };
  }
  if (!self) {
    if (dest === wallet && (typeof amount === 'string' || typeof amount === 'number')) {
      return { kind: 'fund', title: 'Zufluss', detail: `${xrpOf(amount).toFixed(3)} XRP`, date, xrp: xrpOf(amount), rlusd: null, price: null };
    }
    return { kind: 'other', title: 'Payment', detail: '', date, xrp: null, rlusd: null, price: null };
  }
  // XRP gekauft: delivered XRP, SendMax RLUSD
  if ((typeof amount === 'string' || typeof amount === 'number') && isRlusd(sendMax)) {
    const xrp = xrpOf(amount);
    const tok = Number(sendMax.value);
    const px = tok > 0 ? xrp / tok : null;
    return {
      kind: 'buy',
      title: 'XRP gekauft',
      detail: `${xrp.toFixed(3)} XRP · ${tok.toFixed(3)} RLUSD` + (px != null ? ` · @${px.toFixed(6)}` : ''),
      date,
      xrp,
      rlusd: tok,
      price: px,
    };
  }
  // XRP verkauft: delivered RLUSD, SendMax XRP
  if (isRlusd(amount) && (typeof sendMax === 'string' || typeof sendMax === 'number')) {
    const tok = Number(amount.value);
    const xrp = xrpOf(sendMax);
    const px = tok > 0 ? xrp / tok : null;
    return {
      kind: 'sell',
      title: 'XRP verkauft',
      detail: `${xrp.toFixed(3)} XRP · ${tok.toFixed(3)} RLUSD` + (px != null ? ` · @${px.toFixed(6)}` : ''),
      date,
      xrp,
      rlusd: tok,
      price: px,
    };
  }
  return { kind: 'self', title: 'Umschichtung', detail: '', date, xrp: null, rlusd: null, price: null };
}

/** Pair sell → buy-back into rounds with PnL in XRP. */
function buildRounds(tradesNewestFirst: Trade[]) {
  const chrono = [...tradesNewestFirst].reverse();
  const rounds: Array<{
    id: string;
    sell: Trade;
    buy: Trade;
    pnl_xrp: number;
    sell_price: number | null;
    buy_price: number | null;
    closed_at: string | null;
  }> = [];
  let openSell: Trade | null = null;
  for (const t of chrono) {
    if (t.kind === 'sell' && t.xrp != null) {
      openSell = t;
      continue;
    }
    if (t.kind === 'buy' && t.xrp != null && openSell) {
      const pnl = t.xrp - (openSell.xrp || 0);
      rounds.push({
        id: `${openSell.hash || 's'}-${t.hash || 'b'}`,
        sell: openSell,
        buy: t,
        pnl_xrp: pnl,
        sell_price: openSell.price,
        buy_price: t.price,
        closed_at: t.date,
      });
      openSell = null;
    }
  }
  return rounds.reverse(); // newest first
}

function berlinDay(iso: string | null): string | null {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

function buildEquityCurve(
  roundsOldestFirst: ReturnType<typeof buildRounds> extends (infer R)[] ? R[] : never,
  starting: number,
  liveEquity: number,
) {
  const chrono = [...roundsOldestFirst].reverse();
  const byDay = new Map<string, number>();
  let eq = starting;
  byDay.set('start', starting);
  for (const r of chrono) {
    eq += r.pnl_xrp;
    const d = berlinDay(r.closed_at) || 'unknown';
    byDay.set(d, eq);
  }
  const points = Array.from(byDay.entries())
    .filter(([k]) => k !== 'start')
    .map(([day, equity]) => ({ day, equity }));
  points.sort((a, b) => a.day.localeCompare(b.day));
  const today = berlinDay(new Date().toISOString())!;
  if (!points.length || points[points.length - 1].day !== today) {
    points.push({ day: today, equity: liveEquity });
  } else {
    points[points.length - 1] = { day: today, equity: liveEquity };
  }
  return [{ day: 'start', equity: starting }, ...points];
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'owner') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const wallet = (process.env.FINANCE_TRADER_WALLET || '').trim();
  if (!wallet) {
    return NextResponse.json(
      { error: 'missing_env', message: 'FINANCE_TRADER_WALLET is not set on the server' },
      { status: 503 },
    );
  }

  // Optional bot status written by control API (same process/DB). Fail open.
  let botStatus: {
    ref: number | null;
    next_buy: number | null;
    next_sell: number | null;
    trades_today: number | null;
    pnl: number | null;
    ts: string | null;
  } | null = null;
  try {
    const { readBotStatus } = await import('@/lib/finance/bot-store');
    botStatus = await readBotStatus();
  } catch {
    botStatus = null;
  }

  try {
    const [amm, info, lines, txs] = await Promise.all([
      xrpl('amm_info', {
        asset: { currency: 'XRP' },
        asset2: { currency: RLUSD_CURRENCY, issuer: RLUSD_ISSUER },
      }),
      xrpl('account_info', { account: wallet, ledger_index: 'validated' }),
      xrpl('account_lines', { account: wallet, peer: RLUSD_ISSUER, ledger_index: 'validated' }).catch(() => ({ lines: [] })),
      xrpl('account_tx', {
        account: wallet,
        ledger_index_min: -1,
        ledger_index_max: -1,
        limit: 80,
        binary: false,
      }),
    ]);

    const a = amm.amm;
    const poolXrp = a ? (typeof a.amount === 'string' ? Number(a.amount) / 1e6 : Number(a.amount?.value || 0)) : 0;
    const poolTok = a ? Number(a.amount2?.value || 0) : 0;
    const poolPrice = poolTok > 0 ? poolXrp / poolTok : null;
    const balXrp = Number(info.account_data?.Balance || 0) / 1e6;
    let balTok = 0;
    for (const L of lines.lines || []) {
      if ((L.currency === 'RLUSD' || L.currency === RLUSD_CURRENCY) && L.account === RLUSD_ISSUER) {
        balTok = Number(L.balance) || 0;
      }
    }
    const equity = poolPrice != null ? balXrp + balTok * poolPrice : balXrp;
    const delta = equity - OBS.starting_xrp;

    const trades: Trade[] = (txs.transactions || []).map((row: any) => {
      const t = row.tx || row.tx_json || row;
      const meta = row.meta || {};
      const c = classifyPayment(t, meta, wallet);
      return { ...c, hash: (t.hash || row.hash || '').slice(0, 8) };
    });

    const rounds = buildRounds(trades);
    const equity_curve = buildEquityCurve(rounds, OBS.starting_xrp, equity);

    const today = berlinDay(new Date().toISOString())!;
    const ledgerTradesToday = trades.filter(
      (t) => (t.kind === 'buy' || t.kind === 'sell') && berlinDay(t.date) === today,
    ).length;
    const tradesToday =
      botStatus?.trades_today != null && Number.isFinite(botStatus.trades_today)
        ? botStatus.trades_today
        : ledgerTradesToday;

    const lastSwap = trades.find((t) => (t.kind === 'buy' || t.kind === 'sell') && t.price != null);
    let ref: number | null = null;
    let ref_source: 'bot_status' | 'last_trade' | 'amm' | 'none' = 'none';
    if (botStatus?.ref != null && Number.isFinite(botStatus.ref)) {
      ref = botStatus.ref;
      ref_source = 'bot_status';
    } else if (lastSwap?.price != null) {
      ref = lastSwap.price;
      ref_source = 'last_trade';
    } else if (poolPrice != null) {
      ref = poolPrice;
      ref_source = 'amm';
    }

    const step = OBS.grid_step_pct / 100;
    let next_buy =
      botStatus?.next_buy != null && Number.isFinite(botStatus.next_buy) ? botStatus.next_buy : null;
    let next_sell =
      botStatus?.next_sell != null && Number.isFinite(botStatus.next_sell) ? botStatus.next_sell : null;
    if (ref != null) {
      if (next_buy == null) next_buy = ref * (1 - step);
      if (next_sell == null) next_sell = ref * (1 + step);
    }

    const hard = OBS.hard_stop_loss_xrp;
    const hard_stop =
      hard == null
        ? { defined: false as const, label: 'unbekannt' as const }
        : {
            defined: true as const,
            hard_stop_loss_xrp: hard,
            stop_equity_xrp: OBS.starting_xrp - hard,
            distance_xrp: equity - (OBS.starting_xrp - hard),
            label: null as null,
          };

    return NextResponse.json({
      ok: true,
      mask: '••••' + wallet.slice(-4),
      obs: OBS,
      bot_status: `Bot handelt live · Grid ${OBS.grid_step_pct} % · ${OBS.trade_xrp} XRP je Trade`,
      amm: {
        pool_xrp: poolXrp,
        pool_rlusd: poolTok,
        price_xrp_per_rlusd: poolPrice,
        fee_pct: a ? (a.trading_fee || 0) / 1000 : null,
        ledger: a?.ledger_index ?? null,
      },
      balances: { xrp: balXrp, rlusd: balTok },
      pnl: {
        starting_xrp: OBS.starting_xrp,
        equity,
        delta,
        pct: OBS.starting_xrp ? (delta / OBS.starting_xrp) * 100 : 0,
      },
      trades,
      rounds: rounds.map((r) => ({
        id: r.id,
        pnl_xrp: r.pnl_xrp,
        sell_price: r.sell_price,
        buy_price: r.buy_price,
        closed_at: r.closed_at,
        sell_xrp: r.sell.xrp,
        buy_xrp: r.buy.xrp,
        title: r.pnl_xrp >= 0 ? 'Runde +' : 'Runde −',
      })),
      equity_curve,
      marks: {
        ref,
        ref_source,
        ref_label:
          ref_source === 'bot_status'
            ? 'Referenz aus Bot-Status'
            : ref_source === 'last_trade'
              ? 'Referenz abgeleitet vom letzten Trade'
              : ref_source === 'amm'
                ? 'Referenz aus AMM-Preis'
                : 'keine Referenz',
        next_buy,
        next_sell,
        grid_step_pct: OBS.grid_step_pct,
      },
      day: {
        trades_today: tradesToday,
        max_trades_per_day: OBS.max_trades_per_day,
        label: `${tradesToday}/${OBS.max_trades_per_day}`,
      },
      hard_stop,
      fetched_at: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ error: 'xrpl_failed', message: String(e?.message || e) }, { status: 502 });
  }
}
