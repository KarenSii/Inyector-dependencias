var gulp = require('gulp');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;


var paths = {
};


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

gulp.task('wiredep', function () {
  gulp.src('/.app/index.html')
    .pipe(wiredep({
      directory: './app/vendor',
      onError:function(err){
      console.log(err.code);
      }
    }))
  .pipe(gulp.dest('./app'));
});

gulp.task('watch', function(){
  gulp.watch(['./app/css/*.css'], ['inject']);
  gulp.watch(['./app/js/*.js'], ['inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
})

gulp.task('serve', ['inject', 'wiredep', 'watch'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 3000
    }));
});
