module.exports = function(grunt) {
    var aBarFiles = [
        'src/js/bar/store/*.js',
        'src/js/bar/**/*.js'
    ];
    var aSpecFiles = [
        'tests/specs/**/*Spec.js'
    ];
    grunt.initConfig({
        //  Copy
        copy: {
            index : {
                src: 'index.html', dest: 'index_dev.html'
            },
            fixture: {
                src: 'index.html', dest: './tests/fixtures/fixture.html'
            }
        },
        replace: {
            index_dev: { // Does not edit README.md
                src: 'index_dev.html',
                overwrite: true,
                replacements: [
                    // {
                    //     from: 'bar.min.js',
                    //     to: 'bar.js'
                    // },
                    {
                        from: ' manifest="bar.manifest"',
                        to: ''
                    }
                ]
            },
            fixture: {
                src: './tests/fixtures/fixture.html',
                overwrite: true,
                replacements: [
                    {
                        from: /<!DOCTYPE html>[\s\S]*<\/head>/gi,
                        to: ''
                    },
                    {
                        from: /<script[\s\S]*script>/gi,
                        to: ''
                    },
                    {
                        from: '</html>',
                        to: ''
                    },
                    {
                        from: /^(?=\n)$|^\s*|\s*$|\n\n+/gm,
                        to: ''
                    }
                ]
            }
        },
        // injector
        injector: {
            options: {
                prefix: '.'
            },
            index_dev: {
                files: {
                    'index_dev.html': aBarFiles
                }
            }
        },
        //  Concat
        concat: {
            options: {
                separator: ';'
            },
            js: {
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
                    iconsPath: './src/img/favicon/',
                    html: ['*.html'],
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
                                shortName: 'Bar.js',
                                description: "L'application de partage de l'apéro !",
                                lang: "fr",
                                scope: "/",
                                startUrl: '/',
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
                src: aBarFiles,
                options: {
                    vendor: [
                        'lib/jquery/jquery.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                        'lib/materialize/js/materialize.min.js',
                        'src/js/materializer.js',
                        'lib/o876/o2.js'
                    ],
                    styles: 'src/css/style.css',
                    specs: aSpecFiles,
                    helpers: 'tests/helper.js',
                    keepRunner : true
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-real-favicon');
    grunt.loadNpmTasks('grunt-injector');

    // define the tasks
    grunt.registerTask('monitor', ["dev-start", "concurrent:monitor"]);
    grunt.registerTask('release', [
        "concat:js",
        "uglify:dist"
    ]);
    grunt.registerTask('dev-start', [
        "copy:index",
        "replace:index_dev",
        "injector:index_dev"
    ]);
    grunt.registerTask('dev', [
        "concat:js",
        "tests"
    ]);
    grunt.registerTask('tests', [
        "copy:fixture",
        "replace:fixture",
        "jasmine"
    ]);
};