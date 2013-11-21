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
      includes: '',
      readme: '',
      config: '',
      sep: '\n',
      blacklist: [],
      contributing: false
    });


    /**
     * options.metadata
     * @type {Object}
     */
    var metadata = Utils.optionsDataFormatFactory(options.metadata);
    grunt.verbose.ok('README metadata:'.yellow, metadata);


    /**
     * meta: {}
     * Root context object passed to templates with a value of "this"
     * @type {Object}
     */
    if(grunt.file.exists(path.resolve(process.cwd(),'package.json'))) {
      options.config = grunt.file.readJSON(path.resolve(process.cwd(),'package.json'));
    } else {
      options.config = require('./lib/pkg.js');
    }
    var meta = _.defaults(metadata, options.config);
    grunt.verbose.ok(">> Meta:".yellow, JSON.stringify(meta, null, 2));


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
    if(_.isEmpty(options.templates)) {
      options.templates = root('templates');
    } else {
      options.templates = bind(options.templates);
    }
    var templates = options.templates;


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
    var baseDocs = root('docs');
    if(!options.docs) {
      docs = path.join.bind(options.docs, 'docs');
    } else if (options.docs) {
      docs = path.join.bind(process.cwd(), options.docs, '');
    } else {
      docs = baseDocs;
    }


    /**
     * README template
     * @example:
     *   `./foo/README.tmpl.md`
     */
    var readmeTmpl;
    if (options.readme) {
      // See if the `readme` option specifies a path to a template
      readmeTmpl = options.readme;
    } else if (grunt.file.exists(docs('README.tmpl.md'))) {
      // If not,  look for the README template in the `docs()` dir
      readmeTmpl = docs('README.tmpl.md');
    } else {
      // As a last resort, grab a template from grunt-readme
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
        var includesPath = path.join(templates(filepath), 'includes');
        return glob.content(includesPath, sep).replace(/^#/gm, '##');
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
    Utils.compileTemplate(readmeTmpl, 'README.md', templateConfig, Utils.frep);
    grunt.log.ok('Created README.md');


    // Options for for defining an additional document
    if(!_.isUndefined(options.alt)) {
      options.alt = options.alt || {};
      grunt.file.expand(options.alt.src).map(function(file) {
        var altSrc = yaml.extract(file).content || '';
        var altDest = path.join(options.alt.dest, name.base(file)) + '.md';
        Utils.compileTemplate(altSrc, altDest, templateConfig, Utils.frep);
      });
    }

    // Property for running tests.
    if(!_.isUndefined(options.test)) {
      options.test = options.test || {};
      grunt.file.expand(options.test.src).map(function(file) {
        var testSrc = yaml.extract(file).content || '';
        var testDest = path.join(options.test.dest, name.base(file)) + '.md';
        Utils.compileTemplate(testSrc, testDest, templateConfig, Utils.frep);
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
    return path.join.bind(null, __dirname, '../', filepath);
  };
};
