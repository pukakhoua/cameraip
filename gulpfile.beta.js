/**
 * Created by Poka on 2/13/2016.
 */
var gulp = require('gulp');
//var coffee = require('gulp-coffee');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');

var basePaths = {
    src: './app/',
    dest: './.build/',
    bowerSrc: 'app/libs/'
};


var paths = {
    jsUsed: [],
    cssUsed: []
}

/*--------------------------------------------------
 * CLEAN
 *--------------------------------------------------*/
gulp.task('clean', function () {
    return del([basePaths.dest]);
});


gulp.task('default', ['clean', 'bower.js', 'bower.css', 'proxy'], function () {
    return gulp.src([
            './app/assets/**/*.*',
            './app/views/**/*.*',
            './app/*.*',
            './app/.htaccess',
            '!./app/assets/**/*.scss',
            '!./app/assets/**/*.map',
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('bower.js', ['bower.vendor.all'], function () {
    return gulp.src([
            './app/libs/**/*.min.js',
            '!./app/libs/**/demos/**',
            '!./app/libs/**/modules/**',
            '!./app/libs/**/documentation/**',
            '!./app/libs/**/examples/**',
            //'!./app/libs/**/*.min.js',
            '!./app/libs/**/*index.js',
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('bower.css', function () {
    return gulp.src([
            './app/libs/**/*.css',
            '!./app/libs/**/demos/**',
            '!./app/libs/**/modules/**',
            '!./app/libs/**/documentation/**',
            '!./app/libs/**/examples/**',
            '!./app/libs/**/*index.css',
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('bower.vendor.all', function () {
    return gulp.src([
            './app/libs/slider-revolution/src/**/*.*'
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('proxy', function () {
    return gulp.src([
            './app/proxy/**/*.*',
            './app/proxy/*.*',
            './app/proxy/.htaccess',
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('htmlTemplate', function () {
    return gulp.src([
            './app/views/**/*.html',
        ])
        .pipe(templateCache({
            standalone: true,
            base: function (file) {
                var filename = /[^/]*$/.exec( file.relative )[0];
                return 'views/' + filename;
            }
        }))
        .pipe(gulp.dest(basePaths.dest));
});


