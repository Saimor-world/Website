import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MoraLandingPage from './MoraLandingPage';

vi.mock('@/components/DemoLaunchButton', () => ({ DemoLaunchButton: ({ label }: { label: string }) => <button>{label}</button> }));
vi.mock('./DemoLaunchButton', () => ({ DemoLaunchButton: ({ label }: { label: string }) => <button>{label}</button> }));
beforeEach(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => null);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('MÔRA hero', () => {
  it('shows pixel MÔRA in the pixel sky, circled by files, meetings and messages as nature planets', () => {
    const { container } = render(<MoraLandingPage locale="de" />);
    expect(screen.getByText('MÔRA kennt deinen Laden und denkt mit.')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-mora-presence]')).toHaveLength(1);
    expect(screen.getByRole('img', { name: /MÔRA im Pixel-Himmel/ }).querySelector('[data-pixel-mora]')).not.toBeNull();
    expect(screen.getByTestId('pixel-sky')).toBeInTheDocument();
    expect([...container.querySelectorAll('canvas[data-biome]')].map(c => c.getAttribute('data-biome'))).toEqual(['forest', 'water', 'light']);
    for (const label of ['Dateien', 'Termine', 'Nachrichten']) expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.querySelector('img[src*="mora-stone"]')).toBeNull();
  });

  it('speaks English', () => {
    render(<MoraLandingPage locale="en" />);
    expect(screen.getByText('MÔRA knows your business and thinks along.')).toBeInTheDocument();
  });
});
