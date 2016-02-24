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
			req.login(user, function(err) {
				if (err) {return res.json(err);}
				return res.redirect('/users/' + user.username);
			});
		}
	});
};


exports.login = function (req, res, done) {

	var authenticate = function(username, password, next) {
		console.log('username: ' + username);

		UserModel.findOne({username: username, password: password}, function(err, user) {
			if (err) {return next(err);}
			if (!user) {
				return next(err, false);
			}
			if (user.password !== password) {
				return next(err, false);
			}

			console.log('user: ' + user);
			return next(null, user);

		});
	};

	authenticate(req.body.username, req.body.password, function (err, user, options) {
		if (err) {return done(err);}


		req.login(user, function(err) {
				if (err) {return res.json(err);}
				//console.log(2, 'req.user: ' + req.user);
				return res.redirect('/users/' + user.username);

			});
	});

};

exports.getLogin = function (req, res, next) {

	res.sendfile('views/login.html');

};

exports.findByName = function (req, res) {
	//console.log(66, 'name: ' + req.isAuthenticated());

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
	res.redirect('/login');
};
