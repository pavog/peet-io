var gulp = require('gulp');
var glob = require('glob');
var $ = require('gulp-load-plugins')();
var minify = false;


gulp.task('html', function () {
    return gulp.src(['src/*.jade', '!src/_*.jade'])
        .pipe($.jade())
        .pipe($.if(minify, $.htmlmin()))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['html'], function () {
    return gulp.src('src/css/style.less')
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe($.if(minify, $.uncss({ html: glob.sync('dist/*.html') })))
        .pipe($.if(minify, $.minifyCss()))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe($.if(minify, $.uglify()))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function () {
    return gulp.src('src/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe($.if(minify, $.imagemin()))
        .pipe(gulp.dest('dist'));
});

gulp.task('misc', function () {
    return gulp.src('src/**/*.{eot,ttf,woff}')
        .pipe(gulp.dest('dist'));
});

gulp.task('setMinify', function () {
    minify = true;
});

gulp.task('default', [ 'html', 'css', 'js', 'images', 'misc' ]);
gulp.task('minify', [ 'setMinify', 'default' ]);
