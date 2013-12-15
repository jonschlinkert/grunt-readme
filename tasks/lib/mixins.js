/*!
 * Utils
 * https://github.com/assemble/grunt-readme
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path  = require('path');
var url   = require('url');

// node_modules
var acorn = require('acorn');
var load  = require('resolve-dep');
var grunt = require('grunt');
var _     = require('lodash');



// Export the utils module.
exports = module.exports = {};


// Metadata
var config;
if(grunt.file.exists(path.resolve(process.cwd(),'package.json'))) {
  config = _.extend(require('./pkg.js'), grunt.file.readJSON(path.resolve(process.cwd(),'package.json')));
} else {
  config = require('./pkg.js');
}

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
  return load.all(patterns).map(function(file) {
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
  var name = config.author.name ? config.author.name : name;
  var today = grunt.template.today('yyyy');
  var date = startYear ? startYear + '-' + today : today;
  return 'Copyright (c) ' + date + ' ' + name + ', contributors.';
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



exports.username = function (name) {
  var username = '';
  if (name) {
    username = name;
  } else if (config.username) {
    username = config.username;
  } else if (config.homepage) {
    username = config.homepage.replace(/^([^:]+):\/\/(?:.+)\/(.+)\/(?:.+)/, '$2');
  } else if (config.repository.url) {
    username = config.repository.url.replace(/^([^:]+):(.+)/, '$1');
  }
  return username;
};


exports.homepage = function () {
  if(config.homepage) {
    return config.homepage;
  } else {
    return config.repository.url.replace(/^(?:git@)?([^:]+):(.+)(?:.git)/, 'https://$1/$2');
  }
};


exports.contributors = function (prefix) {
  prefix = prefix || '* ';
  if(config.contributors) {
    return config.contributors.map(function(contributor) {
      return prefix + contributor.name || 'Name not found';
    }).join('\n');
  } else {
    return '_(No contributors found)_';
  }
};


/**
 * _.safename("helper-foo")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 * @example: "grunt-readme" => "readme"
 * @example: "helper-foo" => "foo"
 */
exports.safename = function (name, patterns) {
  var prefixes = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'assemble-contrib', 'assemble'];
  var remove = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};
exports.shortname = function (name, patterns) {
  return exports.safename(name, patterns);
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
      replace('{0}', exports.homepage()).
      replace('{1}', file).
      replace('{2}', comments[i].start.line).
      replace('{3}', comments[i].end.line);
  }
  return output;

};

