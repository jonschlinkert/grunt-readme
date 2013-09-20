/**
 * Utils
 * https://github.com/assemble/grunt-readme
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var grunt = require('grunt');

// Export the utils module.
exports = module.exports = {};

/**
 * _.safename("helper-prettify")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 *
 * @example: "grunt-readme" => "readme"
 * @example: "helper-prettify" => "prettify"
 */
exports.safename = function (name, patterns) {
  patterns = patterns || [];
  // return name.replace(/^(grunt|helper)[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
  var prefixes = ["grunt"];
  prefixes = grunt.util._.union([], prefixes, patterns);
  var re = new RegExp('^(?:' + prefixes.join('|') + ')[\-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};

