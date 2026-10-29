'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './DeepViewScenery.module.css';

export type DeepViewStage = 'stars' | 'light' | 'forest' | 'river';

/** Stars are painted once per size into a single small canvas; they move only through CSS. */
function StarField({ still }: { still: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const paint = () => {
      const bounds = element.getBoundingClientRect();
      const width = Math.max(1, bounds.width || 390), height = Math.max(1, bounds.height || 844);
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const context = element.getContext('2d');
      if (!context) return;
      element.width = Math.round(width * scale); element.height = Math.round(height * scale);
      context.clearRect(0, 0, element.width, element.height);
      const count = width <= 700 ? 70 : 150;
      for (let i = 0; i < count; i++) {
        // Deterministic golden-angle spread: the same sky on every visit, no Math.random.
        const x = ((i * 0.618034) % 1) * element.width;
        const y = ((i * 0.381966 + (i % 7) * 0.091) % 1) * element.height;
        const radius = (i % 11 === 0 ? 1.5 : i % 3 === 0 ? 1 : 0.6) * scale;
        context.globalAlpha = i % 11 === 0 ? 0.95 : 0.35 + (i % 5) * 0.1;
        context.fillStyle = i % 4 === 0 ? '#f6e8bd' : '#e8efe2';
        context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
      }
    };
    paint();
    const resize = new ResizeObserver(paint); resize.observe(element);
    // Offscreen, the drift animation pauses (data-offscreen) so the compositor has nothing to do.
    const sight = new IntersectionObserver(([entry]) => { element.dataset.offscreen = String(!entry.isIntersecting); });
    sight.observe(element);
    return () => { resize.disconnect(); sight.disconnect(); };
  }, []);
  return <canvas ref={canvas} className={styles.stars} data-still={still} aria-hidden="true" />;
}

/**
 * Stars, then light, then the forest grows out of that point of light, then the view settles
 * on the river. Only transform and opacity animate; no shader, no per-frame filters.
 * The returned ref is the gentle look layer (translate with a CSS transition, no loop).
 */
const DeepViewScenery = forwardRef<HTMLDivElement, { stage: DeepViewStage; still: boolean }>(function DeepViewScenery({ stage, still }, look) {
  return <div className={styles.scenery} data-stage={stage} data-still={still} aria-hidden="true">
    <StarField still={still} />
    <div className={styles.light} />
    <div ref={look} className={styles.look}>
      <div className={styles.river}>
        <div className={styles.rise}>
          <Image src="/images/saimor-forest-layer.webp" alt="" fill sizes="100vw" quality={76}
            className={styles.forest} />
        </div>
      </div>
      <div className={styles.water} />
    </div>
    <div className={styles.shade} />
  </div>;
});
export default DeepViewScenery;
