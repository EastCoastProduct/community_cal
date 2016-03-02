'use strict';

// import the moongoose helper utilities
var superagent = require('superagent'),
	agent = superagent.agent(),
	chai = require('chai'),
	expect = chai.expect,
	port = 8000;

describe('Testing the events...', function () {
	var id;

	it('GET /events - returns a JSON array of events', function(done) {
		superagent.get('http://localhost:' + port + '/events')
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.body.success).to.equal(true);
			expect(res.type).to.equal('application/json');
			done();
		});
	});

	//fails if unauthorized
	it('trying to POST a new event - unauthorized', function(done) {
		superagent.post('http://localhost:' + port + '/events')
		.send({
			title: 'an unauthorized event title',
			description: 'an unauthorized event description'
		})
		.end(function(err, res) {
			expect(err).to.not.equal(null);
			expect(res.body.message).to.equal('Unauthorized');
			done();
		});
	});

	it('login a user and store auth', function(done) {
		superagent.post('http://localhost:' + port + '/login')
		.send({
			username: 'aprpic@gmail.com',
			password: 'password22'
		})
		.end(function (err, res) {
			expect(res.body.user.username).to.be.equal('aprpic@gmail.com');
			expect(res.body.user.password).to.be.equal('password22');
			agent.saveCookies(res);
			done();
		});
	});

	it('POST an event to /events/', function(done) {
		var req = superagent.post('http://localhost:' + port + '/events');
		agent.attachCookies(req);
		req
		.send({
			title: 'a super awesome event title',
			description: 'an awesome event description',
			userid: '56d42cdc77c1634311cd13f2'
		})
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.body).to.be.an('object');
			id = res.body.event._id;
			done();
		});
	});

	it('GETting the freshly entered event /events/:id', function(done) {
		var req = superagent.get('http://localhost:' + port + '/events/' + id);
		agent.attachCookies(req);
		req
		.end(function(err, res) {
			//console.log('http://localhost:' + port + '/events/' + id);
			//console.log(55, res.body);
			expect(err).to.equal(null);
			expect(res.type).to.equal('application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(200);
			expect(res.body.event._id).to.not.equal(null);
			expect(res.body.event.title).to.be.equal('a super awesome event title');
			expect(res.body.event.description).to.be.equal('an awesome event description');
			expect(res.body.event.userid).to.not.equal(null);
			id = res.body.event._id;
			done();
		});
	});

	it('PUT /events/:id', function(done){
		var req = superagent.put('http://localhost:' + port + '/events/' + id);
		agent.attachCookies(req);
		req
		.send({
			title: 'Event Title Test Change',
			description: 'Event Description Test Change'
		})
		.end(function(err, res){
			expect(err).to.be.equal(null);
			expect(res.status).to.equal(200);
			expect(res.body).to.be.an('object');
			expect(res.body.event._id).to.be.equal(id);
			done();
		});

	it('GET the updated event /event/:id', function(done) {
		superagent.get('http://localhost:' + port + '/events/' + id)
		.end(function(err, res) {
			//console.log(55, 'http://localhost:' + port + '/events/' + id);
			expect(err).to.be.equal(null);
			expect(res.body.status).to.equal(200);
			expect(res.body).to.be.an('object');
			expect(res.body.event._id).to.be.equal(id);
			expect(res.body.event._id).to.be.have.lengthOf(24);
			expect(res.body.event.title).to.be.equal('Event Title Changed');
			expect(res.body.event.description).to.be.equal('Event Description Changed');
			done();
		});
	});

	it('DELETE the event /event/:id', function(done){
		superagent.delete('http://localhost:' + port + '/events/' + id)
		.end(function(err, res){
			expect(err).to.be.equal(null);
			expect(res.body.status).to.equal(204);
			done(err);
		});
	});

});
});
