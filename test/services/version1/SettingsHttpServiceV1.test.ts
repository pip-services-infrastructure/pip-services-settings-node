let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { SettingsSectionV1 } from '../../../src/data/version1/SettingsSectionV1';
import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsHttpServiceV1 } from '../../../src/services/version1/SettingsHttpServiceV1';

let restConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsHttpServiceV1', ()=> {
    let service: SettingsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsHttpServiceV1();
        service.configure(restConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-settings', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

   
    test('CRUD Operations', (done) => {
        async.series([
        // Create one section
            (callback) => {
                rest.post('/v1/settings/set_section',
                    {
                        id: 'test.1',
                        parameters: ConfigParams.fromTuples(
                            'key1', 'value11',
                            'key2', 'value12'
                        )
                    },
                    (err, req, res, parameters) => {
                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value11', parameters.key1);

                        callback();
                    }
                );
            },
        // Create another section
            (callback) => {
                rest.post('/v1/settings/modify_section',
                    {
                        id: 'test.2',
                        update_params: ConfigParams.fromTuples(
                            'key1', 'value21'
                        ),
                        increment_params: ConfigParams.fromTuples(
                            'key2', 1
                        )
                    },
                    (err, req, res, parameters) => {
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
                rest.post('/v1/settings/get_section_by_id',
                    {
                        id: 'test.2'
                    },
                    (err, req, res, parameters) => {
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
                rest.post('/v1/settings/get_sections',
                    null,
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get all section ids
            (callback) => {
                rest.post('/v1/settings/get_section_ids',
                    null,
                    (err, req, res, page) => {
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