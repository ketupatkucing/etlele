

const CACHE_NAME = 'etlele-cache-v1';
const ASSETS_TO_CACHE = [
  '/etlele/',
  '/etlele/index.html',
  '/etlele/fish.js',
  '/etlele/mancing.js',
  '/etlele/pancing.png',
  '/etlele/strike.png',
  '/etlele/bait.png',
  '/etlele/coin.png',
  '/etlele/lele.png',
  '/etlele/makananpelet.png',
  '/etlele/talas.png',
  '/etlele/pelet.png',
  '/etlele/orang.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
                  .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      return cachedRes || fetch(event.request);
    })
  );
});
