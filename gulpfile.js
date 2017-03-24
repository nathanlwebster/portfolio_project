var gulp = require('gulp'),
    gutil = require('gulp-util'),
    // sass = require('gulp-sass'),
    // coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    // uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var jsSources = ['scripts/*.js'],
    cssSources = ['styles/*.css'],
    htmlSources = ['**/*.html'],
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

gulp.task('default', ['html', 'js', 'css', 'connect', 'watch']);