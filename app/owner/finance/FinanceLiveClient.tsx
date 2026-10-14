'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Trade = {
  kind: string;
  title: string;
  detail: string;
  date: string | null;
  hash: string;
  hash_short?: string;
  price: number | null;
  xrp: number | null;
  rlusd: number | null;
  round_id: string | null;
  round_pnl_xrp: number | null;
};

type Snapshot = {
  ok: boolean;
  mask: string;
  bot_status: string;
  obs: {
    starting_xrp: number;
    grid_step_pct: number;
    trade_xrp: number;
    max_trades_per_day: number;
    hard_stop_loss_xrp: number | null;
  };
  amm: {
    pool_xrp: number;
    pool_rlusd: number;
    price_xrp_per_rlusd: number | null;
    fee_pct: number | null;
    ledger: number | null;
  };
  balances: { xrp: number; rlusd: number };
  pnl: { starting_xrp: number; equity: number; delta: number; pct: number };
  trades: Trade[];
  sparks: Trade[];
  spark_count: number;
  ledger_tx_count: number;
  rounds: Array<{
    id: string;
    pnl_xrp: number;
    sell_price: number | null;
    buy_price: number | null;
    closed_at: string | null;
    sell_xrp: number | null;
    buy_xrp: number | null;
    title: string;
  }>;
  equity_curve: Array<{ day: string; equity: number }>;
  marks: {
    ref: number | null;
    ref_source: string;
    ref_label: string;
    next_buy: number | null;
    next_sell: number | null;
    grid_step_pct: number;
  };
  day: { trades_today: number; max_trades_per_day: number; label: string };
  hard_stop:
    | { defined: false; label: 'unbekannt' }
    | {
        defined: true;
        hard_stop_loss_xrp: number;
        stop_equity_xrp: number;
        distance_xrp: number;
        label: null;
      };
  fetched_at: string;
  error?: string;
  message?: string;
};

type SparkHit = {
  trade: Trade;
  x: number;
  y: number;
  r: number;
};

type RingHit = {
  id: 'next_buy' | 'next_sell' | 'ref';
  label: string;
  price: number;
  radius: number;
  cx: number;
  cy: number;
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
      ...(timeOnly ? { hour: '2-digit', minute: '2-digit', second: '2-digit' } : {}),
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
  const [selected, setSelected] = useState<Trade | null>(null);
  const [ringTip, setRingTip] = useState<{
    id: string;
    label: string;
    price: number;
    distPct: number | null;
    x: number;
    y: number;
  } | null>(null);
  const [view, setView] = useState({ scale: 1, ox: 0, oy: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const priceRef = useRef<number | null>(null);
  const pnlPctRef = useRef(0);
  const marksRef = useRef<{ ref: number | null; next_buy: number | null; next_sell: number | null; grid: number }>({
    ref: null,
    next_buy: null,
    next_sell: null,
    grid: 0.5,
  });
  const sparksRef = useRef<
    Array<{ trade: Trade; p: number; a: number; col: string; w: number }>
  >([]);
  const hitsRef = useRef<{ sparks: SparkHit[]; rings: RingHit[] }>({ sparks: [], rings: [] });
  const viewRef = useRef(view);
  viewRef.current = view;

  const dragRef = useRef<{
    active: boolean;
    x: number;
    y: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);

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
      pnlPctRef.current = json.pnl.pct;
      marksRef.current = {
        ref: json.marks.ref,
        next_buy: json.marks.next_buy,
        next_sell: json.marks.next_sell,
        grid: json.marks.grid_step_pct,
      };
      const list = json.sparks?.length ? json.sparks : json.trades.filter((t) => t.kind === 'buy' || t.kind === 'sell');
      sparksRef.current = list.map((t, i) => ({
        trade: t,
        p: t.price || json.amm.price_xrp_per_rlusd || 1,
        a: -1.57 + i * 2.399963,
        col: t.kind === 'buy' ? '145,222,199' : '224,189,103',
        w: Math.max(0.8, Math.abs(t.xrp || 1)),
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

  // Orbit draw + hit targets
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
    const neb = Array.from({ length: 420 }, (_, i) => {
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
      const v = viewRef.current;
      const R = Math.min(W * 0.4, H * 0.78) * v.scale;
      const C = { x: W * 0.58 + v.ox, y: H * 0.5 + v.oy };
      yaw += 0.00035;
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

      const price = priceRef.current || marksRef.current.ref || 1;
      const sp = (marksRef.current.grid || 0.5) / 100 || 0.005;
      const rings: RingHit[] = [];

      const ringAt = (lp: number, style: string, width: number, dash?: number[], hit?: RingHit['id'], label?: string) => {
        const q = (lp / price - 1) / (4 * sp);
        const rr = Math.max(0.16, Math.min(0.98, 0.56 + q * 0.4)) * R;
        x.strokeStyle = style;
        x.lineWidth = width;
        x.setLineDash(dash || []);
        x.beginPath();
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          const pt = P(rr, a);
          if (i === 0) x.moveTo(pt[0], pt[1]);
          else x.lineTo(pt[0], pt[1]);
        }
        x.stroke();
        x.setLineDash([]);
        if (hit && label) rings.push({ id: hit, label, price: lp, radius: rr, cx: C.x, cy: C.y });
      };

      for (let k = -3; k <= 3; k++) {
        const lp = price * (1 + k * sp);
        ringAt(lp, k === 0 ? 'rgba(214,168,72,.35)' : k < 0 ? 'rgba(145,222,199,.14)' : 'rgba(224,189,103,.14)', k === 0 ? 1 : 0.55);
      }

      const mk = marksRef.current;
      if (mk.next_buy != null) ringAt(mk.next_buy, 'rgba(145,222,199,.9)', 2, [6, 5], 'next_buy', 'Kauf-Ring');
      if (mk.next_sell != null) ringAt(mk.next_sell, 'rgba(224,189,103,.9)', 2, [6, 5], 'next_sell', 'Verkauf-Ring');
      if (mk.ref != null) ringAt(mk.ref, 'rgba(247,244,233,.5)', 1.2, undefined, 'ref', 'Referenz');

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

      const sparkHits: SparkHit[] = [];
      for (const st of sparksRef.current) {
        const qfac = (st.p / price - 1) / (4 * sp);
        const rr = Math.max(0.28, Math.min(0.98, 0.56 + qfac * 0.4)) * R;
        const q = P(rr, st.a);
        const s = (2.2 + st.w * 0.45) * q[2];
        g = x.createRadialGradient(q[0], q[1], 0, q[0], q[1], s * 6);
        g.addColorStop(0, 'rgba(255,250,235,.95)');
        g.addColorStop(0.22, `rgba(${st.col},.85)`);
        g.addColorStop(1, `rgba(${st.col},0)`);
        x.fillStyle = g;
        x.beginPath();
        x.arc(q[0], q[1], s * 6, 0, 7);
        x.fill();
        // core
        x.fillStyle = `rgb(${st.col})`;
        x.beginPath();
        x.arc(q[0], q[1], Math.max(2.2, s * 0.9), 0, 7);
        x.fill();
        sparkHits.push({ trade: st.trade, x: q[0], y: q[1], r: Math.max(10, s * 5) });
      }

      if (priceRef.current) {
        moonA += 0.001;
        const rr = 0.56 * R;
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
      }

      hitsRef.current = { sparks: sparkHits, rings };
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const localPoint = (clientX: number, clientY: number) => {
    const cv = canvasRef.current;
    if (!cv) return null;
    const rect = cv.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const hitSpark = (x: number, y: number) => {
    let best: SparkHit | null = null;
    let bestD = Infinity;
    for (const s of hitsRef.current.sparks) {
      const d = Math.hypot(s.x - x, s.y - y);
      if (d <= s.r && d < bestD) {
        best = s;
        bestD = d;
      }
    }
    return best;
  };

  const hitRing = (x: number, y: number) => {
    let best: RingHit | null = null;
    let bestD = Infinity;
    for (const r of hitsRef.current.rings) {
      const d = Math.abs(Math.hypot(x - r.cx, y - r.cy) - r.radius);
      if (d < 10 && d < bestD) {
        best = r;
        bestD = d;
      }
    }
    return best;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' && (e as any).nativeEvent?.isPrimary === false) return;
    const p = localPoint(e.clientX, e.clientY);
    if (!p) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragRef.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      ox: viewRef.current.ox,
      oy: viewRef.current.oy,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = localPoint(e.clientX, e.clientY);
    if (!p) return;

    if (dragRef.current?.active) {
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      if (Math.hypot(dx, dy) > 4) dragRef.current.moved = true;
      setView((v) => ({ ...v, ox: dragRef.current!.ox + dx, oy: dragRef.current!.oy + dy }));
      setRingTip(null);
      return;
    }

    const spark = hitSpark(p.x, p.y);
    const ring = hitRing(p.x, p.y);
    const cv = canvasRef.current;
    if (cv) cv.style.cursor = spark || ring ? 'pointer' : 'grab';

    if (ring) {
      const ref = marksRef.current.ref;
      const distPct = ref ? ((ring.price - ref) / ref) * 100 : null;
      setRingTip({
        id: ring.id,
        label: ring.label,
        price: ring.price,
        distPct,
        x: p.x,
        y: p.y,
      });
    } else {
      setRingTip(null);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    dragRef.current = null;
    const p = localPoint(e.clientX, e.clientY);
    if (!p || drag?.moved) return;
    const spark = hitSpark(p.x, p.y);
    if (spark) setSelected(spark.trade);
  };

  // Wheel zoom (non-passive) + touch pinch
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.92 : 1.08;
      setView((v) => ({
        ...v,
        scale: Math.min(3.5, Math.max(0.45, v.scale * factor)),
      }));
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        pinchRef.current = { dist: d, scale: viewRef.current.scale };
        dragRef.current = null;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        const next = pinchRef.current.scale * (d / pinchRef.current.dist);
        setView((v) => ({ ...v, scale: Math.min(3.5, Math.max(0.45, next)) }));
      }
    };
    const onTouchEnd = () => {
      pinchRef.current = null;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const resetView = () => setView({ scale: 1, ox: 0, oy: 0 });

  const pnl = data?.pnl;
  const up = (pnl?.delta || 0) >= 0;
  const sparkCount = data?.spark_count ?? data?.sparks?.length ?? 0;

  const curve = useMemo(() => {
    const pts = data?.equity_curve || [];
    if (pts.length < 2) return null;
    const vals = pts.map((p) => p.equity);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const span = max - min || 1;
    const w = 320;
    const h = 96;
    const path = pts
      .map((p, i) => {
        const x = (i / (pts.length - 1)) * w;
        const y = h - ((p.equity - min) / span) * (h - 8) - 4;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
    return { path, w, h, min, max };
  }, [data?.equity_curve]);

  const hardLabel = !data
    ? '—'
    : !data.hard_stop.defined
      ? 'unbekannt'
      : `${sg(data.hard_stop.distance_xrp, 3)} XRP bis Stop (bei ${n(data.hard_stop.stop_equity_xrp, 2)} XRP)`;

  return (
    <main className="min-h-screen bg-[#050706] text-[#F7F4E9]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6a77a]/66 bg-gradient-to-r from-[#e6a77a]/18 to-[#D6A848]/10 px-[5vw] py-2.5 text-[10px] uppercase tracking-[0.16em]">
        <strong className="font-mono text-[#e6a77a]">Owner-only · Orbit v2 · interaktiv · lesen</strong>
        <span className="font-mono text-white/50">
          {sparkCount} Funken · Adresse maskiert · kein Control
        </span>
      </div>

      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-[#050706]/95 to-transparent px-[5vw] py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/owner/finance/sigil.png" alt="" className="h-9 w-9 rounded-full shadow-[0_0_22px_rgba(214,168,72,.35)]" />
          <div>
            <div className="text-xs font-medium tracking-[0.42em]">SAIMÔR</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Finance · Orbit v2</div>
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
          Server-Env «FINANCE_TRADER_WALLET» fehlt noch.
        </div>
      )}
      {err && (
        <div className="mx-[5vw] mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-3 text-sm text-rose-100">{err}</div>
      )}

      <section ref={sectionRef} className="relative min-h-[560px] h-[min(92svh,900px)] touch-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={() => {
            dragRef.current = null;
            setRingTip(null);
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_40%,#050706_88%)]" />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-[5vw] py-[4vh]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D6A848]">Saimôr Finance · Orbit v2</div>
            <h1
              className="mt-3 font-serif text-[clamp(40px,6vw,88px)] font-light leading-[0.92] tracking-tight"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Der Orbit
              <br />
              des <em className="italic text-[#e0bd67]">Sigils</em>
            </h1>
            <p
              className="mt-3 max-w-[38ch] font-serif text-lg italic text-[#dce9e0]/80"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Jeder Trade ein Funke. Tippen oder hovern öffnet das Detail — Ringe zeigen den nächsten Kauf und Verkauf.
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Buchwert · Start {data ? n(data.obs.starting_xrp, 0) : '10'} XRP
              </div>
              <div
                className="font-serif text-[clamp(44px,5.5vw,80px)] font-light tabular-nums"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                {data ? n(data.pnl.equity, 4) : '—'}
                <small className="ml-2 text-[0.28em] tracking-[0.18em] text-white/45">XRP</small>
              </div>
              <div className={`mt-2 font-mono text-sm ${up ? 'text-[#91dec7]' : 'text-[#e6a77a]'}`}>
                {data ? `${sg(data.pnl.delta)} XRP · ${pct(data.pnl.pct)}` : '—'}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block border border-[#D6A848] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D6A848]">
                  Funken {sparkCount} · Heute {data?.day.label || '—/20'}
                </span>
                <span className="inline-block border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                  Hard-Stop {hardLabel}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Referenz</div>
              <div className="font-serif text-3xl font-light tabular-nums" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {data?.marks.ref != null ? n(data.marks.ref, 6) : '—'}
              </div>
              <div className="mt-1 max-w-[28ch] font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                {data?.marks.ref_label || '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Orbit controls */}
        <div className="absolute bottom-4 right-[5vw] z-30 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView((v) => ({ ...v, scale: Math.min(3.5, v.scale * 1.15) }))}
            className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setView((v) => ({ ...v, scale: Math.max(0.45, v.scale / 1.15) }))}
            className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur"
          >
            −
          </button>
          <button
            type="button"
            onClick={resetView}
            className="rounded-full border border-[#D6A848]/50 bg-black/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D6A848] backdrop-blur"
          >
            Reset Orbit
          </button>
        </div>

        {ringTip && (
          <div
            className="pointer-events-none absolute z-40 rounded-xl border border-white/15 bg-[#0a1210]/92 px-3 py-2 font-mono text-[10px] text-[#F7F4E9] shadow-xl backdrop-blur"
            style={{ left: Math.min(ringTip.x + 12, (sectionRef.current?.clientWidth || 400) - 180), top: Math.max(8, ringTip.y - 48) }}
          >
            <div className="uppercase tracking-[0.16em] text-white/45">{ringTip.label}</div>
            <div className="mt-1 text-sm tabular-nums">{n(ringTip.price, 6)} XRP/RLUSD</div>
            <div className="text-white/55">
              Abstand Ref {ringTip.distPct == null ? '—' : pct(ringTip.distPct, 3)}
            </div>
          </div>
        )}

        {selected && (
          <aside className="absolute left-[5vw] top-6 z-40 w-[min(360px,90vw)] rounded-2xl border border-white/15 bg-[#0a1210]/94 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Trade-Funke</div>
                <div className={`mt-1 font-serif text-2xl ${selected.kind === 'buy' ? 'text-[#91dec7]' : 'text-[#e0bd67]'}`}>
                  {selected.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-white/20 px-2 py-1 font-mono text-[10px] text-white/60"
              >
                Schließen
              </button>
            </div>
            <dl className="mt-4 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between gap-3"><dt className="text-white/40">Zeit (Berlin)</dt><dd>{tB(selected.date)}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-white/40">Seite</dt><dd className="uppercase">{selected.kind}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-white/40">XRP</dt><dd>{selected.xrp != null ? n(selected.xrp, 4) : '—'}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-white/40">RLUSD</dt><dd>{selected.rlusd != null ? n(selected.rlusd, 4) : '—'}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-white/40">Preis</dt><dd>{selected.price != null ? n(selected.price, 6) : '—'}</dd></div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/40">Runden-PnL</dt>
                <dd className={selected.round_pnl_xrp == null ? 'text-white/40' : selected.round_pnl_xrp >= 0 ? 'text-[#91dec7]' : 'text-[#e6a77a]'}>
                  {selected.round_pnl_xrp == null ? 'offen / ungepaart' : `${sg(selected.round_pnl_xrp, 4)} XRP`}
                </dd>
              </div>
            </dl>
            {selected.hash ? (
              <a
                href={`https://livenet.xrpl.org/transactions/${selected.hash}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full border border-[#D6A848]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D6A848] hover:bg-[#D6A848]/10"
              >
                XRPL Explorer · {selected.hash_short || selected.hash.slice(0, 8)}
              </a>
            ) : null}
          </aside>
        )}
      </section>

      <div className="grid gap-8 px-[5vw] py-10 lg:grid-cols-3">
        <section className="space-y-4 border-t border-white/10 pt-5">
          <h2 className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Equity-Kurve <span className="font-serif text-base italic normal-case tracking-normal text-[#dce9e0]">täglich</span>
          </h2>
          {curve ? (
            <svg viewBox={`0 0 ${curve.w} ${curve.h}`} className="w-full text-[#91dec7]" aria-label="Tägliche Equity">
              <path d={curve.path} fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <p className="font-serif italic text-white/40">Noch keine Tagespunkte…</p>
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            Wallet {data?.mask || '••••'} · Ledger-Tx {data?.ledger_tx_count ?? '—'}
          </p>
        </section>

        <section className="space-y-4 border-t border-white/10 pt-5 lg:col-span-2">
          <h2 className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Alle Trade-Funken{' '}
            <span className="font-serif text-base italic normal-case tracking-normal text-[#dce9e0]">{sparkCount}</span>
          </h2>
          <div className="max-h-[360px] space-y-0 overflow-auto font-mono text-[11px]">
            {(data?.sparks || []).map((t) => (
              <button
                key={t.hash || `${t.date}-${t.kind}`}
                type="button"
                onClick={() => setSelected(t)}
                className="grid w-full grid-cols-[72px_1.1fr_1.4fr_auto] gap-2 border-b border-white/[0.06] py-2 text-left hover:bg-white/[0.03]"
              >
                <span className="text-white/45">{tB(t.date, true)}</span>
                <span className={t.kind === 'buy' ? 'text-[#91dec7]' : 'text-[#e0bd67]'}>{t.title}</span>
                <span className="text-white/70">{t.detail || '—'}</span>
                <span className="text-white/35">{t.hash_short || t.hash.slice(0, 8)}</span>
              </button>
            ))}
            {!data && <p className="font-serif italic text-white/40">Warte auf das Ledger…</p>}
          </div>
        </section>
      </div>

      <footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 px-[5vw] py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
        <span>Saimôr Finance — Orbit v2 interactive · display only</span>
        <span>Zoom · Drag · Pinch · Reset</span>
        <span>{data ? tB(data.fetched_at) : '—'}</span>
      </footer>
    </main>
  );
}
