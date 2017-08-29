/**
 * Created by npatel on 7/26/16.
 */
var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        intercept: require('gulp-intercept'),
        gutil: require('gulp-util'),
        plumber: require('gulp-plumber'),
        addsrc: require('gulp-add-src'),
        order: require('gulp-order'),
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


//This concats and minifies all JS inside the innovate folder, with innovate-app first, and innovate-app-start.js last
gulp.task('_script_js', function () {
    return gulp.src("js/**/*.js")
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.order([
            "js/jquery.js",
            'js/plugins.js',
            "js/functions.js"
        ], {base: './'}))
        .pipe($.size({
            showFiles: true
        }))
        .pipe($.concat('script.js'))
        .pipe($.size({
            showFiles: true
        }))
        .pipe($.sizediff.start())
        .pipe(gulp.dest(config.paths.scripts.dest))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Generating file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
        .pipe(gulp.dest(config.paths.scripts.final))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Generating file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
        .pipe($.uglify())
        .pipe($.sizediff.stop({
                title: 'Innovate Javascript',
                formatFn: sizeDiffFormat
            }
        ))
        .pipe($.addsrc.prepend(config.paths.license.concat_src))
        .pipe($.concat('script.min.js'))
        .pipe($.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.paths.scripts.dest))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Generating file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
        .pipe(gulp.dest(config.paths.scripts.final))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Generating file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
});

gulp.task('__innovate_timestamp_license', function () {
    return gulp.src(config.paths.license.license_src)
        .pipe($.plumber({
            errorHandler: onError
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
        .pipe(gulp.dest(config.paths.license.dest))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Updating Licensing file w/' + strDateTime + ' by ' + config.variable.coder + ': ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }));
});