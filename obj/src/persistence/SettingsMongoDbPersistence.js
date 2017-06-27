"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const SettingsMongoDbSchema_1 = require("./SettingsMongoDbSchema");
class SettingsMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('settings', SettingsMongoDbSchema_1.SettingsMongoDbSchema());
    }
    // Convert object to JSON format
    convertToPublic(value) {
        if (value == null)
            return null;
        value = {
            id: value._id,
            parameters: pip_services_commons_node_1.ConfigParams.fromValue(value.parameters),
            update_time: value.update_time
        };
        return value;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_2.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-time', null, callback);
    }
    set(correlationId, item, callback) {
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        let partial = {
            $set: {
                parameters: item.parameters.getAsObject()
            },
            update_time: new Date()
        };
        this._model.findOneAndUpdate({ _id: item.id }, partial, { new: true, upsert: true }, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Set in %s with id = %s", this._collection, item.id);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
    modify(correlationId, id, updateParams, incrementParams, callback) {
        let partial = {
            update_time: new Date()
        };
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
        this._model.findOneAndUpdate({ _id: id }, partial, { new: true, upsert: true }, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Modified in %s by %s", this._collection, id);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
}
exports.SettingsMongoDbPersistence = SettingsMongoDbPersistence;
//# sourceMappingURL=SettingsMongoDbPersistence.js.map