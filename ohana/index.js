const firebase = require("firebase");
const alexa = require("alexa-app");
const express = require('express');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY",
    authDomain: "ohana-e7233.firebaseapp.com",
    databaseURL: "https://ohana-e7233.firebaseio.com",
    storageBucket: "ohana-e7233.appspot.com",
};
firebase.initializeApp(config);

// Initialize alexa skill
var skill = new alexa.app("ohana");

// skill.launch
// skill.intent -- define each intent
// skill.intent -- to quit/exit
// skill.intent -- cancel
// skill.intent -- help
// skill.error

module.exports = skill;

const app = express();
const PORT = process.env.port || 8080;

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});