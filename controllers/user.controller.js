'use strict';

var mongoose = require('mongoose');

var UserModel = require('../models/model.user');

//register to add the first user:
// exports.register = function (req, res) {
// 	//console.log('registering: ' + req.body.name);
//
// 	UserModel.register (new UserModel ({
// 		username: req.body.username,
// 		password: req.body.password
// 	}),	req.body.name, function (err, user) {
// 		if (err) {
// 			return res.json(err);
// 		}
// 		else {
// 			req.login(user, function(err) {
// 				if (err) {return res.json(err);}
// 				return res.redirect('/users/' + user.username);
// 			});
// 		}
// 	});
// };

exports.login = function (req, res, done) {

	var authenticate = function(username, password, next) {
		//console.log('username: ' + username);

		UserModel.findOne({username: username, password: password}, function(err, user) {
			if (err) {return next(err);}
			if (!user) {
				return next(err, false);
			}
			// if (user.password !== password) {
			// 	return next(err, false);
			// }

			//console.log('user: ' + user);
			return next(null, user);

		});
	};

	authenticate(req.body.username, req.body.password, function (err, user) {
		if (err) {return done(err);}

		req.login(user, function(err) {
				if (err) {return res.json(err);}
				//console.log('req.user: ' + req.user);
				return res.redirect('/users/' + user.username);

			});
	});

};

//for multiple users:
// exports.findByName = function (req, res) {
// 	//console.log('name: ' + req.isAuthenticated());
//
// 	UserModel.findOne({name: req.body.name}, function (err, response) {
// 		if (err || !response) {
// 			return res.json({error: 'User not found'});
// 		}
// 		res.json({user: response});
// 	});
// };

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/events/');
};
