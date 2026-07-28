import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactSection from '@/components/ContactSection';

vi.mock('@/lib/matomo', () => ({
  MatomoEvents: { formStart: vi.fn(), formSubmit: vi.fn(), ctaClick: vi.fn(), navClick: vi.fn() },
}));

afterEach(cleanup);

/**
 * Per docs/superpowers/specs/2026-07-28-world-homepage-brand-unification-design.md:
 * same emerald/cyan-to-gold move as SocialProof and WaitlistForm.
 */
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

  it('accents the "Resonanz?" headline in gold', () => {
    render(<ContactSection locale="de" />);

    const accent = screen.getByText('Resonanz?');
    expect(accent.className).toMatch(/world-gold/);
  });
});
