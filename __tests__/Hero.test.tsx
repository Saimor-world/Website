import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Hero from '@/components/Hero';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

afterEach(cleanup);

/*
 * Der Einstieg darf nicht veralten, sobald sich das Portfolio aendert.
 *
 * Die erste Fassung dieses Tests hatte den richtigen Gedanken - "Ein System.
 * Drei Formen von Intelligenz." wurde falsch, als ein viertes Produkt dazukam -
 * und dann trotzdem den genauen Wortlaut der neuen Fassung festgenagelt. Damit
 * veraltete er auf die andere Art: jede Textaenderung war ein roter Test, auch
 * eine richtige.
 *
 * Deshalb prueft er jetzt die REGEL, nicht den Satz.
 */
describe('Einstieg', () => {
  const zahlwoerter = /\b(zwei|drei|vier|fünf|two|three|four|five)\b/i;

  it.each(['de', 'en'] as const)('nennt in %s keine feste Produktzahl', (locale) => {
    const { container } = render(<Hero locale={locale} />);
    const kopf = container.querySelector('h1')?.closest('section') ?? container;
    expect(kopf.textContent ?? '').not.toMatch(zahlwoerter);
  });

  it.each(['de', 'en'] as const)('sagt in %s, was es ist - nicht nur, wie es sich anfuehlt', (locale) => {
    const { container } = render(<Hero locale={locale} />);
    const text = container.textContent ?? '';
    // Der Einstieg muss Produkt, Zielgruppe und klare Datengrenzen benennen.
    expect(text).toMatch(/KI-Arbeitsräume|AI workspaces/i);
    expect(text).toMatch(/eigene Instanz|dedicated instance/i);
  });

  it.each(['de', 'en'] as const)('zeigt in %s nur Produkte aus dem Portfolio', (locale) => {
    render(<Hero locale={locale} />);
    // Vicini laeuft, ist aber bewusst noch nicht im Portfolio (Werkregister
    // 24.08.2026). Was hier steht, muss mit dem uebereinstimmen, was die Seite
    // darunter auch wirklich zeigt.
    expect(screen.queryByText(/VICINI/i)).not.toBeInTheDocument();
  });
});
