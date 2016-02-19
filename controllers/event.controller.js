'use strict';

var EventModel = require('../models/model.event');
var users = require('../controllers/user.controller');

exports.create = function (req, res) {
	var event = new EventModel(req.body);
	//console.log(event);

	event.save(function (err) {
		if (err) {return res.josn({error: err});}

		res.send({event: event});
	});
};

exports.list = function (req, res) {
	EventModel.find(function (err, data) {
		if (err) {return res.json({error: err});}

		res.json({event: data});
	});
};


exports.findById = function (req, res) {
	EventModel.findOne({
		_id: req.params.id
	}, function (err, response) {
		if (err || !response) {return res.status(404).json({message: 'Event not found'});
	}
		res.json({event: response});
	});
};

exports.remove = function(req, res) {
	//console.log(req.params.id);

	EventModel.findOne({
		_id: req.params.id
	}, function(err, event) {
		if (!users.getLogin) {res.json({error: 'Please, log in!'});

			event.remove(function (err) {
				if (err) {return res.send(err);}

				res.json('Event removed');
			});
		}
	});
};

exports.edit = function (req, res) {

	EventModel.findOne({
		_id: req.params.id
	}, function(err, event) {
		if (err) {return res.josn({error: err});}

			for (var prop in req.body) {
				event[prop] = req.body[prop];
			}

		if (!users.getLogin) {
			res.json('Please, log in!');
		}
			event.save(function (err) {
				if (err) {return res.json({error: err});}
			});
			res.json({message: 'Updated the Event',	Event: event});
		});
};

exports.findByName = function (req, res) {
	EventModel.findOne({
		name: req.params.name
		}, function (err, response) {
			if (err || !response) {
				res.status(404).json({message: 'Event not found'});
			}
			res.json({event: response});
		});
};
