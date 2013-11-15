/**
 * Utils
 */

// Node.js
var fs    = require('fs');
var path  = require('path');

// node_modules
var grunt = require('grunt');
var _ = require('lodash');


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


exports.dataFileReaderFactory = function(filepath) {
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



exports.optionsDataFormatFactory = function(data) {
  var metadata;
  if (_.isString(data) || _.isArray(data)) {
    grunt.file.expand(data).map(function(file) {
      grunt.verbose.ok('Processing:'.yellow, file);
      var checkForContent = grunt.file.read(file);
      // Skip empty data files to avoid compiling errors
      if (checkForContent.length === 0) {
        grunt.verbose.writeln('Skipping empty file:'.yellow, file);
      } else {
        metadata = grunt.config.process(exports.dataFileReaderFactory(file)) || {};
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



exports.compileTemplate = function (src, dest, options, fn) {
  options = options || {};
  options.data = options.data || {};
  var output = grunt.template.process(src, {
    data: options.data,
    delimiters: options.delimiters || 'readme'
  });
  function process(src, fn) {return fn(src);}
  var fallbackFn = function(src) {return src;};
  output = process(output, fn || fallbackFn);

  grunt.file.write(dest, output);
  grunt.verbose.ok('Created:', dest);
};


exports.revertBrackets = function(str) {
  return str.replace(/\[\%/g, '{%').replace(/\%\]/g, '%}').replace(/^\s*/, '');
};
