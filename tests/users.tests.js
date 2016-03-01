'use strict';

// import the moongoose helper utilities
var superagent = require('superagent'),
	chai = require('chai'),
	expect = chai.expect,
	port = 8000;

describe('Testing the users begins...', function () {
	var id;

	it('GET /register form', function(done) {
		superagent.get('http://localhost:' + port + '/register')
		.end(function(err, res) {
			expect(err).to.equal(null);
			done();
		});
	});

	it('POST create a user', function (done) {
		superagent.post('http://localhost:' + port + '/register')
		.send({
			username: 'ana@example.com',
			password: 'password22',
			name: 'ana'
		})
		.end(function (err, res) {
			//console.log(44, res.body);
			expect(err).to.equal(null);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(201);
			expect(res.body.user._id).to.not.equal(null);
			expect(res.body.user.role).to.be.equal('user');
			id = res.body.user._id;
			done();
		});
	});

	it('POST try to create a user with duplicate username', function (done) {
		superagent.post('http://localhost:' + port + '/register')
		.send({
			username: 'ana@example.com',
			password: 'password22',
			name: 'ana'
		})
		.end(function (err, res) {
			//console.log(55, res.body);
			expect(res.body.error.name).to.equal('UserExistsError');
			done();
		});
	});

	it('GET /login form', function(done) {
		superagent.get('http://localhost:' + port + '/login')
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.type).to.equal('text/html');
			done();
		});
	});

	it('POST a user /login', function(done) {
		superagent.post('http://localhost:' + port + '/login')
		.send({
			username: 'ana@example.com',
			password: 'password22',
		})
		.end(function(err, res) {
			//console.log(66, res.body);
			expect(err).to.equal(null);
			expect(res.status).to.equal(200);
			id = res.body.user._id;
			done();
		});
	});

	it('GET the one user /users/:id', function(done) {
		superagent.get('http://localhost:' + port + '/users/' + id)
		.end(function(err, res) {
			//console.log('http://localhost:' + port + '/users/' + id);
			expect(err).to.equal(null);
			expect(res.type).to.equal('application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(200);
			expect(res.body.user._id).to.not.equal(null);
			expect(res.body.user.username).to.equal('ana@example.com');
			expect(res.body.user.password).to.equal('password22');
			expect(res.body.user.role).to.equal('user');
			done();
		});
	});
});


	it('GET logout /logout', function(done) {
		superagent.get('http://localhost:' + port + '/logout')
		.end(function(err, res) {
			expect(err).to.equal(null);
			expect(res.status).to.not.equal(null);
			//expect(res.user.isAuthenticated()).to.equal(false);
			done();
		});
	});
