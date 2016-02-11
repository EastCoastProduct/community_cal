'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	//routes
	authRouter = require('./routes/authRoutes'),
	eventRouter = require('./routes/eventRoutes'),
	userRouter = require('./routes/userRoutes'),
	//
	cookieParser = require('cookie-parser'),
	session = require('express-session');


//Create the Express app
var app = express();

//connect to the db
mongoose.connect('mongodb://localhost/events');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({secret: 'comcal', saveUninitialized: true, resave: true}));

//configure passport
require('./config/passport')(app);

//route middleware
app.use('/events', eventRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
	res.send('Welcome to the API');
});

// Use the `PORT` environment variable, or port 3000
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Running the api on port ' + port);
});

module.exports = app;
