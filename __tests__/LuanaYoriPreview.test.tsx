import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
import { getClientWorld } from '@/lib/client-world';

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('LuanaYoriPreview', () => {
  it('explains the World before asking for a decision', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(
      screen.getAllByText((_, element) => element?.textContent?.trim() === 'LUANA LUMINA').length
    ).toBeGreaterThan(0);

    expect(screen.getByText(/Was ist eine eigene World\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Warum habt ihr das für mich gebaut\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Was macht YORI darin\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Was hätte ich konkret davon\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Ist das einfach eine neue Website\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Bleibt das trotzdem meins\?/i)).toBeInTheDocument();
  });

  it('keeps the experience as one continuous guided journey', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByRole('heading', { name: /Nicht mehr Oberfläche\. Mehr Zusammenhang\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Alles, was du schon hast — an einem Ort\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Was würde das für dich praktisch bedeuten\?/i })).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: /01 · Ankommen/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /02 · Deine World/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /03 · Ein Beispiel/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /04 · Weiter/i }).length).toBeGreaterThan(0);
  });

  it('keeps the website as one example instead of the product thesis', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByText(/Deine Seite trägt bereits eine eigene Welt/i)).toBeInTheDocument();
    expect(screen.getByText(/Was deine World halten würde/i)).toBeInTheDocument();

    expect(screen.queryByText(/Gemeinsamer Stand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wir haben uns deinen Auftritt angesehen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Was wir von dir brauchen/i)).not.toBeInTheDocument();
  });

  it('shows remembered decisions without hiding the World', () => {
    render(<LuanaYoriPreview world={world} initialDecision="yes" />);

    expect(screen.getByText(/Willkommen zurück\. Deine letzte Antwort ist noch da\./i)).toBeInTheDocument();
    expect(screen.getByText(/Deine Antwort ist notiert/i)).toBeInTheDocument();
    expect(screen.getByText(/Dann bauen wir von hier weiter/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Was wäre, wenn dein Business einen eigenen ruhigen Raum hätte\?/i })).toBeInTheDocument();
  });
});
