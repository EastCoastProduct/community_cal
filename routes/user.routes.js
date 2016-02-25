'use strict';

var mongoose = require('mongoose'),

	UserModel = require('../models/model.user'),
	users = require('../controllers/user.controller'),
	auth = require('../controllers/auth.controller'),

	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	path = require('path'),
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

	// app.get('/register', function (req, res) {
	// 		res.sendfile('views/register.html');
	// 	})
	// 	.post('/register', users.register);

	app.get('/login', function (req, res) {
		res.sendfile('views/login.html');
		})
		.post('/login', users.login);

	app.get('/logout', users.logout);

	//for multiple users
	// app.get('/users/:name', auth.ensureAuthenticated, users.findByName);
	// app.get('/user/:id', auth.ensureAuthenticated, users.getById);
};
