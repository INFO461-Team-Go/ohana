/**
 * This is a helper module for Ohana, an Alexa skill. 
 * It contains functions to read from and write to our Firebase Real Time Database
 * 
 * By Harshitha Akkaraju, 2018
 */

'use strict';
const Https = require('https');

/**
 * Uses the user's hash to retrieve their data from Firebase
 * 
 * @param {String} hash 
 * @returns {JSON}
 */
const getUserBranch = function (hash) {
    const accessToken = 'AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY';
    // TODO: Delete the following line of code!
    hash = '88412251529091bf4491dd0654c25560';
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
    // TODO: Incoming path change
    const tasksList = userBranch.tasks.taskList;
    response = getRoommateIndex(roommatesList, roommate);
    response["task"] = matchTask(tasksList, response.roommateId);
    return response;
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
        if (person.name.toLowerCase() === roommate) {
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
 * @returns {String}
 */
function matchTask(tasksList, roommateId) {
    let task = "";
    if (roommateId != -1) {
        Object.keys(tasksList).forEach((key) => {
            let assignment = tasksList[key];
            // TODO: Potential name & type change coming up
            if (parseInt(assignment.roommate) === roommateId) {
                task = assignment.name;
                return;
            }
        });
    }
    return task;
}

module.exports = {
    getUserBranch,
    getTask
}