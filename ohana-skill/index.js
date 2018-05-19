// TODO: Delete this comment: npm i -S grpc --target=8.1.0 --target_arch=x64 --target_platform=linux --target_libc=glibc
'use strict';

const Alexa = require('ask-sdk-core');
const Request = require('request');
const Firebase = require('./firebaseFunctions');

// Amazon Profile URL
const amznProfileURL = 'https://api.amazon.com/user/profile?access_token=';

// LaunchRequestHandler:
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
            handlerInput.requestEnvelope.request.type === "GetTaskIntent";
    },
    handle(handlerInput) {
        // do something
    }
};

const MarkAsDoneIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && 
            handlerInput.requestEnvelope.request.type === "MarkAsDoneIntent";
    },
    handle(handlerInput) {

    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.type === "AMAZON.HelpIntent";
    },
    handle(handlerInput) {

    }
}

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.type === "AMAZON.CancelIntent" ||
            handlerInput.requestEnvelope.request.type === "AMAZON.StopIntent");
    },
    handle(handlerInput) {

    }
}

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
    },
    handle(handlerInput) {
        // clean up logic (if any)
        return handlerInput.responseBuilder.getResponse();
    }
}

// Lambda Setup
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        GetTaskIntentHandler,
        MarkAsDoneIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .lambda();