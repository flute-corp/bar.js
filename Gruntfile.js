module.exports = function(grunt) {
    var aBarFiles = [
        'src/js/bar/store/*.js',
        'src/js/bar/**/*.js',
        '!src/js/bar/main.js',
        'src/js/bar/main.js'
    ];
    var aSpecFiles = [
        'tests/spec/**/*Spec.js'
    ];
    grunt.initConfig({
        //  Concat
        concat: {
            options: {
                separator: ';'
            },
            dev: {
                // the files to concatenate
                src: aBarFiles,
                // the location of the resulting JS file
                dest: 'src/js/bar.js'
            }
        },
        //  Uglify
        uglify: {
            options: {
                // Use these options when debugging
                // mangle: false,
                // compress: false,
                // beautify: true
            },
            dist: {
                files: {
                    'src/js/bar.min.js': ['src/js/bar.js']
                }
            }
        },
        // RealFavicon
        realFavicon: {
            favicons: {
                src: './src/img/favicon/bar.svg',
                dest: './src/img/favicon/',
                options: {
                    iconsPath: '/src/img/favicon/',
                    html: ['index.html'],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#cccccc',
                            margin: '14%',
                            assets: {
                                ios6AndPriorIcons: true,
                                ios7AndLaterIcons: true,
                                precomposedIcons: false,
                                declareOnlyDefaultIcon: false
                            },
                            appName: 'Bar.js'
                        },
                        desktopBrowser: {},
                        windows: {
                            pictureAspect: 'noChange',
                            backgroundColor: '#cccccc',
                            onConflict: 'override',
                            assets: {
                                windows80Ie10Tile: false,
                                windows10Ie11EdgeTiles: {
                                    small: false,
                                    medium: true,
                                    big: false,
                                    rectangle: false
                                }
                            },
                            appName: 'Bar.js'
                        },
                        androidChrome: {
                            pictureAspect: 'shadow',
                            themeColor: '#1565c0',
                            manifest: {
                                name: 'Bar.js',
                                startUrl: 'http://bar.nexk.fr',
                                display: 'standalone',
                                orientation: 'notSet',
                                onConflict: 'override',
                                declared: true
                            },
                            assets: {
                                legacyIcon: true,
                                lowResolutionIcons: true
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
                    versioning: {
                        paramName: 'v',
                        paramValue: 'WGa5Pq7KMj'
                    }
                }
            }
        },
        //  Jasmine
        jasmine: {
            components: {
                src: [
                    'src/js/bar.js'
                ],
                options: {
                    vendor: [
                        'lib/jquery/jquery.js',
                        'lib/materialize/js/materialize.min.js',
                        'lib/o876/o2.js'
                    ],
                    styles: 'src/css/style.css',
                    specs: aSpecFiles,
                    // helpers: 'tests/spec/helper.js',
                    keepRunner : true,
                    //helpers: 'test/spec/*.js'
                }
            }
        },
        //  Watch Files
        watch: {
            favicon: {
                files: ['src/img/bar.svg'],
                tasks: ['realFavicon'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            },
            js: {
                files: ["src/js/bar/**/*.js"],
                tasks: ['dev'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            },
            tests: {
                files: aSpecFiles,
                tasks: ['tests'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            }
        },
        //  Concurrent
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            monitor: {
                tasks: ["watch:favicon", "watch:js", "watch:tests"]
            }
        }
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-real-favicon');

    // define the tasks
    grunt.registerTask('monitor', ["concurrent:monitor"]);
    grunt.registerTask('release', [
        "concat:dev",
        "realFavicon",
        "uglify:dist"
    ]);
    grunt.registerTask('dev', [
        "concat:dev",
        "tests"
    ]);
    grunt.registerTask('tests', [
        "jasmine"
    ]);
};