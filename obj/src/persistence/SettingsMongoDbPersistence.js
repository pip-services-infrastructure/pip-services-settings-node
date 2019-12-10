"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class SettingsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('settings');
    }
    static mapToPublic(map) {
        if (map == null)
            return null;
        for (let field in map) {
            if (map.hasOwnProperty(field) && field.indexOf('_dot_') >= 0) {
                let value = map[field];
                field = field.replace('_dot_', '.');
                map[field] = value;
            }
        }
        return map;
    }
    static fieldFromPublic(field) {
        if (field == null)
            return null;
        field = field.replace('.', '_dot_');
        return field;
    }
    static mapFromPublic(map) {
        if (map == null)
            return null;
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
    convertToPublic(value) {
        if (value == null)
            return null;
        let parameters = SettingsMongoDbPersistence.mapToPublic(value.parameters);
        parameters = pip_services3_commons_node_1.ConfigParams.fromValue(parameters);
        value = {
            id: value._id,
            parameters: parameters,
            update_time: value.update_time
        };
        value = super.convertToPublic(value);
        return value;
    }
    convertFromPublic(value) {
        if (value == null)
            return null;
        let parameters = SettingsMongoDbPersistence.mapFromPublic(value.parameters);
        value = {
            _id: value.id,
            parameters: parameters,
            update_time: value.update_time
        };
        value = super.convertFromPublic(value);
        return value;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_2.FilterParams();
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
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    set(correlationId, item, callback) {
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        let parameters = item.parameters.getAsObject();
        parameters = SettingsMongoDbPersistence.mapFromPublic(parameters);
        let partial = {
            $set: {
                parameters: parameters,
                update_time: new Date()
            }
        };
        this._collection.findOneAndUpdate({ _id: item.id }, partial, { returnOriginal: false, upsert: true }, (err, result) => {
            if (!err)
                this._logger.trace(correlationId, "Set in %s with id = %s", this._collection, item.id);
            if (callback) {
                let newItem = result ? this.convertToPublic(result.value) : null;
                // if (err == null || newItem == null) {
                //     newItem = _.clone(item);
                //     newItem.update_time = now;
                // }
                callback(err, newItem);
            }
        });
    }
    modify(correlationId, id, updateParams, incrementParams, callback) {
        let partial = {
            $set: {
                update_time: new Date()
            }
        };
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
        this._collection.findOneAndUpdate({ _id: id }, partial, { returnOriginal: false, upsert: true }, (err, result) => {
            if (!err)
                this._logger.trace(correlationId, "Modified in %s by %s", this._collection, id);
            if (callback) {
                let newItem = result ? this.convertToPublic(result.value) : null;
                callback(err, newItem);
            }
        });
    }
}
exports.SettingsMongoDbPersistence = SettingsMongoDbPersistence;
//# sourceMappingURL=SettingsMongoDbPersistence.js.map