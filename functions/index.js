const functions = require('firebase-functions');
const admin = require('firebase-admin');
const appKey = require("./admin-sdk.json");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
//for full text search configuration
const algoliaSearch = require("algoliasearch");
const ALGOLIA_APP_ID = "7Z6VFB8JQD";
const ALGOLIA_ADMIN_KEY = "4d3d6bd4f0d834faf34f8458efaea5f5";
const ALGOLIA_INDEX_NAME = "algoevents";
const validateRegisterInput = require("./validation/register");
const validateLoginData = require("./validation/login")
const validateFPwdData = require("./validation/forgotPwd")
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
admin.initializeApp(config);
const firebase = require('firebase')
firebase.initializeApp(config)

const db = firebase.firestore();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

exports.addFirestoreDataToAlgolia = functions.https.onRequest((req, res) => {
  var algoArr = [];
  admin.firestore().collection('events_test').get().then((docs) => {
    docs.forEach((doc) => {
      let individualEvent = doc.data();
      const record = {
        objectID: doc.id,
        address: individualEvent.address,
        category: individualEvent.category,
        title: individualEvent.title,
        startDate: individualEvent.startdate,
        image: individualEvent.img
        //summary: individualEvent.summary
      };

      // individualEvent.objectID = doc.eventId;
      // console.log("individualEvent",individualEvent)
      algoArr.push(record);
    })
    var client = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex(ALGOLIA_INDEX_NAME);
    index.saveObjects(algoArr, function (err, content) {
      res.status(200).send("content")
    })
  })

})


//add users to algolia

exports.addFirestoreDataToAlgoliaUsers = functions.https.onRequest((req, res) => {
  var algoArr = [];
  admin.firestore().collection('users').get().then((docs) => {
    docs.forEach((doc) => {
      let individualUser = doc.data();
      const record = {
        objectID: doc.id,
        name : individualUser.handle,
        email : individualUser.email,
        imageUrl: individualUser.imageUrl
        //summary: individualEvent.summary
      };

      // individualEvent.objectID = doc.eventId;
      // console.log("individualEvent",individualEvent)
      algoArr.push(record);
    })
    var client = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    var index = client.initIndex('users');
    index.saveObjects(algoArr, function (err, content) {
      res.status(200).send("users")
    })
  })

})

//regitser user route

app.post('/api/v1/register', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  const { valid, errors } = validateRegisterInput(newUser);

  if (!valid) return res.status(400).json(errors);


  let token, userId;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'Name already taken' });
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
        return res.status(400).json({ email: 'Email is already in use' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
});

//login route
app.post('/api/v1/login', (req, res) => {
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
        .json({ password: 'Wrong credentials, please try again' });
    });


});
app.post('/api/v1/forgotpwd', (req, res) => {

  const pwd = {
    email: req.body.email
  };
  const { valid, errors } = validateFPwdData(pwd);
  if (!valid) return res.status(400).json(errors);
  firebase
    .auth()
    .sendPasswordResetEmail(pwd.email)
    .then(() => {
      return res.status(200).json({ email: 'email has been sent' })
    })
    .catch((err) => {
      return res
        .status(500).json({ error: err.code })
    })
}
)
const eventDatabase = db.collection("events_test");
//get events data
app.get('/api/v1/events', (req, res) => {
  eventDatabase.get()
  db.collection('events_test').limit(1000).get()
    .then(snapshot => {
      let eventsData = [];
      snapshot.forEach(doc => {
        let tempJSON = {};
        tempJSON = doc.data();
        tempJSON.eventId = doc.id;

        var currentdate = new Date()
        
        // console.log(temp);
        if(tempJSON.startDate=="" && tempJSON.enddate=="")
        {

          eventsData.push(tempJSON);
        }
        else if(tempJSON.enddate!=""){
          var enddate = new Date(tempJSON.enddate)
         if(enddate>currentdate)
          eventsData.push(tempJSON);
        }
        else {
          var startdate = new Date(tempJSON.startdate)
          if(startdate>currentdate)
            eventsData.push(tempJSON)
        }
        
      });
      res.status(200).send(eventsData);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
})

app.get('/api/v1/learning', (req, res) => {

  db.collection('events_test').where('category', '==', 'learning').get()
    .then(snapshot => {
      let eventsData = [];
      snapshot.forEach(doc => {
        let tempJSON = {};
        tempJSON = doc.data();
        tempJSON.eventId = doc.id;
        eventsData.push(tempJSON);
      });

      res.status(200).send(eventsData);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
})

//get all profile data data
app.get('/api/v1/getAllProfiles', (req, res) => {
  db.collection('users').get()
    .then(snapshot => {
      let eventsData = [];
      snapshot.forEach(doc => {
        let tempJSON = {};
        tempJSON = doc.data();
        tempJSON.eventId = doc.id;
        eventsData.push(tempJSON);
      });
      res.status(200).send(eventsData);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
})

//get individual profile data data
app.get('/api/v1/getProfile/:email', (req, res) => {
  db.collection('users').where('email', '==', req.params.email).get()
    .then(snapshot => {
      let userData = [];
      snapshot.forEach(doc => {
        let tempJSON = {};
        tempJSON = doc.data();
        console.log("userdata_index.js_234", doc.data())
        userData.push(tempJSON);
      });
      console.log("index:userData", userData)
      res.status(200).send(userData);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
})
app.get('/api/v1/eventDetails/:title', (req, res) => {
  db.collection('events_test').where('title', '==', req.params.title).get()
    .then(snapshot => {
      let eventData = [];
      snapshot.forEach(doc => {
        let tempJSON = {};
        tempJSON = doc.data();
        tempJSON.eventId = doc.id;
        eventData.push(tempJSON);
      });
      res.status(200).send(eventData);
    }).catch(
      err => {
        res.status(500).json({ error: err.code });
      })
})
//update User route
app.post('/api/v1/updateProfile', (req, res) => {
  db.collection('users').doc(Object.values(req.body)[2]).update({
    gender: Object.values(req.body)[3],
    interests: Object.values(req.body)[6],
    bio: Object.values(req.body)[5],
    birthday: Object.values(req.body)[4],
    address: Object.values(req.body)[7],
    location: Object.values(req.body)[8],
    imageUrl: Object.values(req.body)[9]
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
});

//update User friends
app.post('/api/v1/sendFriendRequest', (req, res) => {
  let sender = Object.values(req.body)[0];
  let receiver = Object.values(req.body)[1];
  db.collection('connections').doc(sender).get().then(doc => {
    let arr = [];
    let fromList = [];
    let friendList = []
    //check if the sender has made any requests , if not then create a new request to connections
    if (!doc.exists) {
      db.collection('connections').doc(sender).set({
        to: [receiver]
      }, { merge: true })
    } else {
      // check if any requests has made, if not made then create " mTO" array  
      if (!doc.data()['to']) {
        arr.push(receiver);
        db.collection('connections').doc(sender).set({
          to: arr
        }, { merge: true })
      } else {
        // check if any requests are received or friends with the sender
        arr = doc.data()['to'];
        if (doc.data()['from']) { fromList = doc.data()['from'];}
        if (doc.data()['friends']) { friendList = doc.data()['friends'];}
        // check if already friends
        if(friendList.includes(receiver)) {
          return res.status(200).send("You are Already Friends !")
        }
        // check if request receives from sender
        else if (fromList.includes(receiver)) {
          return res.status(200).send("You have received a request ")
        }
        else if (!arr.includes(receiver) ) {
          arr.push(receiver);
          db.collection('connections').doc(sender).set({
            to: arr
          }, { merge: true })
        }
      }
    }
  })

  db.collection('connections').doc(receiver).get().then(doc => {
    let arr = [];
    if (!doc.exists) {
      db.collection('connections').doc(receiver).set({
        from: [sender]
      }, { merge: true })
    } else {
      if (!doc.data()['from']) {
        arr.push(sender);
        db.collection('connections').doc(receiver).set({
          from: arr
        }, { merge: true })
      } else {
        arr = doc.data()['from'];
        if (!arr.includes(sender)) {
          arr.push(sender);
          console.log("final", arr)
          db.collection('connections').doc(receiver).set({
            from: arr
          }, { merge: true })
        }
      }
    }
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
});

//get individual friends list data
app.get('/api/v1/getfriendRequestList/:email', (req, res) => {
  loggedEmail = req.params.email;
  db.collection('connections').doc(loggedEmail).get()
    .then(snapshot => {
      res.status(200).send(snapshot.data());
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
})
//accept friend request
app.post('/api/v1/acceptRequest', (req, res) => {
  loggedEmail = Object.values(req.body)[0];
  //logged user has to accept the request
  requestToAccept = Object.values(req.body)[1];
  //get the logged user details and make the changes

  db.collection('connections').doc(loggedEmail).get().then(doc => {
    let fromList = doc.data()['from'];
    let friendList = doc.data()['friends'];
    let toList = doc.data()['to'];
    if (!friendList) { friendList = []; }
    if (!toList) { toList = []; }
    // if request existis in  from list , then remove it from from list 
    if (fromList.includes(requestToAccept)) {
      fromList.splice(fromList.indexOf(requestToAccept), 1)
    } 
    // if request existis in  To list , then remove it from To list 
    if (toList.includes(requestToAccept)) {
      toList.splice(toList.indexOf(requestToAccept), 1)
    }
    if(!friendList.includes(requestToAccept)){
      friendList.push(requestToAccept) 
    }
    db.collection('connections').doc(loggedEmail).set({
      from: fromList,
      friends: friendList,
      to: toList
    }, { merge: true })
  })
  //get the accept user details and make the changes
  db.collection('connections').doc(requestToAccept).get().then(doc => {
    let fromList = doc.data()['from'];
    let friendList = doc.data()['friends'];
    let toList = doc.data()['to'];
    if (!friendList) { friendList = []; }
    if (!fromList) { fromList = []; }
    if (toList.includes(loggedEmail)) {
      toList.splice(toList.indexOf(loggedEmail), 1)
    }

    if (fromList.includes(loggedEmail)) {
      fromList.splice(fromList.indexOf(loggedEmail), 1)
    }
    if(!friendList.includes(loggedEmail)) {
      friendList.push(loggedEmail)
    }

    db.collection('connections').doc(requestToAccept).set({
      from: fromList,
      friends: friendList,
      to: toList
    }, { merge: true })
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
})
//reject friend request list data
app.post('/api/v1/rejectRequest', (req, res) => {
  loggedEmail = Object.values(req.body)[0];
  //logged user has to accept the request
  requestToReject = Object.values(req.body)[1];

  db.collection('connections').doc(loggedEmail).get().then(doc => {
    let fromList = doc.data()['from'];
    let friendList = doc.data()['friends'];
    let toList = doc.data()['to'];
    if (!friendList) { friendList = []; }
    if (!toList) { toList = []; }
    if (fromList.includes(requestToReject)) {
      fromList.splice(fromList.indexOf(requestToReject), 1)
    }
    db.collection('connections').doc(loggedEmail).set({
      from: fromList,
      friends: friendList,
      to: toList
    }, { merge: true })
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
})
//going events activty tracking
app.post('/api/v1/goingActivities', (req, res) => {
  eventID = Object.values(req.body)[0];
  //logged user has to accept the request
  loggedEmail = Object.values(req.body)[1];
  //loggedEmail = 'hgadarsha@gmail.com';
  //eventID = req.params.event;
  db.collection('goingActivities').doc(eventID).get().then(doc => {
    if (!doc.exists) {
      db.collection('goingActivities').doc(eventID).set({
        going: [loggedEmail]
      }, { merge: true })
    } else {
      let going = doc.data()['going'];
      if(!going.includes(loggedEmail)) {
        going.push(loggedEmail);
      }
      db.collection('goingActivities').doc(eventID).set({
        going: going
      }, { merge: true })
    }
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });

})

//interested events activty tracking
app.post('/api/v1/interestedActivities', (req, res) => {
  eventID = Object.values(req.body)[0];
  //logged user has to accept the request
  loggedEmail = Object.values(req.body)[1];
  db.collection('interestedActivities').doc(eventID).get().then(doc => {
    if (!doc.exists) {
      db.collection('interestedActivities').doc(eventID).set({
        interested: [loggedEmail]
      }, { merge: true })
    } else {
      let interested = doc.data()['interested'];
      if(!interested.includes(loggedEmail)) {
        interested.push(loggedEmail);
      }
      db.collection('interestedActivities').doc(eventID).set({
        interested: interested
      }, { merge: true })
    }
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });

})

// Not going events activty tracking
app.post('/api/v1/notGoingActivities', (req, res) => {
  eventID = Object.values(req.body)[0];
  //logged user has to accept the request
  loggedEmail = Object.values(req.body)[1];
  // loggedEmail = 'hgadarsha@gmail.com';
  // eventID = req.params.event;
  db.collection('notGoingActivities').doc(eventID).get().then(doc => {
    if (!doc.exists) {
      db.collection('notGoingActivities').doc(eventID).set({
        notGoing: [loggedEmail]
      }, { merge: true })
    } else {
      let notGoing = doc.data()['going'];
      notGoing.push(loggedEmail);
      db.collection('notGoingActivities').doc(eventID).set({
        notGoing: notGoing
      }, { merge: true })
    }
  }).then(function () {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code }); 
  });

})

//friends going list for each event

app.post('/api/v1/friendsGoing', (req, res) => {
  eventID = Object.values(req.body)[0];
  //logged user has to accept the request
  loggedEmail = Object.values(req.body)[1];
  let myFriendsGoing = [];
  db.collection('goingActivities').doc(eventID).get().then(doc => {
    if (doc.exists) {
      goingList = doc.data()['going'];
      db.collection('connections').doc(loggedEmail).get().then(connection => {
        if (connection.exists) {
          let friendsList = connection.data()['friends']
          if (friendsList) {
            friendsList.forEach(friend => {
              console.log("friend", friend);
              console.log("goingList", goingList);
              if (goingList.includes(friend)) {
                console.log("frind going to event",friend);
                myFriendsGoing.push(friend);
              }
            });
            res.status(200).send(myFriendsGoing);
          }
        }
      });
    }
  });
})

exports.api = functions.https.onRequest(app);