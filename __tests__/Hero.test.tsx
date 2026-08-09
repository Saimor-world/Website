import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Hero from '@/components/Hero';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

afterEach(cleanup);

describe('Hero subheadline', () => {
  it('does not hard-code a fixed product count in German', () => {
    render(<Hero locale="de" />);

    // The old copy ("Ein System. Drei Formen von Intelligenz.") goes stale
    // the moment a fourth product exists (see Vicini, [[project_vicini_pivot]]).
    expect(screen.queryByText(/Drei Formen/i)).not.toBeInTheDocument();
    expect(screen.getByText('Ein wachsendes Ökosystem bewusster Intelligenz.')).toBeInTheDocument();
    expect(screen.getByText(/VICINI verbindet Freundschaften/)).toBeInTheDocument();
  });

  it('does not hard-code a fixed product count in English', () => {
    render(<Hero locale="en" />);

    expect(screen.queryByText(/Three forms/i)).not.toBeInTheDocument();
    expect(screen.getByText(/growing ecosystem/i)).toBeInTheDocument();
    expect(screen.getByText(/VICINI connects friendships/)).toBeInTheDocument();
  });
});
