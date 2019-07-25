let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

// let services = require('../../../../src/protos/settings_v1_grpc_pb');
// let messages = require('../../../../src/protos/settings_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { SettingsSectionV1 } from '../../../src/data/version1/SettingsSectionV1';
import { SettingsMemoryPersistence } from '../../../src/persistence/SettingsMemoryPersistence';
import { SettingsController } from '../../../src/logic/SettingsController';
import { SettingsCommandableGrpcServiceV1 } from '../../../src/services/version1/SettingsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SettingsCommandableGrpcServiceV1', ()=> {
    let service: SettingsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new SettingsMemoryPersistence();
        let controller = new SettingsController();

        service = new SettingsCommandableGrpcServiceV1();
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
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        async.series([
        // Create one section
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/settings.set_section',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            id: 'test.1',
                            parameters: ConfigParams.fromTuples(
                                'key1', 'value11',
                                'key2', 'value12'
                            )
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let parameters = JSON.parse(response.result_json);

                        assert.isObject(parameters);
                        assert.equal('value11', parameters.key1);

                        callback();
                    }
                );
            },
        // Create another section
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/settings.modify_section',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            id: 'test.2',
                            update_parameters: ConfigParams.fromTuples(
                                'key1', 'value21'
                            ),
                            increment_parameters: ConfigParams.fromTuples(
                                'key2', 1
                            )
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let parameters = JSON.parse(response.result_json);

                        assert.isObject(parameters);
                        assert.equal('value21', parameters.key1);
                        assert.equal('1', parameters.key2);

                        callback();
                    }
                );
            },
        // Get second section
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/settings.get_section_by_id',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            id: 'test.2'
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let parameters = JSON.parse(response.result_json);

                        assert.isObject(parameters);
                        assert.equal('value21', parameters.key1);
                        assert.equal('1', parameters.key2);

                        callback();
                    }
                );
            },
        // Get all sections
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/settings.get_sections',
                        args_empty: false,
                        args_json: JSON.stringify({ })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let page = JSON.parse(response.result_json);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get all section ids
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/settings.get_section_ids',
                        args_empty: false,
                        args_json: JSON.stringify({ })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let page = JSON.parse(response.result_json);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });

});
