var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs'),
	jsFiles = ['*.js', 'models/*.js', 'routes/*.js', 'controllers/*.js'],
	istanbul = require('gulp-istanbul'),
	mocha = require('gulp-mocha');

gulp.task('default', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function() {
		console.log('Restarting...');
	});
});

gulp.task('style',  function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});

gulp.task('testevents', function (cb) {
	gulp.src(['controllers/*.js', 'routes/*.js', '/models/*.js', 'app.js'])
	.pipe(istanbul())
	.pipe(istanbul.hookRequire())
	.on('finish', function () {
		gulp.src(['tests/events.tests.js'])
		.pipe(mocha())
		.pipe(istanbul.writeReports())
		.on('end', cb);
	});
});

gulp.task('testusers', function (cb) {
	gulp.src(['controllers/*.js', 'routes/*.js', '/models/*.js','app.js'])
	.pipe(istanbul())
	.pipe(istanbul.hookRequire())
	.on('finish', function () {
		gulp.src(['tests/users.tests.js'])
		.pipe(mocha())
		.pipe(istanbul.writeReports())
		.on('end', cb);
	});
});
