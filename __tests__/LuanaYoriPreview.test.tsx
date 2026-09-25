import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LuanaYoriPreview from '@/components/LuanaYoriPreview';

afterEach(cleanup);

describe('LuanaYoriPreview', () => {
  it('opens as a compact doorway into real YORI', () => {
    render(<LuanaYoriPreview />);

    expect(
      screen.getByRole('heading', { name: /Nicht noch ein Tool. Ein Ort, der den Zusammenhang hält./i }),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('luanalumiina')).toBeInTheDocument();
    expect(screen.getByText(/Genannt heißt nicht verbunden/i)).toBeInTheDocument();
  });

  it('shows known tools as context without pretending they are connected', () => {
    render(<LuanaYoriPreview />);

    expect(screen.getByText(/Claude · Notion · Canva · Calendly · MailerLite · CapCut/i)).toBeInTheDocument();
    expect(screen.getByText(/Eine Quelle wird erst aktiv, wenn du sie in YORI selbst freigibst/i)).toBeInTheDocument();
  });

  it('carries the prefilled public handle into the creator preview', () => {
    render(<LuanaYoriPreview />);

    expect(screen.getByRole('link', { name: /Weiter mit @luanalumiina/i })).toHaveAttribute(
      'href',
      'https://frnt.saimor.world/demo?platform=instagram&creator=luanalumiina',
    );
  });

  it('links real connections into the protected YORI flow', () => {
    render(<LuanaYoriPreview />);

    expect(screen.getByRole('link', { name: /Echte Konten in YORI verbinden/i })).toHaveAttribute(
      'href',
      'https://frnt.saimor.world/login?next=%2F%3Fconnections%3D1',
    );

    expect(screen.getByText(/OAuth · Profil & Videos/i)).toBeInTheDocument();
    expect(screen.getByText(/IMAP \/ SMTP/i)).toBeInTheDocument();
    expect(screen.getByText(/YORI Cut/i)).toBeInTheDocument();
  });

  it('does not reintroduce audit or fake-connection language', () => {
    render(<LuanaYoriPreview />);

    expect(screen.queryByText(/Gemeinsamer Stand/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wir haben uns deinen Auftritt angesehen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/alle Konten sind verbunden/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Follower/i)).not.toBeInTheDocument();
  });
});
