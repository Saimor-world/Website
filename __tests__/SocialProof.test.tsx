import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SocialProof from '@/components/SocialProof';

afterEach(cleanup);

/**
 * Per docs/superpowers/specs/2026-07-28-world-homepage-brand-unification-design.md:
 * this section used to run entirely on Tailwind's generic `emerald-*` utility
 * classes (a saturated neon-mint, unrelated to Hero's gold/serif language).
 * Gold now leads (headline accent, pillar icon badges/borders); the muted
 * --world-emerald token is kept ONLY for the EU/DSGVO/0-cookies/Open-Source
 * stat row -- the "certified" badges the spec calls out specifically.
 */
describe('SocialProof brand alignment', () => {
  it('does not use Tailwind generic emerald utility classes anywhere', () => {
    const { container } = render(<SocialProof locale="de" />);

    expect(container.innerHTML).not.toMatch(/emerald-\d/);
  });

  it('accents the trust headline in gold, not green', () => {
    render(<SocialProof locale="de" />);

    const accent = screen.getByText('vertrauen kann.');
    expect(accent.className).toMatch(/world-gold/);
  });

  it('keeps the certified stat badges (EU/DSGVO/etc.) on the muted emerald token', () => {
    const { container } = render(<SocialProof locale="de" />);

    const euStat = screen.getByText('EU');
    expect(euStat.className).toMatch(/world-emerald/);
    // and NOT gold -- this is the one place green is intentionally kept
    expect(euStat.className).not.toMatch(/world-gold/);
  });

  it('uses the shared dark ink background instead of its own separate dark-green gradient', () => {
    const { container } = render(<SocialProof locale="de" />);
    const section = container.querySelector('section');

    expect(section?.className ?? '').toMatch(/world-ink/);
  });
});
