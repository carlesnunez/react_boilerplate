module.exports = function(grunt) {
    'use strict';

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            build: {
                src: ['src/**/*.js'],
                dest: '.build/index.js',
                options: {
                    transform: ['babelify'],
                    require: ['babelify/polyfill']
                }
            }
        },
        copy: {
            assets: {
                files: [
                    {cwd: 'src', expand: true, src: './assets/*', dest: '.build/'}
                ]
            }
        },
        watch: {
            all: {
                files: ['src/**/*.js', 'tests/**/*.js'],
                tasks: ['default'],
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
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.event.on('watch', function(action, path) {
        grunt.config('jshint.all.src', path);
    });

    grunt.registerTask('build', ['clean:all', 'browserify:build', 'copy:assets']);

    grunt.registerTask('default', ['build', 'watch:all']);

    grunt.registerTask('test', ['karma:production']);
};
