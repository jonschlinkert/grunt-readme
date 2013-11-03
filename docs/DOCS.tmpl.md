# Docs

[Also see examples →](./EXAMPLES.md)

## Advanced configuration

To change the plugin's defaults, add a section to your project's Gruntfile named `{%= shortname %}` to the data object passed into `grunt.initConfig()`:

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

## Options
{%= _.doc("docs-options.md") %}

## mixins
{%= _.doc("docs-mixins.md") %}

# Heads up!
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (as in code examples), just use square brackets instead of curly braces in any templates that have similar patterns to these: `[%= .. %]`, `[%- .. %]`, and `[% .. %]`. The square brackets will be replaced with curly braces in the rendered output.

## Author

+ [github.com/{%= username %}](https://github.com/{%= username %})
+ [twitter.com/{%= username %}](http://twitter.com/{%= username %})

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._


[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
