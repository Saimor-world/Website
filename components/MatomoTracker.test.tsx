import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import MatomoTracker from './MatomoTracker';
import ClientProviders from './ClientProviders';
const route = vi.hoisted(() => ({ path: '/de' }));
vi.mock('next/navigation', () => ({ usePathname: () => route.path }));
vi.mock('@vercel/speed-insights/next', () => ({ SpeedInsights: () => null }));
beforeEach(() => {
  localStorage.clear(); delete window._paq; route.path = '/de';
  vi.stubEnv('NEXT_PUBLIC_MATOMO_URL', 'https://analytics.example.test/');
  vi.stubEnv('NEXT_PUBLIC_MATOMO_SITE_ID', '7');
  window.history.replaceState(null, '', '/de?fuer=private-name&token=secret');
});
afterEach(() => { cleanup(); vi.unstubAllEnvs(); document.querySelectorAll('script[data-saimor-analytics]').forEach(node => node.remove()); });
it('stays off without an explicitly configured destination even after consent', () => {
  vi.stubEnv('NEXT_PUBLIC_MATOMO_URL', '');
  localStorage.setItem('analytics_enabled', 'true');
  render(<MatomoTracker />);
  expect(window._paq).toBeUndefined();
  expect(document.querySelector('script[data-saimor-analytics]')).toBeNull();
});
it('makes no analytics request or queue before an explicit opt-in', () => {
  render(<MatomoTracker />);
  expect(window._paq).toBeUndefined();
  expect(document.querySelector('script[data-saimor-analytics]')).toBeNull();
});
it('starts on same-tab consent, strips private URLs, tracks navigation once, and stops on revocation', () => {
  const { rerender } = render(<MatomoTracker />);
  act(() => { localStorage.setItem('analytics_enabled', 'true'); window.dispatchEvent(new Event('saimor-consent-change')); });
  expect(document.querySelectorAll('script[data-saimor-analytics]')).toHaveLength(1);
  expect(window._paq).toContainEqual(['enableHeartBeatTimer', 15]);
  expect(JSON.stringify(window._paq)).not.toMatch(/private-name|secret|token/);
  expect(window._paq?.filter(command => command[0] === 'trackPageView')).toHaveLength(1);
  act(() => window.dispatchEvent(new Event('saimor-consent-change')));
  expect(window._paq?.filter(command => command[0] === 'trackPageView')).toHaveLength(1);
  route.path = '/mora'; rerender(<MatomoTracker />);
  expect(window._paq?.filter(command => command[0] === 'trackPageView')).toHaveLength(2);
  act(() => { localStorage.setItem('analytics_enabled', 'false'); window.dispatchEvent(new Event('saimor-consent-change')); });
  expect(window._paq).toContainEqual(['forgetConsentGiven']);
  expect(window._paq).toContainEqual(['disableHeartBeatTimer']);
});
it('counts once through the actual providers and never queues private URLs after revocation', () => {
  localStorage.setItem('analytics_enabled', 'true');
  const { rerender } = render(<ClientProviders />);
  expect(window._paq?.filter(command => command[0] === 'trackPageView')).toHaveLength(1);
  expect(JSON.stringify(window._paq)).not.toMatch(/private-name|secret|token/);
  act(() => {
    localStorage.setItem('analytics_enabled', 'false');
    window.dispatchEvent(new Event('saimor-consent-change'));
  });
  route.path = '/de/mora'; rerender(<ClientProviders />);
  expect(window._paq?.filter(command => command[0] === 'trackPageView')).toHaveLength(1);
  act(() => {
    localStorage.setItem('analytics_enabled', 'true');
    window.dispatchEvent(new Event('saimor-consent-change'));
  });
  expect(window._paq?.filter(command => command[0] === 'trackPageView')).toHaveLength(2);
  expect(JSON.stringify(window._paq)).not.toMatch(/private-name|secret|token/);
});
