'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	Hash = require('password-hash'),
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
		//passIfEmpty: true
		message: 'Enter a valid e-mail address'
	})
];

var userModel = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: emailValidator
	},
	password: {
		type: String,
		required: true,
		set: function(newValue) {
			//hasing the password
			return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
		}
	},
	name: {
		first: {
			type: String,
			validate: namesValidator,
		},
		last: {
			type: String,
			validate: namesValidator,
		}
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

//alternative way
//userModel.path('name').required(true, 'Oops! Name is required!');

userModel.statics.authenticate = function(email, password, callback) {
	this.findOne({ email: email }, function(error, user) {
		if (user && Hash.verify(password, user.password)) {
			callback(null, user);
		} else if (user || !error) {
		// Email or password is invalid (no mongodb error)
		error = new Error('Email address or password is invalid. Please try again.');
			callback(error, null);
		}
		else {
		// Something bad happened with mongodb
			callback(error, null);
		}
	});
};

module.exports = mongoose.model('User', userModel, 'collection');
