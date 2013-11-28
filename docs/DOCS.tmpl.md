# Documentation

**Table of Contents**
{%= toc %}

## Overview
In general, the conventions used by this task are as follows:

**Templates**
* Files with extension `.tmpl.md` are generally templates that will be compiled one-to-one into documents
* Files with extension `.md` are generally intended to be used as includes.
* `[%= _.doc("foo") %]` is used to included files from your project's `./docs` directory
* `[%= _.include("foo") %]` is used to include boilerplate files from grunt-readme

## Advanced configuration
To change the plugin's defaults, add a section to your project's Gruntfile named `{%= shortname %}` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({
  // The "repos" task
  repos: {
    options: {}
  },

  // The "readme" task
  readme: {
    options: {
      metadata: {}
    }
  }
});
grunt.loadNpmTasks('grunt-readme');
grunt.registerTask('default', ['readme']);
```

## Features
{%= _.doc("docs-features.md") %}

## Options
{%= _.doc("docs-options.md") %}

## Mixins
{%= _.doc("docs-mixins.md") %}

## Examples
{%= _.doc("docs-examples.md") %}

## Contributing
{%= _.contrib("contributing.md") %}

## Authors
{%= _.contrib("authors.md") %}

## License
{%= copyright %}
{%= license %}

***

{%= _.include("footer.md") %}