import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import HowItWorks from '@/components/HowItWorks';

afterEach(cleanup);

describe('HowItWorks', () => {
  it('renders German steps and snapshot', () => {
    const { container } = render(<HowItWorks locale="de" />);

    expect(screen.getByText(/So arbeitet/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Signale sammeln/ })).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders English copy', () => {
    render(<HowItWorks locale="en" />);

    expect(screen.getByText(/How .* works/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Collect signals/ })).toBeInTheDocument();
  });
});
