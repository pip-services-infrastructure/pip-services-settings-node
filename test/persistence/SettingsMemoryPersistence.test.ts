import { SettingsMemoryPersistence } from '../../src/persistence/SettingsMemoryPersistence';
import { SettingsPersistenceFixture } from './SettingsPersistenceFixture';

suite('SettingsMemoryPersistence', ()=> {
    let persistence: SettingsMemoryPersistence;
    let fixture: SettingsPersistenceFixture;
    
    setup((done) => {
        persistence = new SettingsMemoryPersistence();
        fixture = new SettingsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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