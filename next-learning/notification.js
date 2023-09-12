/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

global.addEventListener('notificationclick', (e) => {
  console.log('Notification click', e)
})

global.addEventListener('notificationclose', (e) => {
  console.log('Notification close', e)
})

global.registration.showNotification('Hello', {
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
