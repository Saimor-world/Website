import { NextResponse } from 'next/server';

export const revalidate = 300;

type SignalItem = {
  title: string;
  url: string;
  seenAt: string | null;
  domain: string | null;
  language: string | null;
  country: string | null;
  image: string | null;
};

type GdeltArticle = {
  title?: string;
  url?: string;
  seendate?: string;
  domain?: string;
  language?: string;
  sourcecountry?: string;
  socialimage?: string;
};

type HnHit = {
  title?: string;
  url?: string;
  created_at?: string;
  author?: string;
};

function safeUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function topicHits(titles: string[]) {
  const joined = titles.join(' ').toLowerCase();
  const count = (terms: string[]) => terms.reduce((sum, term) => sum + (joined.match(new RegExp(term, 'g'))?.length ?? 0), 0);

  return {
    ai: count(['ai', 'artificial intelligence', 'model', 'agent', 'openai', 'anthropic', 'gemini']),
    security: count(['cyber', 'security', 'hack', 'breach', 'malware', 'ransomware']),
    markets: count(['market', 'stock', 'econom', 'bank', 'rate', 'inflation', 'bitcoin', 'crypto']),
    science: count(['science', 'research', 'space', 'climate', 'health', 'quantum']),
  };
}

function responseFor(items: SignalItem[], source: string) {
  const domains = new Set(items.map((item) => item.domain).filter(Boolean));
  return NextResponse.json({
    live: items.length > 0,
    source,
    generatedAt: new Date().toISOString(),
    stats: {
      signals: items.length,
      sources: domains.size,
      topics: topicHits(items.map((item) => item.title)),
    },
    items,
  });
}

async function fetchGdelt(): Promise<SignalItem[]> {
  const endpoint = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
  endpoint.searchParams.set('query', '(artificial intelligence OR cybersecurity OR technology OR markets)');
  endpoint.searchParams.set('mode', 'ArtList');
  endpoint.searchParams.set('maxrecords', '18');
  endpoint.searchParams.set('format', 'json');
  endpoint.searchParams.set('sort', 'HybridRel');

  const response = await fetch(endpoint, {
    headers: { 'User-Agent': 'Saimor-Mora-Public-Signal/1.0' },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`GDELT ${response.status}`);

  const payload = await response.json() as { articles?: GdeltArticle[] };
  const seen = new Set<string>();
  const items: SignalItem[] = [];

  for (const article of payload.articles ?? []) {
    const url = safeUrl(article.url);
    const title = article.title?.trim();
    if (!url || !title || seen.has(url)) continue;
    seen.add(url);
    items.push({
      title,
      url,
      seenAt: article.seendate ?? null,
      domain: article.domain ?? new URL(url).hostname,
      language: article.language ?? null,
      country: article.sourcecountry ?? null,
      image: safeUrl(article.socialimage) ?? null,
    });
    if (items.length >= 12) break;
  }

  return items;
}

async function fetchHackerNews(): Promise<SignalItem[]> {
  const endpoint = new URL('https://hn.algolia.com/api/v1/search');
  endpoint.searchParams.set('tags', 'front_page');
  endpoint.searchParams.set('hitsPerPage', '18');

  const response = await fetch(endpoint, {
    headers: { 'User-Agent': 'Saimor-Mora-Public-Signal/1.0' },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`HN ${response.status}`);

  const payload = await response.json() as { hits?: HnHit[] };
  const seen = new Set<string>();
  const items: SignalItem[] = [];

  for (const hit of payload.hits ?? []) {
    const url = safeUrl(hit.url);
    const title = hit.title?.trim();
    if (!url || !title || seen.has(url)) continue;
    seen.add(url);
    items.push({
      title,
      url,
      seenAt: hit.created_at ?? null,
      domain: new URL(url).hostname.replace(/^www\./, ''),
      language: 'English',
      country: null,
      image: null,
    });
    if (items.length >= 12) break;
  }

  return items;
}

export async function GET() {
  try {
    const gdelt = await fetchGdelt();
    if (gdelt.length > 0) return responseFor(gdelt, 'GDELT 2.0');
  } catch {
    // GDELT occasionally rate-limits shared cloud IPs. Fall through to a second live public source.
  }

  try {
    const hn = await fetchHackerNews();
    if (hn.length > 0) return responseFor(hn, 'Hacker News · Algolia');
  } catch {
    // The UI will explicitly show a quiet feed rather than inventing data.
  }

  return NextResponse.json({
    live: false,
    source: 'Public signal feeds',
    generatedAt: new Date().toISOString(),
    stats: { signals: 0, sources: 0, topics: { ai: 0, security: 0, markets: 0, science: 0 } },
    items: [],
    error: 'public signal feeds unavailable',
  });
}
