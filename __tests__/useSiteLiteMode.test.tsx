import { act, cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';

function Consumer() {
  return <output aria-label="motion limit">{String(useSiteLiteMode())}</output>;
}
afterEach(() => { cleanup(); document.documentElement.classList.remove('lite'); });

describe('site motion preference', () => {
  it('starts still on the server regardless of client hardware detection', () => {
    expect(renderToString(<Consumer />)).toContain('true');
  });
  it('synchronizes existing preferences across consumers and unsubscribes on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<><Consumer /><Consumer /></>);
    expect(screen.getAllByLabelText('motion limit').map(node => node.textContent)).toEqual(['false', 'false']);
    act(() => {
      document.documentElement.classList.add('lite');
      window.dispatchEvent(new Event('saimor-lite'));
    });
    expect(screen.getAllByLabelText('motion limit').map(node => node.textContent)).toEqual(['true', 'true']);
    act(() => {
      document.documentElement.classList.remove('lite');
      window.dispatchEvent(new Event('saimor-lite'));
    });
    expect(screen.getAllByLabelText('motion limit').map(node => node.textContent)).toEqual(['false', 'false']);
    unmount();
    expect(remove.mock.calls.filter(([name]) => name === 'saimor-lite')).toHaveLength(2);
    remove.mockRestore();
  });
});
