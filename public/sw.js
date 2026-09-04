self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((name) => name.startsWith('saimor-'))
          .map((name) => caches.delete(name)),
      ))
      .then(() => self.registration.unregister())
  );
});
