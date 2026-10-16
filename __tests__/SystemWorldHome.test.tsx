import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SystemWorldHome from '@/components/SystemWorldHome';

vi.mock('next/image', () => ({
  default: ({ alt = '', ...props }: any) => <img alt={alt} {...props} />,
}));

afterEach(cleanup);

describe('SystemWorldHome', () => {
  it('explains the product to a first-time visitor and keeps the real entry path', () => {
    render(<SystemWorldHome locale="de" />);
    expect(screen.getByText('Arbeitsräume, die Kontext behalten.')).toBeInTheDocument();
    expect(screen.getByText('Kontext soll mitkommen, nicht jedes Mal neu erklärt werden.')).toBeInTheDocument();
    expect(screen.getAllByText('MÔRA').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'MÔRA kennenlernen' })).toHaveAttribute('href', '/mora');
    expect(screen.getByRole('button', { name: 'Öffentliche Signale laden' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'YORI für Creator' })).toHaveAttribute('href', '/yori');
    expect(screen.queryByText('DESK')).not.toBeInTheDocument();
    expect(screen.queryByText(/Saimôr Desk/i)).not.toBeInTheDocument();
    expect(screen.getByText('Beratung')).toBeInTheDocument();
    expect(screen.getByText('Workshops')).toBeInTheDocument();
    expect(screen.getByText('Umsetzung')).toBeInTheDocument();
    const entries = screen.getAllByRole('link', { name: /Security Check starten/i });
    expect(entries.length).toBeGreaterThanOrEqual(1);
    for (const entry of entries) {
      expect(entry).toHaveAttribute('href', '/de/einstieg/security-check');
    }
  });

  it('says each entry idea once and links the named products', () => {
    for (const locale of ['de', 'en'] as const) {
      const { container } = render(<SystemWorldHome locale={locale} />);
      const copy = container.textContent ?? '';
      const promptBox = locale === 'de' ? /leeren Promptbox/g : /empty prompt box/g;
      expect(copy.match(promptBox)?.length ?? 0).toBe(1);
      expect(screen.getByRole('link', { name: 'YORI' })).toHaveAttribute('href', locale === 'de' ? '/yori' : '/en/yori');
      expect(screen.getByRole('link', { name: 'Saimôr Earth' })).toHaveAttribute('href', '/earth');
      cleanup();
    }
  });

  it('does not regress to the old card or orbit-like system framing', () => {
    render(<SystemWorldHome locale="de" />);
    expect(screen.queryByText('Ein Raum, in dem Dinge zueinander finden.')).not.toBeInTheDocument();
    expect(screen.queryByText('Der Raum, der Kontext hält.')).not.toBeInTheDocument();
    expect(screen.queryByText('Die Präsenz, die Veränderungen bemerkt.')).not.toBeInTheDocument();
    expect(screen.queryByText(/Vier Ebenen derselben Idee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Was heute über viele Tools verteilt ist/i)).not.toBeInTheDocument();
  });

  it('keeps the cosmic hero, forest, product worlds and contact in one readable sequence', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const sections: Element[] = [...container.querySelectorAll('section')];
    const hero = container.querySelector('#world-title')?.closest('section');
    const forest = container.querySelector('#system');
    const products = container.querySelector('#products');
    const intelligence = container.querySelector('#intelligence-title')?.closest('section');
    const studio = container.querySelector('#studio');
    const contact = container.querySelector('#contact');
    expect([hero, forest, products, intelligence, studio, contact].every(Boolean)).toBe(true);
    const positions = [hero, forest, products, intelligence, studio, contact].map(section => sections.indexOf(section!));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(positions.every((index) => index >= 0)).toBe(true);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'SAIMÔR entdecken' })).toHaveAttribute('href', '#system');
    expect(screen.getByRole('link', { name: 'MÔRA im Detail entdecken' })).toHaveAttribute('href', '/mora');
  });

  it('requests enough image detail for the re-composed iPhone landscapes', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const cosmos = container.querySelector('img[src="/images/saimor-cosmos-layer.webp"]');
    const forest = container.querySelector('img[src="/images/saimor-forest-layer.webp"]');
    expect(cosmos).toHaveAttribute('sizes', expect.stringContaining('(max-width: 390px) 185vw'));
    expect(cosmos).toHaveAttribute('sizes', expect.stringContaining('(max-width: 700px) 175vw'));
    expect(forest).toHaveAttribute('sizes', expect.stringContaining('(max-width: 390px) 205vw'));
    expect(forest).toHaveAttribute('sizes', expect.stringContaining('(max-width: 700px) 195vw'));
  });

  it('links the digital threshold without covering it and keeps four quiet context signals in both languages', () => {
    for (const locale of ['de', 'en'] as const) {
      const { container } = render(<SystemWorldHome locale={locale} />);
      const heading = screen.getByRole('heading', {
        name: locale === 'de'
          ? 'Kontext soll mitkommen, nicht jedes Mal neu erklärt werden.'
          : 'Context should come with you instead of being explained again every time.',
      });
      const section = heading.closest('section');
      expect(section).toHaveAttribute('id', 'system');
      const stage = section?.querySelector('[class*="contextStage"]');
      expect(stage).not.toBeNull();
      const portal = stage?.querySelector('[class*="portalCanvas"]');
      expect(portal).not.toBeNull();
      expect(portal?.querySelector('[aria-hidden="true"]')).not.toBeNull();
      const entry = screen.getByRole('link', { name: locale === 'de' ? 'MÔRA kennenlernen' : 'Meet MÔRA' });
      expect(stage?.contains(entry)).toBe(true);
      expect(portal?.contains(entry)).toBe(false);
      expect(entry).toHaveAttribute('href', locale === 'de' ? '/mora' : '/en/mora');
      const list = section?.querySelector('ul[aria-label]');
      expect(list?.children).toHaveLength(4);
      expect(portal?.contains(list ?? null)).toBe(false);
      cleanup();
    }
  });

  it('keeps the public studio voice organizational rather than solo-founder led', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const publicCopy = container.textContent ?? '';
    expect(publicCopy).toContain('Wir beginnen nicht mit einem Tool, sondern mit dem Zusammenhang.');
    expect(publicCopy).toContain('Erst klären wir, was wirklich gebraucht wird.');
    expect(publicCopy).not.toMatch(/Marius Fahrländer/i);
    expect(publicCopy).not.toMatch(/Solo[- ]?Founder/i);
    expect(publicCopy).not.toMatch(/Gründer(?:in)?/i);
    expect(publicCopy).not.toMatch(/Founder/i);
    expect(publicCopy).not.toMatch(/ORBIT|PULSE|SYSTEMS/i);
  });
});
