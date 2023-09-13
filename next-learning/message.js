/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

self.addEventListener('message', (e) => {
  console.log('message', e)
})

self.addEventListener('messageerror', (e) => {
  console.log('messageerror', e)
})

self.clients.get('<id>').then((client) => {
  client.postMessage('message from client')
})

self.clients.matchAll().then((clients) => {
  clients.forEach((client) => {
    client.postMessage('message from client')
  })
})
