import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PixelMora from './PixelMora';

const figure = () => document.querySelector('[data-pixel-mora]') as HTMLElement;
const layers = () => [...figure().querySelectorAll('img')].map(img => img.getAttribute('src'));
const eyes = () => layers()[3];
beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup();vi.useRealTimers(); });

describe('Pixel MÔRA', () => {
  it('keeps every size a multiple of the 40 px grid', () => {
    for (const scale of [0.2, 1, 2.5, 3.49, 7]) {
      render(<PixelMora scale={scale} />);
      expect(parseInt(figure().style.width, 10) % 40).toBe(0);
      cleanup();
    }
  });
  it('holds still with open eyes under prefers-reduced-motion', () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
    try {
      render(<PixelMora scale={3} />);
      act(() => vi.advanceTimersByTime(12000));
      act(() => { window.dispatchEvent(new MouseEvent('pointermove', { clientX: 0, clientY: 0 })); });
      expect(eyes()).toBe('/mora/pixel/eyes.png');
    } finally { window.matchMedia = original; }
  });
  it('scales the 40 px sprite by whole numbers only', () => {
    render(<PixelMora scale={4.6} />);
    expect(figure().style.width).toBe('200px');
    expect(figure().style.getPropertyValue('--u')).toBe('5px');
    for (const img of figure().querySelectorAll('img')) expect(img).toHaveAttribute('width', '200');
  });
  it('blinks with the existing closed-eye frame and stays open when still', () => {
    render(<PixelMora scale={3} />);
    act(() => vi.advanceTimersByTime(5600));
    expect(eyes()).toBe('/mora/pixel/eyes_closed.png');
    act(() => vi.advanceTimersByTime(140));
    expect(eyes()).toBe('/mora/pixel/eyes.png');
    cleanup();render(<PixelMora scale={3} still />);
    act(() => vi.advanceTimersByTime(12000));
    expect(eyes()).toBe('/mora/pixel/eyes.png');
    expect(figure()).toHaveAttribute('data-still', 'true');
  });
  it('shows states through motion and a small hint, never new frames', () => {
    render(<PixelMora scale={3} state="night" />);
    expect(eyes()).toBe('/mora/pixel/eyes_closed.png');
    cleanup();render(<PixelMora scale={3} state="approval" />);
    expect(figure()).toHaveAttribute('data-state', 'approval');
    expect(figure().querySelectorAll('span')).toHaveLength(2);
    expect(figure().querySelectorAll('img')).toHaveLength(7);
  });
  it('wears the full set from mora-ui: scarf, sprout and moon clip above the base layers', () => {
    render(<PixelMora scale={3} />);
    expect(layers()).toEqual([
      '/mora/pixel/body.png', '/mora/pixel/light.png', '/mora/pixel/face.png', '/mora/pixel/eyes.png',
      '/mora/pixel/traits/neck-scarf.png', '/mora/pixel/traits/head-sprout.png', '/mora/pixel/traits/clip-moon.png',
    ]);
  });
  it('looks toward the pointer with the eyes_l / eyes_r frames, but not when still', () => {
    render(<PixelMora scale={3} />);
    figure().getBoundingClientRect = () => ({ left: 100, top: 100, width: 120, height: 120, right: 220, bottom: 220, x: 100, y: 100, toJSON() {} });
    act(() => { window.dispatchEvent(new MouseEvent('pointermove', { clientX: 20, clientY: 160 })); });
    expect(eyes()).toBe('/mora/pixel/eyes_l.png');
    act(() => vi.advanceTimersByTime(200));
    act(() => { window.dispatchEvent(new MouseEvent('pointermove', { clientX: 300, clientY: 160 })); });
    expect(eyes()).toBe('/mora/pixel/eyes_r.png');
    cleanup();render(<PixelMora scale={3} still />);
    act(() => { window.dispatchEvent(new MouseEvent('pointermove', { clientX: 20, clientY: 160 })); });
    expect(eyes()).toBe('/mora/pixel/eyes.png');
  });
});
