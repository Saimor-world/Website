import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraDeepView from './MoraDeepView';

vi.mock('next/image', () => ({
  default: ({ alt = '', priority: _priority, ...props }: any) => <img alt={alt} {...props} />,
}));
beforeEach(() => { window.history.replaceState(null, '', '/mora/deep-view'); });
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('MÔRA Deep View cinematic experience', () => {
  it('begins with a mysterious question and then reveals MÔRA with eyes, not a dashboard', () => {
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('heading', { name: 'Alles klingt möglich.' })).toBeInTheDocument();
    expect(screen.getByText('Aber was ist wirklich wahr?')).toBeInTheDocument();
    expect(screen.queryByText(/TRAUMPROTOKOLL|STERNENFELD|Öffentliche Signale laden/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
    expect(screen.getByLabelText('MÔRAs leuchtende Augen')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'MÔRA, Jadestein' })).toBeInTheDocument();
    expect(screen.queryByText('Was belegt ist.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    fireEvent.click(screen.getByRole('button', { name: 'Durch ihre Augen sehen' }));
    expect(screen.getByRole('heading', { name: 'Sieh den Unterschied.' })).toBeInTheDocument();
    expect(screen.getByText('Was belegt ist.')).toBeInTheDocument();
    expect(screen.getByText('Was Vermutung bleibt.')).toBeInTheDocument();
    expect(screen.getByText('Was du entscheidest.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'MÔRA kennenlernen' })).toHaveAttribute('href', '/mora');
    expect(screen.getByRole('link', { name: 'Das Prinzip dahinter' })).toHaveAttribute('href', '/mora/deep-view/lab');
    expect(screen.getByText('INSZENIERUNG · KEINE LIVE-ANALYSE')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Noch einmal' }));
    expect(screen.getByRole('heading', { name: 'Alles klingt möglich.' })).toBeInTheDocument();
  });

  it('automatically introduces MÔRA after the cinematic opening', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    act(() => vi.advanceTimersByTime(4800));
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
  });

  it('localizes the experience, links and live-data disclosure in English', () => {
    render(<MoraDeepView locale="en" />);
    expect(screen.getByRole('heading', { name: 'Everything sounds possible.' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Meet MÔRA' }));
    expect(screen.getByLabelText('MÔRA’s luminous eyes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause motion' }));
    fireEvent.click(screen.getByRole('button', { name: 'See through her eyes' }));
    expect(screen.getByRole('heading', { name: 'See the difference.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Discover MÔRA' })).toHaveAttribute('href', '/en/mora');
    expect(screen.getByRole('link', { name: 'Explore the principle' })).toHaveAttribute('href', '/en/mora/deep-view/lab');
    expect(screen.getByText('STAGED EXPERIENCE · NO LIVE ANALYSIS')).toBeInTheDocument();
  });

  it('allows reduced motion visitors to skip the timed reveal', () => {
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
  });
});
