import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
import { getClientWorld } from '@/lib/client-world';

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('LuanaYoriPreview', () => {
  it('arrives as Luana first, with YORI underneath', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getAllByText(/LUANA LUMINA/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/DEINE WORLD · YORI/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Meine World öffnen/i })).toBeInTheDocument();
    expect(screen.getByText(/YORI · A SAIMÔR CREATION/i)).toBeInTheDocument();
  });

  it('contains a native YORI room shell instead of a long audit page', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByText(/Hallo Luana\./i)).toBeInTheDocument();
    expect(screen.getAllByText(/AUF DEINEM TISCH/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('navigation', { name: /Luana World Bereiche/i })).toBeInTheDocument();

    expect(screen.queryByText(/Gemeinsamer Stand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wir haben uns deinen Auftritt angesehen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Was wir von dir brauchen/i)).not.toBeInTheDocument();
  });

  it('keeps the YORI room grammar visible', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByRole('button', { name: /Heute/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Auftritt/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ideen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Weg/i })).toBeInTheDocument();
  });

  it('returns directly to a cleared desk after a remembered decision', () => {
    render(<LuanaYoriPreview world={world} initialDecision="yes" />);

    expect(screen.queryByRole('button', { name: /Meine World öffnen/i })).not.toBeInTheDocument();
    expect(screen.getByText(/Schreibtisch frei/i)).toBeInTheDocument();
    expect(screen.getByText(/Die Entscheidung ist notiert/i)).toBeInTheDocument();
  });
});
