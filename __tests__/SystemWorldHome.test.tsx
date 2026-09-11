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
      screen.getByText('Dateien, Aufgaben und KI. Ein gemeinsamer Arbeitsraum.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Ein Raum, in dem Dinge zueinander finden.')).toBeInTheDocument();
    expect(screen.getAllByText('MÔRA').length).toBeGreaterThan(0);
    expect(screen.getByText('Der Raum, der Kontext hält.')).toBeInTheDocument();
    expect(screen.getByText('Die Präsenz, die Veränderungen bemerkt.')).toBeInTheDocument();
    expect(screen.queryByText('ARBEIT')).not.toBeInTheDocument();
    expect(screen.queryByText('KONTEXT')).not.toBeInTheDocument();
    expect(screen.queryByText('AUSFÜHRUNG')).not.toBeInTheDocument();
    expect(screen.queryByText('YORI')).not.toBeInTheDocument();
    expect(screen.queryByText('DESK')).not.toBeInTheDocument();
    expect(screen.queryByText(/Saimôr Desk/i)).not.toBeInTheDocument();
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
    expect(screen.queryByText(/Was heute über viele Tools verteilt ist/i)).not.toBeInTheDocument();
  });

  it('keeps the public studio voice organizational rather than solo-founder led', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const publicCopy = container.textContent ?? '';

    expect(publicCopy).toContain('Saimôr ist unser unabhängiges Produktstudio.');
    expect(publicCopy).toContain('Wir verbinden Erfahrung aus IT-Systemmanagement');
    expect(publicCopy).not.toMatch(/Marius Fahrländer/i);
    expect(publicCopy).not.toMatch(/Solo[- ]?Founder/i);
    expect(publicCopy).not.toMatch(/Gründer(?:in)?/i);
    expect(publicCopy).not.toMatch(/Founder/i);
  });
});
