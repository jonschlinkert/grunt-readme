# grunt-readme [![NPM version](https://badge.fury.io/js/grunt-readme.png)](http://badge.fury.io/js/grunt-readme) 

> Generate your README from a template. If you already use Grunt, this is a no brainer.

## Heads up!

Please take note! If you add code examples to your templates that have a syntax similar to the Lo-Dash templates used in this project (`{% ... %}`), then it is recommended that you _change the curly braces on the templates to square brackets_ to prevent Lo-Dash from trying to evaluate templates that shouldn't be evaluated. Not to worry though, this plugin will replace your square brackets with curly braces in the rendered output.

So convert anything that has a pattern like this: `{%= ... %}`, `{%- ... %}`, and `{% ... %}`. If anyone has problems, please file an issue and it will be resolved.


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
  grunt.initConfig({
    // tasks
  });

  grunt.loadNpmTasks('grunt-readme');
  // Build the README.
  grunt.registerTask('default', ['readme']);
});
```

Optionally, if you need to change the plugin's defaults, In your project's Gruntfile, add a section named `readme` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({

  // The "readme" task
  readme: {
    options: {
      sep: '\n',
      resolve: 'readme-template',
      prefixes: ["helper", "util", "assemble", "mixin"],
      metadata: 'test/fixtures/metadata.json',
      templates: ['tasks/templates/']
    }
  }
});
```



## Options
This task does not require any configuration in the Gruntfile, so all of the following options are... ahem, optional.

### sep
Type: `String`
Default: `\n\n`

Separator to use between sections of content that is included using the `include` or `doc` mixins (more about those below):

* `{%= _.include("CONTRIBUTING.md") %}`
* `{%= _.doc("*.md") %}`

This option is more useful when you use minimatch patterns to specify the files to include.

The `sep` option can either be defined in the task options:

```js
readme: {
  options: {
    sep: '\n***\n'
  }
}
```

And/or as a second parameter in the `include` or `doc` mixins. For example:

* `{%= _.include("docs-*.md", "***") %}`
* `{%= _.doc("*.md", "\n***\n") %}`


### templates
Type: `String`
Default: `./node_modules/grunt-readme/tasks/templates/` (from your project)

Optional path to the local directory to use for templates. This path is used as the base path for the `_.include()` mixin, but by default the `include` mixin will look for files in the `./tasks/templates` directory of this project (grunt-readme), where some starter templates are stored. (also see [EXAMPLES.md](./EXAMPLES.md))

You may overide this by specifying a path in the `templates` option:

```js
readme: {
  options: {
    templates: 'docs/templates'
  }
}
```

### metadata
Type: `Object`
Default: `package.json`

Optional source of metadata to **extend the data object** that is passed as context into the templates.

```js
readme: {
  options: {
    metadata: 'docs/metadata.json'
  }
}
```

Context of the data object is the value of `this`, and properties in `package.json` will be ignored when matching properties are defined on the `metadata` object.



### mixins

### _.resolve()

Use the `resolve` mixin in templates to include content _from named NPM modules listed in `devDependencies`_:

```js
{%= _.resolve("example-template") %}
```

For the `resolve` mixin to work, the following must be true:

* The referenced "include" must be listed in the `devDependencies` of your project's `package.json`
* The referenced include installed in the `node_modules` directory of your project
* This is important! The name of the include must match the name of the module that is being referenced (e.g. the module's `pkg.name`).
* There must be a `main` property defined in the `package.json` of the referenced module.
* The `main` property must point to the template you want to use.

As an example, if we were working on a project named `foo`, here is what the `package.json` might look like for the referenced module that contains the template to be used as an include:

```js
{
  "name": "foo-readme-template",
  "main": "README.tmpl.md"
}
```


### _.include()

Use the `include` mixin in templates to pull in content from other files:

```js
{%= _.include("examples.md") %}
```

[Minimatch](https://github.com/isaacs/minimatch) patterns may also be used:

```js
{%= _.include("docs-*.md") %}
```

Unless overridden in the `templates` option, the `include` mixin will use the `./node_modules/grunt-readme/tasks/templates/` directory (from the root of your project) as the `cwd` for templates.


### _.doc()

Same as the `include` mixin but is hard-coded to use the `docs/` folder of your project as the `cwd` for templates.




## Usage Examples



## Release History
 

## Author

+ [github/Jon Schlinkert](https://github.com/jonschlinkert)
+ [twitter/Jon Schlinkert](http://twitter.com/Jon Schlinkert)

## License


***

_This file was generated on Sat Sep 21 2013 06:00:36._
