'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventModel = new Schema({
	title: {type: String},
	description: {type: String},
	//date: {type: Date, required: true}
});

module.exports = mongoose.model('Event', eventModel);
