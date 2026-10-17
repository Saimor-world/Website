/** Optional statistics for the static YORI preview. No requests before consent. */
export function mountVisitInsights({ endpoint, siteId } = {}) {
  let target;
  try { target = new URL(endpoint); } catch { return { configured: false }; }
  if (target.protocol !== 'https:' || !siteId) return { configured: false };
  const base = target.href.replace(/\/?$/, '/');
  const key = 'yori-visit-insights';
  const rooms = new Set(['haus', 'heute', 'schreibtisch', 'werkstatt', 'begleitung', 'crew', 'cash', 'quellen']);
  const safePage = () => {
    const segments = location.hash.replace(/^#\/?/, '').split('/');
    const room = segments.find(segment => rooms.has(segment)) || 'haus';
    return location.origin + location.pathname + '#/' + room;
  };
  let initialized = false, active = false, lastPage = '';
  const queue = (...commands) => { window._paq = window._paq || []; window._paq.push(...commands); };
  const readConsent = () => { try { return localStorage.getItem(key); } catch { return 'no'; } };
  const sync = () => {
    active = readConsent() === 'yes' && navigator.doNotTrack !== '1';
    if (!active) {
      if (initialized) queue(['forgetConsentGiven'], ['disableHeartBeatTimer']);
      lastPage = ''; return;
    }
    if (!initialized) {
      queue(['requireConsent'], ['disableCookies'], ['setDoNotTrack', true],
        ['setTrackerUrl', base + 'matomo.php'], ['setSiteId', String(siteId)], ['setRequestMethod', 'POST']);
      const script = document.createElement('script');
      script.src = base + 'matomo.js'; script.async = true; script.dataset.yoriInsights = '';
      document.head.appendChild(script); initialized = true;
    }
    queue(['setConsentGiven'], ['enableHeartBeatTimer', 15]);
    const page = safePage();
    if (page === lastPage) return;
    queue(['setCustomUrl', page], ['setReferrerUrl', ''], ['setDocumentTitle', 'YORI / ' + page.split('#/')[1]], ['trackPageView']);
    lastPage = page;
  };
  const toggle = document.createElement('button');
  toggle.type = 'button'; toggle.textContent = 'Besuchsstatistik';
  toggle.style.cssText = 'position:fixed;bottom:12px;left:12px;z-index:9998;padding:10px 14px;border-radius:20px;border:1px solid #978a74;background:#181c19;color:#eee6d8;font:12px system-ui;cursor:pointer';
  const panel = document.createElement('aside');
  panel.setAttribute('aria-label', 'Freiwillige Besuchsstatistik');
  panel.hidden = readConsent() !== null;
  panel.style.cssText = 'position:fixed;bottom:64px;left:12px;z-index:9999;box-sizing:border-box;width:min(370px,calc(100vw - 24px));padding:20px;border-radius:16px;background:#181c19;color:#eee6d8;font:14px/1.6 system-ui;border:1px solid #978a74';
  const text = document.createElement('p');
  text.textContent = 'Darf diese Vorschau Besuchsstatistik erfassen? Der Betreiber sieht Besuchszeitpunkte, aktive Dauer und besuchte Räume. Keine Eingaben, Nachrichten oder Inhalte werden aufgezeichnet. Die Teilnahme ist freiwillig und jederzeit hier widerrufbar. Dienst: ' + target.hostname + '.';
  panel.appendChild(text);
  const choose = (value) => {
    try { localStorage.setItem(key, value); } catch { panel.hidden = true; return; }
    sync(); panel.hidden = true; toggle.focus();
  };
  for (const [label, value] of [['Ohne Statistik fortfahren', 'no'], ['Statistik erlauben', 'yes']]) {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = label;
    button.style.cssText = 'display:block;width:100%;margin-top:10px;padding:12px;border-radius:20px;border:1px solid #978a74;background:#252e28;color:#eee6d8;cursor:pointer;font:inherit';
    button.onclick = () => choose(value); panel.appendChild(button);
  }
  toggle.onclick = () => { panel.hidden = !panel.hidden; };
  document.body.append(toggle, panel); sync();
  window.addEventListener('hashchange', sync); window.addEventListener('storage', sync);
  return { configured: true, destroy() {
    if (initialized) queue(['forgetConsentGiven'], ['disableHeartBeatTimer']);
    toggle.remove(); panel.remove();
    window.removeEventListener('hashchange', sync); window.removeEventListener('storage', sync);
  } };
}
