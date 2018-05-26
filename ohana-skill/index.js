'use strict';
// Dependencies
const Alexa = require('ask-sdk-core');
const request = require('request');
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
        /*
        request(amznProfileURL + user.accessToken, function (error, response, body) {
            console.log("here");
            if (response.statusCode == 200) {
                let profile = JSON.parse(body);
                console.log(profile.email);
                
            }
        });
        */
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
            handlerInput.requestEnvelope.request.intent.name === 'GetTaskIntent';
    },
    handle(handlerInput) {
        const user = handlerInput.requestEnvelope.session.user;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const response = handlerInput.responseBuilder;
        const url = amznProfileURL + user.accessToken;
        console.log(url);
        let promise = getProfile(url);
        promise.then(function(result) {
            console.log(result);
        }, function(error) {
            console.log(error);
        });
        /*
        let speakOutput = "Will do! What's your name?";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
        */
    }
};

function getProfile(url) {
    let options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }
    console.log("Inside getProfile()");
    return new Promise(function(resolve, reject) {
        console.log("Inside promise");
        request(options, function(error, response, body) {
            console.log("Received a response");
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

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
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        return attributes.state === state.LISTEN &&
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'GetNameIntentHandler';
    },
    handle(handlerInput) {
        console.log(handlerInput);
        return handlerInput.responseBuilder
            .speak("We're here!")
            .getResponse();
    }
}

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

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
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
    // console.log(`REQUEST++++${JSON.stringify(event)}`);
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