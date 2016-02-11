var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exportrs = function() {
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passoprdField: 'password'
	},
	function(username, password, done) {
		var user = {
			username: username,
			password: password
		};
		done(null, user);
	}));
};
