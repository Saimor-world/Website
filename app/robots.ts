import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/owner',
        '/account',
        '/login',
        '/portal',
        '/systems',
        '/auth',
        '/api',
        '/demo',
        '/wall',
        '/yori',
        '/en/yori',
      ],
    },
    sitemap: 'https://saimor.world/sitemap.xml',
    host: 'https://saimor.world',
  };
}
