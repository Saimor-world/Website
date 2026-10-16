import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PortalExperience from './PortalExperience';

afterEach(cleanup);

describe('PortalExperience — cinematic entry before contextual explanation', () => {
  it('keeps the forest doorway wordless and opens a film-like, symbol-free first stage', () => {
    const { container } = render(<PortalExperience locale="de" />);
    const door = screen.getByRole('button', { name: 'Portal betreten' });
    expect(door).toHaveAttribute('aria-haspopup', 'dialog');
    expect(door).toBeEmptyDOMElement();
    expect(door.querySelectorAll('img')).toHaveLength(0);
    fireEvent.click(door);
    expect(screen.getByRole('heading', { name: 'Was bleibt, kommt mit.' })).toBeInTheDocument();
    expect(container.querySelector('[data-stage="atmosphere"]')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Briefing' })).not.toBeInTheDocument();
    expect(screen.queryByText('PRINZIPDARSTELLUNG · KEINE VERBUNDENEN LIVE-DATEN')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dem Faden folgen' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zurück in den Wald' }));
    expect(screen.queryByRole('heading', { name: 'Was bleibt, kommt mit.' })).not.toBeInTheDocument();
  });

  it('lets visitors deliberately advance to the existing contextual walkthrough', () => {
    render(<PortalExperience locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Portal betreten' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dem Faden folgen' }));
    expect(screen.getByRole('heading', { name: 'Drinnen beginnt der Zusammenhang nicht von vorn.' })).toBeInTheDocument();
    expect(screen.getByText('PRINZIPDARSTELLUNG · KEINE VERBUNDENEN LIVE-DATEN')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Briefing' })).toHaveAttribute('aria-pressed','true');
    fireEvent.click(screen.getByRole('button', { name: 'Nächster Zusammenhang' }));
    expect(screen.getByRole('button', { name: 'Termin' })).toHaveAttribute('aria-pressed','true');
    expect(screen.getByText('Besprechung, Dokument und nächste Schritte gehören zusammen.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Entscheidung' }));
    expect(screen.getByText(/Handlungen setzen passende Quellen und Freigaben voraus/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mehr über MÔRA erfahren' })).toHaveAttribute('href','/mora');
    fireEvent.click(screen.getByRole('button', { name: 'Zurück in den Wald' }));
    expect(screen.queryByRole('heading', { name: 'Drinnen beginnt der Zusammenhang nicht von vorn.' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Portal betreten' }));
    expect(screen.getByRole('heading', { name: 'Was bleibt, kommt mit.' })).toBeInTheDocument();
  });

  it('localizes the atmosphere and subsequent MÔRA context for English readers', () => {
    render(<PortalExperience locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Enter the portal' }));
    expect(screen.getByRole('heading', { name: 'What matters stays with you.' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Meeting' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Follow the thread' }));
    expect(screen.getByRole('heading', { name: 'Inside, context does not start over.' })).toBeInTheDocument();
    expect(screen.getByText('CONCEPT ONLY · NO CONNECTED LIVE DATA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore MÔRA' })).toHaveAttribute('href','/en/mora');
  });
});
