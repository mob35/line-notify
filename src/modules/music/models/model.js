'use strict';

var Model = "Music";
exports.model = Model;
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    detail: {
        type: String
    },
    artist: {
        type: String,
        required: 'Artist is required'
    },
    album: {
        type: String
    },
    image: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
});

mongoose.model(Model, ModelSchema);