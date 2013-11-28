# {{{%= name %}}} [![NPM version](https://badge.fury.io/js/helper-{%= name %}.png)](http://badge.fury.io/js/helper-{%= name %})

> {%= name %} handlebars helper, for doing foo, bar and baz.

## Quickstart
In the root of your project, run the following in the command line:

```bash
npm i helper-{%= name %} --save-dev
```

## Usage

```handlebars
{{{%= name %} "path/to/file.{%= name %}"}}
```

## Usage in Assemble
In your Gruntfile, simply add `helper-{%= name %}` to the `helpers` property in the [Assemble](http://assemble.io) task or target options:

```javascript
grunt.initConfig({
  assemble: {
    options: {
      helpers: ['helper-{%= name %}']
    }
    ...
  }
});
```
With that completed, you may now being using the `{%= name %}` helper in your Assemble project.

## Options
### task options
Options can be set in your Gruntfile, in the `{%= name %}` object in the Assemble task or target options:

```javascript
grunt.initConfig({
  assemble: {
    options: {
      {%= _.shortname(name) %}: {
        foo: true
      }
    }
    ...
  }
});
```

## Related projects
{%= _.include("related-repos.md") %}

## Author
{%= _.contrib("authors.md") %}

## License
{%= copyright %}
{%= license %}

***

{%= _.include("footer.md") %}
