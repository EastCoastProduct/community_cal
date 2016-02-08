'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userModel = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('User', userModel);
