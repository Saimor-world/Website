"use client";

import { useEffect, useRef } from "react";

type Props = {
  strength?: number;          // 0.05 – 0.4 (empfohlen)
  children: React.ReactNode;  // dein SVG mit Orbits
};

export default function ParallaxOrbits({ strength = 0.15, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Distanz des Orbits zur Viewport-Mitte -> -1..+1
      const dist = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.setProperty("--pY", `${dist * strength * 100}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className="parallax-container absolute inset-0 -z-10 pointer-events-none"
      style={{ transform: "translate3d(0,var(--pY,0),0)" }}
    >
      {children}
    </div>
  );
}
