import { YamlConfigReader } from 'pip-services-commons-node';

import { SettingsMongoDbPersistence } from '../../src/persistence/SettingsMongoDbPersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsMongoDbPersistence', ()=> {
    let persistence: SettingsMongoDbPersistence;
    let fixture: SettingsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new SettingsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new SettingsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
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