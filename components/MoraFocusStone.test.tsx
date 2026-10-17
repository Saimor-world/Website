import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraFocusStone from './MoraFocusStone';

vi.mock('next/image', () => ({ default: ({ priority: _priority, alt, ...props }: any) => <img alt={alt} {...props} /> }));
let frame: FrameRequestCallback | undefined;
let now = 0;
const advance = (ms: number) => act(() => { const end = now + ms; while (now < end) { now += 25; frame?.(now); } });
const press = (button: HTMLElement) => {
  const event = new Event('pointerdown', { bubbles: true });
  Object.defineProperties(event, { button: { value: 0 }, pointerId: { value: 1 } });
  fireEvent(button, event);
};
beforeEach(() => {
  now = 0; frame = undefined;
  vi.spyOn(performance, 'now').mockReturnValue(0);
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frame = callback; return 1; });
  vi.stubGlobal('cancelAnimationFrame', () => { frame = undefined; });
  Object.defineProperty(HTMLButtonElement.prototype, 'setPointerCapture', { value: vi.fn(), configurable: true });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); delete (HTMLButtonElement.prototype as any).setPointerCapture; });
describe('a stable point in the field', () => {
  const base = { locale: 'de' as const, paused: false, reduced: false, disabled: false };
  it('releases partial focus without entering the clearing, then settles once after a sustained hold', () => {
    const onProgress = vi.fn(), onActive = vi.fn(), onSettled = vi.fn();
    render(<MoraFocusStone {...base} onProgress={onProgress} onActive={onActive} onSettled={onSettled} />);
    const stone = screen.getByRole('button', { name: 'MÔRA halten' });
    press(stone); advance(1000);
    expect(onActive).toHaveBeenLastCalledWith(true);
    expect(onProgress.mock.lastCall![0]).toBeGreaterThan(0);
    fireEvent.pointerUp(stone); advance(1500);
    expect(onProgress).toHaveBeenLastCalledWith(0);
    expect(onSettled).not.toHaveBeenCalled();
    press(stone); advance(3000); advance(1000);
    expect(onProgress).toHaveBeenLastCalledWith(1);
    expect(onSettled).toHaveBeenCalledTimes(1);
  });
  it('provides a keyboard click alternative and holds progress while hidden', () => {
    const onProgress = vi.fn(), onActive = vi.fn(), onSettled = vi.fn();
    render(<MoraFocusStone {...base} onProgress={onProgress} onActive={onActive} onSettled={onSettled} />);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA halten' }), { detail: 0 });
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    advance(5000); expect(onSettled).not.toHaveBeenCalled();
    hidden.mockReturnValue(false); advance(3000);
    expect(onSettled).toHaveBeenCalledTimes(1);
  });
  it('enters deliberately without timed holding when motion is paused or reduced', () => {
    const onProgress = vi.fn(), onActive = vi.fn(), onSettled = vi.fn();
    const { rerender } = render(<MoraFocusStone {...base} paused onProgress={onProgress} onActive={onActive} onSettled={onSettled} />);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA halten' }), { detail: 0 });
    expect(onSettled).toHaveBeenCalledTimes(1);
    rerender(<MoraFocusStone key="reduced" {...base} reduced onProgress={onProgress} onActive={onActive} onSettled={onSettled} />);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA halten' }), { detail: 0 });
    expect(onSettled).toHaveBeenCalledTimes(2);
  });
});
