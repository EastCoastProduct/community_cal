'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	morgan = require('morgan');

//Create the Express app
var app = express();

// Connect to the db
mongoose.connect('mongodb://localhost/comcal');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

//set up express application
app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));

//routes ======================================================================
require('./routes/user.routes')(app);
require('./routes/event.routes')(app);

// Use the `PORT` environment variable, or port 3000
var port = process.env.PORT || 3000;

//======================================================================
app.listen(port, function() {
	console.log('Running the server on http://localhost:' + port);
});

// User.find({}).exec(function (err, users) {
// 	if (users.length === 0) {
// 		User.register(new User({
// 			email: 'admin@example.com',
// 			password: 'password',
// 			name: 'admin',
// 		}));
// 	}
// });
