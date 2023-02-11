const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
});

UsersSchema.methods.toJSON = function() {
    return _.omit(this.toObject(), ['_id', '__v']);
};

module.exports = mongoose.model('Users', UsersSchema);
