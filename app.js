'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	//routes
	//authRouter = require('./routes/authRoutes'),
	eventRouter = require('./routes/eventRoutes'),
	userRouter = require('./routes/userRoutes'),
	//
	cookieParser = require('cookie-parser'),
	session = require('express-session'),

	//models
	//Event = require('./models/eventModel'),
	//User = require('./models/userModel'),
	//routes
	userRouter = require('./routes/userRoutes'),
	eventRouter = require('./routes/eventRoutes'),
	//auth
	passport = require('passport'),
	flash    = require('connect-flash'),
	morgan = require('morgan');

//Create the Express app
var app = express();

// Connect mongoose
mongoose.connect('mongodb://localhost/comcal');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//set up express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//route middleware
//app.use('/events', eventRouter);
//app.use('/users', userRouter);
//app.use('/auth', authRouter);

//routes ======================================================================
require('.routes/userRoutes.js')(app, passport);
require('.routes/eventRoutes.js')(app);

//required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(session({secret: 'comcal', saveUninitialized: true, resave: true}));

app.get('/loginFailure', function(req, res, next) {
	res.send('Failed to authenticate');
});

// Use the `PORT` environment variable, or port 3000
var port = process.env.PORT || 3000;

//======================================================================
app.listen(port, function() {
	console.log('Running the api on port ' + port);
});
