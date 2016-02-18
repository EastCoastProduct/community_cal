'use strict';

var User = require('../models/model.user');

var mongoose = require('mongoose');

exports.register = function (req, res) {
	console.log('registering: ' + req.body.firstname);

	User.register(new User({
		email: req.body.email,
		firstname: req.body.firstname,
		password: req.body.password
		}), function (err, user) {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		else
		{
			res.send({user: user});
		}
	});
};

exports.login = function (req, res, next) {
	req.body.email = req.body.email.toLowerCase();

	User.authenticate()(req.body.email, req.body.password, function (err, user, options) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.send({message: options.message});
		}
		if (!user.authenticate(req.body.password)) {
			res.send({message: options.message});
		}
		else
		{
			req.login(user, function (err) {
				res.send({user: user});
			});
		}
	});
};

exports.getLogin = function (req, res) {
	console.log(req.user);
	if (req.user) {
		return res.send({user: req.user});
	}
	res.send({message: 'not authorized'});
};

exports.findByName = function (req, res) {
	User.findOne({
		name: req.params.name
		}, function (err, response) {
			if (err || !response) {
				res.status(404).send({message: 'User not found'});
			}
			else {
				res.send({user: response});
			}
		});
};

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/');
};
