import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Footer from '@/components/Footer';

vi.mock('next/image', () => ({ default: () => <span data-testid="saimor-logo" /> }));
afterEach(cleanup);

describe('Footer', () => {
  it('keeps the public footer concise and links to the demo overview', () => {
    render(<Footer locale="de" />);
    expect(screen.getByText('KI-Arbeitsräume und begrenzte Pilotprojekte.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Demo' })).toHaveAttribute('href', '/demo');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('contains the required legal links', () => {
    render(<Footer locale="de" />);
    expect(screen.getByRole('link', { name: 'Impressum' })).toHaveAttribute('href', '/de/rechtliches/impressum');
    expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute('href', '/de/rechtliches/datenschutz');
  });
});
