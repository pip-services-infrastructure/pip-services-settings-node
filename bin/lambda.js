let SettingsLambdaFunction = require('../obj/src/container/SettingsLambdaFunction').SettingsLambdaFunction;

module.exports = new SettingsLambdaFunction().getHandler();