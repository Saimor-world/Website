import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraDeepView from './MoraDeepView';

// eslint-disable-next-line @next/next/no-img-element
vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} /> }));

const contexts: string[] = [];
const frames = vi.fn();
const motion = (reduce: boolean) => vi.stubGlobal('matchMedia', (query: string) => ({
  matches: reduce && query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {},
}));
beforeEach(() => {
  window.history.replaceState(null, '', '/mora/deep-view');
  contexts.length = 0; frames.mockClear();
  motion(false);
  vi.stubGlobal('requestAnimationFrame', () => { frames(); return 1; });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function (type: string) {
    contexts.push(type); return null;
  } as never);
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

const lights = () => screen.queryAllByRole('button').filter(b => b.dataset.body);

describe('MÔRA Deep View: one world of forest, water and stars', () => {
  it('runs by itself through three sentences and ends with five glass lights above the forest', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Das SAIMÔR-Universe' })).toBeInTheDocument();
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '1');
    expect(screen.getByRole('status')).toHaveTextContent('Deine Arbeit ist kein Stapel. Sie ist eine lebendige Welt.');
    expect(document.querySelector('[data-pixel-mora]')).toHaveAttribute('data-outfit', 'default');
    expect(lights()).toHaveLength(0);
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole('status')).toHaveTextContent('MÔRA kennt sie und hält sie zusammen.');
    act(() => vi.advanceTimersByTime(6500));
    expect(screen.getByRole('status')).toHaveTextContent('Du siehst klar. Du entscheidest.');
    expect(screen.queryByRole('button', { name: 'Überspringen' })).toBeNull();
    expect(lights()).toHaveLength(5);
    expect([...document.querySelectorAll('[data-body] [data-glass]')].map(p => p.getAttribute('data-glass')))
      .toEqual(['earth', 'forest', 'water', 'light', 'stone']);
    // Every light is mirrored in the stream.
    expect(document.querySelectorAll('[data-glass]')).toHaveLength(10);
    expect(screen.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
    expect(screen.getByText('PRODUKTVORSCHAU · KEINE LIVE-DATEN')).toBeInTheDocument();
  });

  it('skips straight to the lights and replays from the start', () => {
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Überspringen' }));
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '3');
    fireEvent.click(screen.getByRole('button', { name: /Noch einmal/ }));
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '1');
  });

  it('opens a light at once, tours on, and returns with Escape or history', () => {
    render(<MoraDeepView locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Überspringen' }));
    fireEvent.click(screen.getByRole('button', { name: 'ARBEIT: Wasser · fließt' }));
    const work = screen.getByTestId('focus-work');
    for (const moon of ['KALENDER', 'INBOX', 'BOARD']) expect(work).toHaveTextContent(moon);
    expect(window.location.hash).toBe('#work');
    expect(screen.getByRole('status')).toHaveTextContent('Termin, Mail und Aufgabe liegen nebeneinander.');
    fireEvent.click(screen.getByRole('button', { name: /Weiter/ }));
    expect(screen.getByTestId('focus-agents')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Weiter/ }));
    expect(screen.getByRole('link', { name: 'Security Check' })).toHaveAttribute('href', '/de/einstieg/security-check');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('focus-security')).toBeNull();
    act(() => { window.history.replaceState(null, '', '#files'); window.dispatchEvent(new PopStateEvent('popstate')); });
    expect(screen.getByTestId('focus-files')).toBeInTheDocument();
  });

  it('lands a deep link on its light without the film', () => {
    window.history.replaceState(null, '', '/mora/deep-view#work');
    render(<MoraDeepView locale="de" />);
    expect(screen.getByTestId('focus-work')).toBeInTheDocument();
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '3');
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
    expect(screen.getByRole('status')).toHaveTextContent('Your work is not a pile. It is a living world.');
    fireEvent.click(screen.getByRole('button', { name: 'Skip' }));
    fireEvent.click(screen.getByRole('button', { name: 'WORK: Water · flowing' }));
    expect(screen.getByRole('status')).toHaveTextContent('Meeting, mail and task sit side by side.');
  });

  it('pause holds the film; nothing asks for WebGL or schedules animation frames', () => {
    vi.useFakeTimers();
    render(<MoraDeepView locale="de" />);
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    expect(screen.getByRole('button', { name: 'Bewegung pausieren' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-still', 'true');
    act(() => vi.advanceTimersByTime(20000));
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '1');
    expect(vi.getTimerCount()).toBe(0);
    // Resumed, the film keeps the time it had left (3 of 6 s).
    fireEvent.click(screen.getByRole('button', { name: 'Bewegung pausieren' }));
    act(() => vi.advanceTimersByTime(3100));
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '2');
    expect(frames).not.toHaveBeenCalled();
    expect(contexts.some(type => /webgl/i.test(type))).toBe(false);
  });

  it('starts at the lights under reduced motion: no film, no timers', () => {
    vi.useFakeTimers();
    motion(true);
    render(<MoraDeepView locale="de" />);
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-still', 'true');
    expect(screen.getByTestId('deep-universe')).toHaveAttribute('data-step', '3');
    expect(lights()).toHaveLength(5);
    expect(vi.getTimerCount()).toBe(0);
  });
});
