import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PortalExperience from './PortalExperience';

afterEach(cleanup);

describe('PortalExperience — continuity beyond the threshold', () => {
  it('shows the digital room from the forest, then opens a concept-only accessible walkthrough', () => {
    const { container } = render(<PortalExperience locale="de" />);
    const door = screen.getByRole('button', { name: 'Durch die Tür sehen' });
    expect(door).toHaveAttribute('aria-haspopup', 'dialog');
    expect(container.querySelectorAll('[class*="pane"]')).toHaveLength(3);
    expect(container.querySelectorAll('[class*="connection"]')).toHaveLength(2);
    fireEvent.click(door);
    expect(screen.getByRole('heading', { name: 'Drinnen beginnt der Zusammenhang nicht von vorn.' })).toBeInTheDocument();
    expect(screen.getByText('PRINZIPDARSTELLUNG · KEINE VERBUNDENEN LIVE-DATEN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Briefing' })).toHaveAttribute('aria-pressed','true');
    fireEvent.click(screen.getByRole('button', { name: 'Nächster Zusammenhang' }));
    expect(screen.getByRole('button', { name: 'Termin' })).toHaveAttribute('aria-pressed','true');
    expect(screen.getByText('Besprechung, Dokument und nächste Schritte gehören zusammen.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Entscheidung' }));
    expect(screen.getByRole('button', { name: 'Entscheidung' })).toHaveAttribute('aria-pressed','true');
    expect(screen.getByText(/Handlungen setzen passende Quellen und Freigaben voraus/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mehr über MÔRA erfahren' })).toHaveAttribute('href','/mora');
    fireEvent.click(screen.getByRole('button', { name: 'Zurück in den Wald' }));
    expect(screen.queryByRole('heading', { name: 'Drinnen beginnt der Zusammenhang nicht von vorn.' })).not.toBeInTheDocument();
  });

  it('keeps the English experience and product destination localized', () => {
    render(<PortalExperience locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Look beyond the doorway' }));
    expect(screen.getByRole('heading', { name: 'Inside, context does not start over.' })).toBeInTheDocument();
    expect(screen.getByText('CONCEPT ONLY · NO CONNECTED LIVE DATA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore MÔRA' })).toHaveAttribute('href','/en/mora');
  });
});
