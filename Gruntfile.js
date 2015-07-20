module.exports = function(grunt) {
    'use strict';

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            build: {
                src: ['src/**/*.js'],
                dest: '.build/main.js',
                options: {
                    transform: ['babelify'],
                    require: ['babelify/polyfill']
                }
            }
        },

        uglify: {
            build: {
                src: 'dist/seed.js',
                dest: 'dist/seed.min.js'
            }
        },

        copy: {
            assets: {
                files: [
                    {src: './assets/*', expand: true, cwd: 'src', dest: '.build/'}
                ]
            }
        },

        jsdoc: {
            all: {
                src: ['src/**/*.js', 'tests/**/*.js'],
                dest: 'doc'
            }
        },

        watch: {
            all: {
                files: ['src/**/*.js', 'tests/**/*.js'],
                tasks: ['jshint:all'],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            all: ['.build/*']
        },

        karma: {
            production: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            development: {
                configFile: 'karma.conf.js',
                coverageReporter: {type: 'html'},
                autoWatch: true,
                singleRun: false
            }
        },

        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonbsp: true,
                nonew: true,
                plusplus: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                maxlen: 120,
                browser: true,
                devel: false,
                jasmine: true,
                browserify: true,
                esnext: true
            },
            all: {
                src: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js']
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-force-task');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');

    grunt.event.on('watch', function(action, path) {
        grunt.config('jshint.all.src', path);
    });

    grunt.registerTask('build', ['clean:all', 'jshint:all', 'browserify:build', 'copy:assets']);

    grunt.registerTask('default', ['build', 'watch:all']);

    grunt.registerTask('test', ['karma:production']);
};
