/// <reference no-default-lib="true" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="webworker.iterable" />

self.addEventListener('sync', (e) => {
  console.log(e)
})

self.registration.sync.register('tag')
