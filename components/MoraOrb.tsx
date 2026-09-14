'use client';

import { useId } from 'react';

/**
 * MÔRA as a persona: the jade stone from the Saimôr sigil.
 *
 * In the logo a jade sphere circles the golden S on its orbit. MÔRA is that
 * stone - the memory that keeps circling the company's work. The veins inside
 * are the mycelium.
 *
 *   rest   - quiet, dark jade; veins barely visible
 *   dream  - light travels along the veins, connections are being drawn
 *   speak  - the stone brightens and breathes
 */
export type MoraOrbState = 'rest' | 'dream' | 'speak';

type Props = {
  size?: number;
  state?: MoraOrbState;
  orbit?: boolean;
  className?: string;
  label?: string;
};

// Fine marble veins, branching like mycelium.
const VEINS = [
  'M 14 44 C 26 46, 33 39, 42 43 C 51 47, 56 55, 66 54 C 74 53, 80 58, 88 62',
  'M 42 43 C 44 34, 40 26, 46 16',
  'M 66 54 C 68 64, 64 72, 70 84',
  'M 22 66 C 30 62, 38 68, 46 64 C 52 61, 57 66, 62 70',
  'M 56 22 C 60 29, 67 31, 74 38 C 78 42, 84 42, 89 47',
  'M 33 80 C 38 75, 43 77, 49 72',
  'M 74 38 C 72 46, 76 50, 80 55',
] as const;

export default function MoraOrb({ size = 160, state = 'rest', orbit = false, className = '', label = 'MÔRA' }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const viewBox = orbit ? '-34 -6 168 112' : '0 0 100 100';
  const width = orbit ? Math.round(size * 1.68) : size;
  const height = orbit ? Math.round(size * 1.12) : size;

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      data-state={state}
      className={`mora-orb ${className}`}
    >
      <defs>
        <radialGradient id={`body-${id}`} cx="38%" cy="32%" r="72%">
          <stop offset="0" stopColor="#5fae8a" />
          <stop offset=".28" stopColor="#1f6f4f" />
          <stop offset=".62" stopColor="#0d4631" />
          <stop offset="1" stopColor="#031b12" />
        </radialGradient>
        <radialGradient id={`shade-${id}`} cx="72%" cy="76%" r="62%">
          <stop offset="0" stopColor="#000" stopOpacity=".55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor="#6fd3a8" stopOpacity=".5" />
          <stop offset=".6" stopColor="#3f9e78" stopOpacity=".12" />
          <stop offset="1" stopColor="#3f9e78" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8e3a0" />
          <stop offset=".4" stopColor="#c49339" />
          <stop offset=".7" stopColor="#f3d68a" />
          <stop offset="1" stopColor="#9c6f26" />
        </linearGradient>
        <filter id={`soft-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <filter id={`veinGlow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation=".9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`clip-${id}`}>
          <circle cx="50" cy="50" r="40" />
        </clipPath>
      </defs>

      {orbit && (
        <ellipse cx="50" cy="50" rx="78" ry="20" fill="none" stroke={`url(#gold-${id})`} strokeWidth="1" strokeOpacity=".7" transform="rotate(-16 50 50)" />
      )}

      <circle className="mora-orb-glow" cx="50" cy="50" r="50" fill={`url(#glow-${id})`} />
      <circle cx="50" cy="50" r="40" fill={`url(#body-${id})`} />

      <g clipPath={`url(#clip-${id})`}>
        {/* soft clouds inside the stone */}
        <g filter={`url(#soft-${id})`} opacity=".55">
          <ellipse cx="64" cy="64" rx="18" ry="11" fill="#021a10" transform="rotate(-24 64 64)" />
          <ellipse cx="30" cy="56" rx="9" ry="15" fill="#2c8a63" fillOpacity=".55" transform="rotate(18 30 56)" />
          <ellipse cx="58" cy="30" rx="12" ry="6" fill="#7cc7a4" fillOpacity=".35" transform="rotate(20 58 30)" />
        </g>
        {/* veins: always there, faint */}
        <g className="mora-orb-veins" filter={`url(#veinGlow-${id})`}>
          {VEINS.map((d) => (
            <path key={d} d={d} fill="none" stroke="#bff0d8" strokeWidth=".45" strokeLinecap="round" />
          ))}
        </g>
        {/* light travelling along the veins while dreaming */}
        <g className="mora-orb-pulse">
          {VEINS.map((d, index) => (
            <path key={`p-${d}`} d={d} fill="none" stroke="#f4ffe9" strokeWidth=".9" strokeLinecap="round" pathLength={100} style={{ animationDelay: `${index * -0.55}s` }} />
          ))}
        </g>
        <circle cx="50" cy="50" r="40" fill={`url(#shade-${id})`} />
        {/* glossy highlight */}
        <ellipse cx="37" cy="30" rx="9" ry="4.6" fill="#ffffff" fillOpacity=".32" transform="rotate(-34 37 30)" />
        <ellipse cx="34" cy="33" rx="16" ry="10" fill="#ffffff" fillOpacity=".06" transform="rotate(-34 34 33)" />
      </g>

      <circle cx="50" cy="50" r="40.9" fill="none" stroke={`url(#gold-${id})`} strokeWidth="2.2" />
      <circle cx="50" cy="50" r="39.6" fill="none" stroke="#000" strokeOpacity=".35" strokeWidth=".6" />

      {orbit && (
        <path d="M -24 66 C 10 84, 92 74, 126 38" fill="none" stroke={`url(#gold-${id})`} strokeWidth="1" strokeOpacity=".9" transform="rotate(-4 50 50)" />
      )}

      <g className="mora-orb-glint">
        <path d="M 80 12 L 81 16 L 85 17 L 81 18 L 80 22 L 79 18 L 75 17 L 79 16 Z" fill="#fff4cf" />
      </g>

      <style>{`
        .mora-orb .mora-orb-glow{opacity:.35;transform-origin:50px 50px;transition:opacity .6s ease}
        .mora-orb .mora-orb-veins{opacity:.28;transition:opacity .6s ease}
        .mora-orb .mora-orb-pulse path{stroke-dasharray:0 100;opacity:0}
        .mora-orb .mora-orb-glint{opacity:.6}
        .mora-orb[data-state="dream"] .mora-orb-veins{opacity:.5}
        .mora-orb[data-state="dream"] .mora-orb-glow{opacity:.6}
        .mora-orb[data-state="dream"] .mora-orb-pulse path{opacity:.9;stroke-dasharray:7 93;animation:moraOrbPulse 3.4s linear infinite}
        .mora-orb[data-state="speak"] .mora-orb-glow{opacity:1;animation:moraOrbBreathe 2.4s ease-in-out infinite}
        .mora-orb[data-state="speak"] .mora-orb-veins{opacity:.6}
        .mora-orb .mora-orb-glint{animation:moraOrbGlint 5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        @keyframes moraOrbPulse{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
        @keyframes moraOrbBreathe{0%,100%{transform:scale(.94)}50%{transform:scale(1.06)}}
        @keyframes moraOrbGlint{0%,70%,100%{opacity:.25;transform:scale(.7)}80%{opacity:1;transform:scale(1.2)}}
        @media(prefers-reduced-motion:reduce){.mora-orb *{animation:none!important}}
      `}</style>
    </svg>
  );
}
