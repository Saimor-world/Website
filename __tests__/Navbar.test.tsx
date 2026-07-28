import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Navbar from '@/components/Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/de',
}));

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

afterEach(cleanup);

/**
 * The navbar seal used to sit in a flat `bg-white` tile -- the one place on
 * the whole site that ignored the --world-ink/--world-gold token system Hero
 * already uses throughout. That flat white box, not a color mismatch, was
 * why the small navbar mark read as disconnected from the glowing hero mark.
 */
describe('Navbar logo treatment', () => {
  it('does not box the seal in a flat white tile', () => {
    render(<Navbar locale="de" />);

    const seal = screen.getByAltText('Saimôr');
    const container = seal.parentElement;

    expect(container?.className ?? '').not.toMatch(/\bbg-white\b/);
  });

  it('lets the seal blend against the dark navbar instead of sitting on a flat fill', () => {
    render(<Navbar locale="de" />);

    const seal = screen.getByAltText('Saimôr');

    expect(seal.className).toMatch(/mix-blend-screen/);
  });
});
