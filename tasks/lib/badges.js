/*!
 * Badges
 * https://github.com/assemble/grunt-readme
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path  = require('path');
var url   = require('url');

// node_modules
var grunt = require('grunt');
var _     = require('lodash');


// Export the utils module.
exports = module.exports = {};


// Metadata
var config;
if(grunt.file.exists(path.resolve(process.cwd(), 'package.json'))) {
  config = grunt.file.readJSON(path.resolve(process.cwd(),'package.json'));
} else {
  config = require('./pkg.js');
}


exports.nodei = function (opts, mos) {
  var url = 'https://nodei.co/npm';
  var name = config.name;
  opts = opts ? '?' + opts.split(',').map(function(opt) {
    return opt + '=true';
  }).join('&') : '';
  opts = opts + (mos ? '&months=' + mos : '');
  return '[![NPM]('+url+'/'+name+'.png'+opts+')]('+url+'/'+name+'/)';
};

