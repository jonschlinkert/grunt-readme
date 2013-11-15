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


exports.dataFileReaderFactory = function(ext) {
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
  return reader;
};


exports.optionsDataFormatFactory = function(data) {
  var metadata;
  if (_.isString(data) || _.isArray(data)) {

    grunt.file.expand(data).map(function(file) {
      grunt.verbose.ok('Processing:'.yellow, file);
      var ext             = path.extname(file);
      var selectedReader  = exports.dataFileReaderFactory(ext);
      var checkForContent = grunt.file.read(file);
      grunt.verbose.ok('selectedReader:'.yellow, selectedReader(file));
      // Skip empty data files to avoid compiling errors
      if (checkForContent === '') {
        grunt.verbose.writeln('Reading ' + file + '...empty, ' + 'skipping'.yellow);
      } else {
        metadata = grunt.config.process(selectedReader(file)) || {};
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
    delimiters: options.delimiters || 'foo'
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
