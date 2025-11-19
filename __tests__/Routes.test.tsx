import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import DocsPage from '@/app/docs/page';
import DemoPage from '@/app/demo/page';

afterEach(cleanup);

describe('Routing stubs', () => {
  it('renders docs placeholder', () => {
    render(<DocsPage />);
    expect(screen.getByText(/Documentation Hub/)).toBeInTheDocument();
  });

  it('renders demo placeholder', () => {
    render(<DemoPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Live Demo Panel/i })
    ).toBeInTheDocument();
  });
});
