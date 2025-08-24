const CACHE_NAME = 'rijecnik-cache-v1';
// Lista fajlova koje želimo sačuvati za offline rad
const urlsToCache = [
  '/rijecnik-i-kartice-za-vjezbanje-/',
  '/rijecnik-i-kartice-za-vjezbanje-/index.html',
  '/rijecnik-i-kartice-za-vjezbanje-/style.css',
  '/rijecnik-i-kartice-za-vjezbanje-/script.js',
  '/rijecnik-i-kartice-za-vjezbanje-/icon-192.png',
  '/rijecnik-i-kartice-za-vjezbanje-/icon-512.png'
];

// Događaj 'install' - pokreće se kada se service worker instalira
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Otvoren keš');
        return cache.addAll(urlsToCache);
      })
  );
});

// Događaj 'fetch' - presreće sve mrežne zahtjeve
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Ako fajl postoji u kešu, vrati ga. Ako ne, pošalji zahtjev na mrežu.
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});