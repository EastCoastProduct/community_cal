'use strict';

var mongoose = require('mongoose'),
	path = require('path');

var users = require('../controllers/user.controller'),
	User = require('../models/model.user'),
	EventModel = require('../models/model.event');

exports.registrationForm = function (req, res) {
	res.sendFile('register.html', {root: path.join (__dirname, '../public')}, function (err) {
		if (err) {res.json ({error: err});}
	});
};

exports.register = function (req, res) {
	//console.dir(req.body);
	User.register(new User({
		username: req.body.username,
	}), req.body.password, function (err, user) {
		//console.dir(user);
		if (err) {return res.json({error: err});}
		// else {
		// 	req.login(user, function(err) {
		// 		if (err) {return res.json(err);}
		// 		return res.status(200).json({user: user});
		// 	});
		// }
		User.authenticate('local')(req, res, function () {
			return res.json({user: user});
		});
	});
};

exports.login = function (req, res, next) {

	User.authenticate('local')(req.body.username, req.body.password, function (err, user, options) {
		//console.log(1234, user);
		if (err) {return next(err);}
		if (user === false) {res.json({message: options.message,});}
		else {
			return res.json({user: user});
		}
	});
};

exports.loginForm = function (req, res) {
	res.sendFile('login.html', {root: path.join (__dirname, '../public')}, function (err) {
		if (err) {res.status(400).json({error: err});}
	});
};

exports.logout = function (req, res) {
	req.logout();
	res.json({message: 'Logging out...'});
};

exports.findUserById = function (req, res) {
	//console.log(555, req.params.id);
	User.findOne({_id: req.params.id}, function (err, user) {
		if (err) {return res.status(400).json({error: err});}
		if (!user) {return res.status(404).json({error: err});}

		return res.status(200).json({user: user});
	});
};

exports.getEventsByUserId = function (req, res) {
	//console.log(33, req.params.userid);
	EventModel.find({userid: req.params.userid}, function(err, event) {
		if (err) {return res.status(400).json({error: err});}
		return res.status(200).json({event: event});
	});
};
