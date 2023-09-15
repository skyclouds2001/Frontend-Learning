/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const TAG = 'tag'

self.addEventListener('periodicsync', (e) => {
  if (e.tag === TAG) {
    // do something
  }
})
