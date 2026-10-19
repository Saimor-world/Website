import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ExtOrbit from '@/app/owner/finance/ExtOrbit';
import fixture from './fixtures/finance-status-v2.json';

afterEach(cleanup);

describe('ExtOrbit (owner, read-only)', () => {
  it('renders nothing without ext (fallback to current view)', () => {
    const { container } = render(<ExtOrbit ext={null} ts={null} ageS={null} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders core tiers, FUZZY and memes from ext', () => {
    render(<ExtOrbit ext={fixture.ext as any} ts={fixture.ts} ageS={30} />);
    for (const usd of [3, 5, 10, 20]) expect(screen.getByTestId(`tier-${usd}`)).toBeTruthy();
    expect(screen.getByTestId('pos-FUZZY')).toBeTruthy();
    expect(screen.getByTestId('pos-ARMY')).toBeTruthy();
    expect(screen.getByTestId('pos-PHNIX')).toBeTruthy();
    expect(screen.getByText(/Trailing ab \$5/)).toBeTruthy();
    expect(screen.queryByTestId('stale')).toBeNull();
  });

  it('has no buttons or controls', () => {
    const { container } = render(<ExtOrbit ext={fixture.ext as any} ts={fixture.ts} ageS={30} />);
    expect(container.querySelectorAll('button, input, form, select').length).toBe(0);
  });

  it('draws open breakouts as comets', () => {
    const ext = { ...fixture.ext, breakouts: { enabled: true, watchlist: 14, open: { SOLO: { change_pct: 12.5 } }, closed: [] } };
    render(<ExtOrbit ext={ext as any} ts={fixture.ts} ageS={30} />);
    expect(screen.getByTestId('comet-SOLO')).toBeTruthy();
  });

  it('shows a stale notice after 10 minutes', () => {
    render(<ExtOrbit ext={fixture.ext as any} ts={fixture.ts} ageS={601} />);
    expect(screen.getByTestId('stale').textContent).toMatch(/älter als 10 Min/);
  });
});
