const localizedLegalRoutes: Readonly<Record<string, string>> = {
  '/de/rechtliches/impressum': '/en/legal/imprint',
  '/de/rechtliches/datenschutz': '/en/legal/privacy',
  '/de/rechtliches/agb': '/en/legal/terms',
  '/de/rechtliches/widerruf': '/en/legal/refund',
  '/en/legal/imprint': '/de/rechtliches/impressum',
  '/en/legal/privacy': '/de/rechtliches/datenschutz',
  '/en/legal/terms': '/de/rechtliches/agb',
  '/en/legal/refund': '/de/rechtliches/widerruf',
};

export function localizedLegalHref(pathname: string): string | undefined {
  return localizedLegalRoutes[pathname];
}
