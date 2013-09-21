This task does not require any configuration in the Gruntfile, so all of the following options are... ahem, optional.

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

If defined, `resolve.metadata` will resolve to a specific file to


## prefixes
Type: `Array`
Default: `grunt|helper|mixin`

Any prefixes defined will be removed from content passed in using the `[%= _.shortname() %]` template.

Example:

```json
{
  "name": "helper-prettify"
}
```

Used in a template like this:

```js
# [%= _.titleize(_.shortname(name)) %]
```

Renders to:

```
# Prettify
```

## contributing
Type: `Boolean`
Default: `True`

By default, the README task copies a basic `CONTRIBUTING.md` file to the root of your project. If one exists, the task will skip this. If you wish to prevent the task from adding this file to your project, set the `contributing` option to `false`.

## sep
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

* `[%= _.include("docs-*.md", "***") %]` (more below...)
* `[%= _.doc("*.md", "\n***\n") %]` (more below...)

