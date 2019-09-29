const functions = require('firebase-functions');

const admin = require('firebase-admin');
const appKey = require("./admin-sdk.json");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
admin.initializeApp();
const db = admin.firestore();
const validateRegisterInput = require("./validation/register");
const validateLoginData = require("./validation/login")

const config = {
  apiKey: "AIzaSyD4svmLSEA5IDa49VKgK45vbUCL7JkO52I",
  authDomain: "evea-prj.firebaseapp.com",
  databaseURL: "https://evea-prj.firebaseio.com",
  projectId: "evea-prj",
  storageBucket: "evea-prj.appspot.com",
  messagingSenderId: "342374627785",
  appId: "1:342374627785:web:3242138c0109915fc19018",
  measurementId: "G-4L5XLJ17HJ"
};
const firebase = require('firebase')
firebase.initializeApp(config)



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//regitser user route

app.post('/api/v1/register',(req,res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  const { valid, errors } = validateRegisterInput(newUser);

  if (!valid) return res.status(400).json(errors);


  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
});

//login route
app.post('/api/v1/login',(req,res) =>{
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(403)
        .json({ general: 'Wrong credentials, please try again' });
    });


});


exports.api = functions.https.onRequest(app);