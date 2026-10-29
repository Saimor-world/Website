import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraDeepView from './MoraDeepView';

vi.mock('next/image', () => ({
  default: ({ alt = '', priority: _priority, fill: _fill, quality: _quality, ...props }: any) => <img alt={alt} {...props} />,
}));
beforeEach(() => {
  window.history.replaceState(null, '', '/mora/deep-view');
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('MÔRA Deep View cinematic experience', () => {
  it('begins with a mysterious question and then reveals MÔRA with eyes, not a dashboard', () => {
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('heading', { name: 'Alles antwortet.' })).toBeInTheDocument();
    expect(screen.getByText('Aber worauf kannst du dich verlassen?')).toBeInTheDocument();
    expect(screen.queryByText(/TRAUMPROTOKOLL|STERNENFELD|Öffentliche Signale laden/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
    expect(screen.getByLabelText('MÔRAs leuchtende Augen')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'MÔRA, Jadestein' })).toBeInTheDocument();
    expect(screen.queryByText('Was belegt ist.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    fireEvent.click(screen.getByRole('button', { name: 'Durch ihre Augen sehen' }));
    expect(window.location.pathname).toBe('/mora/deep-view');
    expect(screen.getByRole('heading', { name: 'Durch MÔRAs Augen' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'MÔRA im OS entdecken' })).not.toBeInTheDocument();
    expect(screen.queryByText(/Projektchat|Freigabe|Wir starten morgen/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Licht hereinlassen' }));
    expect(screen.getByRole('heading', { name: 'Klarheit.' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA kennenlernen' }));
    expect(screen.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
    expect(screen.getByText('PRODUKTVORSCHAU · KEINE LIVE-DATEN')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Noch einmal' }));
    expect(screen.getByRole('heading', { name: 'Alles antwortet.' })).toBeInTheDocument();
  });

  it('keeps the portal origin through replay and locale changes', () => {
    window.history.replaceState(null, '', '/mora/deep-view?from=portal#mora');
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('link', { name: 'Zurück zum Portal' })).toHaveAttribute('href', '/de#system');
    expect(screen.getByRole('link', { name: 'Switch to English' })).toHaveAttribute('href', '/en/mora/deep-view?from=portal');
    fireEvent.click(screen.getByRole('button', { name: 'Noch einmal' }));
    expect(window.location.search).toBe('?from=portal');
    expect(screen.getByRole('link', { name: 'Zurück zum Portal' })).toHaveAttribute('href', '/de#system');
  });

  it('automatically introduces MÔRA after the cinematic opening', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    act(() => vi.advanceTimersByTime(7200));
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
  });

  it('localizes the experience, links and live-data disclosure in English', () => {
    render(<MoraDeepView locale="en" />);
    expect(screen.getByRole('heading', { name: 'Everything answers.' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Meet MÔRA' }));
    expect(screen.getByLabelText('MÔRA’s luminous eyes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause motion' }));
    fireEvent.click(screen.getByRole('button', { name: 'See through her eyes' }));
    expect(screen.getByRole('heading', { name: 'Through MÔRA’s eyes' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Let the light in' }));
    expect(screen.getByRole('heading', { name: 'Clarity.' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Get to know MÔRA' }));
    expect(screen.getByRole('link', { name: 'Discover MÔRA in the OS' })).toHaveAttribute('href', '/en/mora#im-os');
    expect(screen.getByText('PRODUCT PREVIEW · NO LIVE DATA')).toBeInTheDocument();
  });

  it('allows reduced motion visitors to skip the timed reveal', () => {
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
  });
  it('holds the introduction when paused and resumes only on a deliberate choice', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    act(() => vi.advanceTimersByTime(9000));
    expect(screen.getByTestId('deep-uncertainty')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Durch ihre Augen sehen' }));
    expect(screen.getByTestId('deep-clarity')).toBeInTheDocument();
  });

  it('lets the forest grow out of the light, then settles on the river and the morning', () => {
    vi.useFakeTimers();
    window.history.replaceState(null, '', '/mora/deep-view#clarity');
    const { container } = render(<MoraDeepView locale="de" />);
    const stage = () => container.querySelector('[data-stage]')?.getAttribute('data-stage');
    expect(stage()).toBe('light');
    act(() => vi.advanceTimersByTime(1200));
    expect(stage()).toBe('forest');
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    act(() => vi.advanceTimersByTime(10000));
    expect(stage()).toBe('forest');
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    act(() => vi.advanceTimersByTime(3200));
    expect(stage()).toBe('river');
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('heading', { name: 'Klarheit.' })).toBeInTheDocument();
  });

  it('cancels the passage when browser history restores the encounter', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA begegnen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Durch ihre Augen sehen' }));
    expect(screen.getByRole('button', { name: 'Durch ihre Augen sehen' })).toBeDisabled();
    act(() => {
      window.history.replaceState(null, '', '#mora');
      window.dispatchEvent(new PopStateEvent('popstate'));
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('heading', { name: 'MÔRA.' })).toBeInTheDocument();
    expect(screen.queryByTestId('deep-clarity')).not.toBeInTheDocument();
  });

});
