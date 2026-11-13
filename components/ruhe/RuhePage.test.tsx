import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RuhePage from './RuhePage';

vi.mock('next/image', () => ({ default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} /> }));

describe('Ruhe home product journey', () => {
  it('keeps public product, sign-in and Security Check routes reachable without a private pilot link', () => {
    const { container } = render(<RuhePage locale="de" />);
    expect(screen.getByRole('link', { name: 'YORI erkunden →' })).toHaveAttribute('href', '/yori');
    expect(screen.getByRole('link', { name: 'MÔRA entdecken →' })).toHaveAttribute('href', '/mora/deep-view');
    expect(screen.getByRole('link', { name: 'Security Check →' })).toHaveAttribute('href', '/de/einstieg/security-check');
    expect(screen.getByRole('link', { name: 'Zugang' })).toHaveAttribute('href', '/login');
    expect(container.textContent).toContain('Produktvorschau');
    expect(container.textContent).toContain('Geplante Edition');
    expect(container.innerHTML).not.toContain('/luana');
    expect(container.textContent).not.toContain('verifizierte XRPL-Provenienz');
  });

  it('provides English copy and legal links with a keyboard-accessible artefact control', () => {
    render(<RuhePage locale="en" />);
    expect(screen.getByText('Clarity through change')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Imprint' })).toHaveAttribute('href', '/en/legal/imprint');
    expect(screen.getByRole('link', { name: 'Explore YORI →' })).toHaveAttribute('href', '/en/yori');
    const control = screen.getByRole('button', { name: 'Zoom into ORIGIN' });
    expect(control).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(control);
    expect(screen.getByRole('button', { name: 'Zoom out of ORIGIN' })).toHaveAttribute('aria-pressed', 'true');
  });
});
