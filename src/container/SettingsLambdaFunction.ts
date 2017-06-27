import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { SettingsServiceFactory } from '../build/SettingsServiceFactory';

export class SettingsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("settings", "Settings function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-settings', 'controller', 'default', '*', '*'));
        this._factories.add(new SettingsServiceFactory());
    }
}

export const handler = new SettingsLambdaFunction().getHandler();