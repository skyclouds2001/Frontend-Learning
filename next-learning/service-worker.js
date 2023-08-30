/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/// <reference lib="webworker" />
/// @ts-check

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
  cache.put('/cache', new Response('cache'))
  cache.put(new URL('/cache'), new Response('cache'))
  cache.put(new Request('/cache'), new Response('cache'))

  cache.match('/cache').then((response) => {
    console.log('worker | cache match', response)
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
