import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class SettingsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-settings', 'controller', 'default', '*', '1.0'));
    }
}