// Dependencies
// ------------

var gulp = require('gulp');
var qunit = require('node-qunit-phantomjs');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var standard = require('gulp-standard');


// Browserify
// ----------

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './lib/index.js',
    debug: true,
    standalone: 'Proton'
  });

  return b.bundle()
    .pipe(source('proton.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'));
});


// Stylus
// ------

gulp.task('css', function () {
  gulp.src('./style/proton.styl')
    .pipe(stylus({
      compress: false,
      paths: ['node_modules']
    }))
    .pipe(gulp.dest('./build/'));
});


// PhantomJS Tests
// ---------------

gulp.task('test', function () {
  qunit('./test/index.html');
  return gulp.src(['./lib/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
});


// Watch
// -----

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js'], ['js']);
  gulp.watch(['style/**/*.styl'], ['css']);
});


// Default Task
// ------------

gulp.task('default', ['css', 'js', 'test']);