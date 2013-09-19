# grunt-readme [![NPM version](https://badge.fury.io/js/grunt-readme.png)](http://badge.fury.io/js/grunt-readme) 

> Generate your README from a template. If you already use Grunt, this is a no brainer.


## Overview

## [AUTHORS](NPM https://npmjs.org/doc/json.html)

> If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional. Lines which start with a # or are blank, will be ignored. **[-- NPM]((NPM https://npmjs.org/doc/json.html)**



## Options

## _.include() mixin

The `include` mixin is used in Lo-Dash templates to "pull in" content from other files. For example:

```js
{%= _.include("examples.md") %}
```

[Minimatch](https://github.com/isaacs/minimatch) patterns may also be used:

```js
{%= _.include("docs-*.md") %}
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

Options for the `{%= _.include("docs-*.md") %}` template mixin.




## Examples

```js
{%= _.include("example.md") %}
```



## Release History

 * 2013   v0.1.0   First commit


## License

Copyright (c) 2013 [Jon Schlinkert](https://github.com/jonschlinkert)
Licensed under the [MIT license](./LICENSE-MIT).



; Licensed under the MIT license




Licensed under the [object Object] license
Licensed under the MIT
```js
grunt-readme - v0.1.0
2013-09-19
 * https://github.com/assemble/grunt-readme

 * Copyright (c) 2013 Jon Schlinkert
```
