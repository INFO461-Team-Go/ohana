/**
 * Harshitha Akkaraju
 * 
 * 
 */

const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY",
    authDomain: "ohana-e7233.firebaseapp.com",
    databaseURL: "https://ohana-e7233.firebaseio.com",
    storageBucket: "ohana-e7233.appspot.com",
};
firebase.initializeApp(config);
const db = firebase.database();

exports.getTask = function(name) {
    db.goOnline();
    // get person's task from db
    db.goOffline();
}

exports.markAsDone = function(name) {
    db.goOnline();
    // update person's task on db
    db.goOffline();
}

