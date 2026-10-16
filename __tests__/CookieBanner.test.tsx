import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CookieBanner from '@/components/CookieBanner';

vi.mock('next/navigation', () => ({ usePathname: () => '/de' }));
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
    expect(screen.getByRole('button', { name: 'Nur Essenziell' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Alle akzeptieren' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Einstellungen' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('link', { name: 'Datenschutzerklärung' })).toHaveAttribute('href', '/de/rechtliches/datenschutz');
  });

  it('does not turn on analytics when visitors choose essential only', () => {
    showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Nur Essenziell' }));
    expect(localStorage.getItem('cookie_consent')).toBe('essential');
    expect(localStorage.getItem('analytics_enabled')).toBe('false');
  });

  it('keeps granular analytics opt-in behind an explicit settings action', () => {
    showBanner();
    fireEvent.click(screen.getByRole('button', { name: 'Einstellungen' }));
    expect(screen.getByRole('button', { name: 'Weniger anzeigen' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /Analytics/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Auswahl speichern' }));
    expect(localStorage.getItem('analytics_enabled')).toBe('false');
  });
});
