"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const SettingsServiceFactory_1 = require("../build/SettingsServiceFactory");
class SettingsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("settings", "Settings function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-settings', 'controller', 'default', '*', '*'));
        this._factories.add(new SettingsServiceFactory_1.SettingsServiceFactory());
    }
}
exports.SettingsLambdaFunction = SettingsLambdaFunction;
exports.handler = new SettingsLambdaFunction().getHandler();
//# sourceMappingURL=SettingsLambdaFunction.js.map