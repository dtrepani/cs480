'use strict';

var gulp			= require('gulp');
var Server			= require('karma').Server;
var gulpLoadPlugins	= require('gulp-load-plugins');
var $				= gulpLoadPlugins();

$.util.colors.enabled		= true;
$.util.colors.supportsColor	= true;

var dirPaths = {
	js: 'app/',
	css: 'app/content/css/',
	scss: 'app/content/scss/',
	php: './'
};

var fileTestPaths = {
	js: 'test/**/*.js',
	jsUnit: 'test/unit/**/*.js',
	jsE2E: 'test/e2e/**/*.js',
	php: 'test/**/*.php'
};

var filePaths = {
	scss: [dirPaths.scss + 'app.scss'],
	scssWatch: [dirPaths.scss + '**/*.scss'], // Watch for changes in any of the scss partials.
	js: [
		dirPaths.js + '**/*.js',
		'!' + dirPaths.js + 'app.js',
		'!' + dirPaths.js + 'app.min.js'
	],
	jsWithTest: [
		dirPaths.js + '**/*.js',
		fileTestPaths.js + '',
		'!' + dirPaths.js + 'app.js',
		'!' + dirPaths.js + 'app.min.js'
	],
	php: [
		dirPaths.php + '**/*.php',
		fileTestPaths.php + '',
		'!vendor/**/*.php',
		'!node_modules/**/*.php'
	]
};

var onError = $.notify.onError('<%= error.message %>');

gulp.task('css', function() {
	gulp.src(filePaths.scss)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.sass())
		.pipe(gulp.dest(dirPaths.css))
		.pipe($.rename({extname: '.min.css'}))
		.pipe($.cssnano())
		.pipe(gulp.dest(dirPaths.css))
});

gulp.task('jshint', function() {
	gulp.src(filePaths.jsWithTest)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.jshint('.jshintrc'))
		.pipe($.jshint.reporter('jshint-stylish'))
});

gulp.task('js', function() {
	gulp.src(filePaths.js)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.concat('app.js'))
		.pipe(gulp.dest(dirPaths.js))
		.pipe($.rename({extname: '.min.js'}))
		.pipe($.ngAnnotate())
		.pipe($.sourcemaps.init())
		.pipe($.uglify())
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(dirPaths.js))
});

gulp.task('phpcs', function() {
	gulp.src(filePaths.php)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.phpcs({
			bin: 'vendor\\bin\\phpcs.bat',
			colors: true
		}))
		.pipe($.phpcs.reporter('log'));
});

gulp.task('phpcbf', function() {
	gulp.src(filePaths.php)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.phpcbf({
			bin: 'vendor\\bin\\phpcbf.bat',
			colors: true
		}))
		.pipe(gulp.dest(dirPaths.php));
});

gulp.task('phpunit', function() {
	gulp.src(fileTestPaths.php)
		.pipe($.phpunit('vendor\\bin\\phpunit', {
			colors: 'enabled',
			configurationFile: 'test/phpunit.xml'
		}));
});

gulp.task('karma', function(done) {
	new Server({
		configFile: __dirname + '\\test\\karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('protractor', function() {
	gulp.src(fileTestPaths.jsE2E)
		.pipe($.protractor.protractor({configFile: 'test/protractor.conf.js'}));
});

gulp.task('watch', function() {
	gulp.watch(filePaths.scssWatch, ['css']);
	gulp.watch(filePaths.js, ['js']);
	gulp.watch(filePaths.jsWithTest, ['jshint']);
	//gulp.watch(filePaths.php, ['phpcs']);
});

gulp.task('test', ['phpunit', 'karma', 'protractor']);

gulp.task('watchTest', function() {
	gulp.watch(fileTestPaths.jsUnit, ['karma']);
	gulp.watch(fileTestPaths.jsE2E, ['protractor']);
	gulp.watch(fileTestPaths.php, ['phpunit']);
});

gulp.task('default', ['css', 'jshint', 'js', /*'phpcs',*/ 'watch']);
