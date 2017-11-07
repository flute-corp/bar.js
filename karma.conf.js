// Karma configuration
// Generated on Fri Dec 30 2016 11:44:23 GMT+0100 (CET)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [

            // lib
            'lib/jquery/jquery.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'lib/materialize/js/materialize.min.js',
            'src/js/materializer.js',
            'lib/o876/o2.js',
            'lib/d3/d3.v4.min.js',
            // src
            'src/js/bar/store/*.js',
            'src/js/bar/**/*.js',
            {
                pattern: 'src/img/**/*',
                watched: false,
                included: false,
                served: true
            },
            // config
            'tests/helper.js',
            // Specs
            'tests/**/*Spec.js',
            {
                pattern: 'tests/fixtures/**/*.html',
                watched: true,
                included: false,
                served: true
            }
        ],

        proxies: {
            "/src/": "/base/src/"
        },


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/js/bar/*.js' : ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots','coverage'],

        coverageReporter : {
            reporters : [
                {
                    type : 'html',
                    dir : 'coverage/'
                },
                {
                    type : 'clover',
                    dir : 'clover/'
                },
                // generates ./coverage/lcov.info
                {type:'lcovonly', subdir: '.'},
                // generates ./coverage/coverage-final.json
                {type:'json', subdir: '.'}
            ]
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS', 'Firefox'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}