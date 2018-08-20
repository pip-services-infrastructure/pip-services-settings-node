import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { SettingsServiceFactory } from '../build/SettingsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class SettingsProcess extends ProcessContainer {

    public constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
