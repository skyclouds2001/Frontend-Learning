/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/** @type {ServiceWorkerGlobalScope} */
const global = globalThis

global.addEventListener('install', (e) => {
  console.log('worker | install', e)
})

global.addEventListener('activate', (e) => {
  console.log('worker | activate', e)
})

global.addEventListener('fetch', (e) => {
  console.log('worker | fetch', e)

  if (e.request.url.includes('success')) {
    e.respondWith(Response.json({
      data: 'data',
    }))
  }
  if (e.request.url.includes('error')) {
    e.respondWith(Response.error())
  }
  if (e.request.url.includes('redirect')) {
    e.respondWith(Response.redirect('/override/success'))
  }
})

global.addEventListener('error', (e) => {
  console.log('worker | error', e)
})

global.addEventListener('languagechange', (e) => {
  console.log('worker | languagechange', e)
})

global.addEventListener('online', (e) => {
  console.log('worker | online', e)
})

global.addEventListener('offline', (e) => {
  console.log('worker | offline', e)
})

global.addEventListener('rejectionhandled', (e) => {
  console.log('worker | rejectionhandled', e)
})

global.addEventListener('unhandledrejection', (e) => {
  console.log('worker | unhandledrejection', e)
})

// eval('d = 10')

global.clients.matchAll().then((clients) => {
  clients.forEach((client) => {
    client.postMessage('message from client')
  })
})

global.addEventListener('message', (e) => {
  console.log('worker | message', e)
})

global.addEventListener('messageerror', (e) => {
  console.log('worker | messageerror', e)
})

const STORE_KEY = 'key'

global.caches.open(STORE_KEY).then((cache) => {
  console.log('worker | cache', cache)

  cache.add('/cache')
  cache.add(new URL('/cache'))
  cache.add(new Request('/cache'))

  cache.addAll(['/cache', new Request('/cache')])

  cache.put('/cache', new Response('cache'))
  cache.put(new URL('/cache'), new Response('cache'))
  cache.put(new Request('/cache'), new Response('cache'))

  cache.match('/cache').then((response) => {
    console.log('worker | cache match', response)
  })
  cache.match(new URL('/cache')).then((response) => {
    console.log('worker | cache match', response)
  })
  cache.match(new Request('/cache')).then((response) => {
    console.log('worker | cache match', response)
  })

  cache.matchAll('/cache').then((responses) => {
    console.log('worker | caches match', responses)
  })
  cache.matchAll(new URL('/cache')).then((responses) => {
    console.log('worker | caches match', responses)
  })
  cache.matchAll(new Request('/cache')).then((responses) => {
    console.log('worker | caches match', responses)
  })

  cache.delete('/cache').then((success) => {
    console.log('worker | cache delete', success)
  })
  cache.delete(new URL('/cache')).then((success) => {
    console.log('worker | cache delete', success)
  })
  cache.delete(new Request('/cache')).then((success) => {
    console.log('worker | cache delete', success)
  })

  cache.keys().then((keys) => {
    keys.forEach((key) => {
      cache.delete(key)
    })
  })
})

global.caches.has(STORE_KEY).then((has) => {
  console.log('worker | has cache', has)
})

global.caches.delete(STORE_KEY).then((deleted) => {
  console.log('worker | has deleted cache', deleted)
})

global.caches.keys().then((keys) => {
  console.log('worker | all caches keys', keys)
})

global.caches.match(
  '/cache',
  {
    ignoreSearch: false,
    ignoreMethod: false,
    ignoreVary: false,
  }
).then((data) => {
  if (data) {
    console.log('worker | have resource', data)
  } else {
    console.log('worker | not have resource', data)
  }
})

global.caches.match(new URL('/cache'))

global.caches.match(new Request('/cache'))

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
