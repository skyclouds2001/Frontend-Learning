self.addEventListener('connect', (e) => {
  const port = e.ports.at(0)

  port.addEventListener('message', (e) => {
    console.log('receive message in worker: ', e.data)
  })

  port.postMessage('message from worker')
})
