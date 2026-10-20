import styles from './EarthMycelium.module.css';

type Point = { x: number; y: number };
type Strand = { d: string; w: number; tone: 'jade' | 'gold' | 'hair'; pulse?: boolean };

const MORA = { x: 608, y: 328 };
const VIEW_W = 1200;
const VIEW_H = 1000;
const CREDIT = { x: 600, y: 548, rx: 196, ry: 58 };

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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function inCreditVoid(x: number, y: number) {
  const dx = (x - CREDIT.x) / CREDIT.rx;
  const dy = (y - CREDIT.y) / CREDIT.ry;
  return dx * dx + dy * dy < 1;
}

function nearMora(x: number, y: number) {
  return Math.hypot(x - MORA.x, y - MORA.y) < 26;
}

function limbY(x: number) {
  const t = (x - 600) / 560;
  return 22 + t * t * 36;
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
) {
  const points: Point[] = [start];
  let x = start.x;
  let y = start.y;
  let angle = heading;
  for (let i = 0; i < steps; i += 1) {
    angle += (rng() - 0.48) * wiggle;
    if (pull) {
      const desired = Math.atan2(pull.y - y, pull.x - x);
      let delta = desired - angle;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      angle += delta * mix(0.08, 0.28, i / steps);
    } else {
      angle += (Math.PI / 2 - angle) * 0.07;
    }
    const len = stepLen * mix(0.72, 1.18, rng());
    let nx = x + Math.cos(angle) * len;
    let ny = y + Math.sin(angle) * len;
    if (ny > VIEW_H - 18) break;
    if (inCreditVoid(nx, ny)) {
      nx += nx < CREDIT.x ? -mix(18, 42, rng()) : mix(18, 42, rng());
      if (inCreditVoid(nx, ny)) break;
    }
    nx = clamp(nx, 14, VIEW_W - 14);
    x = nx;
    y = ny;
    points.push({ x, y });
    if (pull && nearMora(x, y)) {
      points.push({ ...MORA });
      break;
    }
  }
  return { points, heading: angle };
}

function buildStrands(): Strand[] {
  const rng = mulberry32(0x7c3e91);
  const strands: Strand[] = [];

  const push = (points: Point[], w: number, tone: Strand['tone'], pulse?: boolean) => {
    if (points.length < 2) return;
    const d = pathThrough(points);
    if (d.length > 12) strands.push({ d, w, tone, pulse });
  };

  const origins = Array.from({ length: 46 }, (_, i) => {
    const x = 16 + i * (1168 / 45) + (rng() - 0.5) * 14;
    return { x, y: limbY(x) + rng() * 10 };
  });

  origins.forEach((origin, index) => {
    const towardMora = Math.abs(origin.x - MORA.x) < 380 || index % 4 === 0;
    const heading = towardMora
      ? Math.atan2(MORA.y - origin.y, MORA.x - origin.x) + (rng() - 0.5) * 0.55
      : Math.PI / 2 + (rng() - 0.5) * 0.9;
    const trunk = grow(
      rng,
      origin,
      heading,
      towardMora ? 9 : 11,
      towardMora ? 18 : 16,
      towardMora ? 0.38 : 0.52,
      towardMora ? MORA : null,
    );
    const trunkTone: Strand['tone'] = index % 5 === 0 ? 'gold' : index % 7 === 0 ? 'hair' : 'jade';
    const trunkWidth = towardMora
      ? mix(1.45, 2.35, 1 - Math.abs(origin.x - MORA.x) / 520)
      : mix(0.55, 1.05, rng());
    push(trunk.points, trunkWidth, trunkTone, towardMora && (index === 18 || index === 23 || index === 27));

    if (towardMora) {
      const last = trunk.points[trunk.points.length - 1];
      if (last && !nearMora(last.x, last.y)) {
        const join = grow(rng, last, Math.atan2(MORA.y - last.y, MORA.x - last.x), 5, 14, 0.22, MORA);
        push(join.points, mix(0.9, 1.45, rng()), index % 2 === 0 ? 'gold' : 'jade', index === 23);
      }
    }

    trunk.points.slice(1, -1).forEach((node, forkIndex) => {
      if (rng() > (forkIndex < 2 ? 0.42 : 0.62)) return;
      const dir = rng() > 0.5 ? 1 : -1;
      const forkHeading = trunk.heading + dir * mix(0.45, 1.05, rng());
      const fork = grow(rng, node, forkHeading, 4 + Math.floor(rng() * 4), 13, 0.55, null);
      const forkWidth = mix(0.28, 0.72, 1 - forkIndex / Math.max(1, trunk.points.length));
      push(fork.points, forkWidth, rng() > 0.68 ? 'gold' : 'hair');

      if (rng() > 0.48 && fork.points.length > 2) {
        const tip = fork.points[Math.max(1, Math.floor(fork.points.length * mix(0.35, 0.7, rng())))];
        const hair = grow(rng, tip, forkHeading + dir * mix(0.3, 0.8, rng()), 3 + Math.floor(rng() * 3), 11, 0.7, null);
        push(hair.points, mix(0.18, 0.4, rng()), 'hair');
      }
    });
  });

  origins.forEach((origin, index) => {
    if (index % 2 === 1) return;
    const sprout = grow(
      rng,
      origin,
      Math.PI / 2 + (rng() - 0.5) * 1.15,
      3 + Math.floor(rng() * 3),
      9,
      0.72,
      null,
    );
    push(sprout.points, mix(0.2, 0.48, rng()), index % 6 === 0 ? 'gold' : 'hair');
  });

  const around = 11;
  for (let i = 0; i < around; i += 1) {
    const spread = mix(-1.15, 1.15, i / (around - 1));
    const start = {
      x: MORA.x + Math.sin(spread) * mix(6, 14, rng()),
      y: MORA.y + Math.cos(spread) * 4 + 8,
    };
    const aimAngle = Math.PI / 2 + spread * 0.85;
    const root = grow(rng, start, aimAngle, 8, 17, 0.42, null);
    push(root.points, mix(0.55, 1.15, 1 - Math.abs(spread)), i === 5 ? 'gold' : 'jade', i === 4);

    root.points.slice(2, -1).forEach((node) => {
      if (rng() > 0.55) return;
      const dir = rng() > 0.5 ? 1 : -1;
      const side = grow(rng, node, aimAngle + dir * mix(0.5, 1.1, rng()), 4, 12, 0.6, null);
      push(side.points, mix(0.22, 0.5, rng()), rng() > 0.6 ? 'gold' : 'hair');
    });
  }

  return strands;
}

const STRANDS = buildStrands();

export default function EarthMycelium() {
  return (
    <div className={styles.field} data-testid="earth-mycelium">
      <svg className={styles.network} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id="earthMoraHalo" cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#e7f6ea" stopOpacity="0.2" />
            <stop offset="38%" stopColor="#c6e2b8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#6fa888" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="earthHyphaFade" x1="0" y1="0" x2="0" y2={VIEW_H} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="62%" stopColor="#fff" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
          </linearGradient>
          <mask id="earthHyphaMask">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#earthHyphaFade)" />
          </mask>
        </defs>

        <g mask="url(#earthHyphaMask)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {STRANDS.map((strand, index) => (
            <path
              key={`g-${index}`}
              className={styles.glow}
              d={strand.d}
              stroke={strand.tone === 'gold' ? '#e6c98d' : '#8fcdb0'}
              strokeWidth={strand.w * 4.8}
            />
          ))}
          {STRANDS.map((strand, index) => (
            <path
              key={`s-${index}`}
              className={`${styles.strand} ${styles[strand.tone]}`}
              d={strand.d}
              strokeWidth={strand.w}
            />
          ))}
          {STRANDS.filter((strand) => strand.pulse).map((strand, index) => (
            <path
              key={`p-${index}`}
              className={styles.pulse}
              d={strand.d}
              strokeWidth={Math.max(1.1, strand.w * 0.7)}
              pathLength={140}
            />
          ))}
        </g>

        <g className={styles.mora} role="img" aria-label="MÔRA">
          <circle cx={MORA.x} cy={MORA.y} r="86" fill="url(#earthMoraHalo)" />
          <image href="/brand/mora-stone-v1.png" x={MORA.x - 21} y={MORA.y - 21} width="42" height="42" />
        </g>
      </svg>
    </div>
  );
}
