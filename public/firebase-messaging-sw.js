// ! IMPORTANT !
// This file alwaws should be named firebase-messaging-sw.js, at least at firebase 4.3.0
importScripts('https://www.gstatic.com/firebasejs/4.3.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.3.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '456275715091'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

this.addEventListener('install', function() {
  console.log('Installed service worker')
})

// this.addEventListener('push', function() {
//   console.log('Service worker has recived a push notification!')
//   self.registration.showNotification('Service worker has recived a push notification!')
// })

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.'
  }

  return self.registration.showNotification(notificationTitle,
    notificationOptions)
})
