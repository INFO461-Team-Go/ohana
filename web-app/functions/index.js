
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.countShit = functions.database.ref('{hash}/roommates/names')
.onWrite((change, context) => {
    if (!change.after.exists()) {
        return null;
    }

    let parentRef = change.after.ref.parent;
    let namesSnap = change.after;
    let names = [];
    let indexCount = 0;
    namesSnap.forEach(nameSnap => {
        nameSnap.ref.update({index: indexCount})
        names.push(nameSnap)
        indexCount++;
    });
    let length = names.length;
    let toUpdate = {count: length};

    return change.after.ref.parent.update(toUpdate);
});

