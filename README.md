# grunt-readme [![NPM version](https://badge.fury.io/js/grunt-readme.png)](http://badge.fury.io/js/grunt-readme) 

> Grunt plugin for generating a README from templates, including an optional table of contents. No Gruntfile config is necessary, just choose a starter template and you'll be ready to go.

[Documentation →](./DOCS.md) | [Examples →](./DOCS.md#examples)

Please [report any bugs or feature requests](https://github.com/assemble/grunt-readme/issues/new), thanks!

## Quickstart
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-readme --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-readme');
```

If the plugin has been installed correctly, run `grunt readme` at the command line. If the plugin has been installed properly, you should see a success message.

_**That's it!** If you are happy with the defaults, **no additional Gruntfile configuration is required**._


## Example "README" template
When you first add grunt-readme to a project, the task will automatically add a readme if it doesn't find one. But it's recommended that you customize you're own README template. Feel free to use [any of the templates](./templates) included in this repo, or copy/past the blow example into `./docs/README.tmpl.md`:

```js
# {%= name %}

> {%= description %}

{%= toc %}

## Overview
{%= _.doc("overview.md") %}

## Options
{%= _.doc("options.md") %}

## Examples
{%= _.doc("examples.md") %}

## License and Copyright
{%= copyright %}
{%= license %}
```

Then add `overview.md`, `options.md` and `examples.md` to the `./docs` directory. Of course, all of this is completely optional.

Visit the [full documentation →](./DOCS.md) | [See examples →](./DOCS.md#examples)


## Release History

 * 2013-11-15   v0.3.5   Repos task is now a separate grunt plugin. Adds basic badge mixins and lots of new test fixtures to test templates and mixins.
 * 2013-11-15   v0.3.0   Updates function that reads in metadata from options to accept mixed formats.
 * 2013-11-08   v0.2.4   Adds table of contents generation. Just use `{%= toc %}` where you want it to go.
 * 2013-11-03   v0.2.2   Fixes the function for the `metadata` option. Externalizes advanced docs since no config is really needed for this task.
 * 2013-10-11   v0.1.9   Adds ability to specify multiple metadata files in yaml or json format.
 * 2013-09-21   v0.1.3   Completely refactored. Adds a lot of documentation.
 * 2013-09-19   v0.1.0   First commmit.


## Related Projects
Here are some related projects you might be interested in from the [Assemble](http://assemble.io) core team.  

#### [grunt-convert](https://github.com/assemble/grunt-convert) [![NPM version](https://badge.fury.io/js/grunt-convert.png)](http://badge.fury.io/js/grunt-convert)
> Grunt task to convert to or from JSON, YAML, XML, PLIST or CSV.  

#### [grunt-firebase](https://github.com/assemble/grunt-firebase) [![NPM version](https://badge.fury.io/js/grunt-firebase.png)](http://badge.fury.io/js/grunt-firebase)
> Grunt task for updating firebase data.  

#### [grunt-github-api](https://github.com/assemble/grunt-github-api) [![NPM version](https://badge.fury.io/js/grunt-github-api.png)](http://badge.fury.io/js/grunt-github-api)
> Grunt plugin used to query the Github API and save the returned JSON files locally.  

#### [grunt-matter](https://github.com/assemble/grunt-matter) [![NPM version](https://badge.fury.io/js/grunt-matter.png)](http://badge.fury.io/js/grunt-matter)
> Add, extend, sort, and strip YAML front matter. Also has options for populating randomized mock data.  

#### [grunt-repos](https://github.com/assemble/grunt-repos) [![NPM version](https://badge.fury.io/js/grunt-repos.png)](http://badge.fury.io/js/grunt-repos)
> Use Grunt to pull down a list of repos from GitHub.  

#### [grunt-toc](https://github.com/assemble/grunt-toc) [![NPM version](https://badge.fury.io/js/grunt-toc.png)](http://badge.fury.io/js/grunt-toc)
> Grunt plugin for generating a markdown Table of Contents (TOC). 

Visit [assemble.io/plugins](http:/assemble.io/plugins/) for more information about [Assemble](http:/assemble.io/) plugins.


## Contributing
Find a bug? Have a feature request? Please [create an Issue](https://github.com/assemble/grunt-readme/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with [grunt-readme](https://github.com/assemble/grunt-readme).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!


## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Saturday, December 14, 2013._

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
