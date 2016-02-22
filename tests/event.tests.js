'use strict';

var superagent = require('superagent');
var chai = require('chai');
var expect = chai.expect;

describe('Testing events: ', function() {
	var id;

	it('get all events', function(done) {
		superagent.get('http://localhost:8000/event')
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.status).to.equal(200);
			expect(res.body.length).to.be.greaterThan(0);
			expect(res.body.success).to.equal(true);
			expect(res.type).to.equal('application/json');
			done();
		});
	});

	it('post a new event', function(done) {
		superagent.post('http://localhost:8000/event')
		.send({
			title: 'a super awesome event title',
			description: 'an awesome event description'
		})
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.body.success).to.equal(true);
			expect(res.body._id).to.not.be.equal(null);
			id = res.body._id;
			done();
		});
	});
	
	it('get one event', function(done) {
		superagent.get('http://localhost:8000/event' + id)
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.body.success).to.equal(true);
			expect(res.body.length).to.be.greaterThan(0);
			expect(res.body._id).to.not.be.equal(null);
			id = res.body._id;
			done();
		});
	});

	it('update an event', function(done){
		superagent.put('http://localhost:8000/event' + id)
		.send({
			title: 'EventTitleChange',
			description: 'EventDescriptionChange'
		})
		.end(function(err, res){
			expect(err).to.be.equal(null);
			expect(res.body.success).to.equal(true);
			expect(res.body).to.be.a('object');
			expect(res.body._id).to.be.equal(id);
			done();
		});
});


	it('check the event update', function(done) {
		superagent.get('http://localhost:8000/event' + id)
		.end(function(err, res) {
			expect(err).to.be.equal(null);
			expect(res.body).to.be.a.object('object');
			expect(res.body._id).to.be.equal(id);
			expect(res.body._id.length).to.be.equal(24);
			expect(res.body.title).to.be.equal('EventTitleChange');
			expect(res.body.description).to.be.equal('EventDescriptionChange');
			done();
		});
	});

	it('remove an event', function(done){
		superagent.delete('http://localhost:8000/event' + id)
		.end(function(err, res){
			expect(err).to.be.equal(null);
			expect(res.text).to.be.equal('Event removed');
			done();
		});
	});

});
