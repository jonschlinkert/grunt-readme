/*!
 * repos
 * http://github.com/jonschlinkert/grunt-repos
 *
 * Copyright 2013 Jon Schlinkert
 * Licensed under the MIT License
 * http://opensource.org/licenses/MIT
 */

'use strict';

// Node.js
var fs    = require('fs');
var http  = require('http');
var path  = require('path');
var util  = require('util');

// node_modules
var https = require('https');
var grunt  = require('grunt');
var async  = grunt.util.async;
var _      = grunt.util._;

module.exports = function(grunt) {

  grunt.registerMultiTask('repos', 'Download files.', function() {
    var done = this.async();

    var options = this.options({
      host: 'api.github.com',
      method: 'GET',
      path: '/orgs/assemble/'
    });

    async.forEach(this.files, function(fp, cb) {

      async.forEach(fp.orig.src, function (src, callback) {

        var srcPath = src || 'repos?page=1&per_page=100';
        options.path = options.path + src;

        var request = https.request(options, function (response) {
          var body = '';
          response.on('data', function (chunk) {
            body += chunk;
          });

          response.on('end', function () {
            var json = JSON.parse(body);
            var repos = [];
            json.forEach(function (repo) {
              repos.push({
                name       : repo.name,
                forks      : repo.forks,
                watchers   : repo.watchers,
                fullname   : repo.full_name,
                version    : repo.version,
                description: repo.description,
                language   : repo.language,
                git_url    : repo.git_url,
                clone_url  : repo.clone_url,
                url        : repo.html_url,
                download   : repo.html_url + '/archive/master.zip'
              });
            });

            var reposObj = {};
            repos = _(repos).sortBy(options.sortBy || 'name');
            reposObj[options.namespace || 'repos'] = repos;

            grunt.verbose.ok('repos:'.yellow, JSON.stringify(reposObj, null, 2));
            grunt.file.write(fp.dest, JSON.stringify(reposObj, null, 2));
            callback(null);
          });
        });

        request.on('error', function (e) {
          console.error(e);
        });

        request.end();

      }, function () {
        cb(null);
      });

    }, function () {
      done();
    });
  });
};