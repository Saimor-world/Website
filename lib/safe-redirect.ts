export function isSafeInternalPath(value?: string | null): value is string {
  return !!value && value.startsWith('/') && !value.startsWith('//') && !value.includes('\\');
}

export function safeInternalPath(value: string | null | undefined, fallback: string): string {
  return isSafeInternalPath(value) ? value : fallback;
}
