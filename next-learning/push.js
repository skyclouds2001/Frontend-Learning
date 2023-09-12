/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// self.registration.pushManager.permissionState({
//   userVisibleOnly: true,
//   applicationServerKey: KEY,
// }).then((state) => {
//   switch(state) {
//     case "prompt":
//       break
//     case "denied":
//       break
//     case "granted":
//       self.registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: KEY,
//       }).then(() => {
//         self.registration.pushManager.getSubscription().then((subscription) => {
//           if (subscription != null) {
//             console.log('endpoint: ', subscription.endpoint)
//             console.log('expiration time: ', subscription.expirationTime)
//           }
//         })
//       })
//       break
//   }
// })

self.addEventListener('push', (e) => {
  const data = e.data?.json() ?? {}

  const title = data.title || 'Notification'
  const message = data.message || ''
  const icon = 'images/icon.png'

  self.registration.showNotification(title, {
    body: message,
    tag: 'v1',
    icon,
  }).then(() => {
    global.addEventListener('notificationclick', () => {
      global.clients.openWindow('https://www.baidu.com')
    })
  })
})
