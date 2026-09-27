import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/de',
}));

vi.mock('framer-motion', () => {
  const strip = ({ initial, animate, exit, transition, whileHover, whileTap, ...rest }: Record<string, unknown>) => rest;
  const passthrough = (tag: string) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(({ children, ...props }, ref) =>
      React.createElement(tag, { ref, ...strip(props) }, children as React.ReactNode));
  return {
    motion: { div: passthrough('div'), button: passthrough('button'), span: passthrough('span'), aside: passthrough('aside') },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => true,
  };
});

async function renderDiscoveries() {
  vi.resetModules();
  const { default: EasterEggs } = await import('@/components/EasterEggs');
  render(<EasterEggs />);
}

function unlockedIds() {
  const saved = JSON.parse(localStorage.getItem('saimor-achievements') || '[]') as Array<{ id: string; unlocked?: boolean }>;
  return saved.filter((entry) => entry.unlocked).map((entry) => entry.id);
}

describe('quiet discoveries', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('records passive discoveries silently, without a notice', async () => {
    localStorage.setItem('saimor-last-visit', String(Date.now() - 86_400_000));
    await renderDiscoveries();

    act(() => { vi.advanceTimersByTime(13_000) });

    expect(unlockedIds()).toEqual(expect.arrayContaining(['return-visitor', 'silent-observer']));
    expect(screen.queryByText(/Entdeckt/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Willkommen zurück/)).not.toBeInTheDocument();
  });

  it('shows one short note for a deliberate discovery and dismisses it on its own', async () => {
    await renderDiscoveries();

    act(() => {
      for (let i = 0; i < 4; i += 1) window.dispatchEvent(new CustomEvent('saimor-logo-click'));
    });

    const note = screen.getByRole('status');
    expect(note).toHaveTextContent('Entdeckt · Das Zeichen lebt');

    act(() => { vi.advanceTimersByTime(4_300) });

    expect(screen.queryByText(/Das Zeichen lebt/)).not.toBeInTheDocument();
  });

  it('does not force the discoveries log open after the Konami code', async () => {
    const opened = vi.fn();
    window.addEventListener('saimor-achievement-menu-open', opened);
    await renderDiscoveries();

    act(() => {
      ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
        .forEach((key) => window.dispatchEvent(new KeyboardEvent('keydown', { key })));
    });

    expect(screen.getByRole('status')).toHaveTextContent('Überlagerung');
    expect(opened).not.toHaveBeenCalled();
    window.removeEventListener('saimor-achievement-menu-open', opened);
  });
});
