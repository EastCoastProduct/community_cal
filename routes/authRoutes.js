'use strict';

var UserModel = require('../models/userModel');

var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var authRouter = express.Router();

authRouter.route('/signUp')
	.post(function (req, res) {
		req.login(req.body, function() {
			res.redirect('/auth/profile');
		});
	});


authRouter.route('/profile')
	.get(function (req, res) {
		res.json(req.user);
	});

module.exports = authRouter;
