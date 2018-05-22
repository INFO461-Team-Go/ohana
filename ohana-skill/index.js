'use strict';
const Alexa = require('ask-sdk-core');
const Request = require('request');
const Firebase = require('./firebase-functions');

// Amazon Profile URL
const amznProfileURL = 'https://api.amazon.com/user/profile?access_token=';

// LaunchRequestHandler:
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        handlerInput.requestEnvelope.context.callBackWaitsForEmptyEventLoop = false; 
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
                // TODO: Delete this later
                // firebase.getTask("harshi");
            }
        });
        const speakOutput = 'Hello! Welcome to ohana!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

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
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        GetTaskIntentHandler,
        MarkAsDoneIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .lambda();