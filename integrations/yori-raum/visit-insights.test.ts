import { afterEach, beforeEach, expect, it } from 'vitest';
import { mountVisitInsights } from './visit-insights.js';
let instance: ReturnType<typeof mountVisitInsights>;
beforeEach(() => { localStorage.clear(); delete window._paq; window.history.replaceState(null, '', '/?fuer=Luana#/raum/cash/private-record'); });
afterEach(() => { instance?.destroy?.(); document.querySelectorAll('[data-yori-insights]').forEach(node => node.remove()); });
it('does nothing when the destination has not been configured', () => {
  instance = mountVisitInsights();
  expect(instance.configured).toBe(false); expect(window._paq).toBeUndefined();
});
it('requires explicit consent and strips names, queries and private object paths', () => {
  instance = mountVisitInsights({ endpoint: 'https://analytics.example.test/', siteId: '8' });
  expect(window._paq).toBeUndefined();
  const buttons = Array.from(document.querySelectorAll('button'));
  buttons.find(button => button.textContent === 'Statistik erlauben')!.click();
  expect(window._paq).toContainEqual(['enableHeartBeatTimer', 15]);
  expect(JSON.stringify(window._paq)).not.toMatch(/Luana|private-record|fuer=/);
  expect(window._paq).toContainEqual(['setCustomUrl', location.origin + '/#/cash']);
  buttons.find(button => button.textContent === 'Ohne Statistik fortfahren')!.click();
  expect(window._paq).toContainEqual(['forgetConsentGiven']);
});
