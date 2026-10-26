import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraCharacterBody from './MoraCharacterBody';

vi.mock('next/dynamic', () => ({ default: () => function Scene(props: {
  active: boolean; still: boolean; state: string; onFailure: () => void;
}) {
  return <canvas data-testid="body-renderer" data-active={props.active}
    data-still={props.still} data-state={props.state} onClick={props.onFailure} />;
} }));
let intersect: (entries: { isIntersecting: boolean }[]) => void;
beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe() {} disconnect() {}
  });
});
afterEach(() => { cleanup();document.documentElement.classList.remove('lite');vi.unstubAllGlobals(); });

describe('shared Website body lifecycle', () => {
  it('stops a hidden or offscreen body and preserves the selected local expression', () => {
    render(<MoraCharacterBody still={false} state="listening" />);
    expect(screen.getByTestId('body-renderer')).toHaveAttribute('data-active', 'true');
    act(() => intersect([{ isIntersecting: false }]));
    expect(screen.getByTestId('body-renderer')).toHaveAttribute('data-active', 'false');
    act(() => intersect([{ isIntersecting: true }]));
    expect(screen.getByTestId('body-renderer')).toHaveAttribute('data-state', 'listening');
  });
  it('combines host pause with the existing site Lite signal without creating a setting', () => {
    const { rerender } = render(<MoraCharacterBody still />);
    expect(screen.getByTestId('body-renderer')).toHaveAttribute('data-still', 'true');
    rerender(<MoraCharacterBody still={false} />);
    expect(screen.getByTestId('body-renderer')).toHaveAttribute('data-still', 'false');
    act(() => { document.documentElement.classList.add('lite');window.dispatchEvent(new Event('saimor-lite')); });
    expect(screen.getByTestId('body-renderer')).toHaveAttribute('data-still', 'true');
  });
  it('replaces a failed renderer with localized text and notifies the accessible host', () => {
    const failure = vi.fn();
    render(<MoraCharacterBody locale="en" still onFailure={failure} />);
    act(() => screen.getByTestId('body-renderer').click());
    expect(screen.queryByTestId('body-renderer')).not.toBeInTheDocument();
    expect(screen.getByText('The interactive view is unavailable in this browser.')).toBeInTheDocument();
    expect(failure).toHaveBeenCalledTimes(1);
  });
});
