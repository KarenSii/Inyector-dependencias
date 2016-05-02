var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');
var mainBowerFiles = require ("main-bower-files");


var paths = {
  scss: './sass/*.scss'
};

gulp.task('sass', function () {
  gulp.src('app/scss/estilos.scss')
    .pipe(sass({
      includePaths:['scss']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function () {
  browserSync.init(["app/css/*.css", "app/js/*.js"],{
    server:{
      baseDir: "./"
    }
  });
});

gulp.task('watch', ['sass', 'browser-sync'], function () {
  gulp.watch(["app/scss/*.scss","app/scss/base/*.scss","app/scss/sections/*.scss","app/scss/style/*.scss"], ['sass']);
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src(['app/css/*.css',
    'app/js/*.js'], {read: false});

  var injectOptions = {
    ignorePath: '/../app'
  }

  var options = {
    bowerJson: require('./bower.json'),
    directory: '/../app',
    ignorePath: '../../app'
  }

  return gulp.src('./app/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./'));

});

gulp.task('bower', function(){
  return gulp.src(mainBowerFiles(),{base:"bower_components"})
    .pipe(gulp.dest(config.paths.bower.dest));
});

gulp.task('serve', ['inject'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 3001
    }));
});