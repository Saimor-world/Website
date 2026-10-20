'use client';

import { useEffect, useRef } from 'react';
import styles from './EarthMycelium.module.css';

type Point = { x: number; y: number };
type Strand = { d: string; w: number; tone: 'jade' | 'gold' | 'hair'; pulse?: boolean; edge?: boolean };

const MORA = { x: 600, y: 250 };
const VIEW_W = 1200;
const VIEW_H = 1000;
const CREDIT = { x: 600, y: 368, rx: 240, ry: 46 };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function limbY(x: number) {
  const t = (x - 600) / 620;
  return 18 + t * t * 64;
}

function pathThrough(points: Point[]) {
  if (points.length < 2) return '';
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const midX = (points[i].x + points[i + 1].x) / 2;
    const midY = (points[i].y + points[i + 1].y) / 2;
    d += `Q${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += `L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  return d;
}

function grow(
  rng: () => number,
  start: Point,
  heading: number,
  steps: number,
  stepLen: number,
  wiggle: number,
  pull: Point | null,
  stopAtMora = false,
) {
  const points: Point[] = [start];
  let x = start.x;
  let y = start.y;
  let angle = heading;
  for (let i = 0; i < steps; i += 1) {
    angle += (rng() - 0.5) * wiggle;
    if (pull) {
      const desired = Math.atan2(pull.y - y, pull.x - x);
      let delta = desired - angle;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      const dist = Math.hypot(pull.x - x, pull.y - y);
      angle += delta * (dist < 90 ? 0.55 : mix(0.1, 0.3, i / steps));
    } else {
      angle += (Math.PI / 2 - angle) * 0.04;
    }
    const len = stepLen * mix(0.7, 1.22, rng());
    let nx = x + Math.cos(angle) * len;
    let ny = y + Math.sin(angle) * len;
    if (ny > VIEW_H - 16) break;
    ny = Math.max(ny, limbY(nx) - 8);
    const dx = (nx - CREDIT.x) / CREDIT.rx;
    const dy = (ny - CREDIT.y) / CREDIT.ry;
    if (dx * dx + dy * dy < 1) {
      nx += nx < CREDIT.x ? -36 : 36;
      if (((nx - CREDIT.x) / CREDIT.rx) ** 2 + ((ny - CREDIT.y) / CREDIT.ry) ** 2 < 1) break;
    }
    if (nx < -30 || nx > VIEW_W + 30) break;
    x = nx;
    y = ny;
    points.push({ x, y });
    if (stopAtMora && Math.hypot(x - MORA.x, y - MORA.y) < 18) {
      points.push({ ...MORA });
      break;
    }
  }
  return { points, heading: angle };
}

function buildStrands(): Strand[] {
  const rng = mulberry32(0x9d2c18);
  const strands: Strand[] = [];

  const push = (points: Point[], w: number, tone: Strand['tone'], pulse?: boolean, edge?: boolean) => {
    if (points.length < 2) return;
    const d = pathThrough(points);
    if (d.length > 12) strands.push({ d, w, tone, pulse, edge });
  };

  const limbPoints = Array.from({ length: 72 }, (_, i) => {
    const x = mix(-8, VIEW_W + 8, i / 71) + (rng() - 0.5) * 10;
    return { x, y: limbY(x) + rng() * 6 };
  });

  limbPoints.forEach((origin, index) => {
    const heading = Math.PI / 2 + (rng() - 0.5) * 1.35;
    const hair = grow(rng, origin, heading, 4 + Math.floor(rng() * 4), 8, 0.88, null);
    push(hair.points, mix(0.18, 0.42, rng()), index % 8 === 0 ? 'gold' : 'hair', false, true);
    const along = grow(
      rng,
      origin,
      (index % 2 === 0 ? 0.28 : Math.PI - 0.28) + (rng() - 0.5) * 0.4,
      8,
      12,
      0.42,
      null,
    );
    push(along.points, mix(0.22, 0.55, rng()), index % 5 === 0 ? 'gold' : 'hair', false, true);
    along.points.slice(1).forEach((node) => {
      if (rng() > 0.55) return;
      const drop = grow(rng, node, Math.PI / 2 + (rng() - 0.5) * 0.8, 4, 9, 0.7, null);
      push(drop.points, mix(0.16, 0.32, rng()), 'hair', false, true);
    });
  });

  const trunks = [8, 14, 20, 26, 32, 36, 40, 46, 52, 58, 64].map((index) => limbPoints[index]);
  trunks.forEach((origin, index) => {
    const heading = Math.atan2(MORA.y - origin.y, MORA.x - origin.x) + (rng() - 0.5) * 0.7;
    const trunk = grow(rng, origin, heading, 24, 12, 0.58, MORA, true);
    const tone: Strand['tone'] = index % 3 === 0 ? 'gold' : 'jade';
    const width = mix(1.25, 2.05, 1 - Math.abs(origin.x - MORA.x) / 640);
    push(trunk.points, width, tone, index === 4 || index === 5 || index === 6);

    const last = trunk.points[trunk.points.length - 1];
    if (last && Math.hypot(last.x - MORA.x, last.y - MORA.y) > 20) {
      const join = grow(rng, last, Math.atan2(MORA.y - last.y, MORA.x - last.x), 8, 12, 0.2, MORA, true);
      if (join.points.length) {
        join.points[join.points.length - 1] = { ...MORA };
        push(join.points, mix(0.9, 1.4, rng()), tone, index === 5);
      }
    }

    trunk.points.forEach((node, nodeIndex) => {
      if (nodeIndex < 2 || nodeIndex > trunk.points.length - 3) return;
      if (rng() > 0.38) return;
      const dir = rng() > 0.5 ? 1 : -1;
      const forkHeading = trunk.heading + dir * mix(0.55, 1.2, rng());
      const fork = grow(
        rng,
        node,
        forkHeading,
        5 + Math.floor(rng() * 5),
        11,
        0.62,
        rng() > 0.7 ? MORA : null,
        rng() > 0.75,
      );
      push(fork.points, mix(0.28, 0.7, 1 - nodeIndex / trunk.points.length), rng() > 0.65 ? 'gold' : 'hair');
      fork.points.slice(1, -1).forEach((side) => {
        if (rng() > 0.6) return;
        const twig = grow(rng, side, forkHeading + dir * mix(0.4, 0.9, rng()), 3 + Math.floor(rng() * 3), 9, 0.78, null);
        push(twig.points, mix(0.16, 0.34, rng()), 'hair');
      });
    });
  });

  const wanderers = [2, 6, 10, 16, 22, 28, 34, 42, 48, 54, 60, 66, 70].map((index) => limbPoints[index]);
  wanderers.forEach((origin, index) => {
    const heading = Math.PI / 2 + (index % 2 === 0 ? -1 : 1) * mix(0.35, 1.15, rng());
    const root = grow(rng, origin, heading, 16, 14, 0.58, null);
    push(root.points, mix(0.4, 0.9, rng()), index % 4 === 0 ? 'gold' : 'jade', false, true);
    root.points.slice(2, -2).forEach((node) => {
      if (rng() > 0.5) return;
      const dir = rng() > 0.5 ? 1 : -1;
      const fork = grow(rng, node, heading + dir * mix(0.5, 1.15, rng()), 5, 11, 0.7, null);
      push(fork.points, mix(0.2, 0.45, rng()), 'hair', false, true);
    });
  });

  for (let i = 0; i < 9; i += 1) {
    const spread = mix(-0.95, 0.95, i / 8);
    const start = { x: MORA.x + Math.sin(spread) * 10, y: MORA.y + 12 };
    const root = grow(rng, start, Math.PI / 2 + spread * 0.7, 9, 16, 0.4, null);
    push(root.points, mix(0.45, 1.05, 1 - Math.abs(spread)), i === 4 ? 'gold' : 'jade', i === 3);
    root.points.slice(2, -1).forEach((node) => {
      if (rng() > 0.58) return;
      const dir = rng() > 0.5 ? 1 : -1;
      const side = grow(rng, node, Math.PI / 2 + spread + dir * mix(0.45, 1, rng()), 4, 11, 0.65, null);
      push(side.points, mix(0.18, 0.4, rng()), rng() > 0.7 ? 'gold' : 'hair');
    });
  }

  return strands;
}

const STRANDS = buildStrands();

export default function EarthMycelium() {
  const orbRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (media?.matches) return undefined;
    const scroller = document.scrollingElement || document.body;
    let frame = 0;
    const update = () => {
      frame = 0;
      const orb = orbRef.current;
      const field = fieldRef.current;
      if (!orb || !field) return;
      if (document.querySelector('input[name="world-motion"]:checked')) return;
      const rect = field.getBoundingClientRect();
      const hub = rect.top + rect.height * 0.25;
      const drift = Math.max(-9, Math.min(9, (window.innerHeight * 0.48 - hub) * 0.05));
      orb.style.setProperty('--mora-drift', `${drift.toFixed(2)}px`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.field} data-testid="earth-mycelium" ref={fieldRef}>
      <div className={styles.canvas}>
        <svg className={styles.network} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="earthHyphaFade" x1="0" y1="0" x2="0" y2={VIEW_H} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
              <stop offset="9%" stopColor="#fff" stopOpacity="1" />
              <stop offset="58%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
            </linearGradient>
            <mask id="earthHyphaMask">
              <rect width={VIEW_W} height={VIEW_H} fill="url(#earthHyphaFade)" />
              <ellipse cx={CREDIT.x} cy={CREDIT.y} rx={CREDIT.rx} ry={CREDIT.ry} fill="#000" />
            </mask>
          </defs>

          <g mask="url(#earthHyphaMask)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {STRANDS.map((strand, index) => (
              <path
                key={`g-${index}`}
                className={`${styles.glow} ${strand.edge ? styles.edge : ''}`}
                d={strand.d}
                stroke={strand.tone === 'gold' ? '#e6c98d' : '#8fcdb0'}
                strokeWidth={strand.w * 3.4}
              />
            ))}
            {STRANDS.map((strand, index) => (
              <path
                key={`s-${index}`}
                className={`${styles.strand} ${styles[strand.tone]} ${strand.edge ? styles.edge : ''}`}
                d={strand.d}
                strokeWidth={strand.w}
              />
            ))}
            {STRANDS.filter((strand) => strand.pulse).map((strand, index) => (
              <path
                key={`p-${index}`}
                className={styles.pulse}
                d={strand.d}
                strokeWidth={Math.max(1.05, strand.w * 0.65)}
                pathLength={140}
              />
            ))}
          </g>
        </svg>

        <div className={styles.moraOrb} ref={orbRef} role="img" aria-label="MÔRA">
          <span className={styles.moraHalo} aria-hidden="true" />
          <span className={styles.moraGlow} aria-hidden="true" />
          <img className={styles.moraStone} src="/brand/mora-stone-v1.png" alt="" width={58} height={58} />
          <span className={styles.moraSheen} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
