import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import MoraClearing from './MoraClearing';
let frame: FrameRequestCallback;
beforeEach(() => {
  vi.spyOn(performance, 'now').mockReturnValue(0);
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frame = callback; return 1; });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
it('retains all decorative layers and 36 motes, moving only cached surfaces', () => {
  const look = { current: { x: 1, y: .5 } };
  const { container, rerender } = render(<MoraClearing look={look} />);
  expect(container.querySelectorAll('i')).toHaveLength(36);
  const layer = container.querySelector<HTMLElement>('[data-parallax="-12"]')!;
  act(() => frame(16.67)); expect(layer.style.transform).toContain('translate3d');
  expect(container.firstElementChild?.getAttribute('style')).toBeNull();
  const previous = layer.style.transform;
  rerender(<MoraClearing look={look} still />); look.current.x = -1;
  act(() => frame(33.34)); expect(layer.style.transform).toBe(previous);
});
