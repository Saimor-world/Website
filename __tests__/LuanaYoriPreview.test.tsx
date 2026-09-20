import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
import { getClientWorld } from '@/lib/client-world';

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('LuanaYoriPreview', () => {
  it('presents Luana as a personalized YORI world instead of an audit deck', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getAllByText(/LUANA LUMINA/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/DEINE WORLD · YORI/i)).toBeInTheDocument();
    expect(screen.getByText(/Hallo Luana\./i)).toBeInTheDocument();
    expect(screen.getByText(/Auf deinem Tisch/i)).toBeInTheDocument();
  });

  it('keeps the YORI room grammar visible', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByRole('navigation', { name: /Luana World Bereiche/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Heute' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Auftritt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ideen' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Weg' })).toBeInTheDocument();
  });
});
