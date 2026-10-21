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
    expect(screen.getByRole('link', { name: 'MÔRA im Detail entdecken' })).toHaveAttribute('href', '/mora');
    expect(screen.getByRole('link', { name: 'Deep View öffnen' })).toHaveAttribute('href', '/mora/deep-view');
    expect(screen.getByText('Klingt sicher.')).toBeInTheDocument();
    expect(screen.getByText('Ist es auch belegt?')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Öffentliche Signale laden' })).not.toBeInTheDocument();
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

  it('presents uncertain AI signals as a Deep View rather than a public news feed in both languages', () => {
    for (const locale of ['de', 'en'] as const) {
      render(<SystemWorldHome locale={locale} />);
      expect(screen.getByRole('link', { name: locale === 'de' ? 'Deep View öffnen' : 'Open Deep View' }))
        .toHaveAttribute('href', locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view');
      expect(screen.queryByText(/öffentliche Nachrichtenquellen|public news sources/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /public signals|öffentliche Signale/i })).not.toBeInTheDocument();
      cleanup();
    }
  });

  it('says each entry idea once and links the named products', () => {
    for (const locale of ['de', 'en'] as const) {
      const { container } = render(<SystemWorldHome locale={locale} />);
      const copy = container.textContent ?? '';
      const promptBox = locale === 'de' ? /leeren Promptbox/g : /empty prompt box/g;
      expect(copy.match(promptBox)?.length ?? 0).toBe(1);
      expect(screen.getByRole('link', { name: 'YORI' })).toHaveAttribute('href', locale === 'de' ? '/yori' : '/en/yori');
      expect(screen.queryByRole('link', { name: 'Saimôr Earth' })).not.toBeInTheDocument();
      expect(screen.getByTestId('earth-horizon').querySelector('a')).toHaveAttribute('href', locale === 'de' ? '/earth' : '/en/earth');
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
    const world = container.querySelector('[data-home-globe]');
    const sections: Element[] = [...container.querySelectorAll('section')];
    const hero = container.querySelector('#world-title')?.closest('section');
    const forest = container.querySelector('#system');
    const products = container.querySelector('#products');
    const intelligence = container.querySelector('#intelligence-title')?.closest('section');
    const studio = container.querySelector('#studio');
    const contact = container.querySelector('#contact');
    const earthHorizon = container.querySelector('#earth-horizon');
    expect([hero, forest, earthHorizon, products, intelligence, studio, contact].every(Boolean)).toBe(true);
    const positions = [hero, forest, earthHorizon, products, intelligence, studio, contact].map(section => sections.indexOf(section!));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(positions.every((index) => index >= 0)).toBe(true);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Produkte entdecken' })).toHaveAttribute('href', '#products');
    expect(screen.getByRole('link', { name: 'MÔRA im Detail entdecken' })).toHaveAttribute('href', '/mora');
    const teaser = screen.getByRole('heading', { name: 'Überzeugend. Aber wahr?' });
    expect(earthHorizon!.compareDocumentPosition(teaser) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(forest!.nextElementSibling).toBe(earthHorizon);
  });

  it('uses one scenic photograph throughout the entire forest chapter', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const cosmos = container.querySelector('img[src="/images/saimor-cosmos-layer.webp"]');
    const forest = container.querySelector('img[src="/images/saimor-forest-threshold.webp"]');
    const section = container.querySelector('#system');
    expect(cosmos).toHaveAttribute('sizes', '100vw');
    expect(forest).toHaveAttribute('sizes', '100vw');
    expect(section?.querySelectorAll('img[src*="forest"]')).toHaveLength(1);
    expect(section?.querySelector('img[src="/images/saimor-forest-layer.webp"]')).toBeNull();
  });

  it('connects the forest to Deep View, while product and Studio links stay discoverable', () => {
    for (const locale of ['de', 'en'] as const) {
      const { container } = render(<SystemWorldHome locale={locale} />);
      const section = container.querySelector('#system');
      expect(section).not.toBeNull();
      const portal = section?.querySelector('[class*="portalCanvas"]');
      expect(portal).not.toBeNull();
      expect(portal?.querySelector('a')).toHaveAttribute('href', `${locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'}?from=portal`);
      expect(section?.querySelector('ul[aria-label*="Arbeitsraum"],ul[aria-label*="workspace"]')).toBeNull();
      expect(container.querySelectorAll('img[src="/images/saimor-forest-threshold.webp"]')).toHaveLength(1);
      expect(screen.getAllByRole('link', { name: locale === 'de' ? 'Studio entdecken' : 'Explore Studio' }).some(link => link.getAttribute('href') === (locale === 'de' ? '/studio' : '/en/studio'))).toBe(true);
      expect(screen.getByRole('link', { name: locale === 'de' ? 'Das YORI-Haus entdecken' : 'Explore the YORI house' })).toHaveAttribute('href', locale === 'de' ? '/yori' : '/en/yori');
      cleanup();
    }
  });

  it('keeps Earth unnamed in the hero and reveals it only after the scroll', () => {
    const { container } = render(<SystemWorldHome locale="de" />);
    const hero = container.querySelector('#world-title')?.closest('section');
    const forest = container.querySelector('#system');
    const footer = Array.from(hero?.querySelectorAll('div') ?? []).find((node) =>
      node.textContent?.includes('EIN ORT · ALLES IM KONTEXT') && node.children.length <= 2,
    );
    expect(footer).toBeTruthy();
    expect(hero?.contains(footer!)).toBe(true);
    expect(hero?.textContent).not.toMatch(/SAIMÔR Earth/);
    expect(hero?.querySelector('button')).toBeFalsy();
    expect(screen.queryByRole('button', { name: /SAIMÔR Earth|Erde erkunden/ })).not.toBeInTheDocument();
    const horizon = screen.getByTestId('earth-horizon');
    expect(hero?.contains(horizon)).toBe(false);
    expect(horizon).toHaveTextContent('powered by');
    expect(horizon).toHaveTextContent('Earth');
    expect(horizon).not.toHaveTextContent('Die andere Seite der Welt.');
    expect(horizon).not.toHaveTextContent('Konzept · keine Live-Karte');
    expect(horizon.querySelector('a')).toHaveAttribute('href', '/earth');
    expect(horizon.querySelector('a')?.textContent).toBe('Earth');
    expect(horizon.querySelector('[data-testid="earth-mycelium"]')).not.toBeNull();
    expect(horizon.querySelector('[aria-label="MÔRA"]')).not.toBeNull();
    expect(forest?.contains(horizon)).toBe(false);
    const cosmos = container.querySelectorAll('img[src="/images/saimor-cosmos-layer.webp"]');
    expect(cosmos).toHaveLength(2);
    expect(hero?.contains(cosmos[0])).toBe(true);
    expect(horizon.contains(cosmos[1])).toBe(true);
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
