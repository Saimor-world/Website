import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import AmbientParticleField from './AmbientParticleField';

let frame: FrameRequestCallback | undefined;
let now = 0;
const colors = vi.fn();
const context = {
  clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), quadraticCurveTo: vi.fn(), stroke: vi.fn(),
  createRadialGradient: vi.fn((..._args: number[]) => ({ addColorStop: colors })), fillRect: vi.fn(), drawImage: vi.fn(), globalAlpha: 1,
  strokeStyle: '', fillStyle: '', lineWidth: 0,
  save: vi.fn(), restore: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(), clip: vi.fn(),
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

it('retains the same stars into first light and keeps an interactive water memory', () => {
  const focus = { current: 1 }, dawn = { current: 0 };
  const { rerender } = render(<AmbientParticleField scene="mist" focus={focus} dawn={dawn} />);
  advance();
  const original = context.drawImage.mock.calls.map((args: unknown[]) => args.slice(1));
  context.drawImage.mockClear();
  rerender(<AmbientParticleField scene="clearing" focus={focus} dawn={dawn} />); advance();
  expect(context.drawImage.mock.calls.map((args: unknown[]) => args.slice(1))).toEqual(original);
  dawn.current = .3; advance();
  expect(document.querySelector('canvas')).toHaveAttribute('data-phase', 'water');
  expect(colors.mock.lastCall?.[0]).toBe(1);
  dawn.current = .8; advance();
  const waterPoints = context.drawImage.mock.calls.slice(-72);
  expect(waterPoints.every((args: unknown[]) => Number(args[2]) > 350)).toBe(true);
  expect(context.clip).toHaveBeenCalled();
  dawn.current = 1; advance();
  expect(document.querySelector('canvas')).toHaveAttribute('data-phase', 'water-memory');
  expect(document.querySelector('canvas')).toHaveAttribute('data-fade', '0.550');
  const clears = context.clearRect.mock.calls.length;
  advance(1000); expect(context.clearRect.mock.calls.length).toBeGreaterThan(clears);
});

it.each([60, 120])('paints every display callback at %i Hz with one cached glow texture', hz => {
  render(<AmbientParticleField />);
  for (let i = 0; i < hz; i++) advance(1000 / hz);
  expect(context.clearRect).toHaveBeenCalledTimes(hz);
  expect(context.drawImage).toHaveBeenCalledTimes(hz * 22);
  expect(context.createRadialGradient).toHaveBeenCalledTimes(1);
});

it('illuminates the water network on hover and leaves it static under reduced motion', () => {
  const focus = { current: 1 }, dawn = { current: 1 }, pointer = { current: { x: .06, y: .54, energy: 1 } };
  const { rerender } = render(<AmbientParticleField scene="clearing" focus={focus} dawn={dawn} pointer={pointer} />);
  advance();
  expect(Number(document.querySelector('canvas')?.dataset.interaction)).toBeGreaterThan(.1);
  expect(pointer.current.energy).toBeLessThan(1);
  rerender(<AmbientParticleField scene="clearing" focus={focus} dawn={dawn} pointer={pointer} reduced />); advance();
  expect(document.querySelector('canvas')).toHaveAttribute('data-interaction', '0.000');
  const clears = context.clearRect.mock.calls.length;
  advance(); expect(context.clearRect).toHaveBeenCalledTimes(clears);
});

it('holds the field when paused or hidden, including ambient product previews', () => {
  const { rerender } = render(<AmbientParticleField paused />);
  advance(); const count = context.drawImage.mock.calls.length;
  advance(1000); expect(context.drawImage).toHaveBeenCalledTimes(count);
  rerender(<AmbientParticleField />); advance();
  expect(context.drawImage.mock.calls.length).toBeGreaterThan(count);
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  const visibleCount = context.drawImage.mock.calls.length;
  advance(1000); expect(context.drawImage).toHaveBeenCalledTimes(visibleCount);
  hidden.mockReturnValue(false); advance();
  expect(context.drawImage.mock.calls.length).toBeGreaterThan(visibleCount);
});
