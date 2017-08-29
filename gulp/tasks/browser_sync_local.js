var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        browserSync: require('browser-sync')
    };

gulp.task('_watch_local',['sass'], function() {
    $.browserSync.init({
        proxy: "monopar.di.dev.dstarr"
    });
    //IF CSS SPECIFIC FILES changes in the folder, inject that one file
    gulp.watch(config.paths.css.watch).on('change', function (file) {
        $.browserSync.reload(file.path);
    });
    //IF JS SPECIFIC FILES changes in the folder, inject that one file
    gulp.watch(config.paths.scripts.watch).on('change', function (file) {
        $.browserSync.reload(file.path);
    });
    gulp.watch(config.paths.scripts.watch2).on('change', function (file) {
        $.browserSync.reload(file.path);
    });
    //IF PHP SPECIFIC FILES changes in the folder, inject that one file
    gulp.watch(config.paths.php.watch).on('change', $.browserSync.reload);

});

gulp.task('sass', function() {
    return gulp.src("innovate/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("_css/css"))
        .pipe($.browserSync.stream());
});