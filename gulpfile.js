/**
 * Created by Poka on 2/21/2016.
 */
var gulp = require('gulp');
//var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var changed = require('gulp-changed');
var cache = require('gulp-cached');
var rimraf = require('gulp-rimraf');
var rename = require("gulp-rename");
var cssnano = require('gulp-minify-css');//require('gulp-cssnano');
var ngAnnotate = require('gulp-ng-annotate');
var gulpFilter = require('gulp-filter');
var gulpif = require('gulp-if');
var mainBowerFiles = require('main-bower-files');
//var sass = require('gulp-sass');
//var notify = require('gulp-notify');
//var browserSync = require('browser-sync').create();

var config = {
    src: './app/',
    dest: './__build/',
    destImg: './__image/',
    destVendor: './__vendor/',
    bowerSrc: 'app/libs/',
    isProd: 1,
    srcMap: 0,
};

gulp.task('clean', function () {return del([config.dest]);});
gulp.task('cleanImg', function () {return del([config.destImg]);});
gulp.task('cleanVendor', function () {return del([config.destVendor]);});

gulp.task('default', ['proxy', 'bower_public', 'assets', 'level1', 'views']);
gulp.task('default-lite', ['proxy', 'bower_public', 'assets-lite', 'level1', 'views']);


gulp.task('proxy', ['clean'], function () {
    return gulp.src([
            './app/proxy/**/*.*',
            './app/proxy/*.*',
            './app/proxy/.htaccess',
        ], {base: config.src})
        .pipe(gulp.dest(config.dest));
});

gulp.task('assets', ['clean'], function () {
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    //var imgFilter = gulpFilter(['**/*.png', '**/*.gif'], {restore: true});
    //var svgFilter = gulpFilter(['**/*.svg', '**/*.ttf', '**/*.eot', '**/*.woff'], {restore: true});
    return gulp.src(['./app/assets/**/*.*', '!./app/assets/**/*.scss', '!./app/assets/**/*.map', '!./app/assets/**/.gitignore'], {base: config.src})
        .pipe(cssFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(gulpif(config.isProd, cssnano()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(ngAnnotate())
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.dest));
});

var buildAssets= function (hasImg, hasVendor, dest) {
    //return gulp.task(function () {
        var cssFilter = gulpFilter('**/*.css', {restore: true});
        var jsFilter = gulpFilter('**/*.js', {restore: true});
        //var imgFilter = gulpFilter(['**/*.png', '**/*.gif'], {restore: true});
        //var svgFilter = gulpFilter(['**/*.svg', '**/*.ttf', '**/*.eot', '**/*.woff'], {restore: true});
        var src='';
        if(hasImg && hasVendor)
            src=['./app/assets/**/*.*', '!./app/assets/**/*.scss', '!./app/assets/**/*.map', '!./app/assets/**/.gitignore'];
        else if(hasImg)
            src=['./app/assets/**/*.png','./app/assets/**/*.jpg','./app/assets/**/*.gif', '!./app/assets/**/*.scss', '!./app/assets/**/*.map'];
        else if(hasVendor)
            src=['./app/assets/js/vendor/**/*.*', '!./app/assets/**/*.scss', '!./app/assets/**/*.map', '!./app/assets/**/.gitignore', '!./app/assets/**/*.png', '!./app/assets/**/*.jpg'];
        return gulp.src(src, {base: config.src})
            .pipe(cssFilter)
            .pipe(gulpif(config.srcMap, sourcemaps.init()))
            .pipe(gulpif(config.isProd, cssnano()))
            .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
            .pipe(cssFilter.restore)
            .pipe(jsFilter)
            .pipe(gulpif(config.srcMap, sourcemaps.init()))
            .pipe(ngAnnotate())
            .pipe(gulpif(config.isProd, uglify()))
            .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
            .pipe(jsFilter.restore)
            .pipe(gulp.dest(dest));
   // });
};

gulp.task('image',['cleanImg'], function () {
    return buildAssets(true,false,config.destImg);
});
gulp.task('vendor',['cleanVendor'], function () {
    return buildAssets(false,true,config.destVendor);
});

gulp.task('assets-lite', ['clean'], function () {
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    //var imgFilter = gulpFilter(['**/*.png', '**/*.gif'], {restore: true});
    //var svgFilter = gulpFilter(['**/*.svg', '**/*.ttf', '**/*.eot', '**/*.woff'], {restore: true});
    return gulp.src(['./app/assets/**/*.*', '!./app/assets/**/*.scss', '!./app/assets/**/*.map', '!./app/assets/**/.gitignore', '!./app/assets/**/*.png', '!./app/assets/**/*.jpg', '!./app/assets/js/vendor/**/*.*'], {base: config.src})
        .pipe(cssFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(gulpif(config.isProd, cssnano()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(ngAnnotate())
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.dest));
});

gulp.task('views', ['clean'], function () {
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    //var imgFilter = gulpFilter(['**/*.png', '**/*.gif'], {restore: true});
    //var svgFilter = gulpFilter(['**/*.svg', '**/*.ttf', '**/*.eot', '**/*.woff'], {restore: true});
    return gulp.src(['./app/views/**/*.*', '!./app/views/**/*.scss'], {base: config.src})
        .pipe(cssFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(gulpif(config.isProd, cssnano()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(ngAnnotate())
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.dest));
});

gulp.task('level1', ['clean'], function () {
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    //var imgFilter = gulpFilter(['**/*.png', '**/*.gif'], {restore: true});
    //var svgFilter = gulpFilter(['**/*.svg', '**/*.ttf', '**/*.eot', '**/*.woff'], {restore: true});
    return gulp.src(['./app/*.*', './app/robots.txt', './app/.htaccess', '!./app/*.scss', '!./app/.editorconfig', '!./app/.gitattributes', '!./app/LICENSE.txt', '!./app/humans.txt', '!./app/*.xml',]
        , {base: config.src})
        .pipe(cssFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(gulpif(config.isProd, cssnano()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(ngAnnotate())
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.dest));
});

gulp.task('bower_public', ['clean'], function () {
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    return gulp.src(mainBowerFiles({
            overrides: {
                //'slider-revolution': {
                //    main: ['./src/**/*.*']
                //},
                'angular-loading-bar': {main: ['./build/**/*.*']}
            }
        }), {base: config.bowerSrc})
        .pipe(cssFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(gulpif(config.isProd, cssnano()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(ngAnnotate())
        .pipe(gulpif(config.isProd, uglify()))
        .pipe(gulpif(config.srcMap, sourcemaps.write('/')))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.dest + 'libs'));
});
gulp.task('sass', function () {
    gulp.src('./app/assets/css/**/*.scss')
        .pipe(gulpif(config.srcMap, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(config.srcMap, sourcemaps.write()))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }))
        .pipe(notify('Watching files...'));
});

//gulp.watch('./app/assets/css/**/*.scss', ['sass'])
//    .on('change', function (event) {
//        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//    });

// Static server
//gulp.task('browser-sync', function () {
//    browserSync.init({
//        server: {
//            baseDir: "./"
//        }
//    });
//});

// or...

gulp.task('bs', function () {
    browserSync.init({
        proxy: "dev.bedstore.com:9999",
        //xip: true,
        notify: false
    });
    gulp.watch(["./app/**/*.html","./app/**/*.css","./app/**/*.js"]).on("change", browserSync.reload);
});