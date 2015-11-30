var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');

var config = {
  entryFile: './src/app.js',
  outputDir: './dist/',
  outputFile: './js/app.js'
};

// grab libraries files from bower_components, minify and push in /public
gulp.task('publish-vendor', function() {

        var jsFilter = gulpFilter('**/*.js', {restore: true});
        var cssFilter = gulpFilter('**/*.css', {restore: true});
        var fontFilter = gulpFilter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf'], {restore: true});

        return gulp.src(mainBowerFiles(), { base: 'bower_components' })

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.outputDir + 'js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.outputDir + 'js'))
        .pipe(jsFilter.restore)

        // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.outputDir + 'css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.outputDir + 'css'))
        .pipe(cssFilter.restore)

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(config.outputDir + 'fonts'));
});

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({
       debug: true
    }, watchify.args)));
  }
  return bundler;
}

function bundle() {
  return getBundler()
    .transform("babelify", { presets: ['es2015'] })
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', [], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('copy', function() {
  gulp.src('index.html').pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build-persistent'], function() {

  // browserSync({
  //   server: {
  //     baseDir: './dist/'
  //   }
  // });

  getBundler().on('update', function() {
    // gulp.src('index.html').pipe(gulp.dest('dist'));
    gulp.start('build-persistent');
  });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  });
});

gulp.task('default', ['watch', 'serve']);