const gulp = require('gulp');
const sass = require('gulp-sass');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const pkg = require('./package.json');
const browserSync = require('browser-sync').create();

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy HTML
gulp.task('html', function(done) {
  gulp.src(['./*.html'])
    .pipe(gulp.dest('./dist'));
  done();
})

// Copy images
gulp.task('img', function(done) {
  gulp.src(['./img/**/*'])
    .pipe(gulp.dest('./dist/img'));
  done();
})

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function(done) {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./dist/vendor/bootstrap'));

  // Font Awesome 5
  gulp.src([
      './node_modules/@fortawesome/**/*'
    ])
    .pipe(gulp.dest('./dist/vendor'));

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'));

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery-easing'));

  done();
});

// Compile SCSS
gulp.task('css:compile', function(done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./tmp/css'));
  done();
});

// Minify CSS
gulp.task('css:minify', gulp.task('css:compile'), function() {
  console.log('task css:minify run');
  return gulp.src([
      './tmp/css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});

// CSS
gulp.task('css', gulp.series('css:compile', 'css:minify'));

// Minify JavaScript
gulp.task('js:minify', function(done) {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
  done();
});

// JS
gulp.task('js', gulp.task('js:minify'));

// Default task
gulp.task('default', gulp.series(gulp.parallel('css', 'js', 'vendor', 'img', 'html')));

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', gulp.series(gulp.parallel('css', 'js', 'browserSync')), function() {
  gulp.watch('./scss/*.scss', gulp.task('css'));
  gulp.watch('./js/*.js', gulp.task('js'));
  gulp.watch('./*.html', browserSync.reload);
});
