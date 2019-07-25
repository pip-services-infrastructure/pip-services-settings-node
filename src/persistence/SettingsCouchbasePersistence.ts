let _ = require('lodash');

import { FilterParams, DoubleConverter } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';

export class SettingsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<SettingsSectionV1, string> 
    implements ISettingsPersistence {

    constructor() {
        super('settings');
    }

    private static mapToPublic(map: any) {
        if (map == null) return null;

        for (let field in map) {
            if (map.hasOwnProperty(field) && field.indexOf('_dot_') >= 0) {
                let value = map[field];
                field = field.replace('_dot_', '.');
                map[field] = value;
            }
        }

        return map;
    }

    private static fieldFromPublic(field: string): string {
        if (field == null) return null;
        field = field.replace('.', '_dot_');
        return field;
    }

    private static mapFromPublic(map: any) {
        if (map == null) return null;

        for (let field in map) {
            if (map.hasOwnProperty(field) && field.indexOf('.') >= 0) {
                let value = map[field];
                field = field.replace('.', '_dot_');
                map[field] = value;
            }
        }

        return map;
    }

    // Convert object to JSON format
    protected convertToPublic(value: any): any {
        if (value == null) return null;

        let parameters = SettingsCouchbasePersistence.mapToPublic(value.parameters);
        parameters = ConfigParams.fromValue(parameters);

        value = {
            id: value.id,
            parameters: parameters,
            update_time: value.update_time
        };

        return value;
    }    

    protected convertFromPublic(value: any): any {
        if (value == null) return null;
        
        let parameters = SettingsCouchbasePersistence.mapFromPublic(value.parameters);
        value = {
            id: value.id,
            parameters: parameters,
            update_time: value.update_time
        };

        return value;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let filters = [];

        let search = filter.getAsNullableString('search');
        if (search != null) 
            filters.push("(id LIKE '%" + search + "%')");

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");
    
        let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null)
            filters.push("(id LIKE '" + idStarts + "%')");

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SettingsSectionV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public set(correlationId: string, item: SettingsSectionV1,
        callback?: (err: any, item: SettingsSectionV1) => void): void {

        if (item == null) {
            if (callback) callback(null, null);
            return;
        }

        let parameters = item.parameters.getAsObject();
        parameters = SettingsCouchbasePersistence.mapFromPublic(parameters);

        this._bucket.getAndLock(item.id, (err, result) => {
            // Ignore "Key does not exist on the server" error
            if (err && err.message && err.code == 13)
                err = null;

            if (err) {
                if (callback) callback(err, null);
                return;
            }

            let newItem = item;

            if (result && result.value) {
                newItem = result.value;
                newItem.parameters = result.parameters || {};

                for (let key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        newItem.parameters[key] = parameters[key];
                    }
                }
            } 

            newItem.update_time = new Date();

            let options = result ? { cas: result.cas } : {};

            this._bucket.upsert(item.id, newItem, options, (err, result) => {
                if (!err)
                    this._logger.trace(correlationId, "Set in %s with id = %s", this._bucketName, item.id);
               
                if (callback) {
                    newItem = err == null ? this.convertToPublic(newItem) : null;
                    callback(err, newItem);
                }
            });
        });
    }

    public modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback: (err: any, item: SettingsSectionV1) => void): void {
        if (updateParams == null && incrementParams == null) {
            if (callback) callback(null, null);
            return;
        }

        this._bucket.getAndLock(id, (err, result) => {
            // Ignore "Key does not exist on the server" error
            if (err && err.message && err.code == 13)
                err = null;

            if (err) {
                if (callback) callback(err, null);
                return;
            }

            let newItem = result && result.value 
                ? result.value 
                : { id: id, parameters: {} };

            if (updateParams) {
                updateParams = updateParams.getAsObject();
                updateParams = SettingsCouchbasePersistence.mapFromPublic(updateParams);

                for (let key in updateParams) {
                    if (updateParams.hasOwnProperty(key)) {
                        newItem.parameters[key] = updateParams[key];
                    }
                }
            } 

            if (incrementParams) {
                incrementParams = incrementParams.getAsObject();
                incrementParams = SettingsCouchbasePersistence.mapFromPublic(incrementParams);

                for (let key in incrementParams) {
                    if (incrementParams.hasOwnProperty(key)) {
                        newItem.parameters[key] = DoubleConverter.toDoubleWithDefault(newItem.parameters[key], 0)
                            + DoubleConverter.toDoubleWithDefault(incrementParams[key], 0);
                    }
                }
            } 

            newItem.update_time = new Date();

            let options = result ? { cas: result.cas } : {};

            this._bucket.upsert(id, newItem, options, (err, result) => {
                if (!err)
                    this._logger.trace(correlationId, "Modified in %s with id = %s", this._bucketName, id);
                
                if (callback) {
                    newItem = err == null ? this.convertToPublic(newItem) : null;
                    callback(err, newItem);
                }
            });
        });
    }

}
