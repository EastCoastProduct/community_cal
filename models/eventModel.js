'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var now = new Date();

var eventModel = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	//start_date: {type: Date, default: Date.now}
	//end_date: {type: Date, default: now.setHours(now.getHours() + 1);}
	createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Event', eventModel);
