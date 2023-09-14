/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

self.addEventListener('backgroundfetchsuccess', (e) => {
  e.waitUntil(() => 
    self.caches.open('movies').then((cache) =>
      e.registration.matchAll().then((records) =>
        Promise.all(
          records.map((record) =>
            record.responseReady.then((response) =>
              cache.put(record.request, response)
            )
          )
        )
      )
    ).then(() =>
      e.updateUI({
          title: 'Move download complete',
      })
    )
  )
})

self.addEventListener('backgroundfetchfail', (e) => {
  e.waitUntil(() =>
    self.caches.open('movies').then((cache) =>
      e.registration.recordsAvailable && e.registration.matchAll().then((records) =>
        Promise.all(
          records.map((record) =>
            record.responseReady.then((response) =>
              cache.put(record.request, response)
            )
          )
        )
      )
    ).then(() =>
      e.updateUI({
        title: 'Download Fail',
      })
    )
  )
})

self.addEventListener('backgroundfetchabort', (e) => {
  e.waitUntil(() =>
    self.caches.open('movies').then((cache) =>
      e.registration.recordsAvailable && e.registration.matchAll().then((records) =>
        Promise.all(
          records.map((record) =>
            record.responseReady.then((response) =>
              cache.put(record.request, response)
            )
          )
        )
      )
    )
  )
})

self.addEventListener('backgroundfetchclick', (e) => {
  if (e.registration.result === 'success') {
    self.clients.openWindow('/play-movie');
  } else {
    self.clients.openWindow('/movie-download-progress');
  }
})
