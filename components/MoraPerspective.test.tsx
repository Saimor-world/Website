import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MoraPerspective from './MoraPerspective';

vi.mock('next/image', () => ({
  default: ({ alt = '', ...props }: any) => <img alt={alt} {...props} />,
}));
afterEach(cleanup);
describe('the clearing', () => {
  it('reveals the guide eyes only once the stone image has loaded', () => {
    const { container } = render(<MoraPerspective locale="de" morning onLight={vi.fn()} onLook={vi.fn()} still={false} />);
    const image = container.querySelector('img')!;
    expect(container.querySelector('[data-face-state]')).toBeNull();
    fireEvent.error(image);
    expect(container.querySelector('[data-face-state]')).toBeNull();
    expect(screen.getByRole('link', { name: 'Mit MÔRA weiter' })).toHaveAttribute('href', '/mora');
    fireEvent.load(image);
    expect(container.querySelector('[data-guide-ready="true"] [data-face-state="rest"]')).not.toBeNull();
  });
  it('supports bounded keyboard exploration and a deliberate return to centre', () => {
    const onLook = vi.fn();
    render(<MoraPerspective locale="de" morning onLight={vi.fn()} onLook={onLook} still={false} />);
    const clearing = screen.getByRole('region', { name: 'Die Lichtung erkunden' });
    for (let i = 0; i < 5; i++) fireEvent.keyDown(clearing, { key: 'ArrowRight' });
    expect(onLook).toHaveBeenLastCalledWith(1, 0);
    fireEvent.keyDown(clearing, { key: 'ArrowUp' });
    expect(onLook).toHaveBeenLastCalledWith(1, -.35);
    fireEvent.keyDown(clearing, { key: 'Home' });
    expect(onLook).toHaveBeenLastCalledWith(0, 0);
    expect(screen.queryByText('Bewege deinen Blick.')).not.toBeInTheDocument();
  });
  it('holds the camera for both pause and reduced motion, including pointer leave and Home', () => {
    const onLook = vi.fn();
    render(<MoraPerspective locale="en" morning onLight={vi.fn()} onLook={onLook} still />);
    const clearing = screen.getByRole('region', { name: 'Explore the clearing' });
    fireEvent.keyDown(clearing, { key: 'ArrowRight' });
    fireEvent.keyDown(clearing, { key: 'Home' });
    fireEvent.pointerLeave(clearing);
    expect(onLook).not.toHaveBeenCalled();
    expect(screen.getByRole('link', { name: 'Continue with MÔRA' })).toHaveAttribute('href', '/en/mora');
  });
});
