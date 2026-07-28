import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import WaitlistForm from '@/components/WaitlistForm';

afterEach(cleanup);

/**
 * Per docs/superpowers/specs/2026-07-28-world-homepage-brand-unification-design.md:
 * this section used Tailwind's generic emerald/cyan utility classes throughout
 * (decor gradient, status dot, focus rings, the active-interest chip, the
 * submit button hover). All of it moves to --world-gold; nothing here is the
 * "certified/trust" badge row SocialProof keeps on --world-emerald.
 */
describe('WaitlistForm brand alignment', () => {
  it('does not use Tailwind generic emerald or cyan utility classes anywhere', () => {
    const { container } = render(<WaitlistForm locale="de" />);

    expect(container.innerHTML).not.toMatch(/emerald-\d/);
    expect(container.innerHTML).not.toMatch(/cyan-\d/);
  });

  it('marks a selected interest chip with the gold token, not green', () => {
    render(<WaitlistForm locale="de" />);

    const chip = screen.getByText('Môra Semantic AI').closest('button');
    if (chip) fireEvent.click(chip);

    expect(chip?.className ?? '').toMatch(/world-gold/);
  });

  it('uses the shared dark ink background instead of its own hard-coded hex', () => {
    const { container } = render(<WaitlistForm locale="de" />);
    const section = container.querySelector('section');

    expect(section?.className ?? '').toMatch(/world-ink/);
  });

  it('matches CommunityBanner\'s solid-gold submit button, not a plain white resting state', () => {
    // Two "Platz sichern" buttons sit close together on the page (this one and
    // CommunityBanner's, which links to the same #waitlist anchor). One gold
    // and one white for the same action reads as two different products.
    render(<WaitlistForm locale="de" />);

    const submit = screen.getByText('Platz sichern').closest('button');
    expect(submit?.className ?? '').toMatch(/bg-world-gold/);
    expect(submit?.className ?? '').not.toMatch(/bg-white/);
  });
});
