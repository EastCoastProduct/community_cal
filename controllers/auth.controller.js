'use strict';

var UserModel = require('../models/model.user');

//Check if a user is authenticated or not
exports.ensureAuthenticated = function (req, res, next) {

	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({message: 'Unauthorized'});
};
