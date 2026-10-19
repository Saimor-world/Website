import { expect, it } from 'vitest';
import { publicAmbientRoute, routeAmbientScene } from './ambientScene';
it('follows public scenes and excludes private product and account surfaces', () => {
  for (const path of ['/de', '/en', '/mora/deep-view', '/studio', '/en/contact', '/yori']) expect(publicAmbientRoute(path)).toBe(true);
  for (const path of ['/owner', '/owner/finance', '/world/private', '/account/bridge', '/auth/magic', '/login', '/portal', '/systems/control']) expect(publicAmbientRoute(path)).toBe(false);
  expect(routeAmbientScene('/mora/deep-view', '#clarity')).toBe('clearing');
  expect(routeAmbientScene('/en/mora/deep-view', '#mora')).toBe('encounter');
  expect(routeAmbientScene('/de', '#system')).toBe('forest');
});
