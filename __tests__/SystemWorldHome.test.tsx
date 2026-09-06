import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SystemWorldHome from '@/components/SystemWorldHome';

vi.mock('next/image', () => ({
  default: ({ alt = '', ...props }: any) => <img alt={alt} {...props} />,
}));

afterEach(cleanup);

describe('SystemWorldHome', () => {
  it('explains the product to a first-time visitor and keeps the real entry path', () => {
    render(<SystemWorldHome locale="de" />);

    expect(
      screen.getByText('Deine Arbeit, Dateien und KI – in einem System, das den Zusammenhang behält.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Was heute über viele Tools verteilt ist, lebt hier zusammen.')).toBeInTheDocument();
    expect(screen.getAllByText('MÔRA').length).toBeGreaterThan(0);
    expect(screen.queryByText('DESK')).not.toBeInTheDocument();
    expect(screen.queryByText(/Nicht vier Produkte/i)).not.toBeInTheDocument();
    expect(screen.getByText('Vorträge')).toBeInTheDocument();
    expect(screen.getByText('Schulungen & Workshops')).toBeInTheDocument();

    const enter = screen.getByRole('link', { name: /Saimôr OS ausprobieren/i });
    expect(enter).toHaveAttribute('href', '/de/einstieg/security-check');
  });

  it('does not regress to historic product framing', () => {
    render(<SystemWorldHome locale="de" />);

    expect(screen.queryByText('Dein System beginnt mit etwas Echtem.')).not.toBeInTheDocument();
    expect(screen.queryByText('Vom ersten Check in deinen eigenen Raum')).not.toBeInTheDocument();
    expect(screen.queryByText(/Vier Ebenen derselben Idee/i)).not.toBeInTheDocument();
  });
});
