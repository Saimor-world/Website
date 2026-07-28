import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import YoriSection from '@/components/YoriSection';

afterEach(cleanup);

/**
 * Flagged directly by the user mid-session: a light cream section sandwiched
 * between every other section's dark/gold treatment was the single most
 * visible break on the page -- more than any single wrong accent color.
 * YORI keeps its own jade/indigo as accents (its CTA already borrows that
 * identity in Hero, by design), but the section's base mode moves to the
 * same dark --world-ink background as everything else.
 */
describe('YoriSection brand alignment', () => {
  it('uses the shared dark ink background instead of the light yori-paper mode', () => {
    const { container } = render(<YoriSection locale="de" />);
    const section = container.querySelector('section');

    expect(section?.className ?? '').toMatch(/world-ink/);
    expect(section?.className ?? '').not.toMatch(/yori-paper/);
  });

  it('renders the headline in a light color readable on the dark background', () => {
    render(<YoriSection locale="de" />);

    const headline = screen.getByText('YORI ist der ruhige Raum, in dem Ideen Form annehmen.');
    expect(headline.className).not.toMatch(/text-\[#243130\]|text-\[var\(--yori-ink\)\]/);
  });

  it('gives the four feature cards a dark surface, not the light yori-paper card', () => {
    const { container } = render(<YoriSection locale="de" />);

    expect(container.innerHTML).not.toMatch(/bg-\[#f9f7f1\]/);
  });
});
