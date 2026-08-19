import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ScanPage from '@/components/ScanPage';

afterEach(cleanup);

describe('ScanPage copy', () => {
  it('uses canonical product naming and readable German text', () => {
    render(<ScanPage locale="de" />);

    expect(screen.getByText(/Saimôr/)).toBeInTheDocument();
    expect(screen.getByText('Größe')).toBeInTheDocument();
    expect(screen.queryByText(/Mora OS/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Nightwatch/)).not.toBeInTheDocument();
    expect(screen.queryByText(/HQ-Preview/)).not.toBeInTheDocument();
    expect(screen.queryByText(/prueft|oeffentliche|uebersetzt/)).not.toBeInTheDocument();
  });
});
