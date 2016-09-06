'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('lint:build', function () {
  return gulp.src(paths.scripts)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});
