module.exports = function (grunt) {

    require('time-grunt')(grunt);

    // load all grunt tasks
    require('jit-grunt')(grunt,{
        gitadd: 'grunt-git',
        gitcommit: 'grunt-git',
        gitpush: 'grunt-git'
    });

    grunt.initConfig({

        // Compilation from ES6 to ES5 with Babel
        babel: {
            options: {
                sourceMap: true//,
                //presets: ['es2015']
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
                tasks: ['babel']
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
        // Build dist version
        uglify : {
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

    grunt.registerTask('default', 'Watch source files', [
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


