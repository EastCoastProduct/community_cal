'use strict';

var mongoose = require('mongoose'),
	path = require('path');

var UserModel = require('../models/model.user');

exports.register = function (req, res) {
	//console.log('registering: ' + req.body.name);

	UserModel.register (new UserModel ({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name
	}), function (err, user) {
		if (err) {return res.json(err);}
		else {
			console.log(22, req.body.name);
			req.login(user, function(err) {
				if (err) {return res.json(err);}
				return res.redirect('/events');
			});
		}
	});
};

exports.registrationForm = function (req, res) {
	res.sendFile('register.html', {root: path.join (__dirname, '../views')}, function (err) {
		if (err) {res.json (err);}
	});
};

exports.login = function (req, res, done) {

	var authenticate = function(username, password, next) {
		//console.log('username: ' + username);

		UserModel.findOne({username: username, password: password}, function(err, user) {
			if (err) {return next(err);}
			if (!user) {return next(err, false);}
			if (user.password !== password) {return next(err, false);}

			//console.log('user: ' + user);
			return next(null, user);

		});
	};

	authenticate(req.body.username, req.body.password, function (err, user, done) {
		if (err) {return done(err);}

		req.login(user, function(err) {
			//console.log('req.user: ' + req.user);
			if (err) {return res.json(err);}
			//console.log('Authenticated: ' + req.isAuthenticated())
			//console.log(33, user);

			return res.redirect('/events/');

		});
	});
};

exports.loginForm = function (req, res) {
	res.sendFile('login.html', {root: path.join (__dirname, '../views')}, function (err) {
		if (err) {res.json (err);}
	});
};

exports.findByName = function (req, res) {
	//console.log('name: ' + req.isAuthenticated());

	UserModel.findOne({username: req.body.username}, function (err, user) {
		if (err || !user) {return res.json({error: 'User not found'});}

		res.json({user: user});
	});
};

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/events/');
};
