// Cache Buster - Force browser to reload
(function() {
  'use strict';

  // Kill all service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
        console.log('✅ Service Worker unregistered');
      }
    });
  }

  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
        console.log('✅ Cache deleted:', name);
      }
    });
  }

  // Force reload if old chunks detected
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const hasOldChunks = scripts.some(s => s.src.includes('bd859cd3'));

  if (hasOldChunks && !sessionStorage.getItem('cache-busted')) {
    console.log('🔥 OLD CHUNKS DETECTED - FORCING RELOAD');
    sessionStorage.setItem('cache-busted', 'true');
    window.location.reload(true);
  }
})();
