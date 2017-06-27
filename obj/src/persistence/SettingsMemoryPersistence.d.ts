import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';
export declare class SettingsMemoryPersistence extends IdentifiableMemoryPersistence<SettingsSectionV1, string> implements ISettingsPersistence {
    constructor();
    private matchString(value, search);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void;
    set(correlationId: string, item: SettingsSectionV1, callback?: (err: any, item: SettingsSectionV1) => void): void;
    modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams, callback: (err: any, item: SettingsSectionV1) => void): void;
}
