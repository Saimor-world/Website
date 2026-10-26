import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MoraPerspective from './MoraPerspective';

vi.mock('./MoraCharacterBody', () => ({
  default: ({ state = 'idle', still }: { state?: string; still: boolean }) =>
    <span data-mora-body data-character-state={state} data-still={still} />,
}));
vi.mock('next/image', () => ({
  default: ({ alt = '', ...props }: any) => <img alt={alt} {...props} />,
}));
afterEach(() => { cleanup();vi.restoreAllMocks(); });
describe('the clearing', () => {
  it('keeps exactly one canonical body when the product explanation opens', () => {
    const { container } = render(<MoraPerspective locale="de" morning onLight={vi.fn()} onLook={vi.fn()} still={false} />);
    expect(container.querySelectorAll('[data-mora-body]')).toHaveLength(1);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('[data-face-state]')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'MÔRA kennenlernen' }));
    expect(container.querySelectorAll('[data-mora-body]')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'MÔRA im OS entdecken' })).toHaveAttribute('href', '/mora#im-os');
    fireEvent.pointerOver(screen.getByText('Dateien, Termine, offene Dinge'));
    expect(container.querySelector('[data-mora-body]')).toHaveAttribute('data-character-state', 'listening');
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
  it('does not steal a visitor’s guide focus when the delayed dawn focus runs', () => {
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.push(callback);return frames.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const props = { locale: 'en' as const, onLight: vi.fn(), onLook: vi.fn(), still: false };
    const { rerender } = render(<MoraPerspective {...props} morning={false} />);
    act(() => frames.splice(0).forEach(callback => callback(0)));
    expect(screen.getByRole('heading', { name: 'Through MÔRA’s eyes' })).toHaveFocus();
    rerender(<MoraPerspective {...props} morning />);
    const guide = screen.getByRole('button', { name: 'Get to know MÔRA' });
    guide.focus();
    act(() => frames.splice(0).forEach(callback => callback(16)));
    expect(guide).toHaveFocus();
    fireEvent.click(guide);
    expect(screen.getByRole('heading', { name: 'Clarity begins with context.' })).toHaveFocus();
  });

});
