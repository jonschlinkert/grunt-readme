> Three different mixins are built into the task for including "external" content: `include`, `doc` and `resolve`. Each is used for a different purpose.

Here is a summary of what they do (settings for the `include` and `doc` mixins can be customized in the task options):

* `[%= _.include("file.md") %]`: include a file (or files using [minimatch][minimatch] patterns) from the `./templates/` directory of _the grunt-readme task_.
* `[%= _.doc("file.md") %]`:  include a file (or files using [minimatch][minimatch] patterns) from the `./docs/` directory of _your project_.
* `[%= _.resolve("file.md") %]`: include a **specific file** from *node_modules*`.


## _.include()
Use the `include` mixin in templates to pull in content from other files:

```js
[%= _.include("examples.md") %]
```

[Minimatch][minimatch] patterns may also be used:

```js
[%= _.include("docs-*.md") %]
```

Unless overridden in the `templates` option, the `include` mixin will use the `./node_modules/grunt-readme/tasks/templates/` directory (from the root of your project) as the `cwd` for templates.


## _.doc()
Same as the `include` mixin but is hard-coded to use the `docs/` folder of your project as the `cwd` for templates.


## _.resolve()
Use the `resolve` mixin in templates to include content _from named NPM modules listed in `devDependencies`_:

```js
[%= _.resolve("my-npm-module") %]
```

where `my-npm-module` is the name of a `devDependency` currently installed in `node_modules`. For the `resolve` mixin to work, the referenced file must be listed in the `devDependencies` of your project's `package.json`, it must be installed in `node_modules`, and the referenced project must have the file defined in the `main` property of that project's `package.json`. Last, in your templates make sure you _use the name of the module, not the name of the file to "include"_.


### _.resolve() example
Here is a `package.json` for a bogus project we created, `my-npm-module`, to store the template we want to use as an include:

```js
{
  "name": "my-npm-module",
  "main": "README.tmpl.md"
}
```

## _.contributors()