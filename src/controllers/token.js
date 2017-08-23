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
};

module.exports = (req, res, next) => {
  if (!req.params.token) res.sendStatus(500)
  console.log("Registering token: " + req.params.token)
  let index = 10
  let interval = setInterval(() => {
    console.log("Sending push notification in: " + index--)
    if (index <= 0) clearInterval(interval)
  }, 1000)
  setTimeout(() => {
    console.log("Sending push notification to web client!")
    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().sendToDevice(req.params.token, payload)
      .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
  }, 10000)
  return res.send("Registered token: " + req.params.token)
}
