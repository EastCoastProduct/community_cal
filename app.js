'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	morgan = require('morgan'),
	passport = require('passport');

//Create the Express app
var app = express();

// Connect to the db
mongoose.connect('mongodb://localhost/comcal');

//set up express application
app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

//routes ======================================================================
require('./routes/user.routes')(app, passport);
require('./routes/event.routes')(app, passport);

// Use the `PORT` environment variable, or port 3000
var port = process.env.PORT || 3000;

//======================================================================
app.listen(port, function() {
	console.log('Running the server on http://localhost:' + port);
});
