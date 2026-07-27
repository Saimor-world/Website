import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import GermanLegalLayout from '@/app/de/rechtliches/layout';
import EnglishLegalLayout from '@/app/en/legal/layout';

afterEach(cleanup);

describe('legal shell', () => {
  it('provides the German legal navigation in the current World shell', () => {
    render(
      <GermanLegalLayout>
        <p>Dokumentinhalt</p>
      </GermanLegalLayout>
    );

    expect(screen.getByRole('heading', { name: 'Rechtliches & Transparenz' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Rechtliche Dokumente' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute(
      'href',
      '/de/rechtliches/datenschutz'
    );
    expect(screen.getByText('Dokumentinhalt')).toBeInTheDocument();
  });

  it('provides the matching English legal navigation', () => {
    render(
      <EnglishLegalLayout>
        <p>Document content</p>
      </EnglishLegalLayout>
    );

    expect(screen.getByRole('heading', { name: 'Legal & Transparency' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Legal documents' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute(
      'href',
      '/en/legal/privacy'
    );
    expect(screen.getByText('Document content')).toBeInTheDocument();
  });
});
