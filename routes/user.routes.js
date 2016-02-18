'use strict';

var User = require('../models/model.user');

var users = require('../controllers/user.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session');


module.exports = function (app) {

	//initialize passport
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(User.authenticate()));//here I get an error 'not a function?!'
	//passport.use(User.createStrategy()); //alternative

	//static serialize and deserialize of model for passport session support
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.use(cookieParser());
	app.use(session({
		secret: 'comcal',
		saveUninitialized: true,
		resave: true
	}));

	//routes
	app.route('/register').post(users.register);
	app.route('/login').post(users.login).get(users.getlogin);
	app.route('/user/:name').get(users.findByName);
	app.route('/logout').get(users.logout);
	//app.route('/:id').get(users.getById);
	//app.route('/:name').get(users.findByName);

};
