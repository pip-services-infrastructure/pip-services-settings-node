"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const SettingsSectionV1_1 = require("../data/version1/SettingsSectionV1");
const SettingsCommandSet_1 = require("./SettingsCommandSet");
class SettingsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(SettingsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SettingsCommandSet_1.SettingsCommandSet(this);
        return this._commandSet;
    }
    getSectionIds(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, (err, page) => {
            if (page != null) {
                let data = _.map(page.data, d => d.id);
                let result = new pip_services3_commons_node_3.DataPage(data, page.total);
                callback(err, result);
            }
            else {
                callback(err, null);
            }
        });
    }
    getSections(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getSectionById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, (err, item) => {
            if (err)
                callback(err, null);
            else {
                let parameters = item != null ? item.parameters : null;
                parameters = parameters || new pip_services3_commons_node_1.ConfigParams();
                callback(null, parameters);
            }
        });
    }
    setSection(correlationId, id, parameters, callback) {
        let item = new SettingsSectionV1_1.SettingsSectionV1(id, parameters);
        this._persistence.set(correlationId, item, (err, item) => {
            if (callback) {
                if (err)
                    callback(err, null);
                else
                    callback(null, item.parameters);
            }
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams, callback) {
        this._persistence.modify(correlationId, id, updateParams, incrementParams, (err, item) => {
            if (callback) {
                if (err)
                    callback(err, null);
                else
                    callback(null, item.parameters);
            }
        });
    }
}
exports.SettingsController = SettingsController;
SettingsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-settings:persistence:*:*:1.0');
//# sourceMappingURL=SettingsController.js.map