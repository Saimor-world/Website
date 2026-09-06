import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SystemWorldHome from '@/components/SystemWorldHome';

vi.mock('next/image', () => ({
  default: ({ alt = '', ...props }: any) => <img alt={alt} {...props} />,
}));

afterEach(cleanup);

describe('SystemWorldHome', () => {
  it('presents Saimôr as one connected system and keeps the real entry path', () => {
    render(<SystemWorldHome locale="de" />);

    expect(screen.getByText('Digitale Arbeitsräume, die Kontext behalten.')).toBeInTheDocument();
    expect(screen.getAllByText('MÔRA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DESK').length).toBeGreaterThan(0);
    expect(screen.getByText('Vorträge')).toBeInTheDocument();
    expect(screen.getByText('Schulungen & Workshops')).toBeInTheDocument();

    const enter = screen.getByRole('link', { name: /System betreten/i });
    expect(enter).toHaveAttribute('href', '/de/einstieg/security-check');
  });

  it('does not regress to the discarded forest-onboarding hero', () => {
    render(<SystemWorldHome locale="de" />);

    expect(screen.queryByText('Dein System beginnt mit etwas Echtem.')).not.toBeInTheDocument();
    expect(screen.queryByText('Vom ersten Check in deinen eigenen Raum')).not.toBeInTheDocument();
  });
});
