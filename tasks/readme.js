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
var grunt = require('grunt');
var glob = require('glob-utils');
var load = require('resolve-dep');
var frontMatter  = require('assemble-yaml');


module.exports = function(grunt) {

  grunt.util._.mixin(require('./lib/mixins'));

  // Add custom template delimiters for our templates.
  grunt.template.addDelimiters('readme', '{%', '%}');

  grunt.registerTask('readme', "Generate your project's README from a template. If you already use Grunt, this is a no brainer.", function() {

    var _ = grunt.util._;

    // The 'readme' task options.
    var options = this.options({
      templates: '',
      resolve: {
        cwd: '',
        readme: '',
        docs: '',
        templates: '',
        metadata: ''
      },
      sep: '\n',
      prefixes: [],
      contributing: false
    });

    var resolve = options.resolve;

    var dataFileReaderFactory = function(ext) {
      var reader = grunt.file.readJSON;
      switch(ext) {
        case '.json':
          grunt.verbose.writeln('>> Reading JSON'.yellow);
          reader = grunt.file.readJSON;
          break;
        case '.yml':
        case '.yaml':
          grunt.verbose.writeln('>> Reading YAML'.yellow);
          reader = grunt.file.readYAML;
          break;
      }
      return reader;
    };


    /**
     * options.metadata
     * Metadata from "metadata" option
     * @type {Object}
     */
    var metadata = {};
    if (options.metadata && options.metadata.length > 0) {
      grunt.verbose.writeln('\n' + 'Processing data files: '.bold + '"' + options.metadata + '"');

      grunt.file.expand(options.metadata).map(function(file) {
        var ext         = path.extname(file);
        var fileReader  = dataFileReaderFactory(ext);
        var filecontent = grunt.file.read(file);

        // Skip empty data files to avoid compiling errors
        if (filecontent === '') {
          grunt.verbose.writeln('Reading ' + file + '...empty, ' + 'skipping'.yellow);
        } else {
          return {
            data: fileReader(file)
          };
        }
      }).map(function(obj) {
        metadata = _.extend({}, metadata, obj.data || {});
      });
      grunt.verbose.ok("Metadata: ".yellow, metadata);

    } else if (_.isObject(options.metadata)) {
      metadata = options.metadata;
      grunt.verbose.ok("Metadata: ".yellow, metadata);
    }

    /**
     * meta: {}
     * Root context object passed to templates with a value of "this"
     * @type {Object}
     */
    var pkg  = require(path.resolve(process.cwd(), 'package.json'));
    var meta = _.defaults(metadata, pkg);
    grunt.verbose.writeln(">> Meta: \n".yellow, JSON.stringify(meta, null, 2));


    /**
     * Convenience variables.
     */
    meta.copyright = _.copyright();
    meta.homepage  = _.homepage();
    meta.license   = _.license();
    meta.username  = _.username();



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
    if (resolve.docs) {
      docs = path.join.bind(null, String(load.devDirname(resolve.docs)), '');
    } else if(_.isEmpty(options.docs)) {
      docs = path.join.bind(options.docs, 'docs');
    } else if(options.docs) {
      docs = path.join.bind(process.cwd(), options.docs, '');
    } else {
      docs = path.join.bind(null, __dirname, '../docs');
    }
    grunt.verbose.writeln("docs: ", docs('test'));

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
    } else if (options.docs || resolve.docs) {
      tmpl = docs('README.tmpl.md');
    } else if (grunt.file.exists('./docs/README.tmpl.md')) {
      tmpl = './docs/README.tmpl.md';
    } else if (resolve.readme) {
      tmpl = path.join(String(load.devDirname(resolve.readme)), 'README.tmpl.md') || '';
    } else {
      tmpl = templates('README.tmpl.md');
    }

    // Extract and parse YAML front matter
    var yfm = frontMatter.extract(tmpl).context;

    // Extend context with data from YFM
    meta = _.extend({}, meta, yfm);

    // Extract content from template
    tmpl = frontMatter.extract(tmpl).content;


    grunt.verbose.writeln("yfm: ", yfm);
    grunt.verbose.writeln("tmpl: ", tmpl);
    grunt.verbose.writeln("meta: ", meta);


    // Show all options flags in verbose mode.
    grunt.verbose.writeflags(options, 'Options');


    // Add mixins for use in our templates.
    // TODO: externalize these.
    _.mixin({

      meta: function (key, opts) {
        opts = opts || 2;
        if (_.isUndefined(key)) {
          return JSON.stringify(meta, null, opts) || {};
        } else if (_.isString(meta[key])) {
          return meta[key] || "";
        } else if (_.isObject(meta[key])) {
          return JSON.stringify(meta[key], null, opts) || {};
        } else {
          return null;
        }
      },

      doc: function (filepath, sep) {
        sep = sep || options.sep;
        return glob.content(docs(filepath), sep).replace(/^#/gm, '##');
      },

      include: function (filepath, sep) {
        sep = sep || options.sep;
        return glob.content(templates(filepath), sep).replace(/^#/gm, '##');
      }

    });



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
    var re = /(\_(This file was generated on).*)/;
    var writeReadme = grunt.template.process(tmpl, {
      data: meta,
      delimiters: 'readme'
    });

    function replaceBrackets(str) {
      return str.replace(/\[\%/g, '{%').replace(/\%\]/g, '%}');
    }

    // Write the README.md file, and replace square brackets with curly braces.
    grunt.file.write('README.md', replaceBrackets(writeReadme).replace(/^\s*/, ''));
    grunt.log.ok('Created README.md');

    // Fail task if any errors were logged.
    if (this.errorCount > 0) {return false;}
  });
};