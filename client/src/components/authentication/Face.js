/*import React from 'react';
import './index.css';
// import * as serviceWorker from './serviceWorker';
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
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: 'https://evea-prj.firebaseapp.com/eventboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
export default Face;*/