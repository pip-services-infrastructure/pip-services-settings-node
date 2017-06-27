"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const SettingsSectionV1_1 = require("../data/version1/SettingsSectionV1");
class SettingsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let idStarts = filter.getAsNullableString('id_starts');
        return function (item) {
            if (search != null && !this.matchString(item.id, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (idStarts != null && !item.id.startsWith(idStarts))
                return false;
            return true;
        };
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
        // Update time
        item.update_time = new Date();
        super.set(correlationId, item, callback);
    }
    modify(correlationId, id, updateParams, incrementParams, callback) {
        let index = this._items.map((x) => { return x.id; }).indexOf(id);
        let item = index >= 0
            ? this._items[index] : new SettingsSectionV1_1.SettingsSectionV1(id);
        // Update parameters
        if (updateParams) {
            for (let key in updateParams) {
                if (updateParams.hasOwnProperty(key))
                    item.parameters.setAsObject(key, updateParams[key]);
            }
        }
        // Increment parameters
        if (incrementParams) {
            for (let key in incrementParams) {
                if (incrementParams.hasOwnProperty(key)) {
                    let increment = incrementParams.getAsLongWithDefault(key, 0);
                    let value = item.parameters.getAsLongWithDefault(key, 0);
                    value += increment;
                    item.parameters.setAsObject(key, value);
                }
            }
        }
        // Update time
        item.update_time = new Date();
        if (index < 0)
            this._items.push(item);
        this._logger.trace(correlationId, "Modified item by %s", id);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err, item);
        });
    }
}
exports.SettingsMemoryPersistence = SettingsMemoryPersistence;
//# sourceMappingURL=SettingsMemoryPersistence.js.map