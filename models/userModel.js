'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var reMatch = /[a-zA-Z]/;

//custom size validation
var sizeValidator = [
	function(val) {
		return (val.length > 0 && val.length <= 50);
	},
	//a custom error message:
	'Too long!'	];

var userModel = new Schema({
	username: {
		type: String,
		required: true,
		validate: sizeValidator
	},
	password: {
		type: String,
		required: true,
		validate: sizeValidator
	},
	name: {
		first: {
			type: String,
			match: reMatch
		},
		last: {
			type: String,
			match: reMatch
		}
	},
	email: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

//alternative way
//userModel.path('name').required(true, 'Oops! Name is required!');

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
