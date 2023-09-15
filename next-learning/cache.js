/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

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
