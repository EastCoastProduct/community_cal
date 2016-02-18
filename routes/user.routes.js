'use strict';

var mongoose = require('mongoose'),
	UserModel = require('../models/model.user'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session');


module.exports = function (app) {
	//console.log(1, app);
	var	users = require('../controllers/user.controller');

	//initialize passport
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(UserModel.authenticate()));//here I get an error 'not a function?!'
	//passport.use(UserModel.createStrategy()); //alternative

	//static serialize and deserialize of model for passport session support
	passport.serializeUser(UserModel.serializeUser());
	passport.deserializeUser(UserModel.deserializeUser());

	app.use(cookieParser());
	app.use(session({
		secret: 'comcal',
		saveUninitialized: true,
		resave: true
	}));

	//routes
	app.route('/register').post(users.register);
	app.route('/login').post(users.login).get(users.getLogin);
	app.route('/user/:name').get(users.findByName);
	app.route('/logout').get(users.logout);
	//app.route('/user/:id').get(users.getById);

};
