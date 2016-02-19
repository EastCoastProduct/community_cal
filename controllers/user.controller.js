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
			console.log('err' + err);
			return res.send(err);
		}
		else {
			res.send({user: user});
		}
		//immediately log in the registered user
		//user.authenticate()(req.body.username, req.body.password, function () {
			//res.redirect('/login');
		//});
	});
};

exports.login = function (req, res) {
	//console.log('username: ' + req.body.username);
	//console.log('password: ' + req.body.password);
	var username = req.body.username;
	var password = req.body.password;

	User.authenticate()(username, password, function (err) {
		if (err) {
			res.send(err);
		}
		if (!username || !password) {
			res.send({
				message: 'Incorrect password or username'
			});
		}
		else {
			req.login(username, function (err) {
				res.send({
					user: username
				});
			});
		//return res.redirect('/user');
		}
	});
};

exports.getLogin = function (req, res) {

	if (req.user) {
		//console.log('req.user: ' + req.user);
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
	//res.redirect('/');
};
