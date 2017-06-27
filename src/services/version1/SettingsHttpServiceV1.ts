import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class SettingsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-settings', 'controller', 'default', '*', '1.0'));
    }
}