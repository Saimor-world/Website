import { MetadataRoute } from 'next';
import { entryContent } from '@/lib/entry-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saimor.world';

  const entryPages = [
    ...entryContent.de.map((item) => ({ url: `${base}/de/einstieg/${item.slug}`, priority: 0.65 })),
    ...entryContent.en.map((item) => ({ url: `${base}/en/entry/${item.slug}`, priority: 0.65 })),
  ];

  return [
    { url: `${base}/de`, priority: 1 },
    { url: `${base}/en`, priority: 0.8 },
    { url: `${base}/mora`, priority: 0.7 },
    { url: `${base}/en/mora`, priority: 0.7 },
    { url: `${base}/yori`, priority: 0.8 },
    { url: `${base}/en/yori`, priority: 0.75 },
    { url: `${base}/portal`, priority: 0.8 },
    { url: `${base}/demo`, priority: 0.75 },
    { url: `${base}/de/einstieg`, priority: 0.8 },
    { url: `${base}/en/entry`, priority: 0.8 },
    ...entryPages,
    { url: `${base}/de/trust`, priority: 0.6 },
    { url: `${base}/en/trust`, priority: 0.6 },
    { url: `${base}/de/rechtliches/impressum`, priority: 0.5 },
    { url: `${base}/de/rechtliches/datenschutz`, priority: 0.5 },
    { url: `${base}/de/rechtliches/agb`, priority: 0.5 },
    { url: `${base}/de/rechtliches/widerruf`, priority: 0.5 },
    { url: `${base}/en/legal/imprint`, priority: 0.5 },
    { url: `${base}/en/legal/privacy`, priority: 0.5 },
    { url: `${base}/en/legal/terms`, priority: 0.5 },
    { url: `${base}/en/legal/refund`, priority: 0.5 },
  ];
}

