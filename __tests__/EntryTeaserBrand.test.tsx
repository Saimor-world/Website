import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import EntryTeaser from '@/components/EntryTeaser';

afterEach(cleanup);

/**
 * EntryTeaser's four track tiles (Security-Check/Digital AI Self/Demo-Tracks/
 * Konzepte) intentionally color-code four distinct categories -- that's a
 * legend, not a stray brand mismatch, and stays as-is. What this test checks
 * is the section's OWN identity elements (background, accent line, headline
 * gradient, CTA button) -- the same "one leading color" role gold plays
 * everywhere else on the page.
 */
describe('EntryTeaser brand alignment (section identity, not the category tiles)', () => {
  it('uses the shared dark ink background instead of its own hard-coded hex', () => {
    const { container } = render(<EntryTeaser locale="de" />);
    const section = container.querySelector('section');

    expect(section?.className ?? '').toMatch(/world-ink/);
  });

  it('does not hard-code the green/cyan gradient hex values from the old headline accent or CTA', () => {
    const { container } = render(<EntryTeaser locale="de" />);

    expect(container.innerHTML).not.toMatch(/#34d399|#06b6d4|#10b981/i);
    expect(container.innerHTML).not.toMatch(/rgba\(52,\s*211,\s*153/i);
  });
});

describe('EntryTeaser track tiles', () => {
  it('wires German tiles to real einstieg slugs', () => {
    const { container } = render(<EntryTeaser locale="de" />);
    const hrefs = Array.from(container.querySelectorAll('a')).map((el) => el.getAttribute('href') || '');
    expect(hrefs).toEqual(expect.arrayContaining([
      '/de/einstieg',
      '/de/einstieg/security-check',
      '/de/einstieg/digital-self',
      '/de/einstieg/ai-local-business',
      '/de/einstieg/adaptive-os',
    ]));
    expect(container.innerHTML).not.toMatch(/cursor-default/);
  });
});

