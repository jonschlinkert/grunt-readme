## _.include() mixin

The `include` mixin is used in Lo-Dash templates to "pull in" content from other files. For example:

```js
[%= _.include("examples.md") %]
```

[Minimatch](https://github.com/isaacs/minimatch) patterns may also be used:

```js
[%= _.include("docs-*.md") %]
```

### _.include() options

You may customize behavior of the `include` mixin by defining a few different options in the `readme` task in your Gruntfile.

### options.templates
Type: `String`
Default: `./grunt-readme/templates/`

If installed via npm, by default the `include` mixin will look for files in `./node_modules/grunt-readme/templates/`. Overide this default by defining the `templates` option in the `readme` task:


```js
readme: {
  options: {
    templates: 'docs/templates'
  }
},
```

### options.sep
Type: `String`
Default: `undefined`

The separator to use between


### _.include() examples

Options for the `[%= _.include("docs-*.md") %]` template mixin.
