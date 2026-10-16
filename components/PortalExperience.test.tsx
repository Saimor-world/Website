import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PortalExperience from './PortalExperience';

afterEach(cleanup);

describe('PortalExperience — a single evocative place', () => {
  it('keeps the outside wordless and shows one quiet inside scene without icons or repeated explanations', () => {
    render(<PortalExperience locale="de" />);
    const door = screen.getByRole('button', { name: 'Schwelle betreten' });
    expect(door).toHaveAttribute('aria-haspopup', 'dialog');
    expect(door).toBeEmptyDOMElement();
    fireEvent.click(door);
    expect(screen.getByRole('heading', { name: 'Was bleibt, kommt mit.' })).toBeInTheDocument();
    expect(screen.getByText('JENSEITS DER SCHWELLE')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'MÔRA entdecken' })).toHaveAttribute('href', '/mora');
    expect(screen.queryByRole('button', { name: 'Briefing' })).not.toBeInTheDocument();
    expect(screen.queryByText(/EIN GEMEINSAMER FADEN/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Drinnen beginnt der Zusammenhang/)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dem Faden folgen' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zurück in den Wald' }));
    expect(screen.queryByRole('heading', { name: 'Was bleibt, kommt mit.' })).not.toBeInTheDocument();
    fireEvent.click(door);
    expect(screen.getByRole('heading', { name: 'Was bleibt, kommt mit.' })).toBeInTheDocument();
  });

  it('preserves English-language discovery and correct product links', () => {
    render(<PortalExperience locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Cross the threshold' }));
    expect(screen.getByRole('heading', { name: 'What matters stays with you.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore MÔRA' })).toHaveAttribute('href', '/en/mora');
    expect(screen.queryByText(/CONCEPT ONLY/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Return to the forest' }));
    expect(screen.queryByRole('heading', { name: 'What matters stays with you.' })).not.toBeInTheDocument();
  });
});
