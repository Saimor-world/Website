import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import AmbientParticleField from './AmbientParticleField';

let frame: FrameRequestCallback | undefined;
let now = 0;
const colors = vi.fn();
const context = {
  clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), quadraticCurveTo: vi.fn(), stroke: vi.fn(),
  createRadialGradient: vi.fn((..._args: number[]) => ({ addColorStop: colors })), fillRect: vi.fn(),
  strokeStyle: '', fillStyle: '', lineWidth: 0,
};
const advance = (ms = 50) => act(() => { now += ms; frame?.(now); });
beforeEach(() => {
  now = 0; vi.clearAllMocks();
  vi.spyOn(performance, 'now').mockReturnValue(0);
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 600, height: 700 } as DOMRect);
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frame = callback; return 1; });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it('retains the same stars into first light, settles them into water and fades before resting', () => {
  const focus = { current: 1 }, dawn = { current: 0 };
  const { rerender } = render(<AmbientParticleField scene="mist" focus={focus} dawn={dawn} />);
  advance();
  const original = context.createRadialGradient.mock.calls.map(args => args.slice(0, 2));
  context.createRadialGradient.mockClear();
  rerender(<AmbientParticleField scene="clearing" focus={focus} dawn={dawn} />); advance();
  expect(context.createRadialGradient.mock.calls.map(args => args.slice(0, 2))).toEqual(original);
  dawn.current = .3; advance();
  expect(document.querySelector('canvas')).toHaveAttribute('data-phase', 'water');
  expect(colors.mock.lastCall?.[0]).toBe(1);
  dawn.current = .8; advance();
  const waterPoints = context.createRadialGradient.mock.calls.slice(-30);
  expect(waterPoints.every(args => (args as unknown as number[])[1] > 440)).toBe(true);
  const lateAlpha = Number(String(colors.mock.calls.at(-2)?.[1]).match(/,([.\d]+)\)$/)?.[1]);
  expect(lateAlpha).toBeGreaterThan(0); expect(lateAlpha).toBeLessThan(.15);
  dawn.current = 1; advance();
  expect(document.querySelector('canvas')).toHaveAttribute('data-phase', 'rest');
  const clears = context.clearRect.mock.calls.length;
  advance(1000); expect(context.clearRect).toHaveBeenCalledTimes(clears);
});

it('holds the field when paused or hidden, including ambient product previews', () => {
  const { rerender } = render(<AmbientParticleField paused />);
  advance(); const count = context.fillRect.mock.calls.length;
  advance(1000); expect(context.fillRect).toHaveBeenCalledTimes(count);
  rerender(<AmbientParticleField />); advance();
  expect(context.fillRect.mock.calls.length).toBeGreaterThan(count);
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  const visibleCount = context.fillRect.mock.calls.length;
  advance(1000); expect(context.fillRect).toHaveBeenCalledTimes(visibleCount);
  hidden.mockReturnValue(false); advance();
  expect(context.fillRect.mock.calls.length).toBeGreaterThan(visibleCount);
});
