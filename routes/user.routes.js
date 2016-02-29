'use strict';

var mongoose = require('mongoose'),

	UserModel = require('../models/model.user'),
	users = require('../controllers/user.controller'),
	auth = require('../controllers/auth.controller'),

	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	flash = require('connect-flash');



module.exports = function (app, passport) {


	//passport.use(new LocalStrategy(UserModel.authenticate()));
	passport.use(UserModel.createStrategy()); //first this

	//static serialize and deserialize of model for passport session support
	passport.serializeUser(UserModel.serializeUser());
	passport.deserializeUser(UserModel.deserializeUser());

	app.use(cookieParser());
	app.use(session({
		secret: 'comcal',
		saveUninitialized: true,
		resave: true
	}));

	//initialize passport
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	//routes

	app.get('/register', users.registrationForm)
		.post('/register', users.register);

	app.get('/login', users.loginForm)
		.post('/login', users.login);

	app.get('/logout', users.logout);

	app.get('/users/:id', users.findUserById);
	//app.get('/users/:username', users.findByUsername);

	app.get('/users/events', users.getEventsByUserId);
};
