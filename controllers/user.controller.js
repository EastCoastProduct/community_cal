'use strict';

var mongoose = require('mongoose'),
	path = require('path');

var UserModel = require('../models/model.user'),
	EventModel = require('../models/model.event');

exports.register = function (req, res) {
	//console.log('registering: ' + req.body.name);

	UserModel.register (new UserModel ({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name
	}), function (err, user) {
		if (err) {return res.status(400).json({error: err});}
		else {
			res.status(201).json(user);
			req.login(user, function(err) {
				if (err) {return res.status(400).json({error: err});}
				return res.status(200).json({user: user});
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
			if (err) {return res.json({error: err});}
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
// 		if (err) {return res.json({error: err});}
// 		if (!user) {return res.status(404).json({error: err});}
//
// 		res.status(200).json({user: user});
// 	});
// };

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/events/');
};

exports.findUserById = function (req, res) {
	//console.log(555, req.params.id);

	UserModel.findOne({_id: req.params.id}, function (err, user) {
		if (err) {return res.status(400).json({error: err});}
		if (!user) {return res.status(404).json({error: err});}

		res.status(200).json({user: user});
	});
};


exports.getEventsByUserId = function (req, res) {

	EventModel.findByUserId({userid: req.user._id}, function(err, event) {

		if (err) {return res.status(400).json({error: err});}

		res.status(200).json({event: event});
				//res.redirect('/events');
		});
};
