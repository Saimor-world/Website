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
    expect(screen.getByText('Werkzeuge für Menschen, die den Überblick behalten wollen.')).toBeInTheDocument();
    expect(screen.getByText(/eine App für die eigene Nachbarschaft/)).toBeInTheDocument();
  });

  it('addresses the visitor instead of listing the internal product map', () => {
    render(<Hero locale="de" />);

    // The old description was an org chart ("SAIMÔR orchestriert. MÔRA versteht
    // Bedeutung. …") -- true internally, meaningless to a first-time visitor.
    expect(screen.queryByText(/orchestriert/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/souveränes Ökosystem/i)).not.toBeInTheDocument();
  });

  it('does not hard-code a fixed product count in English', () => {
    render(<Hero locale="en" />);

    expect(screen.queryByText(/Three forms/i)).not.toBeInTheDocument();
    expect(screen.getByText(/keep the overview/i)).toBeInTheDocument();
    expect(screen.getByText(/an app for your own neighbourhood/)).toBeInTheDocument();
  });
});
