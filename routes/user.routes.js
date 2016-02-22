'use strict';

var mongoose = require('mongoose'),

	UserModel = require('../models/model.user'),
	users = require('../controllers/user.controller'),

	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session');


module.exports = function (app) {

	//initialize passport
	app.use(passport.initialize());
	app.use(passport.session());

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

	//routes

	app.route('/register')
		.get(function (req, res) {
			res.sendfile('views/register.html');
		})
		.post(users.register);

	app.route('/login')
		.get(function (req, res) {
			res.sendfile('views/login.html');
		})
		.post(users.login);
	//app.route('/login').get(users.getLogin);
	app.route('/user/:name')
		.get(users.findByName);
	app.route('/logout')
		.get(users.logout);
	//app.route('/user/:id').get(users.getById);

};
