'use strict';
// Dependencies
const Alexa = require('ask-sdk-core');
const Request = require('request');
const Firebase = require("firebase");
const MD5 = require('md5');

// Used to initializa Firebase app
const config = {
    apiKey: "AIzaSyCh7wRFGqzNXGuKBLzPYItxrhz8S-9b2aY",
    authDomain: "ohana-e7233.firebaseapp.com",
    databaseURL: "https://ohana-e7233.firebaseio.com",
    storageBucket: "ohana-e7233.appspot.com",
};

// Constants
//const db = Firebase.database();
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
        Request(amznProfileURL + user.accessToken, function (error, response, body) {
            if (response.statusCode == 200) {
                let profile = JSON.parse(body);
                console.log(profile.email);
            }
        });
        const speakOutput = 'Hello! Welcome to ohana!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * 
 */
const GetTaskIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
            handlerInput.requestEnvelope.request.type === 'GetTaskIntent';
    },
    handle(handlerInput) {
        // do something
        const speakOutput = 'Hello! Welcome to ohana!';
        console.log("inside GetTaskIntentHandler");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const MarkAsDoneIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
            handlerInput.requestEnvelope.request.type === 'MarkAsDoneIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello! Welcome to ohana!';
        console.log("inside MarkAsDoneIntentHandler");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.type === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello! Welcome to ohana!';
        console.log("inside HelpIntentHandler");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.type === 'AMAZON.CancelIntent' ||
            handlerInput.requestEnvelope.request.type === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Hello! Welcome to ohana!';
        console.log("inside CancelIntentHandler");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // clean up logic (if any)
        console.log("inside SessionEnded");
        return handlerInput.responseBuilder.getResponse();
    }
};

// Lambda Setup
let skill = undefined;
exports.handler = async function(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    // This snippet is needed for Firebase initialization on lambda
    if (Firebase.apps.length === 0) {
        Firebase.initializeApp(config);
    }
    // Debug code
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        // TODO: Add error handlers after request handlers
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                GetTaskIntentHandler,
                MarkAsDoneIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler
            )
            .create();
    }
    return skill.invoke(event, context);
}