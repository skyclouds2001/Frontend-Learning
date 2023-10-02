/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="webworker.iterable" />

self.registration.addEventListener('updatefound', () => {
  self.registration.update()
})

self.addEventListener('install', (e) => {
  e.waitUntil(
    self.caches.open('pwa').then((cache) => (
      cache.addAll([
        '/',
        '/index.html',
        '/sw.js',
        '/manifest.webmanifest',
        '/icon.png',
      ])
    ))
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    self.clients.claim()
  )
})

self.addEventListener('fetch', (e) => {
  e.responseWith(
    self.caches.match(e.request).then((res) => (
      res ?? fetch(e.request).then((res) => (
        self.caches.open('pwa').then((cache) => {
          cache.put(e.request, res)

          return res
        })
      ))
    ))
  )
})
