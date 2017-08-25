import * as admin from "firebase-admin"
// ! IMPORTANT !
// You should generate a private key for server secure comunication with FCM
// https://console.firebase.google.com/project/upmaraton/settings/serviceaccounts/adminsdk
var serviceAccount = require("../../private.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://upmaraton.firebaseio.com"
})

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  data: {
    score: "850",
    time: "2:45"
  }
}

module.exports = (app) => {
  return (req, res, next) => {
    if (!req.params.token) res.sendStatus(500)
    console.log("Registering token: " + req.params.token)
    //Init first task
    app.locals.currentTask = 0

    setTimeout(() => {
      console.log("Sending 1st push notification to web client!")
      // Send a message to the device corresponding to the provided
      // registration token.
      admin.messaging().sendToDevice(req.params.token, payload)
        .then(function(response) {
          // See the MessagingDevicesResponse reference documentation for
          // the contents of response.
          app.locals.currentTask = 1
          console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });
    }, 10000)

    setTimeout(() => {
      console.log("Sending 2nd push notification to web client!")
      // Send a message to the device corresponding to the provided
      // registration token.
      admin.messaging().sendToDevice(req.params.token, payload)
        .then(function(response) {
          // See the MessagingDevicesResponse reference documentation for
          // the contents of response.
          app.locals.currentTask = 2
          console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });
    }, 20000)

    setTimeout(() => {
      console.log("Sending 3rd push notification to web client!")
      // Send a message to the device corresponding to the provided
      // registration token.
      admin.messaging().sendToDevice(req.params.token, payload)
        .then(function(response) {
          // See the MessagingDevicesResponse reference documentation for
          // the contents of response.
          app.locals.currentTask = 3
          console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });
    }, 30000)

    return res.send("Registered token: " + req.params.token)
  }
}
