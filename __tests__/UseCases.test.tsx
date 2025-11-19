import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import UseCases from '@/components/UseCases';

afterEach(cleanup);

describe('UseCases', () => {
  it('renders all German cards with CTA link', () => {
    const { container } = render(<UseCases locale="de" />);

    ['Teams & Projekte', 'Café / kleiner Standort', 'Kommunale Einrichtungen'].forEach(
      (heading) => {
        expect(screen.getByText(heading)).toBeInTheDocument();
      }
    );
    expect(screen.getAllByText(/Kontakt aufnehmen/)[0]).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders English copy', () => {
    render(<UseCases locale="en" />);

    expect(screen.getByText(/Small café \/ location/)).toBeInTheDocument();
    expect(screen.getAllByText(/Contact us/).length).toBeGreaterThan(0);
  });
});
