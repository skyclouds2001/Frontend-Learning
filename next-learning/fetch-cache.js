global.addEventListener('install', (e) => {
  e.waitUntil(
    global.caches
      .open('v2')
      .then((cache) => 
        cache.addAll([
          '/',
          '/index.html',
          "/style.css",
          "/app.js",
        ])
      )
  )
})

global.addEventListener('activate', (e) => {
  const CacheNeedMove = ['v1']

  e.waitUntil(
    global.caches.keys().then((keys) => 
      Promise.all(
        keys.map((key) => {
          if (CacheNeedMove.includes(key)) {
            return global.caches.delete(key)
          }
        })
      )
    )
  )
})

global.addEventListener('fetch', (e) => {
  e.respondWith(
    global.caches
      .match(e.request)
      .then((response) => {
        if (response != null) {
          return response
        } else {
          return fetch(e.request.clone())
            .then((response) => {
              global.caches.has('v2').then((has) => {
                if (has) {
                  const res = response.clone()

                  global.caches.open('v2').then((cache) => {
                    cache.put(e.request, res)
                  })
                } else {
                  // init cache - v2
                }
              })

              return response
            })
            .catch(() => global.caches.match('/404'))
        }
      })
  )
})

global.addEventListener('fetch', (e) => {
  e.respondWith(
    global.caches
      .open('v2')
      .then((cache) => cache
        .match(e.request)
        .then((response) => {
          if (response != null) {
            return response
          } else {
            return fetch(e.request.clone())
              .then((response) => {
                cache.put(e.request, response.clone())

                return response
              })
              .catch(() => global.caches.match('/404'))
          }
        })
      )
  )
})
