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
    expect(screen.getByRole('heading', { name: /Nicht noch ein Chat. Ein Ort für deine ganze Arbeit./i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('luanalumiina')).toBeInTheDocument();
    expect(screen.getByText(/Genannt heißt nicht verbunden/i)).toBeInTheDocument();
  });

  it('shows the real tool context Luana named without pretending it is connected', () => {
    render(<LuanaYoriPreview world={world} />);

    for (const tool of ['Claude', 'Notion', 'Canva', 'Calendly', 'MailerLite', 'Stripe', 'PayPal', 'Zoom', 'CapCut']) {
      expect(screen.getByText(tool)).toBeInTheDocument();
    }
    expect(screen.getByText(/Quelle erst als aktiv, wenn eine echte Provider-Verbindung steht/i)).toBeInTheDocument();
  });

  it('carries the prefilled handle into the public creator preview', () => {
    render(<LuanaYoriPreview world={world} />);

    const link = screen.getByRole('link', { name: /YORI mit @luanalumiina öffnen/i });
    expect(link).toHaveAttribute(
      'href',
      'https://frnt.saimor.world/demo?platform=instagram&creator=luanalumiina'
    );
  });

  it('links real account connections into the protected YORI login flow', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.getByRole('link', { name: /Geschützte Konten verbinden/i })).toHaveAttribute(
      'href',
      'https://frnt.saimor.world/login?next=%2F%3Fconnections%3D1'
    );

    expect(screen.getByText(/TikTok/i, { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText(/Google OAuth/i)).toBeInTheDocument();
    expect(screen.getByText(/IMAP \/ SMTP/i)).toBeInTheDocument();
    expect(screen.getByText(/YORI Cut · nativ/i)).toBeInTheDocument();
  });

  it('does not bring back the long audit or fake connection language', () => {
    render(<LuanaYoriPreview world={world} />);

    expect(screen.queryByText(/Gemeinsamer Stand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wir haben uns deinen Auftritt angesehen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/01 · Ankommen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/alle Konten sind verbunden/i)).not.toBeInTheDocument();
  });
});
