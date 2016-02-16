'use strict';

var userModel = require('../models/userModel');

var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	passport = require('passport');

var authRouter = express.Router();

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/events',
    failureRedirect: '/loginFailure',
    failureFlash: true
}));

//authRouter.route('/profile')
//	.get(function (req, res) {
//		res.json(req.user);
//	});

module.exports = authRouter;
