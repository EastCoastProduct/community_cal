'use strict';

var UserModel = require('../models/userModel');

var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var	userRouter = express.Router();

userRouter.route('/users')
	.get(function (req, res) {
		UserModel.find(function (err, user) {
			if (err) {
				return res.status(500).send(err);
			}
			res.json(user);
		});
	})

	.post(function (req, res) {
		var user = new UserModel(req.body);

		user.save(function (err) {
			if (err) {
				return res.send(err);
			}
			res.status(201).send(user);
		});
});

userRouter.use('/:id', function(req, res, next) {
	UserModel.findById(req.params.id, function(err, user) {
		if (err) {
			res.status(500).send(err);
		}
		else if (user) {
			req.user = user;
			next();
		}
		else {
			res.status(404).send('No User Found');
		}
	});
});

userRouter.route('/:id')
	.get(function(req, res) {
		res.json(req.user);
	})

	.put(function(req, res) {
			req.user.title = req.body.title;
			req.user.description = req.body.description;
			req.user.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
				else {
					res.json(req.user);
				}
			});
		})

	.delete(function(req, res) {
		req.user.remove(function(err) {
			if (err) {
				return res.status(500).send(err);
			}
				res.status(204).send('Removed the User');
		});
	});

module.exports = userRouter;
