import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraFlyby from './MoraFlyby';
import HeroMotionStage from './HeroMotionStage';

const reduced = (matches: boolean) => vi.stubGlobal('matchMedia', (query: string) => ({
  matches: matches && query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {},
}));
const Hero = () => <HeroMotionStage locale="de" className="hero" labelledBy="t"><h1 id="t">Saimôr</h1><MoraFlyby /></HeroMotionStage>;

beforeEach(() => { window.sessionStorage.clear(); window.localStorage.clear(); reduced(false); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('MÔRA flies past the hero', () => {
  it('crosses once per visit, is not clickable and then leaves the hero as it was', () => {
    const first = render(<Hero />);
    const flyby = screen.getByTestId('mora-flyby');
    expect(flyby).toHaveAttribute('aria-hidden', 'true');
    expect(flyby.querySelector('button, a')).toBeNull();
    fireEvent.animationEnd(flyby);
    expect(screen.queryByTestId('mora-flyby')).toBeNull();
    first.unmount();
    render(<Hero />);
    expect(screen.queryByTestId('mora-flyby')).toBeNull();
  });

  it('never flies under reduced motion', () => {
    reduced(true);
    render(<Hero />);
    expect(screen.queryByTestId('mora-flyby')).toBeNull();
  });

  it('lands at once when the visitor pauses hero motion', () => {
    render(<Hero />);
    expect(screen.getByTestId('mora-flyby')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    expect(screen.queryByTestId('mora-flyby')).toBeNull();
  });
});
