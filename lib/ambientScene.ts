// This small route adapter is imported by the controls. The audio graph itself
// is loaded only after a deliberate gesture.
export type AmbientScene = 'cosmos' | 'forest' | 'encounter' | 'clearing' | 'studio';

export function publicAmbientRoute(path: string) {
  return !/^\/(?:api|owner|account|auth|world|login|portal|home)(?:\/|$)/.test(path) && path !== '/systems/control';
}

export function routeAmbientScene(path: string, hash = ''): AmbientScene {
  if (/\/mora\/deep-view$/.test(path)) return hash === '#clarity' ? 'clearing' : 'encounter';
  if (hash === '#system' || path === '/earth') return 'forest';
  if (/\/studio$|\/kontakt$|\/contact$/.test(path)) return 'studio';
  return 'cosmos';
}
