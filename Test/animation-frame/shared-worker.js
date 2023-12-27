try {
  new Worker('./dedicated-worker.js')
} catch (error) {
  console.error('shared worker: ', error)
}
