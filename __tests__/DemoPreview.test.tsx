import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import DemoPreview from '@/components/DemoPreview';

afterEach(cleanup);

describe('DemoPreview', () => {
  it('shows German demo hint and badge', () => {
    const { container } = render(<DemoPreview locale="de" />);

    expect(screen.getByText('Live Demo Panel')).toBeInTheDocument();
    expect(screen.getAllByText(/Demo-Ansicht/).length).toBeGreaterThan(0);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders English copy without crashing', () => {
    const { container } = render(<DemoPreview locale="en" />);

    expect(screen.getByText(/resonance space/i)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
