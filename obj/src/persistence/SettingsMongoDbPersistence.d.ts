import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';
export declare class SettingsMongoDbPersistence extends IdentifiableMongoDbPersistence<SettingsSectionV1, string> implements ISettingsPersistence {
    constructor();
    private static mapToPublic(map);
    private static fieldFromPublic(field);
    private static mapFromPublic(map);
    protected convertToPublic(value: any): any;
    protected convertFromPublic(value: any): any;
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    set(correlationId: string, item: SettingsSectionV1, callback?: (err: any, item: SettingsSectionV1) => void): void;
    modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams, callback: (err: any, item: SettingsSectionV1) => void): void;
}
