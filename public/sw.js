// Service Worker für PWA Offline Support
// Saimôr - Klarheit im Wandel

const CACHE_NAME = 'saimor-v1';
const RUNTIME_CACHE = 'saimor-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/de',
  '/en',
  '/mora',
  '/saimor-logo-new.png',
  '/manifest.json',
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API calls (always fetch fresh)
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html').catch(() => {
              // If offline page doesn't exist, return a basic response
              return new Response(
                `
                <!DOCTYPE html>
                <html lang="de">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Offline - Saimôr</title>
                    <style>
                      body {
                        font-family: system-ui, -apple-system, sans-serif;
                        background: #081410;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        margin: 0;
                        padding: 2rem;
                        text-align: center;
                      }
                      h1 { font-size: 2rem; margin-bottom: 1rem; }
                      p { opacity: 0.7; }
                    </style>
                  </head>
                  <body>
                    <div>
                      <h1>Offline</h1>
                      <p>Du bist momentan offline. Bitte überprüfe deine Internetverbindung.</p>
                    </div>
                  </body>
                </html>
              `,
                {
                  headers: { 'Content-Type': 'text/html' },
                }
              );
            });
          }

          return new Response('Offline', { status: 503 });
        });
      })
  );
});

