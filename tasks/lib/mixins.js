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
var utils = module.exports = {};

utils.globContent = function (patterns, sep) {
  return grunt.file.expand({filter: 'isFile'}, patterns).map(function (filepath) {
      return grunt.file.read(filepath) + sep;
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};

/**
 * _.shortname("helper-prettify")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 *
 * @example: "grunt-readme" => "readme"
 * @example: "helper-prettify" => "prettify"
 */
utils.shortname = function (name) {
  var prefixes = ["grunt", "helper", "util", "assemble", "mixin"];
  var re = new RegExp('^(?:' + prefixes.join('|') + ')[\-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};

