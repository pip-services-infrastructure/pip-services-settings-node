let _ = require('lodash');
let os = require('os');

import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';
import { SettingsMongoDbSchema } from './SettingsMongoDbSchema';

export class SettingsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<SettingsSectionV1, string> 
    implements ISettingsPersistence {

    constructor() {
        super('settings', SettingsMongoDbSchema());
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

        let parameters = SettingsMongoDbPersistence.mapToPublic(value.parameters);
        parameters = ConfigParams.fromValue(parameters);

        value = {
            id: value._id,
            parameters: parameters,
            update_time: value.update_time
        };

        return value;
    }    

    protected convertFromPublic(value: any): any {
        if (value == null) return null;
        
        let parameters = SettingsMongoDbPersistence.mapFromPublic(value.parameters);
        value = {
            _id: value.id,
            parameters: parameters,
            update_time: value.update_time
        };

        return value;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            criteria.push({ _id: { $regex: searchRegex } });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let idStarts = filter.getAsNullableString('id_starts');
        if (idStarts != null) {
            let idStartsRegex = new RegExp("^" + idStarts, "i");
            criteria.push({ _id: { $regex: idStartsRegex } });
        }

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-time', null, callback);
    }

    public set(correlationId: string, item: SettingsSectionV1,
        callback?: (err: any, item: SettingsSectionV1) => void): void {

        if (item == null) {
            if (callback) callback(null, null);
            return;
        }

        let parameters = item.parameters.getAsObject();
        parameters = SettingsMongoDbPersistence.mapFromPublic(parameters);

        let partial: any = {
           $set: { 
               parameters: parameters
           },
           update_time: new Date()
        }
        
        this._model.findOneAndUpdate(
            { _id: item.id }, 
            partial, 
            { new: true, upsert: true }, 
            (err, newItem) => {
                if (!err)
                    this._logger.trace(correlationId, "Set in %s with id = %s", this._collection, item.id);
            
                if (callback) {
                    newItem = this.convertToPublic(newItem);
                    callback(err, newItem);
                }
            }
        );
    }

    public modify(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams,
        callback: (err: any, item: SettingsSectionV1) => void): void {

        let partial: any = {
            update_time: new Date()
        }

        // Update parameters
        if (updateParams) {
            for (let key in updateParams) {
                if (updateParams.hasOwnProperty(key)) {
                    partial.$set = partial.$set || {};
                    let field = 'parameters.' + SettingsMongoDbPersistence.fieldFromPublic(key);
                    partial.$set[field] = updateParams[key];
                }
            }
        }

        // Increment parameters
        if (incrementParams) {
            for (let key in incrementParams) {
                if (incrementParams.hasOwnProperty(key)) {
                    partial.$inc = partial.$inc || {};
                    let increment = incrementParams.getAsLongWithDefault(key, 0);
                    let field = 'parameters.' + SettingsMongoDbPersistence.fieldFromPublic(key);
                    partial.$inc[field] = increment;
                }
            }
        }

        this._model.findOneAndUpdate(
            { _id: id }, 
            partial, 
            { new: true, upsert: true }, 
            (err, newItem) => {
                if (!err)
                    this._logger.trace(correlationId, "Modified in %s by %s", this._collection, id);
            
                if (callback) {
                    newItem = this.convertToPublic(newItem);
                    callback(err, newItem);
                }
            }
        );
    }

}
