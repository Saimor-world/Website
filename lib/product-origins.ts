/** Public YORI product origin.
 * yori.saimor.world ist der kanonische Workspace-Host (config/site-estate.json).
 * frnt.saimor.world war der Vorgaenger und hat seit dem DNS-Umzug keinen
 * Eintrag mehr -- ein Standard darauf haette tote Links erzeugt.
 */
export function yoriOrigin(value = process.env.NEXT_PUBLIC_YORI_ORIGIN): string {
  const url = new URL(value?.trim() || 'https://yori.saimor.world');
  const local =
    process.env.NODE_ENV !== 'production' &&
    ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);

  if (
    (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'NEXT_PUBLIC_YORI_ORIGIN must be a trusted HTTPS origin without credentials, path, query or fragment',
    );
  }

  return url.origin;
}
