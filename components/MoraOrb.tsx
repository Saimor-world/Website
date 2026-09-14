'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * MÔRA as a persona: the jade stone from the Saimôr sigil.
 *
 * This is that exact stone, cut from the approved master artwork
 * (public/brand/saimor-sigil-restored-v1.png) - never redrawn. The states only
 * add light around it:
 *
 *   rest   - quiet glow
 *   dream  - a slow jade breath, light wanders across the stone
 *   speak  - brighter pulse, a gold ring ripples outwards
 */
export type MoraOrbState = 'rest' | 'dream' | 'speak';

type Props = {
  size?: number;
  state?: MoraOrbState;
  /** Kept for compatibility; MÔRA is shown as the stone alone. */
  orbit?: boolean;
  className?: string;
  label?: string;
  priority?: boolean;
};

export default function MoraOrb({ size = 160, state = 'rest', className = '', label = 'MÔRA', priority = false }: Props) {
  return (
    <span
      role="img"
      aria-label={label}
      data-state={state}
      className={`mora-orb ${className}`}
      style={{ '--mora-size': `${size}px` } as CSSProperties}
    >
      <span className="mora-orb-aura" aria-hidden="true" />
      <span className="mora-orb-ripple" aria-hidden="true" />
      <Image
        src="/brand/mora-stone-v1.png"
        alt=""
        width={504}
        height={504}
        sizes={`${Math.max(size, 40)}px`}
        priority={priority}
        draggable={false}
        className="mora-orb-stone"
      />
      <span className="mora-orb-sheen" aria-hidden="true" />

      <style>{`
        :where(.mora-orb){width:var(--mora-size);height:var(--mora-size)}
        .mora-orb{position:relative;display:inline-block;flex-shrink:0;isolation:isolate}
        .mora-orb .mora-orb-stone{position:relative;z-index:1;display:block;width:100%;height:100%;user-select:none;filter:drop-shadow(0 6px 18px rgba(0,0,0,.45))}
        .mora-orb .mora-orb-aura{position:absolute;inset:-22%;z-index:0;border-radius:9999px;background:radial-gradient(circle,rgba(96,204,154,.42) 0%,rgba(62,160,118,.16) 42%,transparent 66%);opacity:.35;transition:opacity .8s ease}
        .mora-orb .mora-orb-sheen{position:absolute;inset:9%;z-index:2;border-radius:9999px;overflow:hidden;opacity:0;mix-blend-mode:screen;transition:opacity .8s ease;pointer-events:none}
        .mora-orb .mora-orb-sheen::before{content:"";position:absolute;inset:-35%;background:radial-gradient(circle at 34% 30%,rgba(214,255,232,.34),transparent 30%)}
        .mora-orb .mora-orb-ripple{position:absolute;inset:4%;z-index:0;border-radius:9999px;border:1px solid rgba(233,200,120,.55);opacity:0;pointer-events:none}
        .mora-orb[data-state="dream"] .mora-orb-aura{opacity:.6;animation:moraAura 6s ease-in-out infinite}
        .mora-orb[data-state="dream"] .mora-orb-sheen{opacity:.8}
        .mora-orb[data-state="dream"] .mora-orb-sheen::before{animation:moraSheen 14s linear infinite}
        .mora-orb[data-state="speak"] .mora-orb-aura{opacity:.95;animation:moraAura 2.4s ease-in-out infinite}
        .mora-orb[data-state="speak"] .mora-orb-sheen{opacity:.45}
        .mora-orb[data-state="speak"] .mora-orb-ripple{animation:moraRipple 2.4s ease-out infinite}
        @keyframes moraAura{0%,100%{transform:scale(.94)}50%{transform:scale(1.06)}}
        @keyframes moraSheen{to{transform:rotate(360deg)}}
        @keyframes moraRipple{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.35)}}
        @media(prefers-reduced-motion:reduce){.mora-orb *,.mora-orb *::before{animation:none!important}}
      `}</style>
    </span>
  );
}
