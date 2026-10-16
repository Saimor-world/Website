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
  const b = (u: number) => Math.max(u, tiny ? .6 : .3);

  const eye = (sx: number, key: string) => arcs
    ? <path key={key} d={`M ${C + sx * ex - rx} ${ey + ry * .25} Q ${C + sx * ex} ${ey - ry * 1.15} ${C + sx * ex + rx} ${ey + ry * .25}`} strokeLinecap="round" strokeWidth={rx * .62} fill="none" />
    : <ellipse key={key} cx={C + sx * ex} cy={ey} rx={rx} ry={ry} />;

  const eyes = (color: string) => (
    <g className={styles.eyes} fill={arcs ? 'none' : color} stroke={arcs ? color : 'none'}>
      {eye(-1, 'left')}
      {eye(1, 'right')}
    </g>
  );
  const smileY = C + .44 * R - .1 * R;
  const smile = `M ${C - .11 * R} ${smileY} Q ${C} ${smileY + .13 * R} ${C + .11 * R} ${smileY}`;

  return (
    <span className={styles.face} data-face-state={state} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 100 100" focusable="false">
        <defs>
          <filter id={`w${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={b(.16 * R * .45)} /></filter>
          <filter id={`m${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={b(.05 * R * .6)} /></filter>
          <filter id={`c${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={b(tiny ? .9 : .011 * R * 1.4)} /></filter>
          <clipPath id={`j${id}`}><circle cx={C} cy={C} r={R} /></clipPath>
        </defs>
        <g clipPath={`url(#j${id})`}>
          <g className={styles.veins}>
            <g filter={`url(#w${id})`} opacity={tiny ? .55 : .75}>{eyes(`rgb(${jade})`)}</g>
            <g filter={`url(#m${id})`} opacity={.8}>{eyes(`rgb(${jade})`)}</g>
            {!tiny && <g filter={`url(#w${id})`} opacity={state === 'work' ? .1 : .22} fill="rgb(255,120,110)">
              <ellipse cx={C - .52 * R} cy={C + .38 * R} rx={.15 * R} ry={.1 * R} />
              <ellipse cx={C + .52 * R} cy={C + .38 * R} rx={.15 * R} ry={.1 * R} />
            </g>}
          </g>
          <g filter={`url(#c${id})`} opacity={.95}>{eyes(`rgb(${warm})`)}</g>
          {!arcs && <g fill="rgb(255,236,200)" filter={`url(#c${id})`}>
            <circle cx={C - ex - .05 * R} cy={ey - .08 * R} r={tiny ? .07 * R : .045 * R} />
            <circle cx={C + ex - .05 * R} cy={ey - .08 * R} r={tiny ? .07 * R : .045 * R} />
          </g>}
          {SMILE[state] && !tiny && (
            <path d={smile} fill="none" stroke={`rgba(${warm},.85)`} strokeWidth={.032 * R} strokeLinecap="round" filter={`url(#c${id})`} />
          )}
        </g>
      </svg>
      <span className={styles.leak} />
    </span>
  );
}
