'use client';

import React, { useEffect, useState } from 'react';
import styles from './MoraOsFace.module.css';

/**
 * Faithful website adapter of Saimor-world/mora-ui:
 * components/mora/MoraFace.tsx (MÔRA A4, approved Oct 14).
 * The brand stone image is NEVER repainted. This is transparent light inside
 * the same jade stone, with exactly the OS eye and smile geometry.
 * No OS store dependency is introduced into the public website.
 */
type FaceState = 'greet' | 'rest' | 'think' | 'work' | 'done' | 'need' | 'listen';
const RY: Record<FaceState, number> = {
  rest: .205, greet: .2, listen: .225, think: .17, work: .11, done: .2, need: .21,
};
const SMILE: Record<FaceState, boolean> = {
  rest: true, greet: true, listen: true, think: false, work: false, done: true, need: true,
};
const R = 43;
const C = 50;

export default function MoraOsFace({ size = 290, state: forced }: { size?: number; state?: FaceState }) {
  const [greeting, setGreeting] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setGreeting(false), 2600);
    return () => window.clearTimeout(id);
  }, []);

  const state: FaceState = forced ?? (greeting ? 'greet' : 'rest');
  const arcs = (state === 'greet' || state === 'done') && size >= 64;
  const tiny = size < 64;
  const ex = .34 * R;
  const ey = C + .16 * R + (state === 'work' ? .05 * R : state === 'think' ? -.03 * R : 0);
  const rx = .165 * R;
  const ry = RY[state] * R;
  const warm = state === 'need' ? '255,219,140' : '204,255,224';
  const jade = state === 'need' ? '255,196,110' : '64,242,140';
  const id = React.useId().replace(/:/g, '');
  // Every optical layer, including highlights, lives in the same blink group.
  // Unfiltered gradients avoid SVG filter-buffer edges when Safari scales a blink.
  const eye = (sx: number, key: string) => {
    const x = C + sx * ex;
    const arc = `M ${x - rx} ${ey + ry * .25} Q ${x} ${ey - ry * 1.15} ${x + rx} ${ey + ry * .25}`;
    return <g key={key} className={styles.eye} style={{ transformOrigin: `${x}px ${ey}px` }}>
      {arcs ? <>
        <path d={arc} stroke={`rgb(${jade})`} strokeWidth={rx * 1.8} opacity=".08" />
        <path d={arc} stroke={`rgb(${jade})`} strokeWidth={rx * .95} opacity=".22" />
        <path d={arc} stroke={`rgb(${warm})`} strokeWidth={rx * .54} opacity=".95" />
      </> : <>
        <ellipse cx={x} cy={ey} rx={rx * 2.5} ry={ry * 2.2} fill={`url(#halo${id})`} />
        <ellipse cx={x} cy={ey} rx={rx * 1.12} ry={ry * 1.1} fill={`url(#eye${id})`} />
        <ellipse cx={x} cy={ey} rx={rx * .83} ry={ry * .88} fill={`rgb(${warm})`} opacity=".8" />
        <ellipse cx={x - rx * .28} cy={ey - ry * .37} rx={rx * .24} ry={ry * .16} fill="#fff5d7" opacity=".7" />
      </>}
    </g>;
  };
  const smileY = C + .44 * R - .1 * R;
  const smile = `M ${C - .11 * R} ${smileY} Q ${C} ${smileY + .13 * R} ${C + .11 * R} ${smileY}`;

  return (
    <span className={styles.face} data-face-state={state} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 100 100" focusable="false">
        <defs>
          <radialGradient id={`halo${id}`}><stop stopColor={`rgb(${jade})`} stopOpacity=".45" /><stop offset=".45" stopColor={`rgb(${jade})`} stopOpacity=".12" /><stop offset="1" stopColor={`rgb(${jade})`} stopOpacity="0" /></radialGradient>
          <radialGradient id={`eye${id}`}><stop offset=".5" stopColor={`rgb(${warm})`} /><stop offset="1" stopColor={`rgb(${jade})`} stopOpacity="0" /></radialGradient>
          <clipPath id={`j${id}`}><circle cx={C} cy={C} r={R} /></clipPath>
        </defs>
        <g clipPath={`url(#j${id})`}>
          <g className={styles.gaze} fill="none" strokeLinecap="round">
            {eye(-1, 'left')}{eye(1, 'right')}
          </g>
          {SMILE[state] && !tiny && <path d={smile} fill="none" stroke={`rgba(${warm},.8)`} strokeWidth={.032 * R} strokeLinecap="round" />}
        </g>
      </svg>
      <span className={styles.leak} />
    </span>
  );
}
