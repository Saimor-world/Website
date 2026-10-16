import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SaimorShowcase from './SaimorShowcase';

describe('SaimorShowcase', () => {
  it('offers three working journeys and identifies artwork as illustrative', () => {
    render(<SaimorShowcase locale="de" />);
    expect(screen.getByRole('heading', { name: /Ein Zusammenhang.*Mehr Raum für das Wesentliche/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /MÔRA kennenlernen/ }).getAttribute('href')).toBe('/mora');
    expect(screen.getByRole('link', { name: /Das YORI-Haus entdecken/ }).getAttribute('href')).toBe('/yori');
    expect(screen.getByRole('link', { name: /Projekt besprechen/ }).getAttribute('href')).toBe('/de/kontakt');
    expect(screen.getByRole('img', { name: /Prinzipdarstellung · keine Live-Daten/ })).toBeTruthy();
  });

  it('preserves English product routes', () => {
    render(<SaimorShowcase locale="en" />);
    expect(screen.getByRole('link', { name: /Explore MÔRA/ }).getAttribute('href')).toBe('/en/mora');
    expect(screen.getByRole('link', { name: /Explore the YORI house/ }).getAttribute('href')).toBe('/en/yori');
    expect(screen.getByRole('link', { name: /Discuss your project/ }).getAttribute('href')).toBe('/en/contact');
  });
});
