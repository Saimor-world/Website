import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Footer from '@/components/Footer';

const mocks = vi.hoisted(() => ({ fetch: vi.fn(), push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
}));

vi.mock('next/image', () => ({
  default: () => <span data-testid="saimor-logo" />,
}));

vi.mock('@/components/NewsletterSignup', () => ({
  default: () => <span data-testid="newsletter" />,
}));

vi.mock('@/components/ShareButton', () => ({
  default: () => <span data-testid="share" />,
}));

beforeEach(() => {
  mocks.fetch.mockReset();
  mocks.push.mockReset();
  vi.stubGlobal('fetch', mocks.fetch);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('Footer system status', () => {
  it('shows available only after a successful health response', async () => {
    mocks.fetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    render(<Footer locale="de" />);

    expect(await screen.findByText('System verf\u00fcgbar')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('data-system-status', 'available');
  });

  it('shows a limited state for a reachable unhealthy service', async () => {
    mocks.fetch.mockResolvedValue({ ok: false, json: async () => ({ ok: false }) });
    render(<Footer locale="de" />);

    expect(await screen.findByText('System eingeschr\u00e4nkt')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('data-system-status', 'limited');
  });
  it('uses an honest unknown state when health cannot be reached', async () => {
    mocks.fetch.mockRejectedValue(new Error('offline'));
    render(<Footer locale="en" />);

    expect(await screen.findByText('Status unknown')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('data-system-status', 'unknown');
  });
});
