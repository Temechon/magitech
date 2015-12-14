module.exports = function (grunt) {

    require('time-grunt')(grunt);

    // load all grunt tasks
    require('jit-grunt')(grunt,{
        gitadd: 'grunt-git',
        gitcommit: 'grunt-git',
        gitpush: 'grunt-git'
    });

    grunt.initConfig({

        // Clean dist folder (all except lib folder)
        clean: {
            js: ["dist/css","dist/js/*", "!dist/js/libs/**",  "dist/index.html"]
        },

        // Compilation from ES6 to ES5 with Babel
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: '**/*.js',
                    dest: 'dist/js/',
                    ext: '.js'
                }]
            }
        },
        // Watches content related changes
        watch : {
            js : {
                files: ['js/**/*.js'],
                tasks: ['babel']
            },
            sass : {
                files: ['sass/**/*.scss'],
                tasks: ['sass','postcss:debug']
            },
            html : {
                files: ['html/**/*.html'],
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
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        // Build dist version
        uglify : {
            dist: {
                options: {
                    options: {
                        beautify: false
                    }
                },
                files: {
                    'dist/js/index.js': ['dist/js/**/*.js', '!dist/js/libs/**/*.js']
                }
            }
        },
        // Sass compilation. Produce an extended css file in css folder
        sass : {
            options: {
                sourcemap:'none',
                style: 'expanded'
            },
            dist : {
                files: {
                    'dist/css/main.css': 'sass/main.scss'
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
                src: 'dist/css/main.css'
            },
            dist: {
                options: {
                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'}),
                        require('cssnano')()
                    ]
                },
                src: 'dist/css/main.css'
            }
        },
        // Bake HTML file (link includes in the main html file)
        bake : {
            index: {
                files: {
                    'dist/index.html': "html/index.html"
                }
            }
        },

        // GIT STUFF
        gitadd: {
            options: {
                verbose: true,
                force:false,
                add:true
            },

            magitech: {
                options: {
                    cwd: "./"
                },
                files: {
                    src: ["./"]
                }
            }
        },
        gitcommit: {
            task: {
                options: {
                    verbose: true,
                    message: grunt.option('msg')
                }
            }
        },
        gitpush: {
            task: {
                options: {
                }
            }
        }

    });

    grunt.registerTask('default', 'Compile and watch source files', [
        'dev',
        'watch'
    ]);

    grunt.registerTask('dev', 'build dev version', [
        'babel',
        'sass',
        'postcss:debug',
        'bake'
    ]);

    grunt.registerTask('dist', 'build dist version', [
        'dev',
        'htmlmin',
        'uglify'
    ]);

    grunt.registerTask('git', 'Add, commit and push on github', [
        'gitadd',
        'gitcommit',
        'gitpush'
    ]);
};


