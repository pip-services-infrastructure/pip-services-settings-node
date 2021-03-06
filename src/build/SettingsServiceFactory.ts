import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { SettingsCouchbasePersistence } from '../persistence/SettingsCouchbasePersistence';
import { SettingsMongoDbPersistence } from '../persistence/SettingsMongoDbPersistence';
import { SettingsFilePersistence } from '../persistence/SettingsFilePersistence';
import { SettingsMemoryPersistence } from '../persistence/SettingsMemoryPersistence';
import { SettingsController } from '../logic/SettingsController';
import { SettingsHttpServiceV1 } from '../services/version1/SettingsHttpServiceV1';
import { SettingsCommandableGrpcServiceV1 } from '../services/version1/SettingsCommandableGrpcServiceV1';
import { SettingsGrpcServiceV1 } from '../services/version1/SettingsGrpcServiceV1';

export class SettingsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-Settings", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-settings", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-settings", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-settings", "persistence", "mongodb", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-settings", "persistence", "couchbase", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-settings", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-settings", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-settings", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-settings", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SettingsServiceFactory.MemoryPersistenceDescriptor, SettingsMemoryPersistence);
		this.registerAsType(SettingsServiceFactory.FilePersistenceDescriptor, SettingsFilePersistence);
		this.registerAsType(SettingsServiceFactory.MongoDbPersistenceDescriptor, SettingsMongoDbPersistence);
		this.registerAsType(SettingsServiceFactory.CouchbasePersistenceDescriptor, SettingsCouchbasePersistence);
		this.registerAsType(SettingsServiceFactory.ControllerDescriptor, SettingsController);
		this.registerAsType(SettingsServiceFactory.HttpServiceDescriptor, SettingsHttpServiceV1);
		this.registerAsType(SettingsServiceFactory.CommandableGrpcServiceDescriptor, SettingsCommandableGrpcServiceV1);
		this.registerAsType(SettingsServiceFactory.GrpcServiceDescriptor, SettingsGrpcServiceV1);
	}
	
}
