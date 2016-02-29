'use strict';

var EventModel = require('../models/model.event');
var users = require('../controllers/user.controller');

exports.create = function (req, res) {
	console.log(66, req.user);
	var event = new EventModel({
		title: req.body.title,
		description: req.body.description,
		userid: req.user._id
	});
	//console.log(event);

	event.save(function (err) {
		if (err) {return res.json(err);}

		res.json({success: true, event: event});
	});
};

exports.list = function (req, res) {
	//console.log('authenticated: ', req.isAuthenticated());
	var query = EventModel.find();

	query.sort({startDate: 'desc'})
		.exec(function (err, event) {
			if (err) {return res.json(err);}
			res.json({success: true, event: event});
		});
};


exports.findById = function (req, res) {

	EventModel.findOne({_id: req.params.id}, function (err, event) {
		if (err || !event) {return res.json({success: false, message: 'Event not found'});
	}
		res.json({success: true, event: event});
	});
};

exports.remove = function(req, res) {
	//console.log(req.params.id);

	EventModel.findById({_id: req.params.id}, function(err, event) {
		if (event.userid === req.user._id || req.user.role === 'admin') {
			event.remove(function (err) {
				if (err) {return res.json({error: err, success:false});}

				res.json({success: true, message: 'Event removed'});
				//res.redirect('/events');
				});
			}
			else {
				res.json({success: false, message: 'Not authorized'});
			}
	});
};

exports.edit = function (req, res) {

	EventModel.findOne({_id: req.params.id}, function(err, event) {
		if (err) {return res.json({error: err});}

		if (event.userid === req.user._id || req.user.role === 'admin') {
			for (var prop in req.body) {
				event[prop] = req.body[prop];
			}
			event.save(function (err) {if (err) {return res.json({error: err});}});
			res.json({success: true, message: 'Updated the Event', event: event});
		}
	});
};

exports.findByName = function (req, res) {
	EventModel.findById({name: req.params.name}, function (err, event) {
			if (err || !event) {res.json({message: 'Event not found'});
			}
			res.json({success: true, event: event});
		});
};
