import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import CommunityBanner from '@/components/CommunityBanner';

afterEach(cleanup);

/**
 * Found during browser verification of
 * docs/superpowers/specs/2026-07-28-world-homepage-brand-unification-design.md
 * -- this component wasn't in the original page audit (it links to the same
 * #waitlist anchor as WaitlistForm, so it's a second, separate CTA for the
 * same action). Its emerald/cyan/amber accents aren't even Tailwind classes
 * in two spots -- raw hex in inline `style` gradients -- so a plain class-name
 * grep across the codebase would miss them entirely.
 */
describe('CommunityBanner brand alignment', () => {
  it('does not use Tailwind generic emerald, cyan, or amber utility classes', () => {
    const { container } = render(<CommunityBanner locale="de" />);

    expect(container.innerHTML).not.toMatch(/emerald-\d/);
    expect(container.innerHTML).not.toMatch(/cyan-\d/);
    expect(container.innerHTML).not.toMatch(/amber-\d/);
  });

  it('does not hard-code green/cyan hex values in inline gradient styles', () => {
    const { container } = render(<CommunityBanner locale="de" />);

    // #34d399 (emerald-400), #06b6d4 (cyan-500), #10b981 (emerald-500)
    expect(container.innerHTML).not.toMatch(/#34d399|#06b6d4|#10b981/i);
  });

  it('uses the shared dark ink background instead of its own hard-coded hex', () => {
    const { container } = render(<CommunityBanner locale="de" />);
    const section = container.querySelector('section');

    expect(section?.className ?? '').toMatch(/world-ink/);
  });
});
