let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from '../persistence/ISettingsPersistence';
import { ISettingsController } from './ISettingsController';
import { SettingsCommandSet } from './SettingsCommandSet';

export class SettingsController implements IConfigurable, IReferenceable, ICommandable, ISettingsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-settings:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(SettingsController._defaultConfig);
    private _persistence: ISettingsPersistence;
    private _commandSet: SettingsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ISettingsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SettingsCommandSet(this);
        return this._commandSet;
    }

    public getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, (err, page) => {
            if (page != null) {
                let data = _.map(page.data, d => d.id);
                let result = new DataPage<string>(data, page.total);
                callback(err, result);
            } else {
                callback(err, null);
            }
        });
    }

    public getSections(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getSectionById(correlationId: string, id: string, 
        callback: (err: any, parameters: ConfigParams) => void): void {
        this._persistence.getOneById(correlationId, id, (err, item) => {
            if (err) callback(err, null);
            else {
                let parameters = item != null ? item.parameters : null;
                parameters = parameters || new ConfigParams();
                callback(null, parameters);
            }
        });
    }

    public setSection(correlationId: string, id: string, parameters: ConfigParams,
        callback: (err: any, parameters: ConfigParams) => void): void {
        let item = new SettingsSectionV1(id, parameters);
        this._persistence.set(correlationId, item, (err, item) => {
            if (callback) {
                if (err) callback(err, null);
                else callback(null, item.parameters);
            }
        });
    }

    public modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback: (err: any, parameters: ConfigParams) => void): void {
        this._persistence.modify(correlationId, id, updateParams, incrementParams, (err, item) => {
            if (callback) {
                if (err) callback(err, null);
                else callback(null, item.parameters);
            }
        });
    }
    
}
