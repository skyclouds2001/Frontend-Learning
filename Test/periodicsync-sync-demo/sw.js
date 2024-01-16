/// <reference no-default-lib="true" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="webworker.iterable" />

self.addEventListener('sync', (e) => {
  console.log(e)
})

self.addEventListener('periodicsync', (e) => {
  console.log(e)
})

setTimeout(() => {
  self.registration.sync.register('tag')

  self.registration.periodicSync.register('tag')
}, 10 * 1000)
