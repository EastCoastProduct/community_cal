'use strict';

var EventModel = require('../models/model.event');

exports.create = function (req, res) {
	var event = new EventModel(req.body);
	console.log(event);

	event.save(function (err) {
		if (err) {
			return res.send(err);
		}
		else {
			res.status(201).send({event: event});
		}
	});
};

exports.list = function (req, res) {
	EventModel.find(function (err, data) {
		if (err) {
			return res.send(err);
		}
		res.json({event: data});
	});
};


exports.findById = function (req, res) {
	EventModel.findOne({
		_id: req.params.id
	}, function (err, response) {
		if (err || !response) {
			res.status(404).send({message: 'Event not found'});
		}
		else {
			res.send({event: response});
		}
	});
};

exports.remove = function(req, res) {
	console.log(req.params.id);

	EventModel.findOne({
		_id: req.params.id
	}, function(err, event) {
		if (err) {
			return res.send(err);
		}
		else {
			event.remove();
			res.send({message: 'Removed the Event'});
		}
	});
};

exports.update = function (req, res) {
	EventModel.update({id: req.params.id}, req.body, function (err) {
		if (err) {
			return res.send(err);
		}
		res.status(202).send('Updated the Event');
	});
};

exports.findByName = function (req, res) {
	EventModel.findOne({
		name: req.params.name
		}, function (err, response) {
			if (err || !response) {
				res.status(404).send({message: 'Event not found'});
			}
			else {
				res.send({event: response});
			}
		});
};

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/');
};
