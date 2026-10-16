import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MoraOsFace from './MoraOsFace';

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('MÔRA official OS A4 face', () => {
  it('begins with the OS glowing jade greeting arcs, then opens two OS-shaped eyes', () => {
    vi.useFakeTimers();
    const { container } = render(<MoraOsFace size={290} />);
    const face = container.querySelector('[data-face-state]');
    expect(face).toHaveAttribute('data-face-state', 'greet');
    expect(face?.querySelectorAll('svg path').length).toBeGreaterThanOrEqual(3);
    act(() => vi.advanceTimersByTime(2600));
    expect(face).toHaveAttribute('data-face-state', 'rest');
    expect(face?.querySelectorAll('svg ellipse').length).toBeGreaterThanOrEqual(4);
    expect(face?.querySelector('svg[viewBox="0 0 100 100"]')).not.toBeNull();
  });

  it('uses the authentic soft light geometry, never separately drawn iris or pupils', () => {
    const { container } = render(<MoraOsFace size={290} state="rest" />);
    const face = container.querySelector('[data-face-state="rest"]');
    expect(face).not.toBeNull();
    // JSDOM lowercases SVG clipPath selectors; assert the exact jade radius instead.
    expect(face?.querySelectorAll('svg circle[r="43"]')).toHaveLength(1);
    expect(face?.querySelectorAll('svg filter')).toHaveLength(3);
    expect(face?.querySelectorAll('svg ellipse').length).toBeGreaterThanOrEqual(4);
    expect(container.querySelector('[class*="pupil"]')).toBeNull();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
