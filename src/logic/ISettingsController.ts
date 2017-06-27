import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';

export interface ISettingsController {
    getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void;

    getSections(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void;
    
    getSectionById(correlationId: string, id: string, 
        callback: (err: any, parameters: ConfigParams) => void): void;

    setSection(correlationId: string, id: string, parameters: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void;

    modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback?: (err: any, parameters: ConfigParams) => void): void;
}
