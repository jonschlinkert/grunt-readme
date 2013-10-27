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
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    // Pull down a list of repos from Github.
    repos: {
      helpers: {
        options: {
          path: '/orgs/helpers/'
        },
        files: {
          'tmp/helpers.json': ['repos?page=1&per_page=100']
        }
      },
      assemble: {
        options: {
          path: '/orgs/assemble/'
        },
        files: {
          'tmp/assemble.json': ['repos?page=1&per_page=100']
        }
      }
    },

    readme: {
      options: {
        // metadata: 'docs/one.json',
        // metadata: ['docs/one.json', 'docs/two.yml'],
        // metadata: ['docs/*.{json,yml}'],
        // metadata: {
        //   name: "Bar"
        // }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Run this task, then test the results.
  grunt.registerTask('test', ['readme', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'readme']);

};
