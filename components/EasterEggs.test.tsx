import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import EasterEggs from './EasterEggs';

const { unlock, bodyMounted, loadBody } = vi.hoisted(() => ({
  unlock: vi.fn(), bodyMounted: vi.fn(), loadBody: vi.fn(),
}));
let pathname = '/mora';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));
vi.mock('@/lib/achievements', () => ({
  getAchievementManager: () => ({ unlock }), shouldAnnounceAchievement: () => false,
}));
vi.mock('./AchievementButton', () => ({ default: () => null }));
vi.mock('./AchievementToast', () => ({ default: () => null }));
vi.mock('./MoraCharacterBody', () => ({ default: () => {
  bodyMounted();return <canvas data-testid="konami-body" />;
} }));
// Keep imports genuinely lazy: rendering EasterEggs alone must not request the body.
vi.mock('next/dynamic', async () => {
  const React = await import('react');
  return { default: (load: () => Promise<{ default: React.ComponentType }>) => {
    const Lazy = React.lazy(() => {
      if (load.toString().includes('MoraCharacterBody')) loadBody();
      return load();
    });
    return function Dynamic(props: object) {
      return <React.Suspense fallback={null}><Lazy {...props} /></React.Suspense>;
    };
  } };
});
const sequence = () => {
  ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight', 'b', 'a'].forEach(key => fireEvent.keyDown(window, { key }));
};
async function trigger() {
  await act(async () => { sequence();await vi.dynamicImportSettled(); });
  await act(async () => { vi.advanceTimersByTime(300);await vi.dynamicImportSettled(); });
  await act(async () => { vi.advanceTimersByTime(300); });
}
beforeEach(() => {
  vi.useFakeTimers();vi.clearAllMocks();pathname = '/mora';
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false,
    addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => {
  cleanup();vi.restoreAllMocks();vi.useRealTimers();vi.unstubAllGlobals();
  document.documentElement.classList.remove('lite');
});
describe('Konami MÔRA encounter', () => {
  it('loads the existing body only after a complete sequence and unlocks the achievement', async () => {
    render(<EasterEggs />);
    expect(bodyMounted).not.toHaveBeenCalled();
    expect(loadBody).not.toHaveBeenCalled();
    await trigger();
    expect(screen.getByRole('status')).toHaveTextContent('Du hast mich gefunden.');
    expect(screen.getByTestId('konami-body')).toBeInTheDocument();
    expect(unlock).toHaveBeenCalledWith('konami');
  });
  it.each(['motion', 'lite'])('uses a static fallback for %s without mounting 3D', async mode => {
    if (mode === 'lite') document.documentElement.classList.add('lite');
    else vi.mocked(matchMedia).mockReturnValue({ matches: true,
      addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<EasterEggs />);await trigger();
    expect(screen.getByRole('status')).toHaveTextContent('Du hast mich gefunden.');
    expect(screen.getByAltText('SAIMÔR')).toBeInTheDocument();
    expect(bodyMounted).not.toHaveBeenCalled();
    expect(loadBody).not.toHaveBeenCalled();
  });
  it('uses English copy and removes the overlay and its body after five seconds', async () => {
    pathname = '/en/mora';render(<EasterEggs />);await trigger();
    expect(screen.getByRole('status')).toHaveTextContent('You found me.');
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByTestId('konami-body')).not.toBeInTheDocument();
  });
  it('clears encounter timers and its key listener on unmount', async () => {
    const schedule = vi.spyOn(window, 'setTimeout');
    const clear = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<EasterEggs />);await trigger();
    const index = schedule.mock.calls.findIndex(([, delay]) => delay === 5000);
    const timer = schedule.mock.results[index].value;
    unmount();expect(clear).toHaveBeenCalledWith(timer);
    unlock.mockClear();sequence();expect(unlock).not.toHaveBeenCalled();
  });
});
