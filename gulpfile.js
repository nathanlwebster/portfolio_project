//gulpfile source: https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    // sass = require('gulp-sass'),
    // coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    include = require('gulp-include'),
    // uglify = require('gulp-uglify'),
    // jQuery = require('jQuery'),
    // boostrap = require('bootstrap'),
    concat = require('gulp-concat');

var jsSources = ['js/*.js'],
    cssSources = ['css/*.css'],
    htmlSources = ['**/*.html'],
    nodeCssSources = ['node_modules/**/*.css'],
    outputDir = 'assets';



gulp.task('log', function() {
  gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('css', function() {
  gulp.src(cssSources)
//   .pipe(uglify())
  .pipe(concat('style.css'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
//   .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('nodeCss', function() {
  gulp.src(nodeCssSources)
  .pipe(include({
    extensions: "css",
    hardFail: true,
    includePaths: [
      __dirname + "/node_modules"
    ]
  }))
//   .pipe(uglify())
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(cssSources, ['css']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'css', 'nodeCss', 'connect', 'watch']);