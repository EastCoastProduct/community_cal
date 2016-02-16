'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	validate = require('mongoose-validator');


//custom size validation
var namesValidator = [
	validate({
		validator: 'isLength',
		arguments: [3,50],
		message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
	}),
	validate({
		validator: 'isAlphanumeric',
		//passIfEmpty: true,
		message: 'Name should contain alpha-numeric characters only'
  })
];

var emailValidator = [
	validate({
		validator: 'isEmail',
		//passIfEmpty: true,
		message: 'Enter a valid e-mail address'
	})
];

var UserSchema = new Schema ({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: emailValidator
	},
	password: {
		type: String,
		required: true
	},
	name: {
		first: {
			type: String,
			validate: namesValidator
		}
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

//alternative way of handling errors
//userModel.path('name').required(true, 'Oops! Name is required!');

module.exports = mongoose.model('User', UserSchema, 'collection');
