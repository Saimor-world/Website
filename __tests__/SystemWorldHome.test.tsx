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
    expect(screen.getByText('Arbeitsräume, die Kontext behalten.')).toBeInTheDocument();
    expect(screen.getByText('Kontext soll mitkommen, nicht jedes Mal neu erklärt werden.')).toBeInTheDocument();
    expect(screen.getAllByText('MÔRA').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'MÔRA kennenlernen' })).toHaveAttribute('href', '/mora');
    expect(screen.getByRole('button', { name: 'Öffentliche Signale laden' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'YORI für Creator' })).toHaveAttribute('href', '/yori');
    expect(screen.queryByText('DESK')).not.toBeInTheDocument();
    expect(screen.queryByText(/Saimôr Desk/i)).not.toBeInTheDocument();
    expect(screen.getByText('ORBIT')).toBeInTheDocument();
    expect(screen.getByText('PULSE')).toBeInTheDocument();
    expect(screen.getByText('SYSTEMS')).toBeInTheDocument();
    const enter = screen.getByRole('link', { name: /Saimôr OS ansehen/i });
    expect(enter).toHaveAttribute('href', '/de/einstieg/security-check');
  });

  it('does not regress to the old card or orbit-like system framing', () => {
    render(<SystemWorldHome locale="de" />);
    expect(screen.queryByText('Ein Raum, in dem Dinge zueinander finden.')).not.toBeInTheDocument();
    expect(screen.queryByText('Der Raum, der Kontext hält.')).not.toBeInTheDocument();
    expect(screen.queryByText('Die Präsenz, die Veränderungen bemerkt.')).not.toBeInTheDocument();
    expect(screen.queryByText(/Vier Ebenen derselben Idee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Was heute über viele Tools verteilt ist/i)).not.toBeInTheDocument();
  });

  it('keeps the public studio voice organizational rather than solo-founder led', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const publicCopy = container.textContent ?? '';
    expect(publicCopy).toContain('Wir beginnen nicht mit einem Tool, sondern mit dem Zusammenhang.');
    expect(publicCopy).toContain('ORBIT klärt, was wirklich gebraucht wird.');
    expect(publicCopy).not.toMatch(/Marius Fahrländer/i);
    expect(publicCopy).not.toMatch(/Solo[- ]?Founder/i);
    expect(publicCopy).not.toMatch(/Gründer(?:in)?/i);
    expect(publicCopy).not.toMatch(/Founder/i);
  });
});
