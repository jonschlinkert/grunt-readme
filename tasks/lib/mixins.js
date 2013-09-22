/*!
 * Utils
 * https://github.com/assemble/grunt-readme
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var acorn = require('acorn');
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


exports.jsdocs = function (file) {

  console.log('loading...' + file);
  var output = '';
  var comments = [];

  function onComment(block, text, start, end, startLine, endLine) {
    console.log('Found comments: ');
    if(block) {
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
  for (var i = 0; i < comments.length; i++) {
    output += '\n\n';
    output += '```js\n';
    output += '/*' + comments[i].text + '*/\n';
    output += '```\n';
    output += '[View Source Code]({0}#L{1}-{2})'.
      replace('{0}', file).
      replace('{1}', comments[i].start.line).
      replace('{2}', comments[i].end.line);
  }
  return output;

};
