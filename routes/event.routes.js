'use strict';

var users = require('../controllers/user.controller'),
	auth = require('../middleware/authentication'),
	events = require('../controllers/event.controller');

module.exports = function (app) {

	app.post('/events', events.create);
	app.get('/events', events.list);

	// app.get('/event/:name', events.findByName);

	app.get('/events/:id', events.findById);
	app.put('/events/:id', events.edit);

	app.delete('/events/:id', auth.ensureAuthenticated, events.remove);

};
