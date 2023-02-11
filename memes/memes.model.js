const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

MemeSchema = new Schema({
    meme_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    season: {
        type: Number,
        index: true,
        required: true
    },
    episode: {
        type: Number,
        required: true
    },
    characters: {
        type: Array,
        "default": []
    },
    meme_img_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

MemeSchema.methods.toJSON = function() {
    return _.omit(this.toObject(), ['_id', '__v']);
};

module.exports = mongoose.model('Meme', MemeSchema);
