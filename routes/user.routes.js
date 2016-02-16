'use strict';

var User = require('../models/model.user');

var users = require('../controllers/user.controller'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session');


module.exports = function (app) {

	//initialize passport
	passport.use(new LocalStrategy(User.authenticate()));

	// use static serialize and deserialize of model for passport session support
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.use(cookieParser());
	app.use(session({
		secret: 'comcal',
		saveUninitialized: true,
		resave: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	//routes
	app.route('/register').post(users.register);
	app.route('/login').post(users.login);
	app.route('/login').get(users.getlogin);
	app.route('/:id').get(users.get);

};
