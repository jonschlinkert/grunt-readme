/*!
 * Utils
 * https://github.com/assemble/grunt-readme
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var grunt = require('grunt');
var _ = grunt.util._;

// Export the utils module.
exports = module.exports = {};



/*
 * _.safename("helper-foo")
 * @param  {[type]} name The name to be modified
 * @return {[type]}      The "safe" short version of the name
 * @example: "grunt-readme" => "readme"
 * @example: "helper-foo" => "foo"
 */

var prefixes = [
  "grunt",
  "helper",
  "mixin"
];

exports.safename = function (name, patterns) {
  prefixes = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + prefixes.join('|') + ')[\-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};
