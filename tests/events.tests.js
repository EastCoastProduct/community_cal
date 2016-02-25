'use strict';

var superagent = require('superagent'),
	chai = require('chai'),
	expect = chai.expect,
	port = 8000;


describe('Testing the events: ', function() {
	var id;

	it('GET /events - returns a JSON array', function(done) {
		superagent.get('http://localhost:' + port + '/events')
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.status).to.equal(200);
			expect(res.body.success).to.equal(true);
			expect(res.type).to.equal('application/json');
			done();
		});
	});

	it('POST a new event', function(done) {
		superagent.post('http://localhost:' + port + '/events')
		.send({
			title: 'a super awesome event title',
			description: 'an awesome event description'
		})
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.body).to.be.an('object');
			expect(res.body.success).to.equal(true);
			expect(res.body.event._id).to.not.equal(null);
			expect(res.status).to.equal(200);
			id = res.body.event._id;
			done();
		});
	});

	it('GET /events/:id', function(done) {
		superagent.get('http://localhost:' + port + '/events/' + id)
		.end(function(err, res) {
			console.log('http://localhost:' + port + '/events/' + id);
			expect(err).to.equal(null);
			expect(res.type).to.equal('application/json');
			expect(res.body).to.be.an('object');
			expect(res.body.success).to.equal(true);
			expect(res.body.event._id).to.not.equal(null);
			id = res.body.event._id;
			done();
		});
	});

	it('PUT /events/:id', function(done){
		superagent.put('http://localhost:' + port + '/events/' + id)
		.send({
			title: 'EventTitleChange',
			description: 'EventDescriptionChange'
		})
		.end(function(err, res){
			expect(err).to.be.equal(null);
			expect(res.body.success).to.equal(true);
			expect(res.body).to.be.an('object');
			console.dir(res.body);
			expect(res.body.event._id).to.be.equal(id);
			done();
		});
});


	it('GET the updated event /event/:id', function(done) {
		superagent.get('http://localhost:' + port + '/events/' + id)
		.end(function(err, res) {
			console.log(55, 'http://localhost:' + port + '/events/' + id);
			expect(err).to.be.equal(null);
			expect(res.body).to.be.an('object');
			expect(res.body.event._id).to.be.equal(id);
			expect(res.body.event._id).to.be.have.lengthOf(24);
			expect(res.body.event.title).to.be.equal('EventTitleChange');
			expect(res.body.event.description).to.be.equal('EventDescriptionChange');
			done();
		});
	});

	it('remove an event', function(done){
		superagent.delete('http://localhost:' + port + '/events/' + id)
		.end(function(err, res){
			expect(err).to.be.equal(null);
			expect(res.text).to.be.equal('{"message":"Not authorized. Please, log in!"}');
			done();
		});
	});

});
