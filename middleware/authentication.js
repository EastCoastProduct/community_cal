'use strict';

//Check if a user is authenticated or not
exports.ensureAuthenticated =	function (req, res, next) {

	if (req.isAuthenticated()) {
		return next();
	}

	res.json({ message: 'Not authorized. Please, log in to see this page.' });
};
