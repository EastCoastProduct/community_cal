'use strict';

var users = require('../controllers/user.controller'),
	auth = require('../controllers/auth.controller'),
	events = require('../controllers/event.controller');

module.exports = function (app) {

	app.get('/events', events.list)
		.post('/events', auth.ensureAuthenticated, events.create);

	app.get('/events/:id', events.findById);

	app.put('/events/:id', auth.ensureAuthenticated, events.edit)
		.delete('/events/:id', auth.ensureAuthenticated, events.remove);

	// app.get('/event/:name', events.findByName);
};
