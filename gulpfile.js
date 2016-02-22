'use strict';

var gulp		= require('gulp'),
	concat		= require('gulp-concat'),
	rename		= require('gulp-rename');

var	sass		= require('gulp-sass');

var jshint		= require('gulp-jshint'),
	uglify		= require('gulp-uglify'),
	ngAnnotate	= require('gulp-ng-annotate'),
	sourcemaps	= require('gulp-sourcemaps');

var phpcs		= require('gulp-phpcs'),
	phpcbf		= require('gulp-phpcbf'),
	phpunit		= require('gulp-phpunit');

var filePaths = {
	scss: ['client/content/scss/*.scss'],
	scssWatch: ['client/content/scss/**/*.scss'],
	js: ['client/app/**/*.js', '!client/app/main*.js'],
	php: ['client/**/*.php', '!vendor/**/*.php', '!test/**/*.php'],
	phpTest: ['test/**/*.php']
};

var dirPaths = {
	js: 'app/',
	css: 'client/content/css/',
	php: 'client/'
};

gulp.task('css', function() {
	return sass(filePaths.scss).pipe(gulp.dest(dirPaths.css));
});

gulp.task('jshint', function() {
	return jshint(filePaths.js).pipe(jshint.reporter('Default'));
});

gulp.task('js', function() {
	return gulp.src(filePaths.js)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(dirPaths.js))
		.pipe(rename('main.min.js'))
		.pipe(ngAnnotate())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dirPaths.js));
});

gulp.task('phpcs', function() {
	return gulp.src(filePaths.php)
		.pipe(phpcs({
			bin: 'vendor\\bin\\phpcs.bat',
			colors: true
		}))
		.pipe(phpcs.reporter('log'));
});

gulp.task('phpcbf', function() {
	return gulp.src(filePaths.php)
		.pipe(phpcbf({
			bin: 'vendor\\bin\\phpcbf.bat',
			colors: true
		}))
		.pipe(gulp.dest(dirPaths.php));
});

gulp.task('phpunit', function() {
	return gulp.src(filePaths.phpTest)
		.pipe(phpunit('vendor\\bin\\phpunit.bat'/*, {colors: 'enabled'}*/));
});

gulp.task('watch', function() {
	gulp.watch(filePaths.scssWatch, ['css']);
	gulp.watch(filePaths.js, ['jshint', 'js']);
	gulp.watch(filePaths.php, ['phpcs']);
});

gulp.task('test', ['phpunit']);

gulp.task('default', ['css', 'jshint', 'js', 'phpcs', 'watch']);