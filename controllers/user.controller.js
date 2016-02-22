'use strict';

var mongoose = require('mongoose');

var UserModel = require('../models/model.user');

exports.register = function (req, res) {
	//console.log('registering: ' + req.body.name);

	UserModel.register (new UserModel ({
		username: req.body.username,
		password: req.body.password
	}),	req.body.name, function (err, user) {
		if (err) {
			return res.json(err);
		}
		else {
			res.json({user: user});
		}
	});
};

exports.login = function (req, res, next) {

	UserModel.authenticate()(req.body.username, req.body.password, function (err, user, options) {

		if (err) {return res.json(err);}

		console.log('user: ' + user);//false?!

		if (user === false) {
			res.json( {
				message: options.message,
				successful: false
			});
		}
		else {
			req.login(user, function (err) {
				res.json( {
					user: user,
					successful: true
				});
			});
		}
	});
};

exports.getLogin = function (req, res) {
	console.log('req.user: ' + req.user);

	if (req.user) {
		return res.send({successful: true, user: req.user});
	}

	res.json({success: false, message: 'Not authorized. Please, log in to see this page.'});
	res.redirect('/login');
};




exports.findByName = function (req, res) {
	console.log('name: ' + req.body.name);

	UserModel.findOne({
		name: req.body.name
		}, function (err, response) {
			if (err || !response) {
				return res.status(401).json({error: 'User not found'});
			}
			res.json({user: response});
		});
};

exports.logout = function (req, res) {
	req.logout();
	res.json('Logged out!');
};
