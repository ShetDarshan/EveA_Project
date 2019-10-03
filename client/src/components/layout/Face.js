import React from 'react';
import './index.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


// Configure Firebase.
const config = {
    apiKey: "AIzaSyD4svmLSEA5IDa49VKgK45vbUCL7JkO52I",
    authDomain: "evea-prj.firebaseapp.com",
    // ...
  };
  firebase.initializeApp(config);
  // Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
     // 
     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };

  class Face extends React.Component {
    render() {
      return (
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
  }
export default Face;