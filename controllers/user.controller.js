'use strict';

var User = require('../models/model.user');

var mongoose = require('mongoose');

exports.register = function (req, res) {
	console.log('registering: ' + req.body.firstName);

	User.register(new User({
		email: req.body.email,
		firstname: req.body.firstname
		}),
		req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		else
		{
			res.send({
				success: true,
				user: user
			});
		}
	});
};

exports.login = function (req, res, next) {
	User.authenticate()(req.body.email, req.body.password, function (err, user, options) {
		if (err) {
			return next(err);
		}
		if (user === false) {
			res.send({
				message: options.message,
				success: false
			});
		}
		else
		{
			req.login(user, function (err) {
				res.send({
					success: true,
					user: user
				});
			});
		}
	});
};

exports.getLogin = function (req, res) {
	console.log(req.user);
	if (req.user) {
		return res.send({
			success: true,
			user: req.user
		});
	}
	res.send({
		success: false,
		message: 'not authorized'
	});
};
