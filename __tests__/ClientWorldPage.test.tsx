import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ClientWorldPage from '@/components/ClientWorldPage';
import { getClientWorld, getClientWorldNoteIds } from '@/lib/client-world';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('ClientWorldPage', () => {
  it('opens with the client, not with Saimôr product vocabulary', () => {
    const { container } = render(<ClientWorldPage world={world} />);
    const heading = container.querySelector('h1');

    expect(heading?.textContent).toContain('Luana');
    // YORI / MÔRA / OS sind unsere Produktnamen, nicht ihre. Auf dieser
    // Seite haben sie nichts verloren, solange nichts davon für sie läuft.
    expect(container.textContent).not.toMatch(/YORI|MÔRA|Saimôr OS/);
  });

  it('shows no "we remember" note on a first visit', () => {
    render(<ClientWorldPage world={world} />);
    expect(screen.queryByText(/stehen noch drin/i)).not.toBeInTheDocument();
  });

  it('tells a returning client their answers are still there', () => {
    render(<ClientWorldPage world={world} initialReactions={{ 'zwei-buttons': 'interesting' }} />);

    expect(screen.getByText(/stehen noch drin/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Notiert\./i).length).toBe(1);
  });

  it('offers a reaction on every concrete suggestion', () => {
    render(<ClientWorldPage world={world} />);
    const noteCount = getClientWorldNoteIds(world).length;

    expect(screen.getAllByRole('button', { name: 'Machen wir' })).toHaveLength(noteCount);
    expect(screen.getAllByRole('button', { name: 'Sehe ich anders' })).toHaveLength(noteCount);
  });
});
