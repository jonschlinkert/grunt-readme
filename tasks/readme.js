/**!
 * grunt-readme
 * http://github.com/assemble/
 * Inspired by grunt-contrib-internal
 *
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


  var frep = require('frep');
  var path = require('path');

  grunt.util._.mixin(require('./lib/mixins'));

  // Add custom template delimiters for our templates.
  grunt.template.addDelimiters('readme', '{%', '%}');


  grunt.registerTask('readme', "Generate your project's README from a template. If you already use Grunt, this is a no brainer.", function() {

    var docs;
    var templates;

    var options = this.options({});
    var metadata = options.metadata ? grunt.file.readJSON(options.metadata) : {};
    var meta = grunt.util._.defaults(metadata, grunt.file.readJSON('package.json'));

    // The directory where our templates will be stored.
    if(options.templates) {
      templates = path.join.bind(options.templates, 'templates');
    } else {
      templates = path.join.bind(null, __dirname, 'templates');
    }

    // The directory where our docs content will be stored.
    if(options.docs) {
      docs = path.join.bind(options.docs, 'docs');
    } else {
      docs = path.join.bind(process.cwd(), 'docs');
    }

    // Add mixins for use in our templates.
    grunt.util._.mixin({
      resolve: function (filepath, sep) {
        sep = options.sep || '';
        return grunt.util._.globContent(templates(filepath), sep);
      },
      doc: function (filepath, sep) {
        sep = options.sep || '';
        return grunt.util._.globContent(docs(filepath), sep);
      },
      include: function (filepath, sep) {
        sep = options.sep || '';
        return grunt.util._.globContent(templates(filepath), sep);
      },
      shortname: function (name) {
        return grunt.util._.shortname(name);
      }
    });

    meta.changelog = grunt.file.readYAML('CHANGELOG');
    meta.travis = grunt.file.exists('.travis.yml');
    if (meta.travis) {
      meta.travis = meta.repository.url.replace(/.*:\/\/github.com\/(.*)\.git/, 'https://travis-ci.org/$1');
    }

    var authors = grunt.file.read('AUTHORS');
    meta.authors = authors.split('\n').map(function(author) {
      var matches = author.match(/(.*?)\s*\((.*)\)/) || [];
      return {name: matches[1], url: matches[2]};
    });


    // Used to display the "in development" warning message @ the top.
    meta.in_development = (meta.keywords || []).indexOf('gruntplugin') === -1 || '';

    // Read plugin/task docs.
    meta.docs = {plugin: {}, task: {}};
    grunt.file.expand(docs + '/*.md').forEach(function(filepath) {
      // Parse out the task name and section name.
      var basename = path.basename(filepath, '.md');
      var parts = basename.split('-');
      var section = parts.pop();
      var taskname = parts.join('-');

      var namespace = taskname ? meta.docs.task : meta.docs.plugin;
      if (taskname) {
        if (!namespace[taskname]) { namespace[taskname] = {}; }
        namespace = namespace[taskname];
      }

      // Read doc file.
      var doc = grunt.file.read(filepath);
      // Adjust header level to be semantically correct for the readme.
      doc = doc.replace(/^#/gm, '###');
      // Process as template.
      doc = grunt.template.process(doc, {data: meta, delimiters: 'readme'});
      namespace[section] = doc;
    });

    // Generate readme.
    var tmpl = grunt.file.read(templates('README.tmpl.md'));
    var newReadme = grunt.template.process(tmpl, {data: meta, delimiters: 'readme'});

    // Only write readme if it actually changed.
    var existingReadme = grunt.file.exists('README.md') ? grunt.file.read('README.md') : '';
    var re = /(\*This file was generated on.*)/;
    if (existingReadme.replace(re, '') !== newReadme.replace(re, '')) {
      // Replace square brackets with curly braces. Square brackets are used on
      // lodash templates that should not be evaluated in code examples.
      grunt.file.write('README.md', newReadme.replace(/\[\%/g, '{%').replace(/\%\]/g, '%}'));
      grunt.log.ok('Created README.md');
    } else {
      grunt.log.ok('Keeping README.md.');
    }

    // Copy contributing guide from grunt.
    grunt.file.copy('node_modules/grunt/CONTRIBUTING.md', 'CONTRIBUTING.md');
    grunt.log.ok('Created CONTRIBUTING.md');

    // Fail task if any errors were logged.
    if (this.errorCount > 0) { return false; }
  });

};
