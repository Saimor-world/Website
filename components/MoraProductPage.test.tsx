import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MoraProductPage from './MoraProductPage';

vi.mock('./AmbientParticleField', () => ({ default: () => <canvas aria-hidden="true" /> }));
vi.mock('@/components/DemoLaunchButton', () => ({ DemoLaunchButton: ({ label }: { label: string }) => <button>{label}</button> }));
afterEach(cleanup);

describe('MÔRA product page below the hero', () => {
  it('leaves the single MÔRA presence to the hero; the signals show pixel MÔRA between nature planets', () => {
    const { container } = render(<MoraProductPage locale="de" />);
    expect(container.querySelector('[data-mora-character]')).toBeNull();
    expect(screen.queryByTestId('mora-companion')).toBeNull();
    expect(container.querySelector('#persona')).toBeNull();
    expect(container.querySelector('[data-mora-presence]')).toBeNull();
    expect([...container.querySelectorAll('canvas[data-biome]')].map(c => c.getAttribute('data-biome'))).toEqual(['forest', 'water', 'light']);
  });

  it('keeps a connected, labelled example', () => {
    render(<MoraProductPage locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Termine' }));
    expect(screen.getByTestId('mora-context-preview')).toHaveTextContent('Mit Kontext in den Termin.');
    expect(screen.getByTestId('mora-context-preview')).toHaveTextContent('KEINE LIVE-DATEN');
    expect(screen.getByRole('button', { name: 'Termine' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Offene Dinge' }));
    expect(screen.getByTestId('mora-context-preview')).toHaveTextContent('Die Freigabe fehlt noch.');
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    expect(screen.getByTestId('mora-product')).toHaveAttribute('data-paused', 'true');
  });

  it('invites from the forest into the universe', () => {
    render(<MoraProductPage locale="de" />);
    expect(screen.getByRole('heading', { name: 'Vom Wald ins SAIMÔR-Universe.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mitkommen' })).toHaveAttribute('href', '/mora/deep-view?from=mora');
  });

  it('links the Deep View in English', () => {
    render(<MoraProductPage locale="en" />);
    expect(screen.getAllByRole('link', { name: 'Come along' })[0]).toHaveAttribute('href', '/en/mora/deep-view?from=mora');
  });
});
