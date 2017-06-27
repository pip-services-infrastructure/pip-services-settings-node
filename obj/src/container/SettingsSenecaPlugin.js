"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const SettingsMemoryPersistence_1 = require("../persistence/SettingsMemoryPersistence");
const SettingsFilePersistence_1 = require("../persistence/SettingsFilePersistence");
const SettingsMongoDbPersistence_1 = require("../persistence/SettingsMongoDbPersistence");
const SettingsController_1 = require("../logic/SettingsController");
const SettingsSenecaServiceV1_1 = require("../services/version1/SettingsSenecaServiceV1");
class SettingsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-settings', seneca, SettingsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new SettingsController_1.SettingsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new SettingsMongoDbPersistence_1.SettingsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new SettingsFilePersistence_1.SettingsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new SettingsMemoryPersistence_1.SettingsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new SettingsSenecaServiceV1_1.SettingsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-settings', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-settings', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.SettingsSenecaPlugin = SettingsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new SettingsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=SettingsSenecaPlugin.js.map