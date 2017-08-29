/**
 * Created by npatel on 7/26/16.
 */
var gulp = require('gulp'),
    //THIS IS HOW WE BRING IN BRAND VARIABLES
    config_brand = require('../brand/gulp/config') // Relative to this file
    ;


//THIS IS HOW WE ARE ABLE TO USE VARIABLES IN THE GULP TASKS
module.exports = {
    //declaring basePaths, common locations from which to call out paths (EXPORTABLE using variables above)
    variable: {
        coder: config_brand.variable.coder,
        project: config_brand.variable.project,
        app_title: config_brand.variable.app_title,
        page_title: config_brand.variable.app_title,
        live_domain: config_brand.variable.live_domain,
        https_option_live_domain: config_brand.variable.https_option_live_domain,
        local_domain: config_brand.variable.local_domain,
        local_domain_xip: config_brand.variable.local_domain_xip,
        local_mamp: config_brand.variable.local_mamp,
        https_option_local_domain: config_brand.variable.https_option_local_domain,
        https_option_local_domain_xip: config_brand.variable.https_option_local_domain_xip,
        https_option_live_static_default: config_brand.variable.https_option_live_static_default,
        https_option_live_static_folder: config_brand.variable.https_option_live_static_folder
    },
    basePaths: {
        bower: config_brand.basePaths.bower,
        vendor_src: config_brand.basePaths.vendor_src,
        brand_src: config_brand.basePaths.brand_src,
        src: config_brand.basePaths.src,
        dest: config_brand.basePaths.dest,
        final: config_brand.basePaths.final,
        local: config_brand.basePaths.local
    },
    //declaring paths, common locations from which to call globs
    paths: {
        favicons: {
            brand: {
                //master favicon to generate all favicons from
                master: config_brand.basePaths.brand_src + 'favicon_master/icon-master.png',
                //template needed to generate favicon.php on final destination, that has links to favicons for headers
                inject_template: config_brand.basePaths.src + 'tpl/favicon.php'
            },
            final: {
                //location of all images, most generated from brand images folder.
                png: config_brand.basePaths.final + '[mstile]*.png',
                svg: config_brand.basePaths.final + '[safari]*.svg',
                namesake: config_brand.basePaths.final + '[favicon]*.{png,ico}',
                namesake_php: config_brand.basePaths.final + 'favicon.php',
                namesake_json: config_brand.basePaths.final + 'faviconData.json',
                manifest: config_brand.basePaths.final + 'manifest.json',
                browserconfig: config_brand.basePaths.final + 'browserconfig.xml'
            }
        },
        scss: {
            bower: {
                //location of fontawesome sass from bower_components
                fa: config_brand.basePaths.bower + 'font-awesome/scss/**/**.scss',
                //location of animate.css sass from bower_components
                an: config_brand.basePaths.bower + 'animate-sass/**/**.scss',
                //location of settings.css from bower_components
                sliderrev: config_brand.basePaths.bower + 'sliderrev/src/css/**.css',
                //location of fontawesome sass from bower_components
                bs: config_brand.basePaths.bower + 'bootstrap-sass/assets/stylesheets/**/**.scss',
                //location of bxslider css from bower_components
                bxslider4: config_brand.basePaths.bower + 'bxslider-4/dist/jquery.bxslider.css',
                //location of bxslider css from bower_components
                badger: config_brand.basePaths.bower + 'badger/badger.css',
                //location of odometer css from bower_components
                odometer_1: config_brand.basePaths.bower + 'odometer/sass/odometer-theme-minimal.sass',
                odometer_2: config_brand.basePaths.bower + 'odometer/sass/_mixins.sass'
            },
            vendor: {
                //location of where fontawesome sass goes, so that our sass/screen.scss can build using it
                fa: config_brand.basePaths.vendor_src + 'sass/font-awesome/',
                //location of where animate.css sass goes, so that our sass/screen.scss can build using it
                an: config_brand.basePaths.vendor_src + 'sass/animate/',
                //location of where settings.css sass goes, so that our sass/screen.scss can build using it
                sliderrev: config_brand.basePaths.vendor_src + 'sass/sliderrev/',
                sliderrev_concat_template: config_brand.basePaths.src + 'tpl/_sliderrev-prepend.scss',
                //location of where bootstrap sass goes, so that our sass/screen.scss can build using it
                bs: config_brand.basePaths.vendor_src + 'sass/bootstrap/',
                //location of where bxslider4 sass goes, so that our sass/screen.scss can build using it
                bxslider4: config_brand.basePaths.vendor_src + 'sass/bxslider4/',
                bxslider4_concat_template: config_brand.basePaths.src + 'tpl/_bxslider-prepend.scss',
                //location of where bxslider4 sass goes, so that our sass/screen.scss can build using it
                badger: config_brand.basePaths.vendor_src + 'sass/badger/',
                //location of where odometer sass goes, so that our sass/screen.scss can build using it
                odometer: config_brand.basePaths.vendor_src + 'sass/odometer/'
            },
            //final location of css, can call using paths.scss.final
            final: config_brand.basePaths.final + '_css/'
        },
        css: {
            //final location of css, can call using paths.css.final
            final: config_brand.basePaths.final + '_css/',
            //used to watch and inject
            watch: config_brand.basePaths.final + '_css/*.css'
        },
        fonts: {
            bower: {
                //location of fontawesome fonts from bower_components
                fa: config_brand.basePaths.bower + 'font-awesome/fonts/**.*',
                //location of bootstrap fonts from bower_components
                bs: config_brand.basePaths.bower + 'bootstrap-sass/assets/fonts/bootstrap/**.*'
            },
            vendor: {
                //@TODO confirm why Neil did this?
                //location of where fontawesome fonts goes, so that our sass/screen.scss can build using it
                fa: config_brand.basePaths.vendor_src + 'fonts/font-awesome/',
                //location of where bootstrap fonts goes, so that our sass/screen.scss can build using it
                bs: config_brand.basePaths.vendor_src + 'fonts/bootstrap/'
            },
            innovate: {
                //location of innovate fonts independent of brand and vendor
                all: config_brand.basePaths.src + 'fonts/**/*.*'
            },
            brand: {
                //location of brand fonts independent of innovate and vendor
                all: config_brand.basePaths.brand_src + 'fonts/**/*.*'
            },
            final: {
                //location of all fonts after it comes from innovate,brand,vendor. Should be split up by folder
                all: config_brand.basePaths.final + '_fonts/',
                //location of all fontawesome fonts after it comes from vendor. Should be split up by folder
                fa: config_brand.basePaths.final + '_fonts/font-awesome/',
                //location of all bootstrap fonts after it comes from vendor. Should be split up by folder
                bs: config_brand.basePaths.final + '_fonts/bootstrap/'
            }
        },
        images: {
            bower: {
                //location of minified jquery scripts from bower_components
                bxslider4: config_brand.basePaths.bower + 'bxslider-4/dist/images/**/*.*',
                sliderrev: config_brand.basePaths.bower + 'sliderrev/src/images/**/*.*',
                sliderrev2: config_brand.basePaths.bower + 'sliderrev/src/assets/**/*.*'
            },
            brand: {
                //location of all images from the brand folder images directory. This images will be changed beforehand based on brand.
                all: config_brand.basePaths.brand_src + 'img/**/*.*'
            },
            vendor: {
                //location of bxslider images
                bxslider4: config_brand.basePaths.vendor_src + 'images/bxslider-4/',
                sliderrev: config_brand.basePaths.vendor_src + 'images/sliderrev/',
                sliderrev2: config_brand.basePaths.vendor_src + 'images/sliderrev/assets'
            },
            final: {
                //location of all images, most generated from brand images folder.
                all: config_brand.basePaths.final + '_img/',
                //location of bxslider images, most generated from brand images folder.
                bxslider4: config_brand.basePaths.final + '_img/bxslider-4',
                sliderrev: config_brand.basePaths.final + '_img/sliderrev',
                sliderrev2: config_brand.basePaths.final + '_img/sliderrev/assets'

            }
        },
        scripts: {
            bower: {
                //location of minified jquery scripts from bower_components
                jquery: config_brand.basePaths.bower + 'jquery/dist/jquery.min.js',
                //location of minified boostrap scripts from bower_components
                bs: config_brand.basePaths.bower + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',

                //location of minified jquery-validate scripts from bower_components
                //MINIFIED VERSION OF VALIDATE DOES NOT WORK WITH OUR CODE???, HAVE TO USE FULL VERSION
                jquery_validate: config_brand.basePaths.bower + 'jquery-validation/dist/jquery.validate.js',
                //location of minified raphael scripts from bower_components
                /*raphael: config_brand.basePaths.bower + 'raphael/raphael.min.js',*/ //Commented out for now, raphael only needed for IE10 and lower?
                //location of minified select2 scripts from bower_components
                select2: config_brand.basePaths.bower + 'select2/dist/js/select2.min.js',
                //location of minified bxslider4 scripts from bower_components
                bxslider4: config_brand.basePaths.bower + 'bxslider-4/dist/jquery.bxslider.min.js',
                //location of minified badger scripts from bower_components
                badger: config_brand.basePaths.bower + 'badger/badger.js',
                vegas: config_brand.basePaths.bower + 'vegas/dist/jquery.vegas.min.js',
                circles: config_brand.basePaths.bower + 'circles/inc/TimeCircles.js',
                sliderrev: config_brand.basePaths.bower + 'sliderrev/src/js/jquery.themepunch.revolution.min.js',
                sticky: config_brand.basePaths.bower + 'sticky/jquery.sticky.js',
                flexisel: config_brand.basePaths.bower + 'flexisel/js/jquery.flexisel.js',
                fitvids: config_brand.basePaths.bower + 'fitvids-kaltura/jquery.fitvids.kaltura.js',
                scrollup: config_brand.basePaths.bower + 'scrollup/src/jquery.scrollUp.js',
                isotope: config_brand.basePaths.bower + 'isotope/jquery.isotope.min.js',
                wow: config_brand.basePaths.bower + 'wow/dist/wow.min.js',
                uitabs: config_brand.basePaths.bower + 'jquery-ui/jquery-ui.min.js',
                //location of minified barcode scripts from bower_components
                barcode: config_brand.basePaths.bower + 'jquery-barcode/jquery-barcode.js',
                //location of minified datatables scripts from bower_components
                jquery_datatables: config_brand.basePaths.bower + 'datatables/media/js/jquery.dataTables.min.js',
                datatables_bootstrap: config_brand.basePaths.bower + 'datatables/media/js/dataTables.bootstrap.min.js',
                //location of minified datatables scripts from bower_components
                jquery_mark: config_brand.basePaths.bower + 'mark.js/dist/jquery.mark.min.js',
                //location of minified datatables scripts from bower_components
                jquery_datatables_mark: config_brand.basePaths.bower + 'datatables.mark.js/dist/datatables.mark.min.js',
                //location of odometer
                odometer: config_brand.basePaths.bower + 'odometer/odometer.min.js',
                chartjs: config_brand.basePaths.bower + 'chartjs/dist/Chart.js'
            },
            vendor: {
                //location of where vendor scripts go, after being pulled from bower,  can be pull from here to use
                all: config_brand.basePaths.vendor_src + 'js/**/*.js',
                //specific location to put vendor jquery script.  can be pull from here to use
                jquery: config_brand.basePaths.vendor_src + 'js/jquery/',
                //specific location to put vendor bootstrap script.  can be pull from here to use
                bs: config_brand.basePaths.vendor_src + 'js/bootstrap/',

                //specific location to put vendor jquery-validate script.  can be pull from here to use
                jquery_validate: config_brand.basePaths.vendor_src + 'js/jquery-validation/',
                //specific location to put vendor raphael script.  can be pull from here to use
                /*raphael: config_brand.basePaths.vendor_src + 'js/raphael/',*/ //Commented out for now, raphael only needed for IE10 and lower?
                //specific location to put vendor select2 script.  can be pull from here to use
                select2: config_brand.basePaths.vendor_src + 'js/select2/',
                //specific location to put vendor bxslider4 script.  can be pull from here to use
                bxslider4: config_brand.basePaths.vendor_src + 'js/bxslider4/',
                //specific location to put vendor badger script.  can be pull from here to use
                badger: config_brand.basePaths.vendor_src + 'js/badger/',
                vegas: config_brand.basePaths.vendor_src + 'js/vegas/',
                circles: config_brand.basePaths.vendor_src + 'js/circles/',
                sliderrev: config_brand.basePaths.vendor_src + 'js/sliderrev/',
                sticky: config_brand.basePaths.vendor_src + 'js/sticky/',
                flexisel: config_brand.basePaths.vendor_src + 'js/flexisel/',
                fitvids: config_brand.basePaths.vendor_src + 'js/fitvids/',
                scrollup: config_brand.basePaths.vendor_src + 'js/scrollup/',
                isotope: config_brand.basePaths.vendor_src + 'js/isotope/',
                wow: config_brand.basePaths.vendor_src + 'js/wow/',
                uitabs: config_brand.basePaths.vendor_src + 'js/uitabs/',
                //specific location to put vendor barcode script.  can be pull from here to use
                barcode: config_brand.basePaths.vendor_src + 'js/barcode/',
                //specific location to put vendor datatables script.  can be pull from here to use
                jquery_datatables: config_brand.basePaths.vendor_src + 'js/datatables/',
                datatables_bootstrap: config_brand.basePaths.vendor_src + 'js/datatables/',
                //specific location to put vendor datatables script.  can be pull from here to use
                odometer: config_brand.basePaths.vendor_src + 'js/odometer/',
                //specific location to put vendor datatables script.  can be pull from here to use
                jquery_mark: config_brand.basePaths.vendor_src + 'js/mark/',
                jquery_datatables_mark: config_brand.basePaths.vendor_src + 'js/mark/',
                chartjs: config_brand.basePaths.vendor_src + 'js/chartjs/'


            },
            innovate: {
                //specific location to pull innovate scripts
                all: config_brand.basePaths.src + 'js/**/*.js'
            },
            //specific location to push to in the build folder ............
            dest: config_brand.basePaths.dest + 'js/',
            //location of final scripts, innovate.min.js, and vendor.min.js, most generated from brand images folder.
            final: config_brand.basePaths.final + '_js/',
            //used to watch and inject
            watch: config_brand.basePaths.final + '_js/*.js',
            watch2: config_brand.basePaths.final + 'angular_training/js/*.js'
        },
        license: {
            //location of template license file, this is used to generate a timestamp and place in concat area.
            license_src: config_brand.basePaths.src + 'tpl/license.js',
            //location of templated license file, this is used to prepend.
            dest: config_brand.basePaths.dest + 'license/',
            //location of concat license file, this is used to prepend to the innovate.js and innovate.min.js file, so it shows last updated by person
            concat_src: config_brand.basePaths.dest + 'license/license.js'
        },
        php: {
            tpl: {
                //location of template cache_buster file, this is used to generate a branded domain.php.
                domain_src: config_brand.basePaths.src + 'tpl/domain.php',
                //location of template cache_buster file, this is used to generate a timestamped cache buster.
                cache_src: config_brand.basePaths.src + 'tpl/cache_buster.php',
                //location of live_or_local file, this is used to generate a local_or_live file in the right directory after build.
                lol_src: config_brand.basePaths.src + 'tpl/local_or_live.php'
            },
            //location of phpinfo file, this is used to generate a phpinfo file in the right directory after build.
            test_src: config_brand.basePaths.src + 'php/phpinfo.php',
            //location of phpinfo file, this is used to generate a phpinfo file in the right directory after build.
            test_final: config_brand.basePaths.final + '_test/',

            //location of live_or_local file, this is used to generate a local_or_live file in the right directory after build.
            lol_final: config_brand.basePaths.final,
            //location of domain file, this is used to generate a domain file in the right directory after build.
            domain_src: config_brand.basePaths.brand_src + 'php/domain.php',
            //location of domain file, this is used to generate a domain file in the right directory after build.
            domain_final: config_brand.basePaths.final,


            //location of generated cache_buster file,
            dest: config_brand.basePaths.dest + 'php/',
            //final location of cache_bsuter file, generated from build
            final: {
                //location of all php
                all: config_brand.basePaths.final,
                //final location of cache_buster file, generated from build
                git_ignored: config_brand.basePaths.final + '{local_or_live,domain,cache_buster}*.php'
            },
            //used to watch and inject
            watch: config_brand.basePaths.final + '**/*.php',
        },
        htaccess: {
            tpl: {
                src: config_brand.basePaths.src + 'tpl/.htaccess-tpl'
            },
            final: {
                //location of all images, most generated from brand images folder.
                all: config_brand.basePaths.final,
                git_ignored: config_brand.basePaths.final + '.htaccess*'
            }
        }
    }
};
