# grunt-readme [![NPM version](https://badge.fury.io/js/grunt-readme.png)](http://badge.fury.io/js/grunt-readme) 

> Generate your README from a template. If you already use Grunt, this is a no brainer.

[Also see examples →](./EXAMPLES.md) and [documentation →](./DOCS.md)

Please [report any bugs or feature requests](https://github.com/helpers/grunt-readme/issues/new), thanks!

## Getting Started
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


## Example README template
[Also see examples →](./EXAMPLES.md)

Feel free to use [any of the templates](./templates) included in this repo, or copy/past the blow example into `./docs/README.tmpl.md`:

```js
## {%= name %}

> {%= description %}

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


## Contributing
Please see the [Contributing to grunt-readme](https://github.com/assemble/grunt-readme/blob/master/CONTRIBUTING.md) guide for information on contributing to this project.

## Release History

 * 2013-11-03   v0.2.2   Fixes the function for the `metadata` option. Externalizes advanced docs since no config is really needed for this task.
 * 2013-10-11   v0.1.9   adds ability to specify multiple metadata files in yaml or json format.
 * 2013-09-21   v0.1.3   Completely refactored. Adds a lot of documentation.
 * 2013-09-19   v0.1.0   First commmit.

## Author

+ [github.com/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated on Sunday, November 3, 2013._


[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
