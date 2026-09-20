import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
import { getClientWorld } from '@/lib/client-world';

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('LuanaYoriPreview', () => {
  it('arrives as Luana first and explains the World before asking for a decision', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getAllByText(/LUANA LUMINA/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/DEINE WORLD · YORI/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Meine World entdecken/i })).toBeInTheDocument();

    expect(screen.getByText(/Was ist eine eigene World\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Was macht YORI darin\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Was hätte ich konkret davon\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Ist das einfach eine neue Website\?/i)).toBeInTheDocument();
  });

  it('keeps the website as one example instead of the product thesis', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByText(/Deine Website ist dabei nur ein möglicher Anfang/i)).toBeInTheDocument();
    expect(screen.queryByText(/Gemeinsamer Stand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wir haben uns deinen Auftritt angesehen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Was wir von dir brauchen/i)).not.toBeInTheDocument();
  });

  it('keeps the explanatory room grammar visible', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getAllByRole('button', { name: /Ankommen/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Deine World/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Ein Beispiel/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Weiter/i }).length).toBeGreaterThan(0);
  });

  it('returns directly to the remembered answer after a prior decision', () => {
    render(<LuanaYoriPreview world={world} initialDecision="yes" />);

    expect(screen.queryByRole('button', { name: /Meine World entdecken/i })).not.toBeInTheDocument();
    expect(screen.getByText(/DEINE ANTWORT IST NOTIERT/i)).toBeInTheDocument();
    expect(screen.getByText(/Dann bauen wir von hier weiter/i)).toBeInTheDocument();
  });
});
