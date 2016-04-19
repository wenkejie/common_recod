var gulp = require('gulp');
// var coffee = require('gulp-coffee');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');//阻止报错而停止watch
var del = require('del');

var devPath = './app';

var paths = {
  scripts: [devPath+'js/**/*.js'],
  images: devPath+'img/**/*',
  less: devPath+'less/*.less',
  html:devPath+'*.html'
};


gulp.task('less', function () {
  gulp.src('./app/styles/*.less')
    .pipe(plumber())
    .pipe(less({ compress: true }))
    .pipe(gulp.dest('./.tmp/styles'))
    .pipe(connect.reload());
});


gulp.task('connectDev', function () {
  connect.server({
    root: ['app', '.tmp'],
    port: 9000,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

// gulp.task('scripts', ['clean'], function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   return gulp.src(paths.scripts)
//     .pipe(sourcemaps.init())
//       .pipe(coffee())
//       .pipe(uglify())
//       .pipe(concat('all.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/js'));
// });

// Copy all static images
// gulp.task('images', ['clean'], function() {
//   return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  // gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.less,['less']);
});



// The default task (called when you run `gulp` from cli)
gulp.task('default', ['connectDev', 'watch']);