import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { ISetter } from 'pip-services-data-node';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
export interface ISettingsPersistence extends IGetter<SettingsSectionV1, string>, ISetter<SettingsSectionV1> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: SettingsSectionV1) => void): void;
    set(correlationId: string, item: SettingsSectionV1, callback?: (err: any, item: SettingsSectionV1) => void): void;
    modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams, callback: (err: any, item: SettingsSectionV1) => void): void;
}
