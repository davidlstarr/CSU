/**
 * Created by npatel on 7/26/16.
 */
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//@TODO change these variables before running vendor and innovate scripts
var config_coder = require('../gulp/coder'); // Relative to this file;
var coder = config_coder.coder;
var coder_local = config_coder.ip;
var project = 'monopar';
var app_title = "Monopar Therapeutics";

var live_domain = "dancordev.com/monopartherapeutics";
var https_option_live_domain = "http://dancordev.com/monopartherapeutics";

var local_coder_mamp = "monopar.di.dev." + coder;
var local_domain = "monopar.di.dev." + coder;
var local_domain_xip = "monopar.di.dev." + coder + "." + coder_local + ".xip.io";
var https_option_local_domain = "http://monopar.di.dev." + coder;
var https_option_local_domain_xip = "http://monopar.di.dev." + coder + "." + coder_local + ".xip.io";

var https_option_live_static_default = "https://static.dancorincentives.com/_default/";
var https_option_live_static_folder = "https://static.dancorincentives.com/_elford/";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


//declaring basePaths, common locations from which to call out paths
var basePaths = {
    bower: 'bower_components/',
    vendor_src: 'vendor/',
    brand_src: 'brand/',
    src: 'innovate/',
    dest: 'build/',
    final: './',
    local: '/Users/' + coder + '/Documents/PHPStormProjects/' + project + '/'
};

//THESE ARE THE VARIABLES GETTING EXPORTED TO gulp/config.js. OUTSIDE OF BRAND FOLDER
module.exports = {
    variable: {
        coder: coder,
        local_coder_mamp: local_coder_mamp,
        coder_local: coder_local,
        project: project,
        app_title: app_title,
        page_title: app_title,
        live_domain: live_domain,
        https_option_live_domain: https_option_live_domain,
        local_domain: local_domain,
        local_domain_xip: local_domain_xip,
        https_option_local_domain: https_option_local_domain,
        https_option_local_domain_xip: https_option_local_domain_xip,
        https_option_live_static_default: https_option_live_static_default,
        https_option_live_static_folder: https_option_live_static_folder
    },
    basePaths: {
        bower: basePaths.bower,
        vendor_src: basePaths.vendor_src,
        brand_src: basePaths.brand_src,
        src: basePaths.src,
        dest: basePaths.dest,
        final: basePaths.final,
        local: basePaths.local
    }
};