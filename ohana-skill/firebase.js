/**
 * This is a helper module for Ohana, an Alexa skill. 
 * It contains functions to read from and write to our Firebase Real Time Database
 * 
 * By Harshitha Akkaraju, 2018
 */

'use strict';
const Https = require('https');
const FB = require('firebase');

// Used to initializa Firebase app
const config = {
    apiKey: "AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY",
    authDomain: "ohana-e7233.firebaseapp.com",
    databaseURL: "https://ohana-e7233.firebaseio.com",
    storageBucket: "ohana-e7233.appspot.com",
};
FB.initializeApp(config);

const database = FB.database();

/**
 * Uses the user's hash to retrieve their data from Firebase
 * 
 * @param {String} hash 
 * @returns {JSON}
 */
const getUserBranch = function (hash) {
    const accessToken = 'AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY';
    let options = {
        host: 'ohana-e7233.firebaseio.com',
        port: '443',
        path: '/' + encodeURIComponent(hash) + '.json?accessToken=' + encodeURIComponent(accessToken)
    };
    return new Promise(((resolve, reject) => {
        const request = Https.request(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';

            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`${response.statusCode}: ${response.req.getHeader('host')} ${response.req.path}`));
            }

            response.on('data', (chunk) => {
                returnData += chunk;
            });

            response.on('end', () => {
                resolve(JSON.parse(returnData));
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
        request.end();
    }));
}

/**
 * Retrieve's the roommate's task
 * @param {JSON} userBranch 
 * @param {String} roommate 
 * @returns {JSON}
 */
const getTask = function (userBranch, roommate) {
    let response = {};
    const roommatesList = userBranch.roommates.names;
    const tasksList = userBranch.tasks;
    response = getRoommateIndex(roommatesList, roommate);
    response["task"] = matchTask(tasksList, response.roommateId);
    return response;
}

/**
 * Mark user's task as done on Firebase DB
 * @param {String} hash 
 * @param {JSON} userBranch 
 * @param {JSON} task
 * @returns {Promise}
 */
const markAsDone = function (hash, userBranch, task) {
    let count = userBranch.roommates.count;
    let roommateId = task.roommateId;
    if (roommateId < count - 1) {
        roommateId++;
    } else if (roommateId == count - 1) {
        roommateId = 0;
    }
    let ref = database.ref(hash + "/tasks/" + task.id);
    return new Promise(((resolve, reject) => {
        ref.update({ roommate: roommateId }).then(() => {
            console.log("Data was written");
            resolve(true);
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    }));
}

/**
 * Get the given roommate's id
 * 
 * @param {JSON} roommatesList 
 * @param {String} roommate
 * @returns {JSON}
 */
function getRoommateIndex(roommatesList, roommate) {
    let roommateId = -1;
    let found = false;
    Object.keys(roommatesList).forEach((key) => {
        let person = roommatesList[key];
        if (person.name.toLowerCase() === roommate.toLowerCase()) {
            found = true;
            roommateId = person.index;
            return;
        }
    });
    return {roommateId: roommateId, found: found};
}

/**
 * Match the given roommateId with their task
 * 
 * @param {JSON} tasksList 
 * @param {String} roommateId
 * @returns {JSON}
 */
function matchTask(tasksList, roommateId) {
    let task = {};
    if (roommateId != -1) {
        Object.keys(tasksList).forEach((key) => {
            let assignment = tasksList[key];
            // TODO: Potential name & type change coming up
            if (assignment.roommate === roommateId) {
                task["id"] = key;
                task["name"] = assignment.name;
                task["roommateId"] = assignment.roommate;
                return;
            }
        });
    }
    return task;
}

module.exports = {
    getUserBranch,
    getTask,
    markAsDone
}