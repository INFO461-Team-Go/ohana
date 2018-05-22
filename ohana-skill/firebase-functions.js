const firebase = require("firebase");
const md5 = require('md5');

const config = {
    apiKey: "AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY",
    authDomain: "ohana-e7233.firebaseapp.com",
    databaseURL: "https://ohana-e7233.firebaseio.com",
    storageBucket: "ohana-e7233.appspot.com",
};

module.exports = function() {
    firebase.initializeApp(config);
    const db = firebase.database();
    const accounts = db.ref(`/accounts`);

    this.getTask = function(name) {
        console.log(name);
    }

    this.markAsDone = function(name) {

    }
}