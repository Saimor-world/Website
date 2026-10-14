import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const XRPL_HTTP = 'https://xrplcluster.com';
const RLUSD_CURRENCY = '524C555344000000000000000000000000000000';
const RLUSD_ISSUER = 'rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De';

/** Public observation params (no secrets). Aligned with xrpl-trading/config/mainnet.json */
const OBS = {
  starting_xrp: 10,
  grid_step_pct: 0.5,
  trade_xrp: 2,
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

function classifyPayment(t: any, meta: any, wallet: string) {
  const acct = t.Account || '';
  const dest = t.Destination || '';
  const self = acct === wallet && dest === wallet;
  const amount = meta?.delivered_amount || meta?.DeliveredAmount || t.Amount;
  const sendMax = t.SendMax;
  const date =
    t.date != null ? new Date((t.date + 946684800) * 1000).toISOString() : null;

  if (t.TransactionType === 'TrustSet') {
    return { kind: 'trust', title: 'TrustLine', detail: 'RLUSD', date, xrp: null as number | null, price: null as number | null };
  }
  if (t.TransactionType !== 'Payment') {
    return { kind: 'other', title: t.TransactionType || 'Tx', detail: '', date, xrp: null, price: null };
  }
  if (!self) {
    if (dest === wallet && (typeof amount === 'string' || typeof amount === 'number')) {
      return { kind: 'fund', title: 'Zufluss', detail: `${(xrpOf(amount)).toFixed(3)} XRP`, date, xrp: xrpOf(amount), price: null };
    }
    return { kind: 'other', title: 'Payment', detail: '', date, xrp: null, price: null };
  }
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
      price: px,
    };
  }
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
      price: px,
    };
  }
  return { kind: 'self', title: 'Umschichtung', detail: '', date, xrp: null, price: null };
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
        limit: 30,
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

    const trades = (txs.transactions || []).map((row: any) => {
      const t = row.tx || row.tx_json || row;
      const meta = row.meta || {};
      const c = classifyPayment(t, meta, wallet);
      return { ...c, hash: (t.hash || row.hash || '').slice(0, 8) };
    });

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
      pnl: { starting_xrp: OBS.starting_xrp, equity, delta, pct: OBS.starting_xrp ? (delta / OBS.starting_xrp) * 100 : 0 },
      trades,
      fetched_at: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({ error: 'xrpl_failed', message: String(e?.message || e) }, { status: 502 });
  }
}
