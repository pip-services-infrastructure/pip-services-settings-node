let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { SettingsMongoDbPersistence } from '../../src/persistence/SettingsMongoDbPersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsMongoDbPersistence', ()=> {
    let persistence: SettingsMongoDbPersistence;
    let fixture: SettingsPersistenceFixture;

    setup((done) => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "settings";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new SettingsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new SettingsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err) {
                done(err);
                return;
            }
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Get and set', (done) => {
        fixture.testGetAndSet(done);
    });

    test('Set parameter', (done) => {
        fixture.testSetParameter(done);
    });

    test('Increment parameter', (done) => {
        fixture.testIncrementParameter(done);
    });

});