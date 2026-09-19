import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ClientWorldPage from '@/components/ClientWorldPage';
import { getClientWorld } from '@/lib/client-world';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('ClientWorldPage — memory of past reactions', () => {
  it('shows no "we remember" note on a first visit with no prior reactions', () => {
    render(<ClientWorldPage world={world} />);
    expect(screen.queryByText(/schon eingeordnet/i)).not.toBeInTheDocument();
  });

  it('tells a returning client their past reactions are already reflected', () => {
    render(<ClientWorldPage world={world} initialReactions={{ 'content-bridge': 'interesting' }} />);
    expect(screen.getByText(/Deine letzten Rückmeldungen sind schon eingeordnet/i)).toBeInTheDocument();
    // The confirmation reads back as "already noted", not as a fresh action.
    expect(screen.getAllByText(/Notiert — danke\./i).length).toBeGreaterThan(0);
  });

  it('acknowledges once every current idea has a reaction', () => {
    render(
      <ClientWorldPage
        world={world}
        initialReactions={Object.fromEntries(world.ideas.map((idea) => [idea.id, 'interesting' as const]))}
      />
    );
    expect(screen.getByText(/Alle aktuellen Vorschläge sind eingeordnet/i)).toBeInTheDocument();
  });
});
