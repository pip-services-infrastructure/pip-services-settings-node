import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class SettingsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-settings', 'controller', 'default', '*', '1.0'));
    }
}