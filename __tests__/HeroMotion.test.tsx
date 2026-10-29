import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SystemWorldHome from '@/components/SystemWorldHome';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {}, prefetch: () => {} }), usePathname: () => '/de' }));
vi.mock('next/image', () => ({
  default: ({ alt = '', priority: _priority, ...props }: any) => <img alt={alt} {...props} />,
}));

const motionButton = (name: string) => {
  const button = hero().querySelector('button[aria-pressed]') as HTMLElement;
  expect(button).toHaveAccessibleName(name);
  return button;
};
const hero = () => document.querySelector('section[aria-labelledby="world-title"]') as HTMLElement;
const reducedMotion = (matches: boolean) => vi.stubGlobal('matchMedia', (query: string) => ({
  matches: matches && query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {},
}));

beforeEach(() => { window.localStorage.clear(); reducedMotion(false); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('Hero motion control', () => {
  it('is a real button that pauses and resumes every hero animation', () => {
    render(<SystemWorldHome locale="de" />);
    const button = motionButton('Bewegung pausieren');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(hero()).toHaveAttribute('data-paused', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(hero()).toHaveAttribute('data-paused', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(hero()).toHaveAttribute('data-paused', 'false');
  });

  it('starts paused under prefers-reduced-motion and keeps a named button to play', () => {
    reducedMotion(true);
    render(<SystemWorldHome locale="en" />);
    const button = motionButton('Pause motion');
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(hero()).toHaveAttribute('data-paused', 'true');
    fireEvent.click(button);
    expect(hero()).toHaveAttribute('data-paused', 'false');
    expect(hero()).toHaveAttribute('data-motion', 'play');
  });

  it('remembers the choice across a remount', () => {
    const first = render(<SystemWorldHome locale="de" />);
    fireEvent.click(motionButton('Bewegung pausieren'));
    first.unmount();
    render(<SystemWorldHome locale="de" />);
    expect(motionButton('Bewegung pausieren')).toHaveAttribute('aria-pressed', 'true');
    expect(hero()).toHaveAttribute('data-paused', 'true');
  });

  it('marks the orbits as cheap motion that survives Lite mode', () => {
    render(<SystemWorldHome locale="de" />);
    expect(screen.getByTestId('hero-orbits').querySelectorAll('[data-orbit]')).toHaveLength(3);
  });
});
