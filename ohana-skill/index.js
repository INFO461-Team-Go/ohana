/**
 * Harshitha Akkaraju
 * 
 * 
 */

const Alexa = require('ask-sdk-core');
const request = require('requests');
const FirebaseDB = require('./dbConn.js');

const amznProfileURL = 'https://api.amazon.com/user/profile?access_token=';

// LaunchRequestHandler: Welcome message when user invokes the skill
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const user = handlerInput.requestEnvelope.session.user;
        if (user.userId == "amzn1.ask.account.[unique-value-here]" || user.userId == undefined) {
            let output = "to start using this skill, please use the companion app to authenticate on Amazon"
            handlerInput.responseBuilder
                .speak(output)
                .withLinkAccountCard();
            return;
        }
        request(amznProfileURL + user.accessToken, function (error, response, body) {
            if (response.statusCode == 200) {
                let profile = JSON.parse(body);
                console.log(profile);
                // TODO: Extract email address and push it to Firebase
            }
        });
        const speakOutput = "Hello! Welcome to ohana!";
        return handlerInput.responseBuilder
            .speak(speakOutput)
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