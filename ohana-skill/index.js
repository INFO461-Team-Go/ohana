/**
 * This module contains the event handlers that respond to user input on Ohana -- an Alexa skill.
 * 
 * By Harshitha Akkaraju, 2018
 */

'use strict';
// Dependencies
const Alexa = require('ask-sdk-core');
const Https = require('https');
const MD5 = require('md5');
const Firebase = require('./firebase.js')

const amznProfileURL = 'https://api.amazon.com/user/profile?access_token=';

/// REQUEST HANDLERS: Code to handle user interaction with Ohana

/**
 * LaunchRequestHandler
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const user = handlerInput.requestEnvelope.session.user;
        if (user.userId == "amzn1.ask.account.[unique-value-here]" || user.userId == undefined) {
            let output = "to start using this skill, please use the companion app to authenticate on Amazon";
            return handlerInput.responseBuilder
                .speak(output)
                .withLinkAccountCard()
                .getResponse();
        }
        const speakOutput = 'Hello! Welcome to ohana!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * GetTaskIntentHandler: Handles user's request to get their task
 */
const GetTaskIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
            handlerInput.requestEnvelope.request.intent.name === 'GetTaskIntent';
    },
    async handle(handlerInput) {
        const user = handlerInput.requestEnvelope.session.user;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        let outputSpeech = '';
        try {
            const response = await httpsGet(user.accessToken);
            console.log(response);
            attributes.email = response.email;
            attributes.hash = MD5(response.email);
            attributes.getTaskIsActive = true;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            outputSpeech = "Will do! What is your name?";
            let reprompt = "Sorry, I didn't get that. What is your name?";
            return handlerInput.responseBuilder
                .speak(outputSpeech)
                .reprompt(reprompt)
                .getResponse();
        } catch (error) {
            outputSpeech = 'I am really sorry. I am unable to access part of my memory. Please try again later';
            return handlerInput.responseBuilder
                .speak(outputSpeech)
                .getResponse();
        }
    }
};

const MarkAsDoneIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
            handlerInput.requestEnvelope.request.intent.name === 'MarkAsDoneIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello! Welcome to ohana!';
        console.log("inside MarkAsDoneIntentHandler");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * GetNameIntentHandler: Listens for user's name. 
 *      Can be invoked in response to `GetTaskIntentHandler` and `MarkAsDoneIntentHandler`
 */
const GetNameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'GetNameIntentHandler';
    },
    async handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        let attributes = handlerInput.attributesManager.getSessionAttributes();
        let roommate = handlerInput.requestEnvelope.request.intent.slots.name.value;
        if (attributes.getTaskIsActive) {
            try {
                // Get user branch from Firebase
                const userBranch = await Firebase.getUserBranch(attributes.hash);
                // Get roommate's task
                const response = Firebase.getTask(userBranch, roommate.toLowerCase());
                if (!response.found || response.roommateId === -1 || response.task === "") {
                    let error = "Something went wrong. Please try asking for your task again";
                    return responseBuilder
                        .speak(error)
                        .getResponse();
                }
                let outputSpeech = roommate + ", you are assigned to " + response.task;
                return responseBuilder
                    .speak(outputSpeech)
                    .getResponse();
            } catch (errorObject) {
                let outputSpeech = 'I am really sorry. I am unable to access part of my memory. Please try again later';
                return responseBuilder
                    .speak(outputSpeech)
                    .getResponse();
            }
        } else if (attributes.markAsDoneIsActive) {
            // TODO: Add your code here Robin
        }
    }
}

/**
 * HelpIntentHandler: When invoked, this handler guides the user on how to use the skill 
 *      TODO: Implement this! 
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello! Welcome to ohana!';
        console.log("inside HelpIntentHandler");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * CancelAndStopIntentHandler: Ends the skill's session 
 *      TODO: Review this! 
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Bye';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * CancelAndStopIntentHandler: Ends the skill's session 
 *      TODO: Review this! 
 */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // clean up logic (if any)
        return handlerInput.responseBuilder.getResponse();
    }
};

/**
 * ErrorHandler: Handles any unexected input from the user
 */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${handlerInput.requestEnvelope.request.type} ${handlerInput.requestEnvelope.request.type === 'IntentRequest' ? `intent: ${handlerInput.requestEnvelope.request.intent.name} ` : ''}${error.message}.`);
        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

/**
 * Function to get user's Amazon profile information
 * @param {String} accessToken 
 * @returns {JSON}
 */
function httpsGet(accessToken) {
    let options = {
        host: 'api.amazon.com',
        port: 443,
        path: '/user/profile?access_token=' + encodeURIComponent(accessToken),
        method: 'GET'
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

// Lambda Setup
let skill = undefined;
exports.handler = async function (event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    // Debug code
    // console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        // TODO: Add error handlers after request handlers
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                GetTaskIntentHandler,
                GetNameIntentHandler,
                MarkAsDoneIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }
    return skill.invoke(event, context);
}