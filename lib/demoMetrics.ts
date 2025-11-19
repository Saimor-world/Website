export type DemoMetrics = {
  signals: number;
  resonance: number;
  rhythm: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function generateDemoMetrics(seed = Date.now()): DemoMetrics {
  const base = Math.abs(Math.sin(seed));
  const signals = clamp(Math.round(60 + base * 30), 45, 95);
  const resonance = clamp(Math.round(55 + base * 25), 40, 90);
  const rhythm = clamp(Math.round(50 + base * 20), 35, 85);

  return { signals, resonance, rhythm };
}
