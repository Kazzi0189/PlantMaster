self.addEventListener('install', (e) => {
    console.log('[Service Worker] Nainstalován');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Aktivován');
});

self.addEventListener('fetch', (e) => {
    // Zatím jen propouští požadavky, nutné pro PWA standard
    e.respondWith(fetch(e.request).catch(() => new Response('Jste offline')));
});
