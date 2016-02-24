'use strict';

var EventModel = require('../models/model.event');
var users = require('../controllers/user.controller');

exports.create = function (req, res) {
	var event = new EventModel(req.body);
	//console.log(event);

	event.save(function (err) {
		if (err) {return res.json(err);}

		res.send({success: true, event: event});
	});
};

exports.list = function (req, res) {
	//console.log(121,req.isAuthenticated());
	EventModel.find(function (err, data) {
		if (err) {return res.json(err);}

		res.send({success: true, event: data});
	});
};


exports.findById = function (req, res) {
	EventModel.findOne({_id: req.params.id}, function (err, response) {
		if (err || !response) {return res.json({success: false, message: 'Event not found'});
	}
		res.json({success: true, event: response});
	});
};

exports.remove = function(req, res) {
	//console.log(req.params.id);

	EventModel.findById({_id: req.params.id}, function(err, event) {
		event.remove(function (err) {
			if (err) {return res.json({error: err, success:false});}

			res.json({success: true, message: 'Event removed'});
			});
	});
};

exports.edit = function (req, res) {

	EventModel.findOne({_id: req.params.id}, function(err, event) {
		if (err) {return res.josn({error: err});}

			for (var prop in req.body) {
				event[prop] = req.body[prop];
			}

		if (!users.getLogin) {res.json('Please, log in!');}
		else {
			event.save(function (err) {if (err) {return res.json({error: err});}});
			res.send({success: true, message: 'Updated the Event', Event: event});
		}
		});

};

exports.findByName = function (req, res) {
	EventModel.findById({name: req.params.name}, function (err, response) {
			if (err || !response) {res.json({message: 'Event not found'});
			}
			res.send({success: true, event: response});
		});
};
