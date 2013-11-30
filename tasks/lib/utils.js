/**
 * Utils
 */

// Node.js
var fs    = require('fs');
var path  = require('path');

// node_modules
var grunt = require('grunt');
var frep  = require('frep');
var _     = require('lodash');


exports.meta = function (key, obj) {
  if (_.isUndefined(key)) {
    return {};
  } else if (_.isString(obj[key])) {
    return String(obj[key]) || "";
  } else if (_.isObject(obj[key])) {
    return JSON.stringify(obj[key], null, 2) || {};
  } else {
    return null;
  }
};


/**
 * Data file reader factory
 * Automatically determines the reader based on extension.
 * Use instead of grunt.file.readJSON or grunt.file.readYAML
 */

exports.readData = function(filepath) {
  var ext = path.extname(filepath);
  var reader = grunt.file.readJSON;
  switch(ext) {
    case '.json':
      grunt.verbose.writeln('>> Reading JSON'.yellow);
      reader = grunt.file.readJSON;
      break;
    case '.yml':
    case '.yaml':
      grunt.verbose.writeln('>> Reading YAML'.yellow);
      reader = grunt.file.readYAML;
      break;
  }
  return reader(filepath);
};


/**
 * Data format reader factory (see ./docs/methods.md)
 * Reads in data from a string, object or array
 * Enables all of the following configs to work in task options:
 * (basically throw any data config format and it 'should' work)
 */

exports.readOptionsData = function(data) {
  var metadata;
  if (_.isString(data) || _.isArray(data)) {
    data = Array.isArray(data) ? data : [data];
    data.map(function(val) {
      grunt.verbose.ok('Type:'.yellow, grunt.util.kindOf(val));
      // Skip empty data files to avoid compiler errors
      if (_.isString(val)) {
        grunt.file.expand(val).forEach(function(filepath) {
          var checkForContent = grunt.file.read(filepath);
          if (checkForContent.length === 0 || checkForContent === '') {
            grunt.verbose.warn('Skipping empty path:'.yellow, val);
          } else {
            var parsedData = exports.readData(filepath);
            metadata = grunt.config.process(_.extend({}, metadata, parsedData));
            grunt.verbose.ok('metadata:'.yellow, metadata);
          }
        });
      }
      if (_.isObject(val)) {
        metadata = grunt.config.process(_.extend({}, metadata, val));
        grunt.verbose.ok('metadata:'.yellow, metadata);
      }
    });
  } else if (_.isObject(data)) {
    metadata = data;
  } else {
    metadata = {};
  }
  return metadata;
};


/**
 * Compile Lo-Dash templates
 */

exports.compileTmpl = function (src, options, fn) {
  options = options || {};
  var output = grunt.template.process(src, {
    data: options.data || {},
    delimiters: options.delimiters || 'readme'
  });
  return _.isFunction(fn) ? fn(output) : output;
};


/**
 * Replacement patterns
 */
var arr = [
  {
    pattern: /^`#/gm,
    replacement: '#'
  },
  {
    pattern: /\[\%/g,
    replacement: '{%'
  },
  {
    pattern: /\%\]/g,
    replacement: '%}'
  },
  {
    pattern: /^\s*/,
    replacement: ''
  },
  {
    pattern: /\s*\{{!(--)?.+(--)?}}/g,
    replacement: ''
  },
  {
    pattern: /\[\[!/g,
    replacement: '{{!'
  },
  {
    pattern: /\]\]/g,
    replacement: '}}'
  }
];

exports.frep = function(str) {
  return frep.strWithArr(str, arr);
};
