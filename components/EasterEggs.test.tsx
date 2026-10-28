import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import EasterEggs from './EasterEggs';

const { unlock, loadEncounter } = vi.hoisted(() => ({ unlock: vi.fn(), loadEncounter: vi.fn() }));
let pathname = '/mora';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));
vi.mock('@/lib/achievements', () => ({
  getAchievementManager: () => ({ unlock }), shouldAnnounceAchievement: () => false,
}));
vi.mock('./AchievementButton', () => ({ default: () => null }));
vi.mock('./AchievementToast', () => ({ default: () => null }));
// Keep imports genuinely lazy: rendering EasterEggs alone must not request the encounter.
vi.mock('next/dynamic', async () => {
  const React = await import('react');
  return { default: (load: () => Promise<{ default: React.ComponentType }>) => {
    const Lazy = React.lazy(() => {
      if (load.toString().includes('MoraKonamiEncounter')) loadEncounter();
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
const pixel = () => document.querySelector('[data-pixel-mora]');
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
  it('loads the encounter only after a complete sequence, shows Pixel MÔRA and unlocks the achievement', async () => {
    render(<EasterEggs />);
    expect(loadEncounter).not.toHaveBeenCalled();
    await trigger();
    expect(loadEncounter).toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('Du hast mich gefunden.');
    expect(pixel()).toHaveAttribute('data-still', 'false');
    // Only the final-set base layers, integer-scaled: no 3D canvas, nothing painted on.
    expect(document.querySelector('canvas')).toBeNull();
    const layers = [...pixel()!.querySelectorAll('img')].map(img => img.getAttribute('src'));
    expect(layers).toEqual(['/mora/pixel/body.png', '/mora/pixel/light.png', '/mora/pixel/face.png', '/mora/pixel/eyes.png']);
    expect((pixel() as HTMLElement).style.width).toBe('240px');
    expect(unlock).toHaveBeenCalledWith('konami');
  });
  it.each(['motion', 'lite'])('shows the same figure as a still image for %s', async mode => {
    if (mode === 'lite') document.documentElement.classList.add('lite');
    else vi.mocked(matchMedia).mockReturnValue({ matches: true,
      addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<EasterEggs />);await trigger();
    expect(screen.getByRole('status')).toHaveTextContent('Du hast mich gefunden.');
    expect(pixel()).toHaveAttribute('data-still', 'true');
    fireEvent.click(screen.getByTestId('konami-figure'));
    expect(pixel()).not.toHaveAttribute('data-hop');
  });
  it('hops once when MÔRA is clicked, without closing', async () => {
    render(<EasterEggs />);await trigger();
    fireEvent.click(screen.getByTestId('konami-figure'));
    expect(pixel()).toHaveAttribute('data-hop', 'true');
    act(() => vi.advanceTimersByTime(600));
    expect(pixel()).not.toHaveAttribute('data-hop');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  it('uses English copy and leaves softly after eight seconds without movement', async () => {
    pathname = '/en/mora';render(<EasterEggs />);await trigger();
    expect(screen.getByRole('status')).toHaveTextContent('You found me.');
    // The encounter mounts during trigger(), ~600 ms before it returns.
    act(() => vi.advanceTimersByTime(6500));
    expect(document.querySelector('[data-mora-konami]')).toHaveAttribute('data-leaving', 'false');
    act(() => vi.advanceTimersByTime(1000));
    expect(document.querySelector('[data-mora-konami]')).toHaveAttribute('data-leaving', 'true');
    act(() => vi.advanceTimersByTime(450));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('stays while the visitor moves the pointer', async () => {
    render(<EasterEggs />);await trigger();
    for (let i = 0; i < 3; i++) {
      act(() => vi.advanceTimersByTime(6000));
      fireEvent.pointerMove(window, { clientX: 200 + i * 50, clientY: 300 });
    }
    expect(screen.getByRole('status')).toHaveTextContent('Du hast mich gefunden.');
  });
  it.each([
    ['Esc', () => fireEvent.keyDown(window, { key: 'Escape' })],
    ['the close button', () => fireEvent.click(screen.getByRole('button', { name: 'Schließen' }))],
    ['a click outside', () => fireEvent.click(document.querySelector('[data-mora-konami]')!)],
  ])('closes on %s', async (_, close) => {
    render(<EasterEggs />);await trigger();
    act(() => close());
    act(() => vi.advanceTimersByTime(450));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('clears encounter timers and its key listener on unmount', async () => {
    const schedule = vi.spyOn(window, 'setTimeout');
    const clear = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<EasterEggs />);await trigger();
    const timers = [60000, 8000].map(delay => schedule.mock.results[schedule.mock.calls.findIndex(([, d]) => d === delay)].value);
    unmount();
    for (const timer of timers) expect(clear).toHaveBeenCalledWith(timer);
    unlock.mockClear();sequence();expect(unlock).not.toHaveBeenCalled();
  });
});
