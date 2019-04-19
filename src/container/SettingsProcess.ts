import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { SettingsServiceFactory } from '../build/SettingsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class SettingsProcess extends ProcessContainer {

    public constructor() {
        super("settings", "Settings microservice");
        this._factories.add(new SettingsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
