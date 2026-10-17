import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraAtmosphere from './MoraAtmosphere';

let frame: FrameRequestCallback | undefined;
let now = 0;
function advance(milliseconds: number) {
  act(() => {
    const end = now + milliseconds;
    while (now < end) { now += 25; frame?.(now); }
  });
}

beforeEach(() => {
  now = 0;
  vi.spyOn(performance, 'now').mockReturnValue(0);
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frame = callback; return 1; });
  vi.stubGlobal('cancelAnimationFrame', () => { frame = undefined; });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('mist and morning without GPU support', () => {
  it('holds the morning while paused or hidden and arrives once after resuming', () => {
    const onArrival = vi.fn();
    const base = { dawn: true, hurry: false, reduced: false, onArrival };
    const { rerender } = render(<MoraAtmosphere {...base} paused />);
    advance(15000);
    expect(onArrival).not.toHaveBeenCalled();
    rerender(<MoraAtmosphere {...base} paused={false} />);
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    advance(15000);
    expect(onArrival).not.toHaveBeenCalled();
    hidden.mockReturnValue(false);
    advance(11500);
    expect(onArrival).toHaveBeenCalledTimes(1);
    advance(2000);
    expect(onArrival).toHaveBeenCalledTimes(1);
  });

  it('shows the morning immediately for reduced motion and a deliberate paused skip', () => {
    const onArrival = vi.fn(() => {
      expect(document.querySelector('canvas')?.parentElement?.dataset.dawn).toBe('morning');
    });
    const base = { dawn: true, hurry: false, paused: false, reduced: true, onArrival };
    const { rerender } = render(<MoraAtmosphere {...base} />);
    advance(25);
    expect(onArrival).toHaveBeenCalledTimes(1);
    rerender(<MoraAtmosphere {...base} dawn={false} />);
    advance(25);
    rerender(<MoraAtmosphere {...base} reduced={false} paused hurry />);
    advance(25);
    expect(onArrival).toHaveBeenCalledTimes(2);
  });
});
