/**
 * Created by npatel on 7/19/16.
 */
////////////////////////////////////////////////////////
    //@TODO install node first locally if not already installed, then run npm install to get dependencies in package.json file.
    //@TODO install composer first if not already installed (download phar file. Then goto Tools>Composer>Add Dependency, and update one of them that we have, that will trigger installing composer.json files)
////////////////////////////////////////////////////////
//@TODO change variables based on the project and coder and brand
    //Change in brand/gulp/config.js
    //Change in brand subfolders and Change in _brand subfolders
    //Change names in package.json
    //Change README.md
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var gulp = require('gulp');
var $ = {
    requireDir: require('require-dir')
};

////////////////////////////////////////////////////////
// Main tasks based off the pulling below via gulp/tasks

//cleans out GULP generated folders
//does not clean out Templates folder
//does not clean out _vendor folder (composer)
//does not clean out node_modules folder (node)
//does not cleanout composer


//You must run this once, if you have cleaned, and only after bower_setup
//It will create vendor.js and move over any branded items to correct locations
gulp.task('brand_setup', ['_brand_fonts', '_brand_favicons', '_brand_img']);


//run only if you have done the above tasks.
//This will compile innovate js and then turn on watch
gulp.task('default', ['_innovate_js', '_vendor_js', '_brand_img', '_watch']);


////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
// Pulling in all tasks from the tasks folder
$.requireDir('./gulp/tasks', {recurse: true});
////////////////////////////////////////////////////////
