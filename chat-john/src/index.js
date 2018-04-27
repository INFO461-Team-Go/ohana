import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from "firebase/app";

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDk8vu2AqXcr5k0UAQqkvqZFGMSAK4ANig",
    authDomain: "chat-ca875.firebaseapp.com",
    databaseURL: "https://chat-ca875.firebaseio.com",
    projectId: "chat-ca875",
    storageBucket: "chat-ca875.appspot.com",
    messagingSenderId: "166950199254"
    };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
