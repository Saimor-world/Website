'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Radio } from 'lucide-react';

type Signal = { title: string; url: string };
type Feed = { source: string; checkedAt: string; items: Signal[] };

export default function MoraSignalPreview({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const [feed, setFeed] = useState<Feed | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);

  async function load() {
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setState('loading');
    setFeed(null);
    try {
      const response = await fetch('/api/mora/pulse', { signal: controller.signal });
      if (!response.ok) throw new Error('Feed unavailable');
      const data = await response.json();
      if (data.live !== true || !Array.isArray(data.items) || typeof data.source !== 'string') throw new Error('No live feed');
      const items = data.items.filter((item: unknown): item is Signal => {
        if (!item || typeof item !== 'object') return false;
        const value = item as Record<string, unknown>;
        if (typeof value.title !== 'string' || !value.title.trim() || typeof value.url !== 'string') return false;
        try { return ['https:', 'http:'].includes(new URL(value.url).protocol); } catch { return false; }
      }).slice(0, 3);
      if (!items.length) throw new Error('No usable signals');
      setFeed({ source: data.source, checkedAt: new Date().toISOString(), items });
      setState('ready');
    } catch {
      setState('error');
    } finally {
      clearTimeout(timeout);
      request.current = null;
    }
  }

  return <aside aria-label={de ? 'Vorschau mit öffentlichen Daten' : 'Public data preview'} className="rounded-2xl border border-[#ddc487]/25 bg-[#10241a]/60 p-6 sm:p-8">
    <p className="flex items-center gap-3 font-mono text-[10px] tracking-[.15em] text-[#e6c781]"><Radio size={17} aria-hidden="true" />{de ? 'MÔRA / SIGNAL-VORSCHAU' : 'MÔRA / SIGNAL PREVIEW'}</p>
    <p className="mt-4 text-sm leading-7 text-[#c7d0c7]">{de ? 'Ein Blick auf öffentliche Nachrichtenquellen. Lade aktuelle Meldungen mit ihrem Quellenlink. Deine Firmendaten werden hier nicht verwendet.' : 'A window into public news sources. Load current stories with their source links. Your company data is not used here.'}</p>
    <div aria-live="polite" aria-busy={state === 'loading'}>
      {state === 'loading' && <p className="mt-5 text-sm text-[#e9dbb7]">{de ? 'Öffentliche Quellen werden abgefragt …' : 'Checking public sources …'}</p>}
      {state === 'error' && <p className="mt-5 text-sm text-[#e9dbb7]">{de ? 'Die Quellen sind gerade nicht erreichbar oder liefern keine Meldungen. Bitte versuche es später erneut.' : 'The sources are unavailable or returned no stories. Please try again later.'}</p>}
      {feed && <>
        <ul className="mt-5 divide-y divide-[#ddc487]/15">{feed.items.map(item => <li key={item.url} className="py-4"><a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 text-sm leading-6 text-[#f3ead4] hover:underline">{item.title}<ArrowUpRight size={16} className="mt-1 shrink-0" aria-hidden="true" /></a></li>)}</ul>
        <p className="mt-3 text-xs leading-6 text-[#b7c5b9]">{feed.source} · {de ? 'Abgerufen' : 'Retrieved'} <time dateTime={feed.checkedAt}>{new Date(feed.checkedAt).toLocaleTimeString(de ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}</time></p>
      </>}
    </div>
    <button type="button" onClick={load} disabled={state === 'loading'} className="mt-5 min-h-11 rounded-full border border-[#e6c781]/60 px-5 py-2 text-sm text-[#f0dfb1] transition hover:bg-[#e6c781]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6c781] disabled:opacity-60">{state === 'loading' ? (de ? 'Lädt …' : 'Loading …') : (de ? 'Öffentliche Signale laden' : 'Load public signals')}</button>
  </aside>;
}
