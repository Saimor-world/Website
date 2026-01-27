import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import UseCases from '@/components/UseCases';

afterEach(cleanup);

describe('UseCases', () => {
  it('renders all German cards with CTA link', () => {
    const { container } = render(<UseCases locale="de" />);

    expect(screen.getByText('Teams & Projekte')).toBeInTheDocument();
    expect(screen.getByText(/Caf.+\/ Standort/)).toBeInTheDocument();
    expect(screen.getByText('Kommunale Einrichtungen')).toBeInTheDocument();
    expect(screen.getAllByText(/Kontakt aufnehmen/)[0]).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders English copy', () => {
    render(<UseCases locale="en" />);

    expect(screen.getByText(/Caf.+\/ venue/)).toBeInTheDocument();
    expect(screen.getAllByText(/Reach out/).length).toBeGreaterThan(0);
  });
});

