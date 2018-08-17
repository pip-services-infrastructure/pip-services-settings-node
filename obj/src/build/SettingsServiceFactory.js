"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const SettingsMongoDbPersistence_1 = require("../persistence/SettingsMongoDbPersistence");
const SettingsFilePersistence_1 = require("../persistence/SettingsFilePersistence");
const SettingsMemoryPersistence_1 = require("../persistence/SettingsMemoryPersistence");
const SettingsController_1 = require("../logic/SettingsController");
const SettingsHttpServiceV1_1 = require("../services/version1/SettingsHttpServiceV1");
const SettingsSenecaServiceV1_1 = require("../services/version1/SettingsSenecaServiceV1");
class SettingsServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SettingsServiceFactory.MemoryPersistenceDescriptor, SettingsMemoryPersistence_1.SettingsMemoryPersistence);
        this.registerAsType(SettingsServiceFactory.FilePersistenceDescriptor, SettingsFilePersistence_1.SettingsFilePersistence);
        this.registerAsType(SettingsServiceFactory.MongoDbPersistenceDescriptor, SettingsMongoDbPersistence_1.SettingsMongoDbPersistence);
        this.registerAsType(SettingsServiceFactory.ControllerDescriptor, SettingsController_1.SettingsController);
        this.registerAsType(SettingsServiceFactory.SenecaServiceDescriptor, SettingsSenecaServiceV1_1.SettingsSenecaServiceV1);
        this.registerAsType(SettingsServiceFactory.HttpServiceDescriptor, SettingsHttpServiceV1_1.SettingsHttpServiceV1);
    }
}
SettingsServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-Settings", "factory", "default", "default", "1.0");
SettingsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-settings", "persistence", "memory", "*", "1.0");
SettingsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-settings", "persistence", "file", "*", "1.0");
SettingsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-settings", "persistence", "mongodb", "*", "1.0");
SettingsServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-settings", "controller", "default", "*", "1.0");
SettingsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-settings", "service", "seneca", "*", "1.0");
SettingsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-settings", "service", "http", "*", "1.0");
exports.SettingsServiceFactory = SettingsServiceFactory;
//# sourceMappingURL=SettingsServiceFactory.js.map