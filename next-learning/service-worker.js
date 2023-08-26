/// <reference no-default-lib="true" />
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
