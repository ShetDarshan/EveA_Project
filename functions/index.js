const functions = require('firebase-functions');

const admin = require('firebase-admin');
const appKey = require("./admin-sdk.json");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
admin.initializeApp();
const db = admin.firestore();
const validateRegisterInput = require("./validation/register");

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
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newuser = {
    name:req.body.name,    
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword,
  };

  firebase.auth().createUserWithEmailAndPassword(newuser.email,newuser.password)
    .then(data => {
      return res.status(201).json({mesage:`user ${data.uid} signed up successfully`})
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code })
    })
})

exports.api = functions.https.onRequest(app);