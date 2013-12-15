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
var marked  = require('marked');
var glob    = require('glob-utils');
var grunt   = require('grunt');
var _       = grunt.util._;


module.exports = function(grunt) {

  // Local utils
  var Utils = require('./lib/utils');

  _.mixin(require('./lib/mixins'));
  _.mixin(require('./lib/badges'));


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
      remove: [],
      contributing: false
    });


    /**
     * options.metadata
     * @type {Object}
     */
    var metadata = Utils.readOptionsData(options.metadata);
    grunt.verbose.ok('README metadata:'.yellow, metadata);

    /**
     * meta: {}
     * Root context object passed to templates with a value of "this"
     * @type {Object}
     */
    if(grunt.file.exists(path.resolve(process.cwd(),'package.json'))) {
      options.config = _.extend(require('./lib/pkg.js'), grunt.file.readJSON(path.resolve(process.cwd(),'package.json')));
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
    meta.n         = '\n';
    meta.safename  = _.safename(meta.name);
    meta.shortname = _.shortname(meta.name);
    meta.username  = _.username();
    meta.repo      = _.username() + '/' + meta.name;

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
    var baseDocs = root('docs');
    if(!options.docs) {
      options.docs = path.join.bind(options.docs, 'docs');
    } else if (options.docs) {
      options.docs = path.join.bind(process.cwd(), options.docs, '');
    } else {
      options.docs = baseDocs;
    }
    var docs = options.docs;


    if(!_.isEmpty(options.boilerplate)) {
      var boilerplate = root(path.join('templates', 'boilerplates'))(options.boilerplate);

      if(grunt.file.isDir(boilerplate)) {
        grunt.file.recurse(boilerplate, function(filepath, rootdir, subdir, filename) {
          if(!grunt.file.exists(docs(filename))) {
            grunt.file.copy(filepath, docs(filename));
          }
        });
      }
    }

    /**
     * README template used to create README.md. Unless a template
     * is defined in the task options, a start template from
     * grunt-readme will be used.
     *
     * @example:
     *   options: {
     *     readme: './foo/README.tmpl.md'
     *   }
     */

    // If `readme` option is defined with a readme template, use that,
    // otherwise, see if the README template is in the `docs()` dir
    if (!options.readme && grunt.file.exists(docs('README.tmpl.md'))) {
      options.readme = docs('README.tmpl.md');
    // As a last resort, use a template from grunt-readme
    } else {
      options.readme = templates('README.tmpl.md');
    }


    // Extract and parse YAML front matter
    var yfm = yaml.extract(options.readme).context;

    // Extend context with data from YFM
    meta = _.extend({}, meta, yfm);

    // Extract content from template
    options.readme = yaml.extract(options.readme).content;


    grunt.verbose.writeln("yfm: ", yfm);
    grunt.verbose.writeln("options.readme: ", options.readme);
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
        var includesPath = path.join(templates('includes'), filepath);
        return glob.content(includesPath, sep).replace(/^#/gm, '##');
      },
      contrib: function (filepath, sep) {
        sep = sep || options.sep;
        var includesPath = path.join(templates('contrib'), filepath);
        return glob.content(includesPath, sep).replace(/^#/gm, '##');
      },
      badge: function (badge) {
        return grunt.file.read(templates('badges/' + badge + '.md'));
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
    meta.toc = makeTOC(options.readme);


    /**
     * Generalized template configuration
     */
    var tmplConfig = {
      data: meta,
      delimiters: 'readme'
    };


    /**
     * Generate README
     */
    var newReadme = Utils.compileTmpl(options.readme, tmplConfig, Utils.frep);
    grunt.file.write('README.md', newReadme);
    grunt.log.ok('Created README.md');

    // Optionally generate a HTML page from the README.
    if(options.html) {
      meta.content = marked(newReadme);
      meta.content = meta.content.replace(/\{%=/g, '[%=').replace(/%}/g, '%]');
      var layout =  grunt.file.read(options.layout || templates('html/layout.tmpl'));
      var html = Utils.compileTmpl(layout, tmplConfig, Utils.frep);
      grunt.file.write(options.html, html);
    }

    function makeOptionsObject(prop) {
      if(!_.isUndefined(options[prop])) {
        options[prop] = options[prop] || {};
        grunt.file.expand(options[prop].src).map(function(file) {
          var propSrc = yaml.extract(file).content || '';
          var propDest = path.join(options[prop].dest, name.base(file)) + '.md';
          meta.toc = makeTOC(propSrc);
          var output = Utils.compileTmpl(propSrc, tmplConfig, Utils.frep);
          grunt.file.write(propDest, output);
        });
      }
    }

    makeOptionsObject('alt');
    makeOptionsObject('test');

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

