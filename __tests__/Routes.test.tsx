import { screen } from '@testing-library/dom';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import DemoPage from '@/app/demo/page';

afterEach(cleanup);

describe('Routing stubs', () => {
  it('renders demo placeholder', () => {
    render(<DemoPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
