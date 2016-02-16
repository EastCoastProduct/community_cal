'use strict';

var EventModel = require('../models/model.event');

exports.create = function (req, res) {
	var event = new EventModel(req.body);
	console.log(event);

	event.save(function (err) {
		if (err) {
			return res.send({
				message: err
			});
		}
		else {
			res.status(201).send({
				success: true,
				event: event
			});
		}
	});
};

exports.list = function (req, res) {
	EventModel.find(function (err, data) {
		if (err) {
			res.status(500).send(err);
		}
		res.json({
			success: true,
			event: data
		});
	});
};


exports.findById = function (req, res) {
	EventModel.findById({
		_id: req.params.id
	}, function (err, response) {
		if (err) {
			res.send(err);
		}
		else {
			res.send({
				success: true,
				event: response
			});
		}
	});
};

exports.remove = function(req, res) {
	EventModel.findById({
		_id: req.params.id
	}, function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		else {
			res.status(204).send('Removed the Event');
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
		}, function (error, response) {
			if (error || !response) {
				res.status(404).send({
					status: 404,
					message: 'Event not found'
				});
			}
			else {
				res.send({
					success: true,
					event: response
				});
			}
		});
};
