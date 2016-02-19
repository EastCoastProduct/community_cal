'use strict';

var mongoose = require('mongoose');

var User = require('../models/model.user');

// exports.register = function (req, res) {
// 	//console.log('registering: ' + req.body.name);
//
// 	User.register (new User ({
// 		username: req.body.username,
// 		password: req.body.password
// 	}),	req.body.name, function (err, user) {
// 		if (err) {
// 			console.log('err' + err);
// 			return res.send(err);
// 		}
// 		else {
// 			res.send({user: user});
// 		}
// 	});
// };

exports.login = function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.authenticate()(username, password, function (err, options) {
		if (err) {return res.status(500).json({error: err});}

		if (!username || !password) {return res.json({message: options.message});}

		req.login(username, function (err) {
			if (err) {return res.status(200).json({messsage: username + ' logged in'});}
		});
	});
};

exports.getLogin = function (req, res) {
	console.log('req.user ' + req.User);

	if (req.user) {
		//console.log('req.user: ' + req.user);
		return res.json({user: req.user});
	}
	res.json({message: 'Not authorized. Please, log in to see this page.'});
};


exports.findByName = function (req, res) {
	console.log('name: ' + req.body.name);

	User.findOne({
		name: req.body.name
		}, function (err, response) {
			if (err || !response) {
				return res.status(401).json({error: 'User not found'});
			}
			res.send({user: response});
		});
};

exports.logout = function (req, res) {
	req.logout();
	res.send('Logged out!');
};
