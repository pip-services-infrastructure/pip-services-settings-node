import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let SettingsMongoDbSchema = function(collection?: string) {
    collection = collection || 'settings';

    let schema = new Schema(
        {
            _id: { type: String },
            update_time: { type: Date, required: true, 'default': Date.now },
            parameters: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.party_id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
