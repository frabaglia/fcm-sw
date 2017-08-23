const messaging = firebase.messaging()

function sendFCMTokenToServer(currentToken) {
  console.log('Firebase token recived: ' + currentToken)
  fetch('token/' + currentToken).then(function(response) {
    console.log('Work done, FCM token registered on the server.')
  })
}

function registerFCMPushSubscription() {
  messaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
      messaging.getToken()
        .then(function(currentToken) {
          if (currentToken) {
            sendFCMTokenToServer(currentToken)
          } else {
            console.log('No Instance ID token available. Request permission to generate one.')
          }
        })
        .catch(function(err) {
          console.log('An error occurred while retrieving token. ', err)
        })
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
        registerFCMPushSubscription()
      })
  } else {
    console.log("You can't use ServiceWorker Push API.")
  }
})
