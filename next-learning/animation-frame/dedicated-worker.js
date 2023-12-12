try {
  self.requestAnimationFrame(() => {
    console.log(Date.now())
  })
} catch (error) {
  console.error(error)
}

try {
  self.cancelAnimationFrame(10000)
} catch (error) {
  console.error(error)
}
