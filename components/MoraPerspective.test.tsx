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
    expect(container.querySelectorAll('img')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA kennenlernen' }));
    expect(container.querySelectorAll('img')).toHaveLength(1);
    const image = container.querySelector('img')!;
    expect(container.querySelector('[data-face-state]')).toBeNull();
    fireEvent.error(image);
    expect(container.querySelector('[data-face-state]')).toBeNull();
    expect(screen.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
    fireEvent.load(image);
    expect(container.querySelector('[data-guide-ready="true"] [data-face-state="rest"]')).not.toBeNull();
  });
  it('offers an optional explanation, returning focus when the visitor enjoys the clearing', () => {
    render(<MoraPerspective locale="de" morning onLight={vi.fn()} onLook={vi.fn()} still={false} />);
    expect(screen.queryByRole('heading', { name: 'Klarheit beginnt mit Zusammenhang.' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA kennenlernen' }));
    expect(screen.getByRole('heading', { name: 'Klarheit beginnt mit Zusammenhang.' })).toHaveFocus();
    expect(screen.getByText(/Dafür steht diese Lichtung/)).toBeInTheDocument();
    expect(screen.getByText('Du entscheidest, was passiert')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Lichtung genießen' }));
    expect(screen.getByRole('button', { name: 'MÔRA kennenlernen' })).toHaveFocus();
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
    fireEvent.click(screen.getByRole('button', { name: 'Get to know MÔRA' }));
    expect(screen.getByRole('link', { name: 'Discover MÔRA in the OS' })).toHaveAttribute('href', '/en/mora#im-os');
  });
});
