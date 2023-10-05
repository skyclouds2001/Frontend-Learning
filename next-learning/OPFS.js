/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="webworker.iterable" />

self.addEventListener('message', async (e) => {
  const message = e.data

  const root = await self.navigator.storage.getDirectory()
  const draftHandle = await root.getFileHandle('draft.txt', {
    create: true,
  })
  const accessHandle = await draftHandle.createSyncAccessHandle()

  const fileSize = accessHandle.getSize()
  const buffer = new DataView(new ArrayBuffer(fileSize))
  const readBuffer = accessHandle.read(buffer, {
    at: 0,
  })

  const encoder = new TextEncoder()
  const encodedMessage = encoder.encode(message)
  const writeBuffer = accessHandle.write(encodedMessage, {
    at: readBuffer,
  })

  accessHandle.flush()

  accessHandle.close()
})