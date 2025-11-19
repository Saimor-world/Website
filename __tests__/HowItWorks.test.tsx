import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import HowItWorks from '@/components/HowItWorks';

afterEach(cleanup);

describe('HowItWorks', () => {
  it('renders German steps and snapshot', () => {
    const { container } = render(<HowItWorks locale="de" />);

    expect(screen.getByText(/Wald oben, Myzel unten/i)).toBeInTheDocument();
    expect(screen.getByText(/Signale sammeln/)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders English copy', () => {
    render(<HowItWorks locale="en" />);

    expect(screen.getByText(/Forest above, mycelium below/i)).toBeInTheDocument();
    expect(screen.getByText(/Collect signals/)).toBeInTheDocument();
  });
});
