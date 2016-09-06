'use strict';

var nodemon = require('gulp-nodemon');
var gulp = require('gulp');

gulp.task('start', function () {
  nodemon({
    script: './bin/www'
  });
});
