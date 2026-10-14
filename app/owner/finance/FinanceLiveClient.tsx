'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Snapshot = {
  ok: boolean;
  mask: string;
  bot_status: string;
  obs: { starting_xrp: number; grid_step_pct: number; trade_xrp: number };
  amm: {
    pool_xrp: number;
    pool_rlusd: number;
    price_xrp_per_rlusd: number | null;
    fee_pct: number | null;
    ledger: number | null;
  };
  balances: { xrp: number; rlusd: number };
  pnl: { starting_xrp: number; equity: number; delta: number; pct: number };
  trades: Array<{
    kind: string;
    title: string;
    detail: string;
    date: string | null;
    hash?: string;
    price: number | null;
    xrp: number | null;
  }>;
  fetched_at: string;
  error?: string;
  message?: string;
};

const n = (v: number, d = 4) =>
  v.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
const sg = (v: number, d = 4) => (v >= 0 ? '+' : '−') + n(Math.abs(v), d);
const pct = (v: number, d = 2) => (v >= 0 ? '+' : '−') + n(Math.abs(v), d) + ' %';
const tB = (iso: string | null, timeOnly = false) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
      ...(timeOnly
        ? { hour: '2-digit', minute: '2-digit', second: '2-digit' }
        : {}),
    });
  } catch {
    return iso;
  }
};

export default function FinanceLiveClient({
  envReady,
  userLabel,
}: {
  envReady: boolean;
  userLabel: string;
}) {
  const [data, setData] = useState<Snapshot | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const priceRef = useRef<number | null>(null);
  const depthRef = useRef(0);
  const pnlPctRef = useRef(0);
  const starsRef = useRef<Array<{ p: number; a: number; col: string; w: number; k: number }>>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/owner/finance/xrpl', { cache: 'no-store' });
      if (res.status === 401) {
        window.location.href = '/owner/login?callbackUrl=/owner/finance';
        return;
      }
      const json = (await res.json()) as Snapshot;
      if (!res.ok) {
        setErr(json.message || json.error || 'Fehler');
        setLive(false);
        return;
      }
      setData(json);
      setErr(null);
      setLive(true);
      priceRef.current = json.amm.price_xrp_per_rlusd;
      depthRef.current = json.amm.pool_xrp;
      pnlPctRef.current = json.pnl.pct;
      const swaps = json.trades.filter((t) => t.kind === 'buy' || t.kind === 'sell');
      starsRef.current = swaps.slice(0, 24).map((t, i) => ({
        p: t.price || json.amm.price_xrp_per_rlusd || 1,
        a: -1.57 + i * 2.399,
        col: t.kind === 'buy' ? '145,222,199' : '224,189,103',
        w: Math.abs(t.xrp || 1),
        k: i,
      }));
    } catch (e: any) {
      setErr(String(e?.message || e));
      setLive(false);
    }
  }, []);

  useEffect(() => {
    if (!envReady) return;
    load();
    const id = setInterval(load, 40000);
    return () => clearInterval(id);
  }, [envReady, load]);

  // Orrery canvas (museum-inspired, sigil unchanged)
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const x = cv.getContext('2d');
    if (!x) return;
    const SIG = new Image();
    SIG.src = '/owner/finance/sigil.png';
    let raf = 0;
    let yaw = 0;
    let tilt = 1.08;
    let moonA = 0.6;
    const neb = Array.from({ length: 520 }, (_, i) => {
      const arm = i % 3;
      const r = Math.pow(Math.random(), 0.7);
      return {
        r,
        a: arm * 2.094 + r * 3.2,
        z: (Math.random() - 0.5) * 0.1,
        s: Math.random() * 1.5 + 0.3,
        ph: Math.random() * 7,
        w: 0.00006 + Math.random() * 0.00008,
        c: Math.random() < 0.5 ? 0 : 1,
      };
    });
    const COL = ['145,222,199', '224,189,103'];

    const draw = (now: number) => {
      const rect = cv.getBoundingClientRect();
      const DP = Math.min(2, window.devicePixelRatio || 1);
      cv.width = rect.width * DP;
      cv.height = rect.height * DP;
      x.setTransform(DP, 0, 0, DP, 0, 0);
      const W = rect.width;
      const H = rect.height;
      const R = Math.min(W * 0.4, H * 0.78);
      const C = { x: W * 0.58, y: H * 0.5 };
      yaw += 0.0004;
      tilt = 1.08 + Math.sin(now / 9000) * 0.04;
      x.fillStyle = '#050706';
      x.fillRect(0, 0, W, H);
      let g = x.createRadialGradient(C.x, C.y, 0, C.x, C.y, R * 1.5);
      g.addColorStop(0, 'rgba(16,48,34,.55)');
      g.addColorStop(1, 'rgba(5,7,6,0)');
      x.fillStyle = g;
      x.fillRect(0, 0, W, H);

      const P = (r: number, a: number, z = 0) => {
        const X = r * Math.cos(a + yaw);
        const Y = r * Math.sin(a + yaw);
        const y2 = Y * Math.cos(tilt) - z * Math.sin(tilt);
        const d = Y * Math.sin(tilt) + z * Math.cos(tilt);
        const f = 1 / (1 + d / (R * 3.2));
        return [C.x + X * f, C.y + y2 * f, f] as const;
      };

      x.globalCompositeOperation = 'lighter';
      for (const p of neb) {
        p.a += p.w;
        const q = P(p.r * R * 1.05, p.a, p.z * R);
        const tw = 0.35 + 0.3 * Math.sin(now / 1100 + p.ph);
        x.fillStyle = `rgba(${COL[p.c]},${tw * 0.28 * q[2]})`;
        x.fillRect(q[0], q[1], p.s * q[2], p.s * q[2]);
      }
      x.globalCompositeOperation = 'source-over';

      const price = priceRef.current || 1;
      const sp = 0.005;
      for (let k = -3; k <= 3; k++) {
        const lp = price * (1 + k * sp);
        const q = (lp / price - 1) / (4 * sp);
        const rr = Math.max(0.16, Math.min(0.98, 0.56 + q * 0.4)) * R;
        x.strokeStyle = k === 0 ? 'rgba(214,168,72,.55)' : k < 0 ? 'rgba(145,222,199,.28)' : 'rgba(224,189,103,.28)';
        x.lineWidth = k === 0 ? 1.2 : 0.7;
        x.beginPath();
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          const pt = P(rr, a);
          if (i === 0) x.moveTo(pt[0], pt[1]);
          else x.lineTo(pt[0], pt[1]);
        }
        x.stroke();
      }

      const sz = R * 0.25;
      g = x.createRadialGradient(C.x, C.y, 0, C.x, C.y, R * 0.42);
      g.addColorStop(0, 'rgba(227,188,99,.4)');
      g.addColorStop(1, 'rgba(214,168,72,0)');
      x.fillStyle = g;
      x.beginPath();
      x.arc(C.x, C.y, R * 0.42, 0, 7);
      x.fill();
      if (SIG.complete && SIG.naturalWidth) {
        x.save();
        x.translate(C.x, C.y);
        x.beginPath();
        x.arc(0, 0, sz / 2, 0, 7);
        x.clip();
        x.drawImage(SIG, -sz / 2, -sz / 2, sz, sz);
        x.restore();
      }

      for (const st of starsRef.current) {
        const qfac = (st.p / price - 1) / (4 * sp);
        const rr = Math.max(0.3, Math.min(0.98, 0.56 + qfac * 0.4)) * R;
        const q = P(rr, st.a);
        const s = 2.2 * q[2];
        g = x.createRadialGradient(q[0], q[1], 0, q[0], q[1], s * 6);
        g.addColorStop(0, `rgba(255,250,235,.9)`);
        g.addColorStop(0.2, `rgba(${st.col},.75)`);
        g.addColorStop(1, `rgba(${st.col},0)`);
        x.fillStyle = g;
        x.beginPath();
        x.arc(q[0], q[1], s * 6, 0, 7);
        x.fill();
      }

      if (priceRef.current) {
        moonA += 0.001;
        const qfac = 0;
        const rr = Math.max(0.16, Math.min(0.98, 0.56 + qfac * 0.4)) * R;
        const q = P(rr, moonA);
        const m = R * 0.05 * q[2];
        const lit = Math.max(0.08, Math.min(0.95, 0.5 + pnlPctRef.current / 40));
        g = x.createRadialGradient(q[0], q[1], 0, q[0], q[1], m * 4);
        g.addColorStop(0, 'rgba(145,222,199,.3)');
        g.addColorStop(1, 'rgba(145,222,199,0)');
        x.fillStyle = g;
        x.beginPath();
        x.arc(q[0], q[1], m * 4, 0, 7);
        x.fill();
        x.fillStyle = `rgba(111,199,163,${0.35 + lit * 0.5})`;
        x.beginPath();
        x.arc(q[0], q[1], m, 0, 7);
        x.fill();
        x.strokeStyle = 'rgba(224,189,103,.8)';
        x.beginPath();
        x.arc(q[0], q[1], m + 3, 0, 7);
        x.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pnl = data?.pnl;
  const up = (pnl?.delta || 0) >= 0;

  return (
    <main className="min-h-screen bg-[#050706] text-[#F7F4E9]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6a77a]/66 bg-gradient-to-r from-[#e6a77a]/18 to-[#D6A848]/10 px-[5vw] py-2.5 text-[10px] uppercase tracking-[0.16em]">
        <strong className="font-mono text-[#e6a77a]">Owner-only · nicht öffentlich</strong>
        <span className="font-mono text-white/50">Keine Seeds · Adresse maskiert · lesen</span>
      </div>

      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-[#050706]/95 to-transparent px-[5vw] py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/owner/finance/sigil.png" alt="" className="h-9 w-9 rounded-full shadow-[0_0_22px_rgba(214,168,72,.35)]" />
          <div>
            <div className="text-xs font-medium tracking-[0.42em]">SAIMÔR</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Finance · Orbit des Sigils</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="font-mono text-[10px] normal-case tracking-normal text-white/55">
            Angemeldet als <strong className="font-medium text-[#F7F4E9]/90">{userLabel}</strong>
          </span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            <i className={`inline-block h-1.5 w-1.5 rounded-full ${live ? 'bg-[#91dec7] shadow-[0_0_10px_#91dec7]' : 'bg-white/30'}`} />
            {live ? 'XRPL · mainnet · lesen' : 'XRPL · …'}
          </span>
          <Link href="/owner" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-[#D6A848]">
            Zur Übersicht
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/owner/login' })}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-[#e6a77a] hover:text-[#e6a77a]"
          >
            Abmelden
          </button>
        </div>
      </header>

      {!envReady && (
        <div className="mx-[5vw] mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm text-amber-100">
          Server-Env «FINANCE_TRADER_WALLET» fehlt noch. Die Seite ist owner-geschützt; Live-Daten starten nach Setzen der Variable (Wert nur in Secrets, nie im Client).
        </div>
      )}
      {err && (
        <div className="mx-[5vw] mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-3 text-sm text-rose-100">{err}</div>
      )}

      <section className="relative min-h-[560px] h-[min(92svh,900px)]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_40%,#050706_88%)]" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-[5vw] py-[4vh]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D6A848]">Saimôr Finance · Das Observatorium</div>
            <h1 className="mt-3 font-serif text-[clamp(40px,6vw,88px)] font-light leading-[0.92] tracking-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Der Orbit
              <br />
              des <em className="italic text-[#e0bd67]">Sigils</em>
            </h1>
            <p className="mt-3 max-w-[34ch] font-serif text-lg italic text-[#dce9e0]/80" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Klarheit im Wandel. Was kreist, kehrt wieder – nur das Licht erinnert sich.
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Buchwert · Start {data ? n(data.obs.starting_xrp, 0) : '10'} XRP
              </div>
              <div className="font-serif text-[clamp(44px,5.5vw,80px)] font-light tabular-nums" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {data ? n(data.pnl.equity, 4) : '—'}
                <small className="ml-2 text-[0.28em] tracking-[0.18em] text-white/45">XRP</small>
              </div>
              <div className={`mt-2 font-mono text-sm ${up ? 'text-[#91dec7]' : 'text-[#e6a77a]'}`}>
                {data ? `${sg(data.pnl.delta)} XRP · ${pct(data.pnl.pct)}` : '—'}
              </div>
              <div className="mt-1 font-mono text-xs text-white/40">
                {data ? `Bestand ${n(data.balances.xrp, 3)} XRP + ${n(data.balances.rlusd, 3)} RLUSD` : ''}
              </div>
              <div className="mt-3 inline-block border border-[#D6A848] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D6A848]">
                {data?.bot_status || 'Bot handelt live · laut Finance'}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Der Mond steht bei</div>
              <div className="font-serif text-4xl font-light tabular-nums" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {data?.amm.price_xrp_per_rlusd != null ? n(data.amm.price_xrp_per_rlusd, 6) : '—'}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">XRP / RLUSD</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 px-[5vw] py-10 lg:grid-cols-3">
        <section className="space-y-6 border-t border-white/10 pt-5">
          <h2 className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Kurs · Pool <span className="font-serif text-base italic normal-case tracking-normal text-[#dce9e0]">RLUSD-AMM</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><div className="font-mono text-[10px] uppercase text-white/40">Pool XRP</div><div className="font-serif text-2xl">{data ? n(data.amm.pool_xrp, 2) : '—'}</div></div>
            <div><div className="font-mono text-[10px] uppercase text-white/40">Pool RLUSD</div><div className="font-serif text-2xl">{data ? n(data.amm.pool_rlusd, 2) : '—'}</div></div>
            <div><div className="font-mono text-[10px] uppercase text-white/40">Fee</div><div className="font-serif text-2xl">{data?.amm.fee_pct != null ? n(data.amm.fee_pct, 3) + ' %' : '—'}</div></div>
            <div><div className="font-mono text-[10px] uppercase text-white/40">Ledger</div><div className="font-serif text-2xl">{data?.amm.ledger != null ? Number(data.amm.ledger).toLocaleString('de-DE') : '—'}</div></div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            Wallet {data?.mask || '••••'} · Adresse ausgeblendet
          </p>
        </section>

        <section className="space-y-4 border-t border-white/10 pt-5 lg:col-span-2">
          <h2 className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Handelsband{' '}
            <span className="font-serif text-base italic normal-case tracking-normal text-[#dce9e0]">
              {data ? data.trades.filter((t) => t.kind === 'buy' || t.kind === 'sell').length + ' Sterne' : '—'}
            </span>
          </h2>
          <div className="max-h-[360px] space-y-0 overflow-auto font-mono text-[11px]">
            {(data?.trades || []).map((t, i) => (
              <div key={i} className="grid grid-cols-[72px_1.1fr_1.4fr_auto] gap-2 border-b border-white/[0.06] py-2">
                <span className="text-white/45">{tB(t.date, true)}</span>
                <span className={t.kind === 'buy' ? 'text-[#91dec7]' : t.kind === 'sell' ? 'text-[#e0bd67]' : 'text-white/60'}>
                  {t.title}
                </span>
                <span className="text-white/70">{t.detail || '—'}</span>
                <span className="text-white/35">{t.hash || ''}</span>
              </div>
            ))}
            {!data && <p className="font-serif italic text-white/40">Warte auf das Ledger…</p>}
          </div>
        </section>
      </div>

      <footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 px-[5vw] py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
        <span>Saimôr Finance — interne Abteilung</span>
        <span>Zeiten · Europe/Berlin</span>
        <span>{data ? tB(data.fetched_at) : '—'}</span>
      </footer>
    </main>
  );
}
