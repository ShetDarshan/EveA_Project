const functions = require('firebase-functions');

const admin = require('firebase-admin');
const appKey = require("./admin-sdk.json");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

admin.initializeApp({
    credential: admin.credential.cert(appKey),
    databaseURL: "https://evea-prj.firebaseio.com"
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     const snapshot = await admin.database().ref('/messages').push({original: original});
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref.toString());
//   });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log("illi bartha idini")
app.post("/register",(req,res) => {
  var email=req.body.email;
  var password =req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(userRecord)
  {
    res.location('/user/' + userRecord.uid);
    res.status(201).end();
  })
  .catch(function(error)
  {
    res.write
    ({
      code: error.code
    });
    res.status(401).end();
  });
});
