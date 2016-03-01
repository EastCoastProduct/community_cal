'use strict';

var EventModel = require('../models/model.event');
var UserModel = require('../models/model.user');

exports.create = function (req, res) {
	var event = new EventModel({
		title: req.body.title,
		description: req.body.description,
		userid: req.user._id
	});
	//console.log(event);
	event.save(function (err) {
		if (err) {return res.status(400).json(err);}

		res.status(200).json({event: event});
	});
};

exports.list = function (req, res) {
	//console.log('authenticated: ', req.isAuthenticated());
	var query = EventModel.find();

	query.sort({startDate: 'desc'})
		.exec(function (err, event) {
			if (err) {return res.status(400).json(err);}
			res.status(200).json({success: true, event: event});
		});
};


exports.findById = function (req, res) {

	EventModel.findOne({_id: req.params.id}, function (err, event) {
		if (err) {return res.status(400).json({error: err});}
		if (!event) {return res.status(404).json({message: 'Event not found'});
	}
		res.status(200).json({event: event});
	});
};

exports.remove = function(req, res) {

	EventModel.findById({_id: req.params.id}, function(err, event) {

		if (event.userid === req.user._id || req.user.role === 'admin') {
			event.remove(function (err) {
				if (err) {return res.status(400).json({error: err});}
				res.status(204).json({message: 'Event removed'});
			});
		}
		else {
			res.status(401).json({message: 'Unauthorized'});
		}
	});
};

exports.edit = function (req, res) {

	EventModel.findOne({_id: req.params.id}, function(err, event) {
		if (err) {return res.status(400).json({error: err});}

		if (event.userid === req.user._id || req.user.role === 'admin') {
			for (var prop in req.body) {
				event[prop] = req.body[prop];
			}
			event.save(function (err) {
				if (err) {return res.status(400).json({error: err});}
			});
			res.status(200).json({message: 'Updated the Event', event: event});
		}
		else {
			res.status(401).json({message: 'Unauthorized'});
		}
	});
};

exports.findEventByName = function (req, res) {

	EventModel.findOne({title: req.params.title}, function (err, event) {
			if (err || !event) {res.json({message: 'Event not found'});
			}
			res.json({success: true, event: event});
		});
};
