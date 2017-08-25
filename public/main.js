/* Initialize Firebase */
var config = {
  apiKey: "AIzaSyD5kTfMizzEukLFbZkth8i-PropUqgwB84",
  authDomain: "upmaraton.firebaseapp.com",
  databaseURL: "https://upmaraton.firebaseio.com",
  projectId: "upmaraton",
  storageBucket: "",
  messagingSenderId: "456275715091"
}

firebase.initializeApp(config)

const messaging = firebase.messaging()
let start = document.getElementById('start')
let pollingStatus = document.getElementById('polling-status')
let currentStatusValue = document.getElementById('current-status-value')
/* Main */

document.addEventListener('DOMContentLoaded', function() {
  start.addEventListener('click', startServiceWorker)
  pollingStatus.style.display = 'none'
  /* Init polling */
  setInterval(function(){
    pollingStatus.style.display = 'inline'
    fetch('status').then(fetchStatus).then(setStatus)
  },2000)
})

/* Functions */

function startServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    registerFCMPushSubscription()
  } else {
    console.log("You can't use ServiceWorker Push API.")
  }
}

function sendFCMTokenToServer(currentToken) {
  console.log('Firebase token recived: ' + currentToken)
  fetch('token/' + currentToken).then(function(response) {
    console.log('Work done, FCM token registered on the server.')
  })
}

function fetchStatus(response) {
  return response.json()
}

function setStatus(response) {
  pollingStatus.style.display = 'none'
  currentStatusValue.innerHTML = response.payload
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
