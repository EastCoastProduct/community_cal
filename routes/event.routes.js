'use strict';

module.exports = function (app) {
	var users = require('../controllers/user.controller');
	var events = require('../controllers/event.controller');
	//var EventModel = require('../models/model.event');

	app.route('/event').post(events.create).get(events.list);

	app.route('/event/:id').get(events.findById).put(events.edit);
	app.route('/event/:id').delete(events.remove);
	app.route('/event/:name').get(events.findByName);
};
