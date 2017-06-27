import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { SettingsMemoryPersistence } from './SettingsMemoryPersistence';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
export declare class SettingsFilePersistence extends SettingsMemoryPersistence {
    protected _persister: JsonFilePersister<SettingsSectionV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
