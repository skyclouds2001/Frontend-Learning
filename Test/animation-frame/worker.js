try {
  new Worker('./dedicated-worker.js')
} catch (error) {
  console.error('worker: ', error)
}
