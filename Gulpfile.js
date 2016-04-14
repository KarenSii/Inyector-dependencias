var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
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