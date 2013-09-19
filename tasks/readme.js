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
  var glob = require('utils-glob');
  var resolve = require('resolve-dep');
  var _ = grunt.util._;

  _.mixin(require('./lib/mixins'));

  // Add custom template delimiters for our templates.
  grunt.template.addDelimiters('readme', '{%', '%}');


  grunt.registerTask('readme', "Generate your project's README from a template. If you already use Grunt, this is a no brainer.", function() {

    var options = this.options({
      sep: '\n\n',
      prefixes: [],
      templates: ''
    });

    var metadata = options.metadata ? grunt.file.readJSON(options.metadata) : {};
    var meta = _.defaults(metadata, grunt.file.readJSON('package.json'));

    var docs;
    var templates;

    // The directory where our templates will be stored.
    if(options.templates) {
      templates = path.join.bind(options.templates, options.templates + '');
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
    // TODO: externalize these.
    _.mixin({
      resolve: function (filepath) {
        return glob.content(resolve.dev(filepath));
      },
      doc: function (filepath, sep) {
        sep = sep || options.sep;
        return glob.content(docs(filepath), sep);
      },
      include: function (filepath, sep) {
        sep = sep || options.sep;
        return glob.content(templates(filepath), sep);
      },
      shortname: function (name, patterns) {
        patterns = patterns || options.prefixes;
        return _.safename(name, patterns);
      },
      contributors: function (prepend) {
        prepend = prepend || "";
        if(meta.contributors) {
          return prepend + _.pluck(meta.contributors, "name").join("\n");
        } else {return; }
      },
      license: function (prepend, append) {
        prepend = prepend || "Released under the ";
        append = append || ".\n";
        if(meta.licenses) {
          return prepend + _.pluck(meta.licenses, "type").join(", ") + " license" + (meta.licenses.length === 1 ? '' : 's') + append;
        } else if(meta.license) {
          return prepend + meta.license.type + " license" + ".\n";
        } else {return; }
      }
    });

    /**
     * options.resolve
     * Use a template from node_modules.
     */
    options.resolve = _.resolve(options.resolve || '') || '';
    var tmpl = options.resolve ? options.resolve : grunt.file.read(templates('README.tmpl.md'));


    /**
     * CHANGELOG
     */
    meta.changelog = grunt.file.readYAML('CHANGELOG');
    meta.travis = grunt.file.exists('.travis.yml');
    if (meta.travis) {
      meta.travis = meta.repository.url.replace(/.*:\/\/github.com\/(.*)\.git/, 'https://travis-ci.org/$1');
    }


    /**
     * AUTHORS
     */
    var authors = grunt.file.read('AUTHORS');
    meta.authors = authors.split('\n').map(function(author) {
      var matches = author.match(/(.*?)\s*\((.*)\)/) || [];
      return {name: matches[1], url: matches[2]};
    });


    /**
     * Generate README
     */
    var newReadme = grunt.template.process(tmpl, {data: meta, delimiters: 'readme'});

    // Only write readme if it actually changed.
    var existingReadme = grunt.file.exists('README.md') ? grunt.file.read('README.md') : '';
    var re = /(\*This file was generated on.*)/;
    if (existingReadme.replace(re, '') !== newReadme.replace(re, '')) {
      // Replace square brackets with curly braces. Square brackets are used on templates
      // that should not be evaluated in code examples.
      grunt.file.write('README.md', newReadme.replace(/\[\%/g, '{%').replace(/\%\]/g, '%}'));
      grunt.log.ok('Created README.md');
    } else {
      grunt.log.ok('Keeping README.md.');
    }

    // Copy contributing guide from templates.
    grunt.file.copy(templates('CONTRIBUTING.md'), 'CONTRIBUTING.md');
    grunt.log.ok('Created CONTRIBUTING.md');

    // Fail task if any errors were logged.
    if (this.errorCount > 0) { return false; }
  });

};
