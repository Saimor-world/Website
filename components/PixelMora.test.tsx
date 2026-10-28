import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PixelMora from './PixelMora';

const figure = () => document.querySelector('[data-pixel-mora]') as HTMLElement;
const eyes = () => [...figure().querySelectorAll('img')].map(img => img.getAttribute('src')).pop();
beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup();vi.useRealTimers(); });

describe('Pixel MÔRA', () => {
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
    expect(figure().querySelectorAll('img')).toHaveLength(4);
  });
});
