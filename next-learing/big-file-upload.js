/**
 * @param {File} file
 */
function upload(file) {
  const CHUNK_SIZE = 1024 ** 2
  const total = Math.ceil(file.size / CHUNK_SIZE)
  const reader = new FileReader()
  let current = 0

  reader.addEventListener('load', (e) => {
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: e.target.result,
      headers: {
        "Content-Type": "application/octet-stream",
        "X-File-Name": encodeURIComponent(file.name),
        "X-File-Size": file.size,
        "X-File-Total": total,
        "X-File-Current": current,
        "X-File-Type": file.type,
      },
    }).then((v) => {
      if (v.status === 200) {
        ++current
        splitChunk()

        console.log('Upload chuck ' + current + ' success.')
      } else {
        console.error('Upload chuck ' + current + ' fail.')
      }
    }).catch((e) => {
      console.error('Upload chuck ' + current + ' fail.')
      console.error(e)
    })
  })

  function splitChunk() {
    const start = current * CHUNK_SIZE
    const end = Math.min(file.size, start + CHUNK_SIZE)
    const chunk = file.slice(start, end)
    reader.readAsArrayBuffer(chunk)
  }

  splitChunk()
}
