import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-seneca-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { SettingsMemoryPersistence } from '../persistence/SettingsMemoryPersistence';
import { SettingsFilePersistence } from '../persistence/SettingsFilePersistence';
import { SettingsMongoDbPersistence } from '../persistence/SettingsMongoDbPersistence';
import { SettingsController } from '../logic/SettingsController';
import { SettingsSenecaServiceV1 } from '../services/version1/SettingsSenecaServiceV1';

export class SettingsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-settings', seneca, SettingsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new SettingsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new SettingsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new SettingsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new SettingsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new SettingsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-settings', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-settings', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new SettingsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}