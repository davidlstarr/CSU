/**
 * Created by npatel on 7/26/16.
 */
var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        intercept: require('gulp-intercept'),
        gutil: require('gulp-util'),
        plumber: require('gulp-plumber'),
        replace: require('gulp-replace-task'),
        browserSync: require('browser-sync').create()
    };
var onError = function (error) {
    $.gutil.log($.gutil.colors.cyan(error.message));
    this.emit('end');
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

gulp.task('_browser-sync', function () {
    $.browserSync.init({
        proxy: config.variable.local_coder_mamp
    });
});

// Watch Files For Changes
gulp.task('_watch', ['_browser-sync'], function () {
    ////FOLDER WATCHING/TARGETING
    //IF Vendor scripts changes in vendor FOLDER, recompile vendor js and vendor.min js, and create a new cachebuster file
    gulp.watch(config.paths.scripts.vendor.all, ['_vendor_js', '__timestamp_version']).on('change', function (evt) {
        ChangeEvent(evt);
    });
    //IF Innovate scripts changes in innovate FOLDER, recompile innovate js and innovate.min js, and create a new cachebuster file
    gulp.watch(config.paths.scripts.innovate.all, ['_innovate_js', '__timestamp_version']).on('change', function (evt) {
        ChangeEvent(evt);
    });
    //IF CSS files in _css FOLDER changes, create a new cachebuster file
    gulp.watch(config.paths.css.final, ['__timestamp_version']).on('change', function (evt) {
        ChangeEvent(evt);
    });
    ////FILE WATCHING/TARGETING
    //IF CSS SPECIFIC FILES changes in the folder, inject that one file
    gulp.watch(config.paths.css.watch).on('change', function (file) {
        $.browserSync.reload(file.path);
    });
    //IF JS SPECIFIC FILES changes in the folder, inject that one file
    gulp.watch(config.paths.scripts.watch).on('change', function (file) {
        $.browserSync.reload(file.path);
    });
    //IF PHP SPECIFIC FILES changes in the folder, inject that one file
    gulp.watch(config.paths.php.watch).on('change', $.browserSync.reload);

});


gulp.task('__timestamp_version', function () {
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

