self.postMessage('message from worker')

self.addEventListener('message', (e) => {
  console.log('receive message in worker: ', e.data)
})
