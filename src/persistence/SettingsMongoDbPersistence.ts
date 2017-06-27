let _ = require('lodash');
let os = require('os');

import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { SettingsSectionV1 } from '../data/version1/SettingsSectionV1';
import { ISettingsPersistence } from './ISettingsPersistence';
import { SettingsMongoDbSchema } from './SettingsMongoDbSchema';

export class SettingsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<SettingsSectionV1, string> 
    implements ISettingsPersistence {

    constructor() {
        super('settings', SettingsMongoDbSchema());
    }

    // Convert object to JSON format
    protected convertToPublic(value: any): any {
        if (value == null) return null;

        value = {
            id: value._id,
            parameters: ConfigParams.fromValue(value.parameters),
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

        let partial: any = {
           $set: { 
               parameters: item.parameters.getAsObject()
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
                    partial.$set['parameters.' + key] = updateParams[key];
                }
            }
        }

        // Increment parameters
        if (incrementParams) {
            for (let key in incrementParams) {
                if (incrementParams.hasOwnProperty(key)) {
                    partial.$inc = partial.$inc || {};
                    let increment = incrementParams.getAsLongWithDefault(key, 0);
                    partial.$inc['parameters.' + key] = increment;
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
