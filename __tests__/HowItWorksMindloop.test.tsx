import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import HowItWorksMindloop from '@/components/HowItWorksMindloop';

afterEach(cleanup);

describe('HowItWorksMindloop', () => {
  it('renders three German steps', () => {
    const { container } = render(<HowItWorksMindloop locale="de" />);

    expect(screen.getByText('Signale sammeln')).toBeInTheDocument();
    expect(screen.getByText('Bedeutung erkennen')).toBeInTheDocument();
    expect(screen.getByText('Kontext sichtbar machen')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
