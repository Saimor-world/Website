import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MoraProductPage from './MoraProductPage';

vi.mock('./AmbientParticleField', () => ({ default: () => <canvas aria-hidden="true" /> }));
vi.mock('@/components/DemoLaunchButton', () => ({ DemoLaunchButton: ({ label }: { label: string }) => <button>{label}</button> }));
afterEach(cleanup);

describe('MÔRA product character and companion', () => {
  it('shows the original stone with visible A4 eyes and a connected, labelled example', () => {
    const { container } = render(<MoraProductPage locale="de" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sie hält den Faden.');
    const hero = container.querySelector('[data-mora-character]');
    expect(hero?.querySelector('[data-face-state="rest"] svg ellipse')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Termine' }));
    expect(screen.getByTestId('mora-context-preview')).toHaveTextContent('Mit Kontext in den Termin.');
    expect(screen.getByTestId('mora-context-preview')).toHaveTextContent('KEINE LIVE-DATEN');
    expect(hero).toHaveAttribute('data-mood', 'listen');
    expect(screen.getByRole('button', { name: 'Termine' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Offene Dinge' }));
    expect(screen.getByTestId('mora-context-preview')).toHaveTextContent('Die Freigabe fehlt noch.');
  });

  it('changes her expression and pauses the decorative motion including the companion', () => {
    const { container } = render(<MoraProductPage locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Träumt' }));
    const persona = container.querySelector('#persona [data-mora-character]');
    expect(persona?.querySelector('[data-face-state]')).toHaveAttribute('data-face-state', 'think');
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    expect(screen.getByTestId('mora-product')).toHaveAttribute('data-paused', 'true');
    expect(screen.getByTestId('mora-companion')).toHaveAttribute('data-paused', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung fortsetzen' }));
    expect(screen.getByTestId('mora-product')).toHaveAttribute('data-paused', 'false');
  });

  it('opens the little companion, offers real destinations and restores focus on Escape', () => {
    render(<MoraProductPage locale="de" />);
    const button = screen.getByRole('button', { name: 'Kleine MÔRA kennenlernen' });
    fireEvent.click(button);
    const panel = screen.getByRole('dialog', { name: 'MÔRA an deiner Seite' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(within(panel).getByRole('link', { name: 'Zur Lichtung' })).toHaveAttribute('href', '/mora/deep-view?from=mora');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the English character actions on the English journey', () => {
    render(<MoraProductPage locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Meet little MÔRA' }));
    const panel = screen.getByRole('dialog', { name: 'MÔRA by your side' });
    expect(within(panel).getByRole('link', { name: 'Visit the clearing' })).toHaveAttribute('href', '/en/mora/deep-view?from=mora');
    fireEvent.click(screen.getByRole('button', { name: 'Listening' }));
    expect(screen.getByRole('button', { name: 'Listening' })).toHaveAttribute('aria-pressed', 'true');
  });
});
