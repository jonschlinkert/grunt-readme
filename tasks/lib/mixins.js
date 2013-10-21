/*!
 * Utils
 * https://github.com/assemble/grunt-readme
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var grunt       = require('grunt');
var acorn       = require('acorn');
var path        = require('path');
var load        = require('resolve-dep');
var _           = grunt.util._;



// Export the utils module.
exports = module.exports = {};

// Metadata
var config = require(path.resolve(process.cwd(),'package.json'));


/**
 * `{% _.resolve("module-name") %}`
 *
 * Automagically include a template from node_modules. The
 * path to the template must be defined in the `main` property
 * of the package.json in the npm module. A potential use case
 * for this option is to include fragments or "partials" that
 * are used in multiple projects.
 */
exports.resolve = function (patterns) {
  return load.dev(patterns).map(function(file) {
    return grunt.file.read(file).replace(/^#/gm, '##');
  });
};


/**
 * Access properties from package.json
 * @param  {Object|String|Array} key
 * @param  {Number} opts Indentation for stringified JSON
 * @return {Object}
 */
exports.pkg = function (key, opts) {
  opts = opts || 2;
  if (_.isUndefined(key)) {
    return JSON.stringify(config, null, opts) || {};
  } else if (_.isString(config[key])) {
    return config[key] || "";
  } else if (_.isObject(config[key])) {
    return JSON.stringify(config[key], null, opts) || {};
  } else {
    return null;
  }
};


/**
 * Add a copyright statement, with author and year(s) in effect.
 * @param  {Number} startYear Optional parameter to define the start year of the project.
 * @return {String}           Complete copyright statement.
 * @example
 *   {%= _.copyright() %} => Copyright (c) 2013 Jeffrey Herb, contributors.
 *   {%= _.copyright('2012') %} => Copyright (c) 2012-2013 Jeffrey Herb, contributors.
 */
exports.copyright = function (startYear) {
  var author = config.author ? (config.author.name || config.author) : name;
  var today = grunt.template.today('yyyy') + ' ';
  var date = startYear ? startYear + '-' + today : today;
  return 'Copyright (c) ' + date + author + ', contributors.';
};



exports.license = function (prepend) {
  prepend = prepend || "Released under the ";
  if(config.licenses) {
    return prepend + _.pluck(config.licenses, "type").join(", ") + " license" + (config.licenses.length === 1 ? '' : 's');
  } else if(config.license) {
    return prepend + config.license.type + " license";
  } else {
    return;
  }
};


exports.username = function () {
  if(config.homepage) {
    return config.homepage.replace(/^([^:]+):\/\/(?:.+)\/(.+)\/(?:.+)/, '$2');
  } else {
    return config.repository.url.replace(/^([^:]+):(.+)/, '$1');
  }
};


exports.homepage = function () {
  if(config.homepage) {
    return config.homepage;
  } else {
    return config.repository.url.replace(/^git@([^:]+):(.+)(?:.git)/, 'https://$1/$2');
  }
};


exports.contributors = function (sep) {
  sep = sep || "";
  if(config.contributors) {
    return _.pluck(config.contributors, "name").join("\n") + sep;
  } else {return; }
};


/**
 * _.safename("helper-foo")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 * @example: "grunt-readme" => "readme"
 * @example: "helper-foo" => "foo"
 */
exports.safename = function (name, patterns) {
  var blacklist = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'assemble-contrib', 'assemble'];
  var prefixes = _.unique(_.flatten(_.union([], blacklist, patterns || [])));
  var re = new RegExp('^(?:' + prefixes.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};
exports.shortname = function (name, patterns) {
  return _.safename(name, patterns);
};


/**
 * jsdocs
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
exports.jsdocs = function (file) {
  var output = '';
  var comments = [];

  function onComment(block, text, start, end, startLine, endLine) {
    if (block) {
      comments.push({
        text: text,
        start: startLine,
        end: endLine
      });
    }
  };

  /*
   * Parse the given file into an ast
   */
  var opts = {
    locations: true,
    onComment: onComment,
    sourceFile: file
  };
  var ast = acorn.parse(grunt.file.read(file), opts);

  /*
   * Output comment block with link to source code
   */
  if(file[0] !== '/') file = '/' + file;
  for (var i = 0; i < comments.length; i++) {
    output += '\n\n';
    output += '```js\n';
    output += '/*' + comments[i].text + '*/\n';
    output += '```\n';
    output += '[View Source Code]({0}{1}#L{2}-{3})'.
      replace('{0}', _.homepage()).
      replace('{1}', file).
      replace('{2}', comments[i].start.line).
      replace('{3}', comments[i].end.line);
  }
  return output;

};
