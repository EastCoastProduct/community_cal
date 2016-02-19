'use strict';

var mongoose = require('mongoose');

var User = require('../models/model.user');

exports.register = function (req, res) {
	//console.log('registering: ' + req.body.name);

	User.register (new User ({
		username: req.body.username,
		password: req.body.password
	}),	req.body.name, function (err, user) {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		else {
			res.send({user: user});
		}
		//immediately log in the registered user
		user.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
};

exports.login = function (req, res) {
	//console.log('username: ' + req.body.username);
	//console.log('password: ' + req.body.password);

	User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
		if (err) {
			res.send(err);
		}
		if (!user) {
			res.send({
				message: options.message
			});
		}
		else {
			req.login(user, function (err) {
				res.send({
					user: user
				});
			});
		//return res.redirect('/');
		}
	});
};

exports.getLogin = function (req, res) {
	console.log(req.user);

	if (req.user) {
		return res.send({
			user: req.user
		});
	}
	res.send({
		message: 'Not authorized. Please, log in to see this page.'
	});
};

exports.findByName = function (req, res) {
	console.log('name: ' + req.body.name);
	User.findOne({
		name: req.body.name
		}, function (err, response) {
			if (err || !response) {
				res.send({
					//status: 401,
					message: 'User not found'
				});
			}
			else {
				res.send({
					user: response
				});
			}
		});
};

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/');
};
