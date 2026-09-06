'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, Loader2, RefreshCcw, ShieldCheck, WalletCards } from 'lucide-react';

type Intent = {
  product: { id: string; name: string; description: string; amountXrp: string };
  token: string;
  orderId: string;
  destination: string;
  destinationTag: number;
  invoiceId: string;
  amountXrp: string;
  expiresAt: string;
  xamanUrl: string;
};

type VerifyResult = {
  ok: boolean;
  paid: boolean;
  error?: string;
  transaction?: {
    hash: string;
    ledgerIndex: number | null;
    closeTimeIso: string | null;
    account: string;
  };
};

function short(value: string, start = 8, end = 7) {
  if (!value || value.length <= start + end + 1) return value;
  return `${value.slice(0, start)}…${value.slice(-end)}`;
}

export default function XrplCanaryCheckout() {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [creating, setCreating] = useState(false);
  const [checking, setChecking] = useState(false);
  const [paid, setPaid] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const createIntent = useCallback(async () => {
    setCreating(true);
    setError('');
    setPaid(false);
    setTxHash('');

    try {
      const response = await fetch('/api/payments/xrpl/intent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId: 'saimor-canary-purchase' }),
      });
      const body = await response.json();
      if (!response.ok || !body?.ok) throw new Error(body?.error || 'Payment request failed');
      setIntent(body as Intent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment request failed');
    } finally {
      setCreating(false);
    }
  }, []);

  const verify = useCallback(async (silent = false) => {
    if (!intent || paid) return;
    if (!silent) setChecking(true);

    try {
      const response = await fetch('/api/payments/xrpl/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: intent.token }),
      });
      const body = (await response.json()) as VerifyResult;
      if (!response.ok || !body.ok) throw new Error(body.error || 'Verification failed');
      if (body.paid) {
        setPaid(true);
        setTxHash(body.transaction?.hash || '');
        setError('');
      }
    } catch (err) {
      if (!silent) setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      if (!silent) setChecking(false);
    }
  }, [intent, paid]);

  useEffect(() => {
    if (!intent || paid) return;
    const timer = window.setInterval(() => void verify(true), 6000);
    return () => window.clearInterval(timer);
  }, [intent, paid, verify]);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-emerald-200/10 bg-[radial-gradient(circle_at_15%_0%,rgba(16,185,129,.13),transparent_36%),rgba(5,10,9,.78)] p-6 shadow-2xl backdrop-blur-2xl md:p-8">
      <div className="pointer-events-none absolute right-[-80px] top-[-110px] h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-emerald-200/55">
              <WalletCards size={13} /> XRPL · live canary
            </div>
            <h2 className="mt-3 text-3xl font-light tracking-[-0.04em] text-white md:text-4xl">Der erste echte Saimôr-Kauf.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/48">
              1 XRP. Kein Checkout-Anbieter, kein Seed in Saimôr. Xaman signiert auf deinem Gerät, Saimôr prüft danach die validierte Zahlung direkt im Ledger.
            </p>
          </div>
          <div className="rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-emerald-100/58">
            beta · real mainnet
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/28">Product</div>
            <div className="mt-2 text-sm text-white/72">Saimôr Canary Purchase</div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/28">Price</div>
            <div className="mt-2 text-2xl font-medium text-white/86">1 XRP</div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/28">Custody</div>
            <div className="mt-2 flex items-center gap-2 text-sm text-white/72"><ShieldCheck size={14} className="text-emerald-300/65" /> Xaman</div>
          </div>
        </div>

        {!intent && !paid ? (
          <div className="mt-8">
            <button
              type="button"
              onClick={createIntent}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-100 disabled:opacity-50"
            >
              {creating ? <Loader2 size={16} className="animate-spin" /> : <WalletCards size={16} />}
              1 XRP Checkout starten
            </button>
          </div>
        ) : null}

        {intent && !paid ? (
          <div className="mt-8 rounded-[26px] border border-white/[0.075] bg-black/20 p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/26">Payment intent</div>
                <div className="mt-2 font-mono text-xs text-white/54">Order {short(intent.orderId, 8, 6)}</div>
                <div className="mt-1 font-mono text-[10px] text-white/28">To {short(intent.destination)}</div>
                <div className="mt-1 text-[10px] text-white/28">Destination Tag {intent.destinationTag}</div>
              </div>

              <a
                href={intent.xamanUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-semibold text-[#04110c] transition hover:bg-emerald-200"
              >
                In Xaman bezahlen <ExternalLink size={15} />
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-4">
              <button
                type="button"
                onClick={() => verify(false)}
                disabled={checking}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/62 hover:bg-white/[0.07] disabled:opacity-50"
              >
                {checking ? <Loader2 size={13} className="animate-spin" /> : <RefreshCcw size={13} />}
                Zahlung prüfen
              </button>
              <span className="text-[10px] text-white/28">Saimôr prüft automatisch alle 6 Sekunden.</span>
            </div>
          </div>
        ) : null}

        {paid ? (
          <div className="mt-8 rounded-[26px] border border-emerald-300/18 bg-emerald-400/[0.07] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/15 text-emerald-200">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-lg font-medium text-emerald-50">Bezahlt. On-chain bestätigt.</div>
                <div className="mt-1 font-mono text-[10px] text-emerald-100/38">{txHash ? `TX ${short(txHash, 12, 10)}` : 'Validated XRPL payment'}</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/48">
              Genau dieser Moment ist der Revenue-Loop: Produkt → Xaman → XRPL → Verifikation → Saimôr weiß, dass Umsatz eingegangen ist.
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-300/15 bg-red-400/[0.05] px-4 py-3 text-xs text-red-100/70">{error}</div>
        ) : null}
      </div>
    </section>
  );
}
