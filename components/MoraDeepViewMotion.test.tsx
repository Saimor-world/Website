import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraDeepView from './MoraDeepView';

vi.mock('next/image', () => ({
  default: ({ alt = '', priority: _priority, fill: _fill, quality: _quality, ...props }: any) => <img alt={alt} {...props} />,
}));

let frames: FrameRequestCallback[] = [];
const requested = vi.fn();
const contexts: string[] = [];
/** Runs every pending frame and returns how many new frames were requested meanwhile. */
const flush = () => {
  const pending = frames; frames = []; requested.mockClear();
  act(() => pending.forEach(callback => callback(performance.now() + 16)));
  return requested.mock.calls.length;
};

beforeEach(() => {
  frames = []; contexts.length = 0; window.localStorage.clear();
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { requested(); frames.push(callback); return frames.length; });
  vi.stubGlobal('cancelAnimationFrame', () => {});
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (type: string) {
    contexts.push(type);
    return type === '2d' ? ({ clearRect() {}, fillRect() {}, beginPath() {}, arc() {}, fill() {}, set fillStyle(_v: string) {}, set globalAlpha(_v: number) {} } as unknown as CanvasRenderingContext2D) : null;
  } as never);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('Deep View motion budget', () => {
  it('never asks for a WebGL context, from the stars to the river', () => {
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Durch ihre Augen sehen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Licht hereinlassen' }));
    expect(screen.getByRole('heading', { name: 'Klarheit.' })).toBeInTheDocument();
    expect(contexts.filter(type => /webgl/i.test(type))).toEqual([]);
    expect(contexts.filter(type => type === '2d').length).toBeLessThanOrEqual(1);
  });

  it.each([
    ['the opening stars', ''],
    ['the encounter with MÔRA', '#mora'],
    ['the clearing at the river', '#clarity'],
  ])('schedules no animation frame while paused in %s', (_scene, hash) => {
    window.history.replaceState(null, '', `/mora/deep-view${hash}`);
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    flush(); flush();
    expect(flush()).toBe(0);
    expect(document.querySelector('[data-paused="true"]')).not.toBeNull();
  });
});
