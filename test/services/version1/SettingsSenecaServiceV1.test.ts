let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { SettingsSectionV1 } from '../../../src/data/version1/SettingsSectionV1';
import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsSenecaServiceV1 } from '../../../src/services/version1/SettingsSenecaServiceV1';

suite('SettingsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: SettingsSenecaServiceV1;
    let persistence: SettingsMemoryPersistence;
    let controller: SettingsController;

    suiteSetup((done) => {
        persistence = new SettingsMemoryPersistence();
        controller = new SettingsController();

        service = new SettingsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-settings', 'service', 'commandable-seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Create one section
            (callback) => {
                seneca.act(
                    {
                        role: 'settings',
                        cmd: 'set_section',
                        id: 'test.1',
                        parameters: ConfigParams.fromTuples(
                            'key1', 'value11',
                            'key2', 'value12'
                        )
                    },
                    (err, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value11', parameters.key1);

                        callback();
                    }
                );
            },
        // Create another section
            (callback) => {
                seneca.act(
                    {
                        role: 'settings',
                        cmd: 'modify_section',
                        id: 'test.2',
                        update_params: ConfigParams.fromTuples(
                            'key1', 'value21'
                        ),
                        increment_params: ConfigParams.fromTuples(
                            'key2', 1
                        )
                    },
                    (err, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value21', parameters.key1);
                        assert.equal('1', parameters.key2);

                        callback();
                    }
                );
            },
        // Get second section
            (callback) => {
                seneca.act(
                    {
                        role: 'settings',
                        cmd: 'get_section_by_id',
                        id: 'test.2'
                    },
                    (err, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value21', parameters.key1);
                        assert.equal('1', parameters.key2);

                        callback();
                    }
                );
            },
        // Get all sections
            (callback) => {
                seneca.act(
                    {
                        role: 'settings',
                        cmd: 'get_sections' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get all section ids
            (callback) => {
                seneca.act(
                    {
                        role: 'settings',
                        cmd: 'get_section_ids' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });
});