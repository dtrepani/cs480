'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var filePaths = {
	js: ['app/js/**/*.js', '!app/js/main*.js'],
	scss: ['app/scss/*.scss'],
};

var dirPaths = {
	js: 'app/js/',
	css: 'app/css/'
};

gulp.task('jshint', function() {
	return gulp.src(filePaths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function() {
	return gulp.src(filePaths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dirPaths.css));
});

gulp.task('js', function() {
	return gulp.src(filePaths.js)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(dirPaths.js))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dirPaths.js));
});

gulp.task('watch', function() {
	gulp.watch(filePaths.js, ['jshint', 'js']);
	gulp.watch(filePaths.scss, ['css']);
});

gulp.task('default', ['jshint', 'css', 'js', 'watch']);