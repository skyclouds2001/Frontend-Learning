/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

self.addEventListener('notificationclick', (e) => {
  console.log('Notification click', e)
})

self.addEventListener('notificationclose', (e) => {
  console.log('Notification close', e)
})

self.registration.showNotification('Hello', {
  body: 'this is a notification',
  icon: '<url>',
  actions: [
    {
      title: 'Yes',
      action: 'Yes',
    },
    {
      title: 'No',
      action: 'No',
    },
  ],
})
