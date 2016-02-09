'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userModel = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
	name: {
		first: String,
		last: String
	},
    email: {type: String, required: true},
	createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userModel);
