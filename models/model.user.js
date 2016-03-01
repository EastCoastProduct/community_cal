'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	validate = require('mongoose-validator');

//custom size validation
var namesValidator = [
	validate({
		validator: 'isLength',
		arguments: [3,45],
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
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: emailValidator
	},
	password: {
		type: String,
		min: 6,
		required: true
	},
	name: {
		type: String,
		validate: namesValidator
	},
	role: {
		type: String,
		default: 'user'
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

//encrypting passwords
// UserSchema.pre('save', function(next) {
// 	if (!this.isModified('password')) {
// 		return next();
// 	}
// 	this.password = UserSchema.encryptPassword(this.password);
// 	next();
// });


//alternative way of handling errors
//userModel.path('name').required(true, 'Oops! Name is required!');
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema, 'users');
