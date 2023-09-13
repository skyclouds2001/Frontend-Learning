/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

self.addEventListener("backgroundfetchclick", (e) => {
  if (e.registration.result === "success") {
    clients.openWindow("/play-movie");
  } else {
    clients.openWindow("/movie-download-progress");
  }
})

self.addEventListener("backgroundfetchfail", (e) => {
  e.updateUI({
    title: "Download Fail",
  })
})

self.addEventListener('backgroundfetchsuccess', (e) => {
  e.waitUntil(() => {
    return self.caches.open('movies').then((cache) => {
      return e.registration.matchAll().then((records) => {
        return Promise.all(records.map((record) => {
          return record.responseReady.then((response) => {
            cache.put(record.request, response)
          })
        }))
      })
    }).then(() => {
      e.updateUI({
        title: 'Move download complete',
      })
    })
  })
})
