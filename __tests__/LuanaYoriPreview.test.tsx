import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';
import { getClientWorld } from '@/lib/client-world';

afterEach(cleanup);

const world = getClientWorld('luana')!;

describe('LuanaYoriPreview', () => {
  it('opens as a compact Luana gateway into real YORI', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(
      screen.getAllByText((_, element) => element?.textContent?.trim() === 'LUANA LUMINA').length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /Luana, hier liegt schon etwas von dir/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('luanalumiina')).toBeInTheDocument();
    expect(screen.getByText(/bekannt · nicht verifiziert/i)).toBeInTheDocument();
    expect(screen.getByText(/Produktions-Domain offen/i)).toBeInTheDocument();
  });

  it('links the prefilled public handle into the real YORI creator preview', () => {
    render(<LuanaYoriPreview world={world} />);

    const link = screen.getByRole('link', { name: /Haus mit @luanalumiina betreten/i });
    expect(link).toHaveAttribute(
      'href',
      'https://yori-pm0i.onrender.com/demo?platform=instagram&creator=luanalumiina'
    );
  });

  it('shows only truthful connector capabilities', () => {
    render(<LuanaYoriPreview world={world} />);

    /*
     * "TikTok" steht zweimal auf der Seite: einmal als Plattform-Reiter und
     * einmal als Quelle in der Leiste. Gemeint ist hier die Quelle, also auf
     * deren Auszeichnung eingegrenzt statt die Zusicherung aufzuweichen.
     */
    const source = { selector: 'strong' } as const;
    expect(screen.getByText(/^TikTok$/i, source)).toBeInTheDocument();
    expect(screen.getByText(/OAuth · echte Profil- & Videodaten/i)).toBeInTheDocument();
    expect(screen.getByText(/^Kalender$/i, source)).toBeInTheDocument();
    expect(screen.getByText(/^Website$/i, source)).toBeInTheDocument();
    expect(screen.getByText(/Keine Social-Zahl wird geraten/i)).toBeInTheDocument();
  });

  it('does not bring back the long audit or chapter experience', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.queryByText(/Gemeinsamer Stand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wir haben uns deinen Auftritt angesehen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/01 · Ankommen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Nicht mehr Oberfläche\. Mehr Zusammenhang/i)).not.toBeInTheDocument();
  });
});
