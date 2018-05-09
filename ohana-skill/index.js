/**
 * Harshitha Akkaraju
 * 
 * 
 */


const Alexa = require('ask-sdk-core');
const FirebaseDB = require('./dbConn.js');

// LaunchRequestHandler: Welcome message when user invokes the skill
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        const speakOutput = "Hello! Welcome to ohana!";

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withSimpleCard('Ohana!', speakOutput)
            .getResponse();
    },
};

// Lambda Setup
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler
    )
    .lambda();

FirebaseDB.getTask("Harshi");