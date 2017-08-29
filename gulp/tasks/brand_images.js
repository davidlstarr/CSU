/**
 * Created by npatel on 7/26/16.
 */
var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        intercept: require('gulp-intercept'),
        gutil: require('gulp-util'),
        plumber: require('gulp-plumber'),
        imagemin: require('gulp-imagemin')
    };
var onError = function (error) {
    $.gutil.log($.gutil.colors.cyan(error.message));
    this.emit('end');
};

//This moves all brand images inside the brand folder to the final location _img

gulp.task('_brand_img', function () {
    return gulp.src(config.paths.images.brand.all)
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Getting file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }))
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.paths.images.final.all))
        .pipe($.intercept(function (file) {
            $.gutil.log($.gutil.colors.yellow('Putting file: ' + file.path.replace(config.basePaths.local, '')));
            return file;
        }));
});