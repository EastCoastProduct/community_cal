'use strict';

var mongoose = require('mongoose'),
	path = require('path');

var UserModel = require('../models/model.user'),
	users = require('../controllers/user.controller'),
	EventModel = require('../models/model.event');

exports.register = function (req, res) {
	//console.dir(req.body);

	UserModel.register (new UserModel ({
		username: req.body.username,
		password: req.body.password
	}), req.body.name, function (err, user) {
		//console.dir(user);
		if (err) {return res.json({error: err});}
		else {
			req.login(user, function(err) {
				if (err) {return res.json(err);}
				return res.status(201).json({user: user});
				//console.log(2, 'user: ' + user);
			});
		}


		});
};

exports.registrationForm = function (req, res) {
	res.sendFile('register.html', {root: path.join (__dirname, '../views')}, function (err) {
		if (err) {res.json ({error: err});}
	});
};

exports.login = function (req, res, done) {

	var authenticate = function(username, password, next) {
		//console.log('username: ' + username);

		UserModel.findOne({username: username, password: password}, function(err, user) {
			console.log(5555555555, 'username: ' + username);
			if (err) {return res.status(400).json({error: err});}
			if (!user) {return next({error: err});}
			if (user.password !== password) {return next(err, false);}

			//console.log('user: ' + user);
			return next(null, user);
		});
	};

	authenticate(req.body.username, req.body.password, function (err, user, done) {
		if (err) {return res.status(401).json({error: err});}

		req.login(user, function(err) {
			//console.log('user: ' + user);
			if (err) {return res.status(400).json({error: err});}
			//console.log('Authenticated: ' + req.isAuthenticated())
			return res.status(200).json({user: user});

		});
	});
};

exports.loginForm = function (req, res) {
	res.sendFile('login.html', {root: path.join (__dirname, '../views')}, function (err) {
		if (err) {res.status(400).json({error: err});}
	});
};

// exports.findByUsername = function (req, res) {
// 	//console.log('name: ' + req.isAuthenticated());
//
// 	UserModel.findOne({username: req.params.username}, function (err, user) {
// 		if (err) {return res.status(400).json({error: err});}
// 		if (!user) {return res.status(404).json({error: err});}
//
// 		res.status(200).json({user: user});
// 	});
// };

exports.logout = function (req, res) {
	req.logout();
	res.json({message: 'Logging out...'});
};

exports.findUserById = function (req, res) {
	//console.log(555, req.params.id);

	UserModel.findOne({_id: req.params.id}, function (err, user) {
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
