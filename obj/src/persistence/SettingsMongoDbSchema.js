"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.SettingsMongoDbSchema = function (collection) {
    collection = collection || 'settings';
    let schema = new mongoose_1.Schema({
        _id: { type: String },
        update_time: { type: Date, required: true, 'default': Date.now },
        parameters: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.party_id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=SettingsMongoDbSchema.js.map