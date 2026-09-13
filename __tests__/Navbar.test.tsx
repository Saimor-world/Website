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

describe('Navbar logo treatment', () => {
  it('does not box the seal in a flat white tile', () => {
    render(<Navbar locale="de" />);

    const seal = screen.getByAltText('Saimôr');
    const container = seal.parentElement;

    expect(container?.className ?? '').not.toMatch(/\bbg-white\b/);
  });

  it('uses the approved master without a navbar-specific blend mode', () => {
    render(<Navbar locale="de" />);

    const seal = screen.getByAltText('Saimôr');

    expect(seal.getAttribute('src')).toBe('/brand/saimor-sigil-restored-v1.png');
    expect(seal.className).not.toMatch(/mix-blend-screen/);
  });
});
