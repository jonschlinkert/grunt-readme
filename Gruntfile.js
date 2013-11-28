/*
 * grunt-readme
 * https://github.com/assemble/grunt-readme
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Pull down a list of repos from Github.
    repos: {
      helpers: {
        options: {
          username: 'assemble',
          include: ['grunt'],
          exclude: ['grunt-assemble', 'example', 'data', 'init', 'gruntjs', 'readme']
        },
        files: {
          'docs/tasks.json': ['repos?page=1&per_page=100']
        }
      }
    },

    readme: {
      options: {
        alt: {
          src: ['docs/DOCS.tmpl.md'],
          dest: './'
        },
        // This is only for tests! For most projects, the readme task doesn't even
        // need to be defined in the Gruntfile, and zero configuration is required.
        metadata: ['docs/tasks.json'],
        test: {
          src: ['test/fixtures/*.{tmpl.md,md}', 'templates/**/*.{tmpl.md,md}'],
          dest: 'test/actual/'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-repos');

  // Docs
  grunt.registerTask('docs', ['repos', 'readme']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'readme']);

};
