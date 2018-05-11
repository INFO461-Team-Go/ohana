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
        const userId = handlerInput.requestEnvelope.session.user.userId;
        if (userId == "amzn1.ask.account.[unique-value-here]" || userId == undefined) {
            let output = "to start using this skill, please use the companion app to authenticate on Amazon"
            handlerInput.responseBuilder
                .speak(output)
                .withLinkAccountCard()
            return;
        }
        const speakOutput = "Hello! Welcome to ohana!";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withLinkAccountCard()
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