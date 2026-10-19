import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import StudioWorld from './StudioWorld';

afterEach(cleanup);

describe('StudioWorld', () => {
  it('provides a real German Studio destination with detailed consulting, workshops and implementation', () => {
    const { container } = render(<StudioWorld locale="de" />);
    expect(screen.getByRole('heading', { level: 1, name: /Gute Ideen brauchen keinen größeren Werkzeugkasten/ })).toBeInTheDocument();
    for (const section of ['beratung', 'workshops', 'umsetzung']) expect(container.querySelector('#'+section)).not.toBeNull();
    expect(screen.getByRole('link', { name: /Die Möglichkeiten ansehen/ })).toHaveAttribute('href','#wege');
    expect(screen.getByRole('link', { name: /Workshop anfragen/ })).toHaveAttribute('href', '/de/kontakt');
    const expanders = screen.getAllByText('Was dahintersteckt');
    expect(expanders).toHaveLength(3);
    fireEvent.click(expanders[1]);
    expect(screen.getByText('Praktische Übungen anhand passender Beispiele')).toBeInTheDocument();
  });

  it('provides the same anchored sections and working links in English', () => {
    const { container } = render(<StudioWorld locale="en" />);
    expect(screen.getByRole('heading', { level: 1, name: /Good ideas do not need a bigger toolbox/ })).toBeInTheDocument();
    expect(container.querySelector('#workshops')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Ask about a workshop' })).toHaveAttribute('href','/en/contact');
    expect(screen.getAllByText('What it means')).toHaveLength(3);
  });
});
