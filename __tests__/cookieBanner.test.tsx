import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CookieBanner from '@/components/CookieBanner';

describe('CookieBanner', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('starts compact and exposes granular choices on demand', async () => {
    render(<CookieBanner />);

    await act(async () => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.getByRole('dialog', { name: 'Datenschutz-Präferenzen' })).toBeInTheDocument();
    const analytics = screen.getByRole('button', { name: 'Anonyme Analytics erlauben' });
    expect(analytics.parentElement).toHaveClass('hidden');

    fireEvent.click(screen.getByRole('button', { name: 'Auswahl anpassen' }));
    expect(analytics.parentElement).toHaveClass('block');
  });
});
