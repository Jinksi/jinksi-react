var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var del = require('del');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var rucksack = require('gulp-rucksack');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');

var src = {
  scss: 'src/scss/**/*.scss',
  css:  'style'
};

gulp.task('clean', function(){
  return del([
    './dist/'
  ]);
});

// Static Server + watching scss/php files
gulp.task('serve', ['sass'], function() {

  bs.init({
    proxy: "localhost:8080",
    open: false
  });

  gulp.watch(src.scss, ['sass']);
});

// Compile sass into CSS
gulp.task('sass', function() {
  return gulp.src(src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', function(err){
      bs.notify(err.message, 3000);
      this.emit('end');
    }))
    .pipe(rucksack({
      autoprefixer: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.css))
    .pipe(bs.stream({match: '**/*.css'}));
});

gulp.task('webpack', function() {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js'),
    null,
    function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist-files', ['clean'], function(){
  gulp.src(['CNAME', 'robots.txt'])
    .pipe(gulp.dest('dist/'));
  gulp.src('style/style.css')
    .pipe(gulp.dest('dist/style/'));
  gulp.src('fonts/**.*')
    .pipe(gulp.dest('dist/fonts/'));
  gulp.src('images/**.*')
    .pipe(gulp.dest('dist/images/'));
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('200.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'webpack', 'dist-files']);
