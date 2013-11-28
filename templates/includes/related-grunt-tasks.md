Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team.

### [assemble](http://assemble.io) [![NPM version](https://badge.fury.io/js/assemble.png)](http://badge.fury.io/js/assemble)
> Static site generator for Grunt.js, Yeoman and Node.js. Used by H5BP/Effeckt, Topcoat, Web Experience Toolkit, and hundreds of other projects to build sites, themes, components, documentation, blogs and gh-pages. {% _.each(repos, function(task) { %}{% if(/\b(grunt-(?:(?!(init|assemble|metadata|data|example))))\b/g.test(task.name) && task.name.indexOf(shortname) === -1) { %} {%= n %}
### [{%= task.name %}]({%= task.url %}) [![NPM version](https://badge.fury.io/js/{%= task.name %}.png)](http://badge.fury.io/js/{%= task.name %})
> {%= task.description %} {% } %} {% }); %}

_To update this list, after downloading this project, run the following command `npm i && grunt docs`._