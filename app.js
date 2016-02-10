'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	//models
	//Event = require('./models/eventModel'),
	//User = require('./models/userModel'),
	//routes
	userRouter = require('./routes/userRoutes'),
	eventRouter = require('./routes/eventRoutes');

//Create the Express app
var app = express();

//connect to the db
mongoose.connect('mongodb://localhost/events');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//route middleware
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

app.get('/api', function(req, res) {
	res.send('Welcome to the API');
});

// Use the `PORT` environment variable, or port 3000
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Running the api on port ' + port);
});

//module.exports = app;
