/**
 * Created by npatel on 7/26/16.
 */
var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        intercept: require('gulp-intercept'),
        gutil: require('gulp-util'),
        plumber: require('gulp-plumber')
    };
var onError = function (error) {
    $.gutil.log($.gutil.colors.cyan(error.message));
    this.emit('end');
};

//This moves all brand fonts inside the brand folder to the final location _fonts
gulp.task('_brand_fonts', function () {
    return gulp.src(config.paths.fonts.brand.all)
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Getting file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
        .pipe($.plumber({errorHandler: onError}))
        .pipe(gulp.dest(config.paths.fonts.final.all))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Putting file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }));
});