'use strict';

var mongoose = require('mongoose');
var User = require('../models/model.user');

exports.register = function (req, res) {
	console.log('registering: ' + req.body.name);

	User.register (new User ({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name
	}), function (err, user) {
		if (err) {
			//console.log(err);
			return res.send(err);
		}
		user.authenticate('local')(req, res, function () {
			console.log('User ' + user + 'registered successfully!');
			res.redirect('/');
		});
		});

};

exports.login = function (req, res, next) {
	//console.log(req.body.email);

	User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.send({
				message: options.message
			});
		}
		if (!user.authenticate(req.body.password)) {
			res.send({
				message: options.message
			});
		}
		else {
			req.login(user, function (err) {
					req.send({
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
		message: 'not authorized'
	});
};

exports.findByName = function (req, res) {
	User.findOne({
		name: req.params.name
		}, function (err, response) {
			if (err || !response) {
				res.status(404).send({
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
