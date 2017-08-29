/**
 * Created by dstarr on 10/21/16.
 */

'use strict';
var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        intercept: require('gulp-intercept'),
        gutil: require('gulp-util'),
        plumber: require('gulp-plumber'),
        sass: require('gulp-sass'),
        sourcemaps: require('gulp-sourcemaps'),
        size: require('gulp-size'),
        concat: require('gulp-concat'),
        sizediff: require('gulp-sizediff'),
        uglify: require('gulp-uglify'),
        replace: require('gulp-replace-task'),
        rename: require('gulp-rename')
    };
var onError = function (error) {
    $.gutil.log($.gutil.colors.cyan(error.message));
    this.emit('end');
};

var sizeDiffFormat = function (data) {
    return $.gutil.colors.green(Math.round((data.startSize / 1000) * 100) / 100 + 'kB --> ' + Math.round((data.endSize / 1000) * 100) / 100 + 'kB : bytes saved: ' + data.diff + ' (' + Math.round(data.diffPercent * 100) + '%); compression ratio: ' + data.compressionRatio.toFixed(2));
};

// staging variables for timestamp task
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}
var DateTime = new Date();
var strDateTime = [[DateTime.getFullYear(), AddZero(DateTime.getMonth() + 1), AddZero(DateTime.getDate())].join("."), [AddZero(DateTime.getHours()), AddZero(DateTime.getMinutes()), AddZero(DateTime.getSeconds())].join("")].join("_");
var ChangeEvent = function (evt) {
    return $.gutil.log('File', $.gutil.colors.cyan(evt.path.replace(config.basePaths.local, '')), 'was', $.gutil.colors.magenta(evt.type));
};

gulp.task('sass',['_sass_compressed','__css_timestamp_version'], function () {
    return gulp.src('sass/*.scss')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.size({
            showFiles: true
        }))
        .pipe($.replace({
            patterns: [
                {
                    match: 'GULPED_TIMESTAMP',
                    replacement: strDateTime
                },
                {
                    match: 'CODER',
                    replacement: config.variable.coder
                }
            ]
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./_css'))
        .pipe($.size({
            showFiles: true
        }))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Updating sass file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }));

});

gulp.task('_sass_compressed', function () {
    return gulp.src('sass/*.scss')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.size({
            showFiles: true
        }))
        .pipe($.replace({
            patterns: [
                {
                    match: 'GULPED_TIMESTAMP',
                    replacement: strDateTime
                },
                {
                    match: 'CODER',
                    replacement: config.variable.coder
                }
            ]
        }))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
        .pipe(gulp.dest('./_css'))
        .pipe($.size({
            showFiles: true
        }))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Updating sass file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }));
});

gulp.task('sass:watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('sass/**/*.scss', ['_sass_compressed']);
    //IF CSS files in _css FOLDER changes, create a new cachebuster file
    gulp.watch('sass/**/*.scss', ['__timestamp_version']).on('change', function (evt) {
        ChangeEvent(evt);
    });
});

gulp.task('__css_timestamp_version', function () {
    return gulp.src(config.paths.php.tpl.cache_src)
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.replace({
            patterns: [
                {
                    match: 'GULPED_TIMESTAMP',
                    replacement: strDateTime
                }
            ]
        }))
        .pipe(gulp.dest(config.paths.php.dest))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Updating Cache Buster file w/' + strDateTime + ': ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
        .pipe(gulp.dest(config.paths.php.final.all))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Updating Cache Buster file w/' + strDateTime + ': ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))

});