import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraDeepView from './MoraDeepView';

const contexts: string[] = [];
const frames = vi.fn();
beforeEach(() => {
  window.history.replaceState(null, '', '/mora/deep-view');
  contexts.length = 0; frames.mockClear();
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frames(); return 1; });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (type: string) {
    contexts.push(type); return null;
  } as never);
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('MÔRA Deep View: the SAIMÔR universe', () => {
  it('welcomes aboard with MÔRA in her captain hat and tours every planet to the OS', () => {
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Das SAIMÔR-Universe' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Willkommen an Bord.');
    expect(document.querySelector('[data-pixel-mora]')).toHaveAttribute('data-outfit', 'captain');
    expect(screen.getAllByRole('button').filter(b => b.dataset.body)).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: /Los geht/ }));
    expect(screen.getByTestId('focus-os')).toBeInTheDocument();
    expect(window.location.hash).toBe('#os');
    for (const id of ['files', 'work', 'agents', 'security']) {
      fireEvent.click(screen.getByRole('button', { name: /Weiter/ }));
      expect(screen.getByTestId(`focus-${id}`)).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: 'Security Check' })).toHaveAttribute('href', '/de/einstieg/security-check');
    fireEvent.click(screen.getByRole('button', { name: /Weiter/ }));
    expect(screen.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
    expect(screen.getByText('PRODUKTVORSCHAU · KEINE LIVE-DATEN')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Noch einmal/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Willkommen an Bord.');
  });

  it('lets the visitor explore alone: tap a planet, see its moons, return with Escape or history', () => {
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Selbst erkunden' }));
    expect(screen.getByRole('status')).toHaveTextContent('Tippe einen Planeten an.');
    fireEvent.click(screen.getByRole('button', { name: 'ARBEIT: Kalender · Inbox · Board' }));
    const work = screen.getByTestId('focus-work');
    for (const moon of ['KALENDER', 'INBOX', 'BOARD']) expect(work).toHaveTextContent(moon);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('focus-work')).toBeNull();
    act(() => { window.history.replaceState(null, '', '#agents'); window.dispatchEvent(new PopStateEvent('popstate')); });
    expect(screen.getByTestId('focus-agents')).toBeInTheDocument();
  });

  it('keeps the portal origin and switches language', () => {
    window.history.replaceState(null, '', '/mora/deep-view?from=portal');
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('link', { name: 'Zurück zum Portal' })).toHaveAttribute('href', '/de#system');
    expect(screen.getByRole('link', { name: 'Switch to English' })).toHaveAttribute('href', '/en/mora/deep-view?from=portal');
  });

  it('speaks English', () => {
    render(<MoraDeepView locale="en" />);
    expect(screen.getByRole('heading', { level: 1, name: 'The SAIMÔR universe' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'WORK: Calendar · Inbox · Board' }));
    expect(screen.getByRole('status')).toHaveTextContent('Meeting, mail and task sit side by side.');
    expect(screen.getByText('PRODUCT PREVIEW · NO LIVE DATA')).toBeInTheDocument();
  });

  it('never asks for WebGL or schedules animation frames; paused, nothing ticks at all', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    expect(contexts.some(type => /webgl/i.test(type))).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    expect(screen.getByRole('button', { name: 'Bewegung pausieren' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-still', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Los geht/ }));
    act(() => vi.advanceTimersByTime(5000));
    expect(vi.getTimerCount()).toBe(0);
    expect(frames).not.toHaveBeenCalled();
    expect(contexts.some(type => /webgl/i.test(type))).toBe(false);
  });

  it('starts calm under reduced motion: no surface steps, no flights', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} }));
    render(<MoraDeepView locale="de" />);
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-still', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Los geht/ }));
    expect(vi.getTimerCount()).toBe(0);
  });
});
