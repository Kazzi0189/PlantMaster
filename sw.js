const CACHE_NAME = 'plantmaster-v19';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdn-icons-png.flaticon.com/512/628/628283.png'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalován a ukládám do cache');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Aktivován a mažu starou cache');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Vrátí z cache, pokud existuje, jinak stáhne ze sítě
      return response || fetch(e.request);
    }).catch(() => {
      return new Response('Aplikace je offline a data nejsou uložena v cache.', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    })
  );
});