'use strict';

var gulp = require('gulp');

/** 
 * Compile TypeScript to JS
 */
gulp.task('compile', gulp.series(function(done) {
    var ts = require('gulp-typescript');
    // Default typescript config
    var defaultConfig = {
        typescript: require('typescript')
    };
    var tsProject, tsResult;
    // Create the typescript project
    tsProject = ts.createProject('tsconfig.json', defaultConfig);
    // Get typescript result
    tsResult = gulp.src(['./src/**/*.ts'], { base: '.' })
        .pipe(ts(tsProject))
        .pipe(gulp.dest('./'))
        .on('error', function(e) {
            done(e);
            process.exit(1);
        }).on('end', function() {
            done();
        });
}));

/**
 * Load the sample in src/app/index
 */
gulp.task('start', gulp.series('compile', function(done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        server: {
            baseDir: ['./src', './']
        },
        ui: false
    };
    bs.init(options, done);

    /**
    * Watching typescript file changes
    */
    gulp.watch('src/**/*.ts', gulp.series('compile', bs.reload)).on('change', reportChanges);
}));



function reportChanges(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
/**
 * Testing spec files
 */
var protractor = require('gulp-protractor').protractor;
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update_specific;

gulp.task('e2e-serve', webdriver_standalone);

gulp.task('e2e-webdriver-update', webdriver_update({
    webdriverManagerArgs: ['--ie', '--edge']
}));

gulp.task('e2e-test', gulp.series('compile', function(done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2');
    var options = {
        server: {
            baseDir: [
                './src/app/',
                './src/resource/',
                './node_modules/@syncfusion/ej2/'
            ],
            directory: true
        },
        ui: false,
        open: false,
        notify: false
    };
    bs.init(options, function() {
        gulp.src(['./spec/**/*.spec.js'])
            .pipe(protractor({
                configFile: 'e2e/protractor.conf.js'
            }))
            .on('error', function(e) {
                console.error('Error: ' + e.message);
                done();
                process.exit(1);
            })
            .on('end', function() {
                done();
                process.exit(0);
            });
    });
}));