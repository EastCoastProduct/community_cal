'use strict';

var EventModel = require('../models/eventModel');

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var eventRouter = express.Router();

eventRouter.route('/')
	//READ
	.get(function(req, res) {
		EventModel.find(function(err, events) {
			if (err) {
				return res.status(500).send(err);
			}
			res.json(events);
		});
	})

	//CREATE
	.post(function(req, res) {
		var event = new EventModel(req.body);

		event.save(function(err) {
			if (err) {
				return res.send(err);
			}
				res.status(201).send(Event);
		});
	});

eventRouter.use('/:id', function(req, res, next) {
	EventModel.findById(req.params.id, function(err, event) {
		if (err) {
			res.status(500).send(err);
		}
		else if (event) {
			req.event = event;
			next();
		}
		else {
			res.status(404).send('No Event Found');
		}
	});
});

eventRouter.route('/:id')

	//READ
	.get(function(req, res) {
		res.json(req.event);
	})

	//UPDATE
	.put(function(req, res) {
			req.event.title = req.body.title;
			req.event.description = req.body.description;
			req.event.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
				else {
					res.json(req.event);
				}
			});
		})

	//UPDATE some
	.patch(function(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}

		for (var prop in req.body) {
			req.event[prop] = req.body[prop];
		}

		req.event.save(function(err) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.json(req.event);
			}
		});
	})

	//DELETE
	.delete(function(req, res) {
		req.event.remove(function(err) {
			if (err) {
				return res.status(500).send(err);
			}
			res.status(204).send('Removed the Event');
		});
	});



module.exports = eventRouter;
