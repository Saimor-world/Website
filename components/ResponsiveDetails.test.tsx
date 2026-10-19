import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ResponsiveDetails from './ResponsiveDetails';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function media(initial: boolean) {
  let listener: (() => void) | undefined;
  const query = { matches: initial, addEventListener: vi.fn((_event, next) => { listener = next; }), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', vi.fn(() => query));
  return { query, change(next: boolean) { act(() => { query.matches = next; listener?.(); }); } };
}

describe('Responsive public details', () => {
  it('starts compact on mobile and preserves entered values across closing and resizing', () => {
    const m = media(false);
    const { container } = render(<ResponsiveDetails title="Optional"><input aria-label="Company" defaultValue="" /></ResponsiveDetails>);
    const details = container.querySelector('details')!;
    expect(details).not.toHaveAttribute('open');
    act(() => { details.open = true; fireEvent(details, new Event('toggle')); });
    fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Example' } });
    act(() => { details.open = false; fireEvent(details, new Event('toggle')); });
    expect(screen.getByLabelText('Company')).toHaveValue('Example');
    m.change(true); expect(details).toHaveAttribute('open');
    m.change(false); expect(details).not.toHaveAttribute('open');
    expect(screen.getByLabelText('Company')).toHaveValue('Example');
  });

  it('keeps desktop content expanded and cleans up the media listener', () => {
    const m = media(true);
    const { container, unmount } = render(<ResponsiveDetails title="Navigation"><a href="/mora">MÔRA</a></ResponsiveDetails>);
    expect(container.querySelector('details')).toHaveAttribute('open');
    expect(container.querySelector('summary')).toHaveAttribute('tabindex', '-1');
    unmount(); expect(m.query.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
