import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CookieBanner from '@/components/CookieBanner';

const route = vi.hoisted(() => ({ path: '/de' }));
vi.mock('next/navigation', () => ({ usePathname: () => route.path }));
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    aside: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: any) => <aside {...props}>{children}</aside>,
    span: ({ children, animate: _animate, transition: _transition, ...props }: any) => <span {...props}>{children}</span>,
    div: ({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

beforeEach(() => {
  localStorage.clear();
  route.path = '/de';
  vi.useFakeTimers();
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    disconnect() {}
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function showBanner() {
  render(<CookieBanner />);
  act(() => { vi.advanceTimersByTime(1800); });
}

describe('CookieBanner — genuine consent choices', () => {
  it('shows equally available essential and accept-all actions plus privacy information', () => {
    showBanner();
    expect(screen.getByRole('dialog', { name: 'Datenschutz' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Essenziell' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Akzeptieren' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Einstellungen' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not turn on analytics when visitors choose essential only', () => {
    showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Essenziell' }));
    expect(localStorage.getItem('cookie_consent')).toBe('essential');
    expect(localStorage.getItem('analytics_enabled')).toBe('false');
  });

  it('keeps granular analytics opt-in behind an explicit settings action', () => {
    showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Einstellungen' }));
    expect(screen.getByRole('button', { name: 'Weniger' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Speichern' }));
    expect(localStorage.getItem('analytics_enabled')).toBe('false');
  });
  it('leaves the staged encounter uninterrupted without recording consent', () => {
    route.path = '/mora/deep-view';
    showBanner();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(localStorage.getItem('cookie_consent')).toBeNull();
    expect(localStorage.getItem('analytics_enabled')).toBeNull();
  });

});
