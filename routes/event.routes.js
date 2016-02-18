'use strict';

module.exports = function (app) {

	var events = require('../controllers/event.controller');
	var EventModel = require('../models/model.event');

	app.route('/event').post(events.create).get(events.list);

	app.route('/event/:id').get(events.findById).put(events.edit).delete(events.remove);
	app.route('/event/:name').get(events.findByName);
};
