let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';

import { SettingsSectionV1 } from '../../src/data/version1/SettingsSectionV1';
import { ISettingsPersistence } from '../../src/persistence/ISettingsPersistence';

export class SettingsPersistenceFixture {
    private _persistence: ISettingsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public testGetAndSet(done) {
        async.series([
            (callback) => {
                this._persistence.set(
                    null,
                    new SettingsSectionV1(
                        'test.1',
                        ConfigParams.fromTuples(
                            'key1', 'value11',
                            'key2', 'value12'
                        )
                    ),
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('value11', settings.parameters.getAsString('key1'));

                        callback();
                    }
                );
            },
            (callback) => {
                this._persistence.set(
                    null,
                    new SettingsSectionV1(
                        'test.2',
                        ConfigParams.fromTuples(
                            'key1', 'value21',
                            'key2', 'value22'
                        )
                    ),
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.2', settings.id);
                        assert.equal('value21', settings.parameters.getAsString('key1'));

                        callback();
                    }
                );
            },
            (callback) => {
                this._persistence.getOneById(
                    null,
                    'test.1',
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('value11', settings.parameters.getAsString('key1'));

                        callback();
                    }
                );
            },
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'id_starts', 'test'
                    ),
                    null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done)
    }    

    public testSetParameter(done) {
        async.series([
            (callback) => {
                this._persistence.modify(
                    null, 
                    'test.1', 
                    ConfigParams.fromTuples('key1', 'value11a'), 
                    null,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('value11a', settings.parameters.getAsString('key1'));

                        callback();
                    }
                )
            },
            (callback) => {
                this._persistence.modify(
                    null, 
                    'test.1', 
                    ConfigParams.fromTuples('key1', 'value11b'),
                    null, 
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('value11b', settings.parameters.getAsString('key1'));

                        callback();
                    }
                )
            },
            (callback) => {
                this._persistence.getOneById(
                    null,
                    'test.1',
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('value11b', settings.parameters.getAsString('key1'));

                        callback();
                    }
                );
            }
        ], done);
    }

    public testIncrementParameter(done) {
        async.series([
            (callback) => {
                this._persistence.modify(
                    null, 
                    'test.1', 
                    null,
                    ConfigParams.fromTuples('key1', 1), 
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('1', settings.parameters.getAsString('key1'));

                        callback();
                    }
                )
            },
            (callback) => {
                this._persistence.modify(
                    null, 
                    'test.1', 
                    null,
                    ConfigParams.fromTuples('key1', 2),
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('3', settings.parameters.getAsString('key1'));

                        callback();
                    }
                )
            },
            (callback) => {
                this._persistence.getOneById(
                    null,
                    'test.1',
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal('test.1', settings.id);
                        assert.equal('3', settings.parameters.getAsString('key1'));

                        callback();
                    }
                );
            }
        ], done);
    }

}
