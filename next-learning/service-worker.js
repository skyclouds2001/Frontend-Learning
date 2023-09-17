/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

self.addEventListener('install', (e) => {
  console.log('worker | install', e)
})

self.addEventListener('activate', (e) => {
  console.log('worker | activate', e)
})

self.addEventListener('fetch', (e) => {
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

self.addEventListener('error', (e) => {
  console.log('worker | error', e)
})

self.addEventListener('languagechange', (e) => {
  console.log('worker | languagechange', e)
})

self.addEventListener('online', (e) => {
  console.log('worker | online', e)
})

self.addEventListener('offline', (e) => {
  console.log('worker | offline', e)
})

self.addEventListener('rejectionhandled', (e) => {
  console.log('worker | rejectionhandled', e)
})

self.addEventListener('unhandledrejection', (e) => {
  console.log('worker | unhandledrejection', e)
})
