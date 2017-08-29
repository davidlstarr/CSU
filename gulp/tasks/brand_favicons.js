/**
 * Created by npatel on 7/26/16.
 */
var gulp = require('gulp'),
    config = require('../config'), // Relative to this file
    $ = {
        realFavicon: require('gulp-real-favicon'),
        fs: require('fs'),
        intercept: require('gulp-intercept'),
        gutil: require('gulp-util'),
        plumber: require('gulp-plumber')
    };

var FAVICON_DATA_FILE = 'faviconData.json';

//This reads as run task _brand_favicons                  , but only after doing in order ['__generate-favicon', '__inject-favicon-markups']
//This reads as run task STEP 3 (with no actionable items), but only after doing in order '<STEP 1>',            '<STEP 2>'

//STEP 3 is dependent on STEP 1 and 2

//STEP 3: This contains steps 1 and 2 (overall it generates favicons based on one image, and then generated head tags as needed
gulp.task('_brand_favicons', ['__inject-favicon-markups']);


//STEP 1: This takes the master icon in branding folder and then sends to realfavicon website to generate favicons using the options listed
// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('__generate-favicon', function (done) {
    $.realFavicon.generateFavicon({
        masterPicture: config.paths.favicons.brand.master,
        dest: config.basePaths.final,
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: true,
                    precomposedIcons: true,
                    declareOnlyDefaultIcon: false
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    name: config.variable.app_title,
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#5bbad5'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function () {
        done();
    })
});


//STEP 2: This takes the template for favicon.php and injects the html tags of the favicon and puts it in the main directory
// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('__inject-favicon-markups', ['__generate-favicon'], function () {
    gulp.src([config.paths.favicons.brand.inject_template])
        .pipe($.realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest(config.basePaths.final));
});


// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('__check-for-favicon-update', function (done) {
    var currentVersion = JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).version;
    $.realFavicon.checkForUpdates(currentVersion, function (err) {
        if (err) {
            throw err;
        }
    });
});