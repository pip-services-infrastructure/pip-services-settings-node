import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsController } from './ISettingsController';
export declare class SettingsController implements IConfigurable, IReferenceable, ICommandable, ISettingsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<string>) => void): void;
    getSections(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void;
    getSectionById(correlationId: string, id: string, callback: (err: any, parameters: ConfigParams) => void): void;
    setSection(correlationId: string, id: string, parameters: ConfigParams, callback: (err: any, parameters: ConfigParams) => void): void;
    modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams, callback: (err: any, parameters: ConfigParams) => void): void;
}
