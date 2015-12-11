module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Compilation from ES6 to ES5 with Babel
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js/dev',
                    src: '**/*.js',
                    dest: 'src/js/dist/',
                    ext: '.js'
                }]
            }
        },
        // Watches content related changes
        watch : {
            js : {
                files: ['src/js/dev/**/*.js'],
                tasks: ['babel', 'uglify:debug']
            },
            sass : {
                files: ['sass/**/*.scss'],
                tasks: ['sass','postcss:debug']
            },
            html : {
                files: ['src/html/**/*.html'],
                tasks: ['bake']
            }
        },
        // HTML minifier
        htmlmin : {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'index.html'
                }
            }
        },
        // Build
        uglify : {
            // Build debug version
            debug: {
                options: {
                    width: 80,
                    mangle:false,
                    beautify: true
                },
                files: {
                    'js/index.js': ['src/js/dist/**/*.js']
                }
            },
            // Build dist version
            dist: {
                options: {
                    options: {
                        beautify: false
                    }
                },
                files: {
                    'js/index.js': ['src/js/dist/**/*.js']
                }
            }
        },
        // Sass compilation. Produce an extended css file in css folder
        sass : {
            options: {
                cacheLocation: '.tmp/.sass-cache',
                sourcemap:'none',
                style: 'expanded'
            },
            dist : {
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },
        // Auto prefixer css
        postcss : {
            debug : {
                options: {
                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'})
                    ]
                },
                src: 'css/main.css'
            },
            dist: {
                options: {
                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'}),
                        require('cssnano')()
                    ]
                },
                src: 'css/main.css'
            }
        },
        // Bake HTML file (link includes in the main html file)
        bake : {
            index: {
                files: {
                    "index.html": "src/html/index.html"
                }
            }
        },
        // Browser synchronisation
        browserSync : {
            bsFiles: {
                src : ['css/*.css', '*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        }

    });

    grunt.registerTask('default', 'Watch source files', [
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('dev', 'build dev version', [
        'sass',
        'postcss:debug',
        'bake',
        'uglify:debug'
    ]);

    grunt.registerTask('dist', 'build dist version', [
        'sass',
        'postcss:dist',
        'bake',
        'htmlmin',
        'uglify:dist'
    ])
};


