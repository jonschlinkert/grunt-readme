/**!
 * grunt-readme
 * http://github.com/assemble/grunt-readme
 * Partially derived from and inspired by grunt-contrib-internal
 *
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var glob = require('utils-glob');
var load = require('resolve-dep');

module.exports = function(grunt) {

  grunt.util._.mixin(require('./lib/mixins'));

  // Add custom template delimiters for our templates.
  grunt.template.addDelimiters('readme', '{%', '%}');

  grunt.registerTask('readme', "Generate your project's README from a template. If you already use Grunt, this is a no brainer.", function() {

    var _ = grunt.util._;

    // The 'readme' task options.
    var options = this.options({
      templates: '',
      metadata: '',
      resolve: {
        readme: 'grunt-readme',
        cwd: '',
        metadata: '',
        templates: ''
      },
      sep: '\n',
      prefixes: [],
      contributing: true
    });

    var resolve = options.resolve;

    /**
     * options: { metadata: {} }
     * Metadata from "metadata" option
     * @type {Object}
     */
    options.metadata = _.isEmpty(options.metadata) ? {} : grunt.file.readJSON(options.metadata);
    grunt.verbose.writeln("metadata: ", options.metadata);


    /**
     * meta: {}
     * Root context object passed to templates with a value of "this"
     * @type {Object}
     */
    var meta = _.extend({}, grunt.file.readJSON('package.json'), options.metadata);
    grunt.verbose.writeln("meta: ", meta);


    /**
     * Templates directory.
     * If `options: { templates: '' }` is not defined, then the task will use the
     * templates directory in the `./templates` directory of the grunt-readme task.
     * @type {String}
     */
    var templates;
    if(_.isEmpty(options.templates)) {
      templates = path.join.bind(null, __dirname, '../templates');
    } else {
      templates = path.join.bind(options.templates, options.templates + '');
    }
    grunt.verbose.writeln("templates: ", templates('README.tmpl.md'));

    /**
     * options: { docs: '' }
     * The directory where your docs will be stored. This defaults to the './docs'
     * directory in the root of your project. Override with the 'docs' option.
     */
    var docs;
    if(_.isEmpty(options.docs)) {
      docs = path.join.bind(options.docs, 'docs');
    } else {
      docs = path.join.bind(process.cwd(), options.docs + '');
    }
    grunt.verbose.writeln("docs: ", docs('success'));


    /**
     * Resolved paths to module to use as the cwd for metadata and templates.
     * These options currently aren't used in the examples, and they aren't
     * documented yet so don't get used to them because they might go away.
     * @type {String}
     */
    resolve.cwd       = _.isEmpty(resolve.cwd)       ? '' : load.devDirname(resolve.cwd);
    resolve.metadata  = _.isEmpty(resolve.metadata)  ? '' : load.devDirname(resolve.metadata);
    resolve.templates = _.isEmpty(resolve.templates) ? '' : load.devDirname(resolve.templates);


    /**
     * README.tmpl.md
     *
     *   a). If `options: { readme: ''}` is defined, use that custom template.
     *   b). If (a) is undefined, use the directory defined by `options: { docs: ''}`
     *   c). If (b) is undefined, see if README.tmpl.md exists in the `./docs` directory
     *   d). if (c) is undefined, `options: { resolve: { readme: ''}}` attempts to
     *       automagically use a README.tmpl.md template from node_modules. The module
     *       must must be defined in devDependencies.
     *   e). If (c) is undefined, use the fallback README.tmpl.md template from grunt-readme.
     *
     * Note that for a README.tmpl.md template to resolve properly from node_modules, the module
     * being referenced must have the path to the template defined in the `main` property of
     * the package.json for that project. This option might be useful if you can use the same
     * README template for a number of projects.
     */
    var tmpl;
    if (options.readme) {
      tmpl = options.readme;
    } else if (options.docs) {
      tmpl = docs('README.tmpl.md');
    } else if (grunt.file.exists('./docs/README.tmpl.md')) {
      tmpl = './docs/README.tmpl.md';
    } else if (resolve.readme) {
      tmpl = path.join(String(load.devDirname(resolve.readme)), 'README.tmpl.md') || '';
    } else {
      tmpl = templates('README.tmpl.md');
    }

    // Write the template
    tmpl = grunt.file.read(tmpl);
    grunt.verbose.writeln("tmpl: ", tmpl);


    // Show all options flags in verbose mode.
    grunt.verbose.writeflags(options, 'Options');


    // Add mixins for use in our templates.
    // TODO: externalize these.
    _.mixin({

      resolveTemplates: function (src) {
        return path.normalize(path.join(String(resolve.templates), src));
      },

      /**
       * `{% _.resolve("module-name") %}`
       *
       * Automagically include a template from node_modules. The
       * path to the template must be defined in the `main` property
       * of the package.json in the npm module. A potential use case
       * for this option is to include fragments or "partials" that
       * are used in multiple projects.
       */
      resolve: function (patterns) {
        return load.dev(patterns).map(function(file) {
          return grunt.file.read(file).replace(/^#/gm, '##');
        });
      },

      resolveDir: function (module) {
        return load.devDirname(module);
      },

      doc: function (filepath, sep) {
        sep = sep || options.sep;
        return glob.content(docs(filepath), sep).replace(/^#/gm, '##');
      },

      include: function (filepath, sep) {
        sep = sep || options.sep;
        return glob.content(templates(filepath), sep).replace(/^#/gm, '##');
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

      license: function (prepend) {
        prepend = prepend || "Released under the ";
        if(meta.licenses) {
          return prepend + _.pluck(meta.licenses, "type").join(", ") + " license" + (meta.licenses.length === 1 ? '' : 's');
        } else if(meta.license) {
          return prepend + meta.license.type + " license";
        } else {return; }
      }
    });


    // TODO: remove these.
    grunt.verbose.writeln('_.include: '.magenta, _.include('README.tmpl.md'));
    grunt.verbose.writeln('_.doc: '.magenta, _.doc('docs-options.md'));
    grunt.verbose.writeln('_.resolve: '.magenta, _.resolve('assemble-*'));
    grunt.verbose.writeln('_.license: '.magenta, _.license());
    grunt.verbose.writeln('_.contributors: '.magenta, _.contributors());
    grunt.verbose.writeln('_.shortname: '.magenta, _.shortname('helper-success'));
    grunt.verbose.writeln('_.shortname: '.magenta, _.shortname('grunt-success'));


    /**
     * TRAVIS
     */
    meta.travis = grunt.file.exists('.travis.yml');
    if (meta.travis) {
      meta.travis = meta.repository.url.replace(/.*:\/\/github.com\/(.*)\.git/, 'https://travis-ci.org/$1');
    }


    /**
     * CHANGELOG
     */
    meta.changelog = grunt.file.exists('CHANGELOG');
    if (meta.changelog) {
      meta.changelog = grunt.file.readYAML('CHANGELOG');
    }


    /**
     * CONTRIBUTING.md
     * Copy contributing guide from templates.
     */
    if (!grunt.file.exists('CONTRIBUTING.md') && options.contributing) {
      grunt.file.copy(templates('CONTRIBUTING.md'), 'CONTRIBUTING.md');
      grunt.log.ok('Created CONTRIBUTING.md');
    }


    /**
     * AUTHORS
     */
    var authors = grunt.file.exists('AUTHORS');
    if (authors) {
      authors = grunt.file.readYAML('AUTHORS');
      meta.authors = authors.split('\n').map(function(author) {
        var matches = author.match(/(.*?)\s*\((.*)\)/) || [];
        return {name: matches[1], url: matches[2]};
      });
    }


    /**
     * Generate README
     */
    var newReadme = grunt.template.process(tmpl, {data: meta, delimiters: 'readme'});

    // Only write readme if it has changed.
    var existingReadme = grunt.file.exists('README.md') ? grunt.file.read('README.md') : '';
    var re = /(\_(This file was generated on).*)/;
    if (existingReadme.replace(re, '') !== newReadme.replace(re, '')) {
      // Replace square brackets with curly braces. Square brackets are used on templates
      // that should not be evaluated in code examples.
      grunt.file.write('README.md', newReadme.replace(/\[\%/g, '{%').replace(/\%\]/g, '%}'));
      grunt.log.ok('Created README.md');
    } else {
      grunt.log.ok('Keeping README.md.');
    }

    // // Fail task if any errors were logged.
    if (this.errorCount > 0) {return false;}
  });
};