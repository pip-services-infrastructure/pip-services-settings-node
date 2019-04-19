import { ConfigParams } from 'pip-services3-commons-node';

import { SettingsFilePersistence } from '../../src/persistence/SettingsFilePersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsFilePersistence', ()=> {
    let persistence: SettingsFilePersistence;
    let fixture: SettingsPersistenceFixture;
    
    setup((done) => {
        persistence = new SettingsFilePersistence('./data/settings.test.json');

        fixture = new SettingsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
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