/**
 * Created by Poka on 2/13/2016.
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


var basePaths = {
    src: './app/',
    dest: './.prod/',
    bowerSrc: './app/libs/'
};


var paths = {
    jsUsed: [
        //'./app/assets/js/vendor/modernizr-2.8.3.min.js',
        //'./app/libs/angular/angular.min.js',
        //'./app/assets/js/vendor/jquery-1.11.3.min.js',
        './app/libs/angular-cookies/angular-cookies.min.js',
        './app/libs/angular-ui-router/release/angular-ui-router.min.js',
        './app/libs/angular-animate/angular-animate.min.js',
        './app/libs/angular-aria/angular-aria.min.js',
        './app/libs/angular-messages/angular-messages.min.js',
        //'./app/libs/angular-material/angular-material.min.js',
        './app/libs/angular-md5/angular-md5.min.js',
        './app/libs/svg4everybody/dist/svg4everybody.min.js',
    ],
    libsCopyAll: [
        './app/libs/slider-revolution/src/**/*.*',
        '!./app/libs/slider-revolution/src/js/jquery.themepunch.plugins.js',
        '!./app/libs/slider-revolution/src/js/jquery.themepunch.revolution.js',
    ],
    jsMineUsed: [
        './app/assets/js/plugins.js',
        './app/assets/js/main.js',
        './app/app.js',
        './app/app.config.js',
        './app/app.ctrl.js',
        './app/assets/js/my-utils/utils.js',
        './app/assets/js/implement/ApiHttpInterceptor.js',
        './app/assets/js/services/app.service.js',
        './app/assets/js/services/session.service.js',
        './app/assets/js/services/contact.service.js',
        './app/assets/js/services/test.service.js',
        './app/views/ui/home/home.js',
        './app/views/ui/about/about.js',
        './app/views/partials/top-menu/_topMenu.js',
        './app/views/partials/sidebar/_sidebar.js',
        './app/views/ui/build-a-bed/buildABed.js',
        './app/views/ui/contact/contact.js',
    ],
    cssUsed: [
        './app/assets/css/normalize.css',
        './app/libs/angular-material/angular-material.min.css',
        './app/assets/svgs/svg-icon-default.theme.css',
        './app/assets/css/main.css',
        './app/assets/css/app.css',
    ],
    cssKeepStruct: [
        './app/assets/js/vendor/**/*.css',
        './app/assets/js/vendor/slider-revolution/src/css/*.css',
        '!./app/assets/js/vendor/**/demo.css',
    ],
    htmlIndex: [
        './app/index.prod.html'
    ]
}

/*--------------------------------------------------
 * CLEAN
 *--------------------------------------------------*/
gulp.task('clean', function () {
    return gulp.src([basePaths.dest], {read: false})
        .pipe(rimraf({force: false}));
});


gulp.task('js.vendor', ['clean'], function () {
    return gulp.src(paths.jsUsed)
        .pipe(concat('app.vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(basePaths.dest + 'assets/js/'))
        ;
});

gulp.task('js.main', ['clean'], function () {
    return gulp.src(paths.jsMineUsed)
        //.pipe(cache('js.main'))
        .pipe(concat('app.main.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(basePaths.dest + 'assets/js/'))
        ;
});

//Dành cho các thư viện mà gồm cả css, images, ...
gulp.task('js.spec', ['clean'], function () {
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    return gulp.src(paths.libsCopyAll, {base: basePaths.bowerSrc})
        .pipe(cssFilter)
        .pipe(cssnano())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(basePaths.dest + 'assets/js/vendor'))
        ;
});

gulp.task('index', function () {
    return gulp.src(paths.htmlIndex, {base: basePaths.src})
        .pipe(rename('index.html'))
        .pipe(gulp.dest(basePaths.dest))
        ;
});

gulp.task('css.bundle', ['clean'], function () {
    gulp.src(['./app/libs/slider-revolution/src/css/settings.css'], {base: basePaths.bowerSrc})
        .pipe(cssnano())
        .pipe(gulp.dest(basePaths.dest + 'assets/js/vendor/'));
    gulp.src(paths.cssUsed)
        .pipe(cssnano())
        .pipe(concat('css.bundle.css'))
        .pipe(gulp.dest(basePaths.dest + 'assets/css/'))
    ;
});

gulp.task('css.keepStruct', ['clean'], function () {
    return gulp.src(paths.cssKeepStruct, {base: paths.src})
        .pipe(cssnano())
        .pipe(gulp.dest(basePaths.dest + 'assets/js/vendor/'))
        ;
});

gulp.task('copy', ['clean'], function () {
    gulp.src(paths.htmlIndex, {base: basePaths.src})
        .pipe(rename('index.html'))
        .pipe(gulp.dest(basePaths.dest));
    gulp.src([
            './app/assets/**/*.*',
            './app/views/**/*.*',
            './app/*.*',
            './app/.htaccess',

            '!./app/assets/js/main.js',
            '!./app/assets/js/plugins.js',
            '!./app/assets/js/implement/**/*.*',
            '!./app/assets/js/my-utils/**/*.*',
            '!./app/assets/js/services/**/*.*',
            '!./app/views/**/*.html',
            '!./app/views/**/*.js',
            '!./app/*.js',
            '!./app/*.html',
            '!./app/assets/**/*.css',
            //'!./app/assets/**/*.js',
            '!./app/assets/**/*.scss',
            '!./app/assets/**/*.map',
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest));
    htmlTemplate();
});

gulp.task('proxy', ['clean'], function () {
    return gulp.src([
            './app/proxy/**/*.*',
            './app/proxy/*.*',
            './app/proxy/.htaccess',
        ], {base: basePaths.src})
        .pipe(cache('proxy'))
        .pipe(gulp.dest(basePaths.dest));
});


gulp.task('font-img', ['clean'], function () {
    gulp.src(paths.htmlIndex, {base: basePaths.src})
        .pipe(rename('index.html'))
        .pipe(gulp.dest(basePaths.dest));
    gulp.src([
            './app/assets/**/fonts/*.*',
            './app/assets/**/img/*.*',
            './app/assets/**/imgs/*.*',
            './app/assets/**/images/*.*',
            './app/assets/**/*.png',
            './app/assets/**/*.jpg',
            './app/assets/**/*.jpeg',
            './app/assets/**/*.gif',

            './app/assets/js/vendor/*.js',

            './app/assets/svgs/*.*',
            '!./app/assets/svgs/*.scss',

            '!./app/assets/**/*.map',
            '!./app/**/*.map',

            './app/*.png',
            './app/*.jpg',
            './app/*.jpeg',
            './app/*.gif',
            './app/*.ico',
            './app/.htaccess',
        ], {base: basePaths.src})
        .pipe(gulp.dest(basePaths.dest))
    ;
    htmlTemplate();
});

gulp.task('css', ['clean', 'css.bundle', 'css.keepStruct']);
gulp.task('default', ['clean', 'font-img', 'js.vendor', 'js.main', 'js.spec', 'css', 'proxy']);


gulp.task('htmlTemplate', function () {
    htmlTemplate();
});

var htmlTemplate = function () {
    gulp.src([
            './app/views/**/*.html',
        ])
        .pipe(templateCache({
            standalone: false,
            filename:'templates.min.js',
            base: function (file) {
                var filename = /[^/]*$/.exec(file.relative)[0];
                return 'views/' + filename;
            }
        }))
        .pipe(gulp.dest(basePaths.dest + 'assets/js/'));
}


