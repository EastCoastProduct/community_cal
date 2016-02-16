'user strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

// load the user model
var User = require('../models/userModel');

var authStrategy = new LocalStrategy({
	function(email, password, done) {
		User.authenticate(email, password, function(err, user){
			// Any kind of message
			done(err, user, err ? { message: err.message } : null);
		});
	}
});

var authSerializer = function(user, done) {
	done(null, user);
};

var authDeserializer = function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
};

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);
