let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { SettingsCouchbasePersistence } from '../../src/persistence/SettingsCouchbasePersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsCouchbasePersistence', ()=> {
    let persistence: SettingsCouchbasePersistence;
    let fixture: SettingsPersistenceFixture;

    setup((done) => {
        let couchbaseUri = process.env['COUCHBASE_SERVICE_URI'];
        let couchbaseHost = process.env['COUCHBASE_SERVICE_HOST'] || 'localhost';
        let couchbasePort = process.env['COUCHBASE_SERVICE_PORT'] || 8091;
        let couchbaseUser = process.env['COUCHBASE_USER'] || 'Administrator';
        let couchbasePass = process.env['COUCHBASE_PASS'] || 'password';
        let couchbaseBucket = process.env['COUCHBASE_BUCKET'] || 'test';
        if (couchbaseUri == null && couchbaseHost == null)
            return;
    
        var dbConfig = ConfigParams.fromTuples(
            'bucket', couchbaseBucket,
            'options.auto_create', true,
            'connection.uri', couchbaseUri,
            'connection.host', couchbaseHost,
            'connection.port', couchbasePort,
            'connection.detailed_errcodes', 1,
            'credential.username', couchbaseUser,
            'credential.password', couchbasePass
        );

        persistence = new SettingsCouchbasePersistence();
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

    test('Get sections', (done) => {
        fixture.testGetSections(done);
    });
});