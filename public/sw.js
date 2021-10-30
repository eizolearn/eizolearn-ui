const RESOURE_CACHE = 'resource-cache'

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(RESOURE_CACHE)
            .then(cache =>
                cache.addAll([
                    '/',
                    '/global.css',
                    '/favicon.svg',
                    '/favicon.ico',
                    '/manifest.json',
                    '/build/bundle.css',
                    '/build/bundle.js',
                ]),
            ),
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request)
                if (response.ok && !event.request.url.endsWith('/sw.js')) {
                    caches
                        .open(RESOURE_CACHE)
                        .then(cache => cache.add(event.request))
                        .catch(err => console.log('Error on caching:', err))
                }
                return response
            } catch (err) {
                return caches.open(RESOURE_CACHE).then(cache => cache.match(event.request))
            }
        })(),
    )
})
