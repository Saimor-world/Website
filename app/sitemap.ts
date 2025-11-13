import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saimor.world';
  return [
    // Main pages
    { url: `${base}/de`, priority: 1 },
    { url: `${base}/en`, priority: 0.8 },

    // Portal demo
    { url: `${base}/portal`, priority: 0.7 },
    { url: `${base}/en/portal`, priority: 0.7 },

    // Môra narrative
    { url: `${base}/mora`, priority: 0.7 },
    { url: `${base}/en/mora`, priority: 0.7 },

    // Trust & Legal
    { url: `${base}/trust`, priority: 0.6 },
    { url: `${base}/en/trust`, priority: 0.6 },
    { url: `${base}/legal`, priority: 0.5 }
  ];
}
