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

/** The way up: forest, then the light, then the universe welcome. */
const climb = (up = 'Nach oben', onward = 'Weiter') => {
  fireEvent.click(screen.getByRole('button', { name: up }));
  fireEvent.click(screen.getByRole('button', { name: onward }));
};

describe('MÔRA Deep View: the SAIMÔR universe', () => {
  it('starts in the forest, rises through the light and welcomes into the universe of nature planets', () => {
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Das SAIMÔR-Universe' })).toBeInTheDocument();
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-mode', 'forest');
    expect(screen.getByRole('status')).toHaveTextContent('Hier fängt es an: im Wald, am Wasser.');
    expect(document.querySelector('[data-pixel-mora]')).toHaveAttribute('data-outfit', 'default');
    expect(screen.queryAllByRole('button').filter(b => b.dataset.body)).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Nach oben' }));
    expect(screen.getByRole('status')).toHaveTextContent('Durch das Licht, hinauf.');
    expect(document.querySelector('[data-pixel-mora]')).toHaveAttribute('data-outfit', 'captain');
    fireEvent.click(screen.getByRole('button', { name: 'Weiter' }));
    expect(screen.getByRole('status')).toHaveTextContent('Jeder Planet trägt ein Stück unserer Welt.');
    expect(screen.getAllByRole('button').filter(b => b.dataset.body)).toHaveLength(5);
    expect([...document.querySelectorAll('[data-body] > canvas[data-biome]')].map(c => c.getAttribute('data-biome')))
      .toEqual(['earth', 'forest', 'water', 'light', 'stone']);
  });

  it('tours every planet to the OS and replays from the welcome', () => {
    render(<MoraDeepView locale="de" />);
    climb();
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
    expect(screen.getByRole('status')).toHaveTextContent('Jeder Planet trägt ein Stück unserer Welt.');
  });

  it('lets the visitor explore alone: tap a planet, see its moons, return with Escape or history', () => {
    render(<MoraDeepView locale="de" />);
    climb();
    fireEvent.click(screen.getByRole('button', { name: 'Selbst erkunden' }));
    expect(screen.getByRole('status')).toHaveTextContent('Tippe einen Planeten an.');
    fireEvent.click(screen.getByRole('button', { name: 'ARBEIT: Wasser · fließt' }));
    const work = screen.getByTestId('focus-work');
    for (const moon of ['KALENDER', 'INBOX', 'BOARD']) expect(work).toHaveTextContent(moon);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('focus-work')).toBeNull();
    act(() => { window.history.replaceState(null, '', '#agents'); window.dispatchEvent(new PopStateEvent('popstate')); });
    expect(screen.getByTestId('focus-agents')).toBeInTheDocument();
  });

  it('lands a deep link on its planet without the journey', () => {
    window.history.replaceState(null, '', '/mora/deep-view#work');
    render(<MoraDeepView locale="de" />);
    expect(screen.getByTestId('focus-work')).toBeInTheDocument();
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
    expect(screen.getByRole('status')).toHaveTextContent('It starts here: in the forest, by the water.');
    climb('Look up', 'Next');
    fireEvent.click(screen.getByRole('button', { name: 'WORK: Water · flowing' }));
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
    climb();
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
    climb();
    fireEvent.click(screen.getByRole('button', { name: /Los geht/ }));
    expect(vi.getTimerCount()).toBe(0);
  });
});
