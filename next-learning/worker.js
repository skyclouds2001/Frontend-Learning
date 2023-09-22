self.postMessage('message from worker')

self.addEventListener('message', (e) => {
  console.log('receive message in worker: ', e.data)
})

const data = new ArrayBuffer(100)
self.postMessage(data, [data])
