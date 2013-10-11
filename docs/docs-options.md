
> This task does not require any configuration in the Gruntfile, so all of the following options are... ahem, optional.

To change the plugin's defaults, add a section to your project's Gruntfile named `{%= _.shortname(name) %}` to the data object passed into `grunt.initConfig()`:

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

## readme
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


## metadata
Type: `Object`
Default: `package.json`

Optional source of metadata to _extend the data object_ that is passed as context into the templates. Context of the data object is the value of `this`, and properties in `package.json` will be ignored when matching properties are defined on the `metadata` object. Example:

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

### data files

Or specify the path or paths to any `.json` or `.yml` files to use. Any of the following formats will work:

```js
readme: {
  options: {
    metadata: 'docs/metadata.json'
  }
}
```

Array of files:

```js
readme: {
  options: {
    metadata: ['docs/one.json', 'docs/two.yml'],
  }
}
```

[minimatch][] (wilcard/globbing) patterns:

```js
readme: {
  options: {
    metadata: ['docs/*.{json,yml}', 'foo.json']
  }
}
```


Since context is the value of "this", the `metadata` path is not required in templates, only property names:

* `[%= name %]` (e.g. not `[%= metadata.name %]`) => `Foo`
* `[%= description %]` => `This is foo.`


## docs
Type: `String`
Default: `./docs/`

Override the default directory where your local docs ("includes") will be stored. This defaults to the `./docs` directory in the root of your project.  with the 'docs' option.


## templates
Type: `String`
Default: `./node_modules/grunt-readme/tasks/templates/` (relative to your project)

The `cwd` for "includes" defined using the `[%= _.include() %]` template. By default, the `include` mixin will look for files in the `./tasks/templates` directory of this project (grunt-readme), where some starter templates are stored. (also see [EXAMPLES.md](./EXAMPLES.md))

You may overide this by specifying a path in the `templates` option:

```js
readme: {
  options: {
    templates: 'docs/templates'
  }
}
```


## resolve

All of the `resolve` options enable including content _from named NPM modules listed in `devDependencies`_.

### resolve.readme
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


### resolve.docs
Type: `String`
Default: `undefined`

If defined, `resolve.docs` becomes the `cwd` for files to be included using the `[%= _.doc() %]` mixin.

```js
options: {
  resolve: {
    docs: 'my-npm-module'
  }
}
```

This would resolve to:  `./node_modules/my-npm-module/`.


### resolve.metadata
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



## prefixes
Type: `Array`
Default: `grunt|helper|mixin`

Any prefixes defined will be removed from content passed in using the `[%= _.shortname() %]` template. Example:

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
# [%= _.titleize(_.shortname(name)) %]
```

will renders to:

```
# Module
```

## contributing
Type: `Boolean`
Default: `True`

By default, the README task copies a basic `CONTRIBUTING.md` file to the root of your project. If one exists, the task will skip this. If you wish to prevent the task from adding this file to your project, set the `contributing` option to `false`.


## sep
Type: `String`
Default: `\n`

Separator to use between sections of content that is included using the `include` or `doc` mixins (more about these in the "Mixins" section below). This option is more useful when you use [minimatch][] patterns to specify the files to include.

The `sep` option can either be defined in the task options:

```js
readme: {
  options: {
    sep: '\n***\n'
  }
}
```

or as a second parameter in the `include` or `doc` mixins.

* `[%= _.include("docs-*.md", "***") %]` (more below...)
* `[%= _.doc("*.md", "\n***\n") %]` (more below...)

[minimatch]: https://github.com/isaacs/minimatch
