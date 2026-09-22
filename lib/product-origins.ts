/** Public product origin; NEXT_PUBLIC_YORI_ORIGIN is selected at build time.
 * frnt is the verified production host until the yori domain cutover is ready.
 */
export function yoriOrigin(value = process.env.NEXT_PUBLIC_YORI_ORIGIN): string {
  const url = new URL(value?.trim() || 'https://frnt.saimor.world');
  const local = process.env.NODE_ENV !== 'production'
    && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if ((url.protocol !== 'https:' && !(local && url.protocol === 'http:'))
      || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_YORI_ORIGIN must be a trusted HTTPS origin without credentials, path, query or fragment');
  }
  return url.origin;
}
