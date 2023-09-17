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
