/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const TAG = 'sync'

self.addEventListener('sync', (e) => {
  if (e.lastChance && e.tag === TAG) {
    e.waitUntil(sync())
  }
})

function sync() {
  // sync data in the background

  // example
  self.fetch('/sync').then(data => {
    self.caches.open('v1').then(cache => {
      cache.add('/sync', data)
    })
  })
}

self.registration.sync.register(TAG)
