import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PixelMora from './PixelMora';

const figure = () => document.querySelector('[data-pixel-mora]') as HTMLElement;
const layers = () => [...figure().querySelectorAll('img')].map(img => img.getAttribute('src'));
beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('Pixel MÔRA (final set)', () => {
  it('wears the default wardrobe in the OS slot order: scarf, sprout, moon clip', () => {
    render(<PixelMora scale={3} />);
    expect(layers()).toEqual([
      '/mora/pixel/body.png', '/mora/pixel/light.png', '/mora/pixel/face.png', '/mora/pixel/eyes.png',
      '/mora/pixel/traits/neck-scarf.png', '/mora/pixel/traits/head-sprout.png', '/mora/pixel/traits/clip-moon.png',
    ]);
  });
  it('puts on the captain hat, which takes the head slot and hides the clip', () => {
    render(<PixelMora scale={3} outfit="captain" />);
    expect(layers().slice(4)).toEqual(['/mora/pixel/traits/neck-scarf.png', '/mora/pixel/traits/head-captain.png']);
  });
  it('scales by whole art pixels only', () => {
    for (const scale of [0.4, 2.5, 3.49, 5]) {
      render(<PixelMora scale={scale} />);
      expect(parseInt(figure().style.width, 10) % 40).toBe(0);
      cleanup();
    }
  });
  it('looks with the eyes_l / eyes_r frames, blinks, and sleeps with closed eyes', () => {
    const { rerender } = render(<PixelMora scale={2} look={-1} />);
    expect(layers()[3]).toBe('/mora/pixel/eyes_l.png');
    rerender(<PixelMora scale={2} look={1} />);
    expect(layers()[3]).toBe('/mora/pixel/eyes_r.png');
    let blinked = false;
    for (let t = 0; t < 6200 && !blinked; t += 50) { act(() => vi.advanceTimersByTime(50)); blinked = layers()[3] === '/mora/pixel/eyes_closed.png'; }
    expect(blinked).toBe(true);
    rerender(<PixelMora scale={2} mood="sleep" />);
    expect(layers()[3]).toBe('/mora/pixel/eyes_closed.png');
    // No loose 'z' glyph next to the sprite: sleep is closed eyes and slow breath.
    expect(figure().textContent).toBe('');
  });
  it('holds still with open eyes and no timers', () => {
    render(<PixelMora scale={2} look={1} still />);
    expect(layers()[3]).toBe('/mora/pixel/eyes.png');
    expect(vi.getTimerCount()).toBe(0);
    expect(figure()).toHaveAttribute('data-cheap-motion');
  });
});
