/**!
 * grunt-readme
 * http://github.com/assemble/grunt-readme
 * Partially derived from and inspired by grunt-contrib-internal
 *
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';


// Node.js
var path = require('path');

// node_modules
var load    = require('resolve-dep');
var name    = require('node-name');
var yaml    = require('assemble-yaml');
var makeTOC = require('marked-toc');
var glob    = require('glob-utils');
var grunt   = require('grunt');
var _       = grunt.util._;


module.exports = function(grunt) {

  // Local utils
  var Utils = require('./lib/utils');
  _.mixin(require('./lib/mixins'));


  // Add custom template delimiters for our templates.
  grunt.template.addDelimiters('readme', '{%', '%}');

  grunt.registerTask('readme', "Generate your project's README from a template. If you already use Grunt, this is a no brainer.", function() {

    // The 'readme' task options.
    var options = this.options({
      templates: '',
      sep: '\n',
      blacklist: [],
      contributing: false
    });


    /**
     * options.metadata
     * @type {Object}
     */
    var metadata = Utils.optionsDataFormatFactory(options.metadata);


    /**
     * meta: {}
     * Root context object passed to templates with a value of "this"
     * @type {Object}
     */
    var pkg = require(path.resolve(process.cwd(), 'package.json'));
    var meta = _.defaults(metadata, pkg);
    grunt.verbose.writeln(">> Meta: \n".yellow, JSON.stringify(meta, null, 2));


    /**
     * Convenience variables.
     */
    meta.copyright = _.copyright();
    meta.homepage  = _.homepage();
    meta.license   = _.license();
    meta.username  = _.username();
    meta.shortname = _.shortname(meta.name);

    /**
     * Templates directory.
     * If `options: { templates: '' }` is not defined, then the task will use the
     * templates directory in the `./templates` directory of the grunt-readme task.
     * @type {String}
     */
    var templates;
    if(_.isEmpty(options.templates)) {
      templates = root('../templates');
    } else {
      templates = bind(options.templates);
    }
    grunt.verbose.writeln('templates:', templates('README.tmpl.md'));


    /**
     * Docs directory
     * The location where all of your docs will be stored
     * This defaults to './docs' in the root of your project.
     * @example:
     *   options: {
     *     docs: 'foo/'
     *   }
     */
    var docs;
    var baseDocs = root('../docs');
    if(_.isEmpty(options.docs)) {
      docs = path.join.bind(options.docs, 'docs');
    } else if(options.docs) {
      docs = path.join.bind(process.cwd(), options.docs, '');
    } else {
      docs = baseDocs;
    }
    grunt.verbose.writeln("docs: ", docs('test'));


    /**
     * README template
     * @example:
     *   `./foo/README.tmpl.md`
     */
    var readmeTmpl;
    // See if the `readme` option specifies a path to a template
    if (options.readme) {
      readmeTmpl = options.readme;
    // If not, wherever the `docs` dir is, look for the README template there
    } else if (grunt.file.exists(docs('README.tmpl.md'))) {
      readmeTmpl = docs('README.tmpl.md');
    // Last, if all else fails just use a fallback template from grunt-readme
    } else {
      readmeTmpl = templates('README.tmpl.md');
    }


    // Extract and parse YAML front matter
    var yfm = yaml.extract(readmeTmpl).context;

    // Extend context with data from YFM
    meta = _.extend({}, meta, yfm);

    // Extract content from template
    readmeTmpl = yaml.extract(readmeTmpl).content;


    grunt.verbose.writeln("yfm: ", yfm);
    grunt.verbose.writeln("readmeTmpl: ", readmeTmpl);
    grunt.verbose.writeln("meta: ", meta);


    // Show all options flags in verbose mode.
    grunt.verbose.writeflags(options, 'Options');


    // Add mixins for use in our templates.
    // TODO: externalize these.
    _.mixin({
      meta: function (key) {
        return Utils.meta(key, meta);
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
     * Generate a Table of Contents
     * @usage: {%= toc %}
     */
    meta.toc = makeTOC(readmeTmpl);


    /**
     * Generalized template configuration
     */
    var templateConfig = {
      data: meta,
      delimiters: 'readme'
    };


    /**
     * Generate README
     */
    Utils.compileTemplate(readmeTmpl, 'README.md', templateConfig, Utils.revertBrackets);
    grunt.log.ok('Created README.md');


    // Options for for defining an additional document
    if(!_.isUndefined(options.alt)) {
      var alt = yaml.extract(options.alt).content;
      var newName = name.base(options.alt) + '.md';
      Utils.compileTemplate(alt, newName, templateConfig, Utils.revertBrackets);
    }

    // Property for running tests.
    if(!_.isUndefined(options.test)) {
      options.test = options.test || {};
      grunt.file.expand(options.test.src).map(function(file) {
        var testSrc = yaml.extract(file).content || '';
        var testDest = path.join(options.test.dest, name.base(file)) + '.md';
        Utils.compileTemplate(testSrc, testDest, templateConfig, Utils.revertBrackets);
      });
    }

    // Fail task if any errors were logged.
    if (this.errorCount > 0) {return false;}
  });


  var bind = function(filepath) {
    return path.join.bind(null, filepath, '');
  };

  // The root of the project. This is where the Gruntfile is.
  var root = function(filepath) {
    return path.join.bind(null, __dirname, filepath);
  };
};
