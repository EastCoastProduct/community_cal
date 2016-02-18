'use strict';

var events = require('../controllers/event.controller');

module.exports = function (app) {

	app.route('/event').post(events.create).get(events.list);

	app.route('/event/:id').get(events.findById).put(events.edit).delete(events.remove);
	app.route('/event/:name').get(events.findByName);
};
