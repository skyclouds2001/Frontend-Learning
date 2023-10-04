/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="webworker.iterable" />

const CACHE_NAME = 'pwa'

self.addEventListener('install', (e) => {
  e.waitUntil(
    self.caches.open(CACHE_NAME).then((cache) => (
      cache.addAll([
        './',
        './index.html',
        './post.html',
        './sw.js',
        './manifest.webmanifest',
        './icon.png',
      ])
    ))
  )

  e.waitUntil(
    self.skipWaiting()
  )

  e.waitUntil(
    self.registration.navigationPreload.enable()
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
      cacheName: CACHE_NAME,
    }).then((res) => (
      res ?? fetch(e.request).then((res) => (
        self.caches.open(CACHE_NAME).then((cache) => {
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
