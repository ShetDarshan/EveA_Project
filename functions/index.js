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
// console.log("illi bartha idini")
// app.post("/register",(req,res) => {
//   var email=req.body.email;
//   var password =req.body.password;
//   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
 
//   })
// })

  app.post('/register', function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    // var errors = req.validationErrors();

    if(errors){
        res.render('users/register', {
            errors: errors
        });
    } else {
        console.log("Started 1...");
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error, userData) {
            console.log("Started 2...");
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                req.flash('error_msg', 'Registration Failed. Make sure all fields are properly filled.' + error.message);
                res.redirect('/users/register');
                console.log("Error creating user: ", error);
            } else {
                console.log("Successfully created");
                console.log("Successfully created user with uid:", userData.uid);
                var user = { uid: userData.uid,
                  email: email,
                  username: username
              }

              var userRef = firebase.database().ref('users/');
              userRef.push().set(user);

              req.flash('success_msg', 'You are now registered and can login');
              res.redirect('/users/login');
          }

      });
  }
});