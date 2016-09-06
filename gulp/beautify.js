'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var prettify = require('gulp-jsbeautifier');

gulp.task('beautify', function () {
  gulp.src(paths.scripts, {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('beautify:build', function () {
  gulp.src(paths.scripts)
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_ONLY'
    }));
});
