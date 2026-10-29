import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraGuide, { GUIDE_KEY } from './MoraGuide';

type Sight = { callback: IntersectionObserverCallback; targets: Element[] };
let sights: Sight[] = [];
const see = (id: string, visible: boolean) => act(() => {
  for (const sight of sights) for (const target of sight.targets)
    if (target.id === id || (id === 'home' && target.getAttribute('data-testid') === 'mora-guide'))
      sight.callback([{ isIntersecting: visible, intersectionRatio: visible ? 1 : 0, target } as IntersectionObserverEntry], {} as IntersectionObserver);
});
const scrolled = vi.fn();

function Page({ locale = 'de' }: { locale?: 'de' | 'en' }) {
  return <>
    <section aria-labelledby="t"><h1 id="t">Saimôr</h1></section>
    <section id="system">system<MoraGuide locale={locale} /></section>
    {['earth-horizon', 'blick', 'products', 'studio', 'contact'].map(id => <section key={id} id={id}>{id}</section>)}
  </>;
}

beforeEach(() => {
  sights = []; window.localStorage.clear(); scrolled.mockClear();
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-29T14:00:00'));
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal('IntersectionObserver', class {
    sight: Sight;
    constructor(callback: IntersectionObserverCallback) { this.sight = { callback, targets: [] }; sights.push(this.sight); }
    observe(target: Element) { this.sight.targets.push(target); }
    unobserve() {} disconnect() {}
  });
  Element.prototype.scrollIntoView = function (this: Element) { scrolled(this.id); };
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('MÔRA guides the homepage', () => {
  it('greets below the hero with a real choice and nothing fixed on screen yet', () => {
    render(<Page />);
    expect(screen.getByRole('status')).toHaveTextContent('Hallo, ich bin MÔRA.');
    expect(screen.getByRole('button', { name: 'Ja, zeig mal' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Ich schau selbst' })).toBeVisible();
    see('home', false);
    expect(screen.queryByTestId('mora-guide-dock')).toBeNull();
  });

  it('starts the tour, remembers it, docks after the hero and speaks per section', () => {
    render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: 'Ja, zeig mal' }));
    expect(window.localStorage.getItem(GUIDE_KEY)).toBe('tour');
    expect(scrolled).toHaveBeenCalledWith('earth-horizon');
    see('home', false); see('products', true);
    const dock = screen.getByTestId('mora-guide-dock');
    expect(dock).toHaveTextContent('ZU: PRODUKTE');
    expect(dock).toHaveTextContent('Das sind die Welten');
    expect(screen.getByRole('link', { name: 'MÔRA im Detail' })).toHaveAttribute('href', '/mora');
    // The section she talks about is marked; leaving the reading line clears both marker and talk.
    expect(document.getElementById('products')).toHaveAttribute('data-mora-focus', 'true');
    expect(document.body).toHaveAttribute('data-mora-dock', 'true');
    see('products', false);
    expect(document.getElementById('products')).not.toHaveAttribute('data-mora-focus');
    expect(dock).not.toHaveTextContent('Das sind die Welten');
    see('products', true);
    fireEvent.click(screen.getByRole('button', { name: 'Weiter' }));
    expect(scrolled).toHaveBeenLastCalledWith('studio');
    fireEvent.click(screen.getByRole('button', { name: 'Hinweise schließen' }));
    expect(window.localStorage.getItem(GUIDE_KEY)).toBe('quiet');
    expect(dock).not.toHaveTextContent('Das sind die Welten');
    expect(document.getElementById('products')).not.toHaveAttribute('data-mora-focus');
  });

  it('stays quiet when the visitor looks around alone, and answers a tap', () => {
    const first = render(<Page />);
    fireEvent.click(screen.getByRole('button', { name: 'Ich schau selbst' }));
    expect(screen.queryByRole('status')).toBeNull();
    first.unmount();
    render(<Page />);
    expect(screen.queryByText(/Hallo, ich bin MÔRA/)).toBeNull();
    see('home', false); see('blick', true);
    const poke = screen.getAllByRole('button', { name: 'MÔRA antippen' }).at(-1)!;
    expect(poke).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(poke);
    expect(poke).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('mora-guide-dock')).toHaveTextContent('ob sie auch belegt sind');
    expect(document.querySelector('[data-mood="hop"]')).not.toBeNull();
  });

  it('flies along while the page scrolls and looks the way it goes', () => {
    render(<Page />);
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { callback(0); return 1; });
    // Scroll restoration right after load is ignored; a visitor scrolling later is not.
    act(() => { window.dispatchEvent(new Event('scroll')); });
    expect(document.querySelector('[data-pixel-mora]')).not.toHaveAttribute('data-mood', 'fly');
    act(() => vi.advanceTimersByTime(800));
    act(() => { Object.defineProperty(window, 'scrollY', { value: 300, configurable: true }); window.dispatchEvent(new Event('scroll')); });
    const mora = document.querySelector('[data-pixel-mora]')!;
    expect(mora).toHaveAttribute('data-mood', 'fly');
    expect([...mora.querySelectorAll('img')].map(i => i.getAttribute('src'))).toContain('/mora/pixel/eyes_r.png');
    act(() => vi.advanceTimersByTime(500));
    expect(mora).not.toHaveAttribute('data-mood', 'fly');
  });

  it('holds still under reduced motion', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} }));
    render(<Page />);
    expect(document.querySelector('[data-pixel-mora]')).toHaveAttribute('data-still', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA antippen' }));
    expect(document.querySelector('[data-mood="hop"]')).toBeNull();
  });

  it('sleeps at night until tapped, in English too', () => {
    vi.setSystemTime(new Date('2026-10-29T23:30:00'));
    render(<Page locale="en" />);
    expect(screen.getByRole('status')).toHaveTextContent('it’s late');
    expect(document.querySelector('[data-mood="sleep"]')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Tap MÔRA' }));
    expect(document.querySelector('[data-mood="sleep"]')).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Hi, I’m MÔRA.');
  });
});
