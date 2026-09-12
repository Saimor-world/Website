import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MoraSignalPreview from '@/components/MoraSignalPreview';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('MoraSignalPreview', () => {
  it('only loads on request and renders source links without executable URLs', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ live: true, source: 'Test source', items: [
      { title: 'A source article', url: 'https://example.org/article' },
      { title: 'Unsafe link', url: 'javascript:alert(1)' },
    ] }) });
    vi.stubGlobal('fetch', fetcher);
    render(<MoraSignalPreview locale="en" />);
    expect(fetcher).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Load public signals' }));
    expect(await screen.findByRole('link', { name: 'A source article' })).toHaveAttribute('href', 'https://example.org/article');
    expect(screen.queryByText('Unsafe link')).not.toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('reports an unavailable feed honestly and allows retry', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ live: false, items: [] }) }));
    render(<MoraSignalPreview locale="de" />);
    fireEvent.click(screen.getByRole('button', { name: 'Öffentliche Signale laden' }));
    expect(await screen.findByText(/Quellen sind gerade nicht erreichbar/)).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Öffentliche Signale laden' })).toBeEnabled();
  });
});
