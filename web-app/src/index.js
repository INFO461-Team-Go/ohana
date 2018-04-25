import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: "AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY",
    authDomain: "ohana-e7233.firebaseapp.com",
    databaseURL: "https://ohana-e7233.firebaseio.com",
    projectId: "ohana-e7233",
    storageBucket: "ohana-e7233.appspot.com",
    messagingSenderId: "915757022426"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
