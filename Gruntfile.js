module.exports = function(grunt) {
    'use strict';

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            build: {
                src: 'src/index.js',
                dest: '.build/js/index.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                        extensions: ['.es6','.jsx','.js']
                    },
                    transform: ['babelify']
                }
            }
        },
        copy: {
            assets: {
                files: [
                    {cwd: 'src', expand: true, src: './assets/*', dest: '.build/'}
                ]
            },
            html: {
                files: [
                    {cwd: 'src', expand: true, src: '*.html', dest: '.build/'}
                ]
            }
        },
        watch: {
            all: {
                files: ['src/**/*.jsx', 'tests/**/*.js'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.build'
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

    grunt.event.on('watch', function(action, path) {
        grunt.config('jshint.all.src', path);
    });

    grunt.registerTask('build', ['clean:all', 'browserify:build', 'copy:assets', 'copy:html']);

    grunt.registerTask('default', ['build', 'connect', 'watch:all']);

    grunt.registerTask('test', ['karma:production']);
};
