'use strict';

module.exports = function (app) {
	var users = require('../controllers/user.controller');
	var events = require('../controllers/event.controller');
	//var EventModel = require('../models/model.event');

	app.route('/event').post(events.create).get(events.list);
	app.route('/event/:name').get(events.findByName);

	app.route('/event/:id').get(users.getLogin, events.findById);
	app.route('/event/:id').put(users.getLogin, events.edit);
	app.route('/event/:id').delete(users.getLogin, events.remove);
};
