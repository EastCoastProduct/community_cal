'use strict';

var events = require('../controllers/event.controller');

module.exports = function (app) {

	app.route('/event').post(events.create);
	app.route('/event').get(events.list);

	app.route('/event/:id').get(events.findById);
	app.route('/event/:id').put(events.edit);
	app.route('/event/:id').delete(events.remove);
	app.route('/event/:name').get(events.findByName);
};
