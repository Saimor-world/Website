import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactSection from '@/components/ContactSection';

vi.mock('@/lib/matomo', () => ({
  MatomoEvents: { formStart: vi.fn(), formSubmit: vi.fn(), ctaClick: vi.fn(), navClick: vi.fn() },
}));

afterEach(cleanup);

describe('ContactSection brand alignment', () => {
  it('does not use Tailwind generic emerald or cyan utility classes anywhere', () => {
    const { container } = render(<ContactSection locale="de" />);

    expect(container.innerHTML).not.toMatch(/emerald-\d/);
    expect(container.innerHTML).not.toMatch(/cyan-\d/);
  });

  it('uses the shared dark ink background instead of its own hard-coded hex', () => {
    const { container } = render(<ContactSection locale="de" />);
    const section = container.querySelector('section');

    expect(section?.className ?? '').toMatch(/world-ink/);
  });

  it('keeps the direct-contact marker in the Saimôr gold treatment', () => {
    render(<ContactSection locale="de" />);

    expect(screen.getByText('Woran arbeitest du?')).toBeTruthy();
    const marker = screen.getByText('Direkter Kontakt');
    expect(marker.className).toMatch(/world-gold/);
  });
});
