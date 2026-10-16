import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ContextSignals from './ContextSignals';

afterEach(cleanup);

describe('ContextSignals', () => {
  it('makes four contextual examples discoverable instead of static marketing bullets', () => {
    render(<ContextSignals locale="de" />);
    const buttons = screen.getAllByRole('button', { name: /Dateien|Termine|Offene Dinge|MÔRA/ });
    expect(buttons).toHaveLength(4);
    buttons.forEach(button => expect(button).toHaveAttribute('aria-haspopup', 'dialog'));
    fireEvent.click(screen.getByRole('button', { name: /Dateien/ }));
    expect(screen.getByRole('heading', { name: 'Ein Dokument ist mehr als ein Anhang.' })).toBeInTheDocument();
    expect(screen.getByText('BEISPIELANSICHT · KEINE LIVE-DATEN')).toBeInTheDocument();
    expect(screen.getByText('Projektbriefing')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /MÔRA genauer entdecken/ })).toHaveAttribute('href', '/mora');
    fireEvent.click(screen.getByRole('button', { name: 'Schließen' }));
    expect(screen.queryByRole('heading', { name: 'Ein Dokument ist mehr als ein Anhang.' })).not.toBeInTheDocument();
  });

  it('provides the same interactive meanings in English', () => {
    render(<ContextSignals locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: /Meetings/ }));
    expect(screen.getByRole('heading', { name: 'Meetings do not exist in isolation.' })).toBeInTheDocument();
    expect(screen.getByText('CONCEPT VIEW · NO LIVE DATA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore MÔRA in detail/ })).toHaveAttribute('href', '/en/mora');
  });

  it('keeps context explanations honest about source connections and approvals', () => {
    render(<ContextSignals locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: /MÔRA/ }));
    expect(screen.getByText(/Aktionen erfolgen nicht einfach heimlich/)).toBeInTheDocument();
    expect(screen.getByText('Quelle · Kontext · Freigabe')).toBeInTheDocument();
  });
});
