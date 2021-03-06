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

/**
 * Initializes listeners in each instance of names. Counts and indexes all names in roommates 
 * whenever there is a change and updates database accordingly
 * @namespace cloudfunctions
 * @function cloudfunctions.handleCountRoommates
 */
// exports.handleCountRoommates = functions.database.ref('{hash}/roommates/names')
// .onWrite((change, context) => {
//     if (!change.after.exists()) {
//         return null;
//     }
//     let baseCount = 1;
//     if (change.after.numChildren() === baseCount) {
//         return change.after.ref.parent.update({count: 0});
//     }

//     // if number of entries before and after are the same, exit function
//      else if (change.before.numChildren() === change.after.numChildren()) {
//         return null;
//      }
//     // } else if (change.after.numChildren() < change.before.numChildren()) {
//     //     let roommatesRef = change.after.ref.parent;
//     //     let userRef = roommatesRef.parent;
//     //     let tasksRef = userRef.child('tasks');
//     //     tasksRef.once('value')
//     //         .then(snapshot => snapshot.forEach(taskSnap => {
//     //             taskSnap.ref.update({})
//     //         }))
//     // }   

//     let parentRef = change.after.ref.parent;
//     let namesSnap = change.after;
//     let indexCount = 0;
//     namesSnap.forEach(nameSnap => {
//         // due to instances of method pushing blank entries, method checks if nameSnap exists. 
//         // performs count and update if nameSnap is truthy.

//         if (nameSnap.val()) {
//             nameSnap.ref.update({index: indexCount})
//             indexCount++;
//         }
//     });
//     let toUpdate = {count: indexCount};

//     return change.after.ref.parent.update(toUpdate)
//             .then(console.log("write complete!"));
// });

// use snapshot.numChildren() to find number of children

// to assign roommates to tasks
// set ref to names. then orderByChild("index").equalTo(whatever index that was)

// exports.handleRoommateDelete = functions.database.ref('{hash}/roommates/names').onDelete((snapshot, context) => {
//     let deletedValue = snapshot.val();
//     let deletedIndex = deletedValue.index;
//     console.log("deleted index: " + deletedIndex);
//     let roommatesRef = snapshot.ref.parent;
//     let userRef = roommatesRef.parent;
//     let tasksRef = userRef.child("tasks");
//     return tasksRef.once("value")
//         .then((taskSnap => {
//             return taskSnap.forEach(childSnap => {
//                 let childVal = childSnap.val();
//                 console.log("childVal: " + childVal);
//                 if (childVal.roommate === deletedIndex) {
//                     childSnap.ref.update({roommate: -1});
//                 }
//             });
//         }));

// })

// exports.handleDelete = functions.database.ref('{hash}/roommates/names/{pushKey}').onWrite((change, context) => {
//     // exit if item exists
//     if (change.after.exists()) {
//         return null;
//     }

//     let deletedValue = change.before.val();
//     let deletedIndex = deletedValue.index;
//     console.log("deleted index: " + deletedIndex);
//     let roommatesRef = change.before.ref.parent;
//     let userRef = roommatesRef.parent;
//     let tasksRef = userRef.child("tasks");
//     console.log("line 100");
//     return tasksRef.once("value")
//         .then((taskSnap => {
//              return taskSnap.forEach(childSnap => {
//                 let childVal = childSnap.val();
//                 console.log("childVal: " + childVal);
//                 if (childVal.roommate === deletedIndex) {
//                     console.log("updating index to -1")
//                     childSnap.ref.update({roommate: -1});
//                 }
//             });
//         }))
//         .catch(error => {
//             console.error(error);
//             console.log("line 114");
//         })
// });