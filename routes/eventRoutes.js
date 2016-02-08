'use strict';

var Event = require('../models/eventModel');

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var eventRouter = express.Router();

eventRouter.route('/')

	//READ
	.get(function(req, res) {
		Event.find(function(err, events){
			if (err) {
				return res.status(500).send(err);
			}
			res.json(events);
		});
	})

	//CREATE
	.post(function(req, res) {
		var event = new Event(req.body);

		event.save(function(err) {
			if (err) {
				return res.send(err);
		}
		res.status(201).send(event);
		});
	});

eventRouter.route('/:id')

	//READ
	.get(function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.status(201).send(event);
			}
		});
	})

	//UPDATE
	.put(function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.json(event);
			}
		})

		//req.event.date = req.body.date;
		event.save(function(err){
			if (err) {
				res.status(500).send(err);
			}
			else {
				event.title = req.body.title;
				event.description = req.body.description;
				event.save();
				res.json(event);
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
			res.json(req.event);
		});
	})

	//DELETE
	.delete(function(req, res) {
		req.event.remove(function(err) {
			if (err) {
				res.status(500).send(err);
			}
			res.status(204).send('Removed the Event');
		});
	});

	module.exports = eventRouter;
