// Asignar nombre y versión de la cahe
const CACHE_NAME = 'v1_cache_UrielLaraPWA';

// Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/style.css',
    '/img/img/Logo.png',
    '/img/img/1.png',
    '/img/img/2.png',
    '/img/img/3.png',
    '/img/img/4.png',
    '/img/img/5.png',
    '/img/img/6.png',
    '/img/img/facebook.png',
    '/img/img/instagram.png',
    '/img/img/twitter.png',
    '/img/img/1024.png',
    '/img/img/512.png',
    '/img/img/384.png',
    '/img/img/256.png',
    '/img/img/192.png',
    '/img/img/128.png',
    '/img/img/96.png',
    '/img/img/64.png',
    '/img/img/32.png',
    '/img/img/16.png',
];

// Evento install
// Instalación del serviceWorker y guarda en cache los recursos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
         
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
})

// Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {

                    if(cacheWhitelist.indexOf(cacheName) === -1) {
                        // Borrar elementos que se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Activar cache
            self.clients.claim();
        })
    );
});

// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});