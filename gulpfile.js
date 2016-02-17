'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

var filePaths = {
	js: ['app/js/**/*.js', '!app/js/main*.js'],
	scss: ['app/scss/*.scss'],
	scssWatch: ['app/scss/**/*.scss']
};

var dirPaths = {
	js: 'app/js/',
	css: 'app/css/'
};

gulp.task('jshint', function() {
	return jshint(filePaths.js).pipe(jshint.reporter('Default'));
});

gulp.task('css', function() {
	return sass(filePaths.scss).pipe(gulp.dest(dirPaths.css));
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

gulp.task('watch', function() {
	gulp.watch(filePaths.js, ['jshint', 'js']);
	gulp.watch(filePaths.scssWatch, ['css']);
});

gulp.task('default', ['jshint', 'css', 'js', 'watch']);