"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const SettingsCouchbasePersistence_1 = require("../persistence/SettingsCouchbasePersistence");
const SettingsMongoDbPersistence_1 = require("../persistence/SettingsMongoDbPersistence");
const SettingsFilePersistence_1 = require("../persistence/SettingsFilePersistence");
const SettingsMemoryPersistence_1 = require("../persistence/SettingsMemoryPersistence");
const SettingsController_1 = require("../logic/SettingsController");
const SettingsHttpServiceV1_1 = require("../services/version1/SettingsHttpServiceV1");
const SettingsCommandableGrpcServiceV1_1 = require("../services/version1/SettingsCommandableGrpcServiceV1");
const SettingsGrpcServiceV1_1 = require("../services/version1/SettingsGrpcServiceV1");
class SettingsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SettingsServiceFactory.MemoryPersistenceDescriptor, SettingsMemoryPersistence_1.SettingsMemoryPersistence);
        this.registerAsType(SettingsServiceFactory.FilePersistenceDescriptor, SettingsFilePersistence_1.SettingsFilePersistence);
        this.registerAsType(SettingsServiceFactory.MongoDbPersistenceDescriptor, SettingsMongoDbPersistence_1.SettingsMongoDbPersistence);
        this.registerAsType(SettingsServiceFactory.CouchbasePersistenceDescriptor, SettingsCouchbasePersistence_1.SettingsCouchbasePersistence);
        this.registerAsType(SettingsServiceFactory.ControllerDescriptor, SettingsController_1.SettingsController);
        this.registerAsType(SettingsServiceFactory.HttpServiceDescriptor, SettingsHttpServiceV1_1.SettingsHttpServiceV1);
        this.registerAsType(SettingsServiceFactory.CommandableGrpcServiceDescriptor, SettingsCommandableGrpcServiceV1_1.SettingsCommandableGrpcServiceV1);
        this.registerAsType(SettingsServiceFactory.GrpcServiceDescriptor, SettingsGrpcServiceV1_1.SettingsGrpcServiceV1);
    }
}
exports.SettingsServiceFactory = SettingsServiceFactory;
SettingsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-Settings", "factory", "default", "default", "1.0");
SettingsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "persistence", "memory", "*", "1.0");
SettingsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "persistence", "file", "*", "1.0");
SettingsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "persistence", "mongodb", "*", "1.0");
SettingsServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "persistence", "couchbase", "*", "1.0");
SettingsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "controller", "default", "*", "1.0");
SettingsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "service", "http", "*", "1.0");
SettingsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "service", "commandable-grpc", "*", "1.0");
SettingsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-settings", "service", "grpc", "*", "1.0");
//# sourceMappingURL=SettingsServiceFactory.js.map