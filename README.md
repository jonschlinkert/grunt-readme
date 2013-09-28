# grunt-readme [![NPM version](https://badge.fury.io/js/grunt-readme.png)](http://badge.fury.io/js/grunt-readme) 

> Generate your README from a template. If you already use Grunt, this is a no brainer.

[Also see examples →](./EXAMPLES.md)

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

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

In your project's Gruntfile, load the plugin with `grunt.loadNpmTasks('grunt-readme');` outside of `grunt.initConfig()`:

```js
grunt.initConfig({
  // tasks
});
grunt.loadNpmTasks('grunt-readme');
grunt.registerTask('default', ['readme']);
```

If you are happy with the defaults, no other configuration is required.


## Options
assemble

> This task does not require any configuration in the Gruntfile, so all of the following options are... ahem, optional.

To change the plugin's defaults, add a section to your project's Gruntfile named `readme` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({

  // The "readme" task
  readme: {
    options: {}
  }

});
grunt.loadNpmTasks('grunt-readme');
grunt.registerTask('default', ['readme']);
```

### readme
Type: `String`
Default: `./node_modules/grunt-readme/tasks/templates/README.tmpl.md`

By default, if no options are specified the task will look for a `README.md.tmpl` template to use, if none is found the task will use the "starter" file supplied by `grunt-readme` (more detail below). Example:

```js
readme: {
  options: {
    readme: 'path/to/custom/README.md.tmpl'
  }
}
```

1. If the `readme` options is defined, the task will use that custom template.
1. If (1) is undefined, the task uses the directory defined by `options: { docs: ''}`
1. If (2) is undefined, the task checks if `README.tmpl.md` exists in the `./docs` directory (without having to define it in the options)
1. if (3) is undefined, `options: { resolve: { readme: ''}}` attempts to automagically use a `README.tmpl.md` template from `node_modules`. The module must must be defined in `devDependencies`. Note that for a README template to resolve properly from `node_modules`, the `main` property in the `package.json` of the module being referenced must specify the path to the template. This option is probably most useful when you plan to use the same README template on a number of projects.
1. If (4) is undefined, the task uses the "starter" README template from `grunt-readme`.


### metadata
Type: `String|Object`
Default: `package.json`

Optional source of metadata to _extend the data object_ that is passed as context into the templates. Context of the data object is the value of `this`, and properties in `package.json` will be ignored when matching properties are defined on the `metadata` object. Example:


```js
readme: {
  options: {
    metadata: 'docs/metadata.json'
  }
}
```
or

```js
readme: {
  options: {
    metadata: {
      name: 'Foo',
      description: 'This is foo.'
    }
  }
}
```

Since context is the value of "this", the `metadata` path is not required in templates, only property names:

* `{%= name %}` (e.g. not `{%= metadata.name %}`) => `Foo`
* `{%= description %}` => `This is foo.`


### docs
Type: `String`
Default: `./docs/`

Override the default directory where your local docs ("includes") will be stored. This defaults to the `./docs` directory in the root of your project.  with the 'docs' option.


### templates
Type: `String`
Default: `./node_modules/grunt-readme/tasks/templates/` (relative to your project)

The `cwd` for "includes" defined using the `{%= _.include() %}` template. By default, the `include` mixin will look for files in the `./tasks/templates` directory of this project (grunt-readme), where some starter templates are stored. (also see [EXAMPLES.md](./EXAMPLES.md))

You may overide this by specifying a path in the `templates` option:

```js
readme: {
  options: {
    templates: 'docs/templates'
  }
}
```


### resolve

All of the `resolve` options enable including content _from named NPM modules listed in `devDependencies`_.

#### resolve.readme
Type: `String`
Default: `undefined`

Name of the npm module containing the `README.tmpl.md` file to use for the README template. The module must be listed in the `devDependencies` of your project, and the template must be defined in the `main` property of the named module.

```js
options: {
  resolve: {
    readme: 'my-npm-module'
  }
}
```
If defined properly in the `main` property of the `package.json` of `my-npm-module`, this would resolve to:  `./node_modules/my-npm-module/README.tmpl.md`.


#### resolve.docs
Type: `String`
Default: `undefined`

If defined, `resolve.docs` becomes the `cwd` for files to be included using the `{%= _.doc() %}` mixin.

```js
options: {
  resolve: {
    docs: 'my-npm-module'
  }
}
```

This would resolve to:  `./node_modules/my-npm-module/`.


#### resolve.metadata
Type: `String`
Default: `undefined`

The name of the module to use to _extend the data object_ that is passed as context into the templates. This works the same as `options.metadata` except that `resolve.metadata` will use the `main` property from the package.json of the specified module. As with other "resolve" options, for this to work the module must be specified in the `devDependencies` of your project's package.json, and it must be installed in `node_modules`.

For example, let's say we have a project named **foo**, and this is the package.json for our project:

```json
{
  "name": "foo",
  "devDependencies": {
    "bar": "*"
  }
}
```
Once we install our `devDependencies`, we might have a project structure like this:

```
docs
node_modules
  grunt-readme
  bar
    metadata.json
    package.json // the "main" property specifies "./metadata.json"
Gruntfile.js
package.json
```

Now, in the Gruntfile for our project, "foo", to use the `metadata.json` file from "bar", we define the following in the `readme` task:

```js
readme: {
  options: {
    resolve: {
      metadata: 'bar'
    }
  }
}
```



### prefixes
Type: `Array`
Default: `grunt|helper|mixin`

Any prefixes defined will be removed from content passed in using the `{%= _.shortname() %}` template. Example:

```js
readme: {
  options: {
    prefixes: ["foo", "bar", "baz"]
  }
}
```

Given a `package.json` with the following property:

```json
{
  "name": "foo-module"
}
```

when referenced in a template like this:

```js
## {%= _.titleize(_.shortname(name)) %}
```

will renders to:

```
## Module
```

### contributing
Type: `Boolean`
Default: `True`

By default, the README task copies a basic `CONTRIBUTING.md` file to the root of your project. If one exists, the task will skip this. If you wish to prevent the task from adding this file to your project, set the `contributing` option to `false`.


### sep
Type: `String`
Default: `\n`

Separator to use between sections of content that is included using the `include` or `doc` mixins (more about these in the "Mixins" section below). This option is more useful when you use minimatch patterns to specify the files to include.

The `sep` option can either be defined in the task options:

```js
readme: {
  options: {
    sep: '\n***\n'
  }
}
```

or as a second parameter in the `include` or `doc` mixins.

* `{%= _.include("docs-*.md", "***") %}` (more below...)
* `{%= _.doc("*.md", "\n***\n") %}` (more below...)




## mixins
Mixins use the following formats:

* `_.mixin()`: when used in JavaScript
* `{%= _.mixin() %}`: when used in templates


### "include" mixins

> Three different mixins are built into the task for including "external" content: `include`, `doc` and `resolve`. Each is used for a different purpose.

Here is a summary of what they do (settings for the `include` and `doc` mixins can be customized in the task options):

* `{%= _.include("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./templates/` directory of _the grunt-readme task_.
* `{%= _.doc("file.md") %}`:  include a file (or files using [minimatch][minimatch] patterns) from the `./docs/` directory of _your project_.
* `{%= _.resolve("file.md") %}`: include a **specific file** from *node_modules*`.


#### _.include()
Use the `include` mixin in templates to pull in content from other files:

```js
{%= _.include("examples.md") %}
```

[Minimatch][minimatch] patterns may also be used:

```js
{%= _.include("docs-*.md") %}
```

Unless overridden in the `templates` option, the `include` mixin will use the `./node_modules/grunt-readme/tasks/templates/` directory (from the root of your project) as the `cwd` for templates.


#### _.doc()
Same as the `include` mixin but is hard-coded to use the `docs/` folder of your project as the `cwd` for templates.


#### _.resolve()
Use the `resolve` mixin in templates to include content _from named NPM modules listed in `devDependencies`_:

```js
{%= _.resolve("my-npm-module") %}
```

where `my-npm-module` is the name of a `devDependency` currently installed in `node_modules`. For the `resolve` mixin to work, the referenced file must be listed in the `devDependencies` of your project's `package.json`, it must be installed in `node_modules`, and the referenced project must have the file defined in the `main` property of that project's `package.json`. Last, in your templates make sure you _use the name of the module, not the name of the file to "include"_.


#### _.resolve() example
Here is a `package.json` for a bogus project we created, `my-npm-module`, to store the template we want to use as an include:

```js
{
  "name": "my-npm-module",
  "main": "README.tmpl.md"
}
```

### convenience mixins

#### _.meta()

Get the value of any property in `package.json`. Example:

```js
{%= _.meta('name') %}
{%= _.meta('version') %}
{%= _.meta('contributors') %}
{%= _.meta('keywords') %}
```
A second paramter can be passed in to set the indentation on returned JSON: `{%= _.meta('contributors', 4) %}`. _This only works for stringified objects_.

Also, if left undefined (`{%= _.meta() %}`) the mixin will return the entire metadata object (by default, this is the entire contents of `package.json`):

#### _.jsdocs()
Parse and extract comments from specified JavaScript files.


#### _.copyright()
Add a copyright statement, including the name of the author and the year, or range of years, the copyright is in effect. The primary advantage of using this is to ensure that the copyright dates are correct.

Parameters:

* `Number`: Optionally define the start year of the project.

Examples:

```js
{%= _.copyright() %}
// => Copyright (c) 2013 Jeffrey Herb, contributors.

{%= _.copyright('2011') %}
// => Copyright (c) 2011-2013 Jeffrey Herb, contributors.
```


#### _.license()
Add a "license statement" to the README, using the license(s) specified in package.json. If you maintain a number of projects, some of which might have more than one license, while others only have one, you can use the `_.license()` mixin to automate the process of adding license info.

Examples:

```js
{%= _.license() %}
```
> Released under the MIT license

Customize the output:

```js
{%= _.license('Licensed under the ') %}
```
> Licensed under the MIT license


#### _.contributors()
Render contributors listed in the project's package.json.


#### _.username()
Extract the username or org from URLs in the project's package.json. The mixin will extract the username from the `homepage` property if it exists. If not, it will try to extract the username from the `git.url` property.


#### _.homepage()
Extract the homepage URL from the project's package.json. If a `homepage` property doesn't exist, the mixin will create a `homepage` URL using the value defined in the `git.url` property.



## Usage Examples
### Basic readme

[Also see examples →](./EXAMPLES.md)

```js
## my-project

> {%= description %}

### Overview
{%= _.include("docs-overview.md") %}

### Options
{%= _.include("docs-options.md") %}

### Examples
{%= _.include("docs-examples.md") %}

### License and Copyright
Copyright (c) 2012-{%= grunt.template.today('yyyy') %} [{%= author.name %}]({%= author.url %})
{%= _.license() %}
```

### All available options

[Also see examples →](./EXAMPLES.md)

```js
readme: {
  options: {
    templates: '',
    metadata: '',
    resolve: {
      cwd: '',
      readme: '',
      docs: '',
      templates: '',
      metadata: ''
    },
    sep: '\n',
    prefixes: [],
    contributing: true
  }
}
```




# Heads up!
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (as in code examples), just use square brackets instead of curly braces in any templates that have similar patterns to these: `{%= .. %}`, `{%- .. %}`, and `{% .. %}`. The square brackets will be replaced with curly braces in the rendered output.

## Contributing
Please see the [Contributing to grunt-readme](https://github.com/assemble/grunt-readme/blob/master/CONTRIBUTING.md) guide for information on contributing to this project.


## Release History

 * 2013-09-21   v0.1.3   Completely refactored. Adds a lot of documentation.
 * 2013-09-19   v0.1.0   First commmit.
 

## Author

+ [github.com/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated on Fri Sep 27 2013 23:54:25._

[minimatch]: https://github.com/isaacs/minimatch
