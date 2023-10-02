/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="webworker.iterable" />

self.addEventListener('install', (e) => {
  e.waitUntil(
    self.caches.open('pwa').then((cache) => (
      cache.addAll([
        './',
        './index.html',
        './sw.js',
        './manifest.webmanifest',
        './icon.png',
      ])
    ))
  )

  e.waitUntil(
    self.skipWaiting()
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    self.clients.claim()
  )
})

self.addEventListener('fetch', (e) => {
  if (!e.request.url.match(/https?:\/\//)) {
    return
  }

  e.respondWith(
    self.caches.match(e.request, {
      cacheName: 'pwa',
    }).then((res) => (
      res ?? fetch(e.request).then((res) => (
        self.caches.open('pwa').then((cache) => {
          cache.put(e.request, res)

          return res
        })
      ))
    ))
  )
})

self.registration.addEventListener('updatefound', () => {
  self.registration.active != null && self.registration.update()
})
