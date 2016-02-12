'user strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passport = require('passport'),
	LocalStrategy = require('passport-local');

var User = require('../models/userModel');

var authStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    User.authenticate(email, password, function(error, user){
        // You can write any kind of message you'd like.
        // The message will be displayed on the next page the user visits.
        // We're currently not displaying any success message for logging in.
        done(error, user, error ? { message: error.message } : null);
    });
});

var authSerializer = function(user, done) {
    done(null, user.id);
};

var authDeserializer = function(id, done) {
    User.findById(id, function(error, user) {
        done(error, user);
    });
};

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);
