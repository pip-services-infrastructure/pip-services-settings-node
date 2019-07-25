let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/settings_v1_grpc_pb');
let messages = require('../../../../src/protos/settings_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { SettingsSectionV1 } from '../../../src/data/version1/SettingsSectionV1';
import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsGrpcServiceV1 } from '../../../src/services/version1/SettingsGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsGrpcServiceV1', ()=> {
    let service: SettingsGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-settings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-settings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-settings', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/settings_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).settings_v1.Settings;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        async.series([
        // Create one section
            (callback) => {
                client.set_section(
                    {
                        id: 'test.1',
                        parameters: ConfigParams.fromTuples(
                            'key1', 'value11',
                            'key2', 'value12'
                        )
                    },
                    (err, response) => {
                        err = err || response.error;
                        let parameters = response ? response.parameters : null;

                        assert.isNull(err);

                        assert.isObject(parameters);
                        assert.equal('value11', parameters.key1);

                        callback();
                    }
                );
            },
        // Create another section
            (callback) => {
                client.modify_section(
                    {
                        id: 'test.2',
                        update_parameters: ConfigParams.fromTuples(
                            'key1', 'value21'
                        ),
                        increment_parameters: ConfigParams.fromTuples(
                            'key2', 1
                        )
                    },
                    (err, response) => {
                        err = err || response.error;
                        let parameters = response ? response.parameters : null;

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
                client.get_section_by_id(
                    {
                        id: 'test.2'
                    },
                    (err, response) => {
                        err = err || response.error;
                        let parameters = response ? response.parameters : null;

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
                client.get_sections(
                    {
                    },
                    (err, response) => {
                        err = err || response.error;
                        let page = response ? response.page : null;

                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get all section ids
            (callback) => {
                client.get_section_ids(
                    {
                    },
                    (err, response) => {
                        err = err || response.error;
                        let page = response ? response.page : null;

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
