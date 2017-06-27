let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { SettingsSectionV1 } from '../../src/data/version1/SettingsSectionV1';
import { SettingsMemoryPersistence } from '../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../src/logic/SettingsController';
import { SettingsLambdaFunction } from '../../src/container/SettingsLambdaFunction';

suite('SettingsLambdaFunction', ()=> {
    let lambda: SettingsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-settings:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-settings:controller:default:default:1.0'
        );

        lambda = new SettingsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Create one section
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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