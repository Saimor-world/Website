import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import GermanImprint from '@/app/de/rechtliches/impressum/page';
import EnglishImprint from '@/app/en/legal/imprint/page';

afterEach(cleanup);

describe('legal notice', () => {
  it('uses the current German legal references', () => {
    render(<GermanImprint />);

    expect(screen.getByText('Angaben gemäß § 5 DDG')).toBeInTheDocument();
    expect(
      screen.getByText('Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV')
    ).toBeInTheDocument();
    expect(screen.queryByText(/Online-Streitbeilegung/)).not.toBeInTheDocument();
  });

  it('keeps the English imprint in sync', () => {
    render(<EnglishImprint />);

    expect(screen.getByText('Information according to § 5 DDG')).toBeInTheDocument();
    expect(
      screen.getByText('Responsible for content according to § 18 Para. 2 MStV')
    ).toBeInTheDocument();
    expect(screen.queryByText(/online dispute resolution/i)).not.toBeInTheDocument();
  });
});
