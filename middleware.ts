import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!_next|api|.*\..*).*)']
};
