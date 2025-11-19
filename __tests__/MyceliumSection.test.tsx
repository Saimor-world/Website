import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import MyceliumSection from '@/components/MyceliumSection';

afterEach(cleanup);

describe('MyceliumSection', () => {
  it('renders German forest and mycelium copy', () => {
    const { container } = render(<MyceliumSection locale="de" />);

    expect(screen.getByText('Oben: der Wald')).toBeInTheDocument();
    expect(screen.getByText('Unten: das Myzel')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders English copy', () => {
    render(<MyceliumSection locale="en" />);

    expect(screen.getByText('Above: the forest')).toBeInTheDocument();
    expect(screen.getByText('Below: the mycelium')).toBeInTheDocument();
  });
});
