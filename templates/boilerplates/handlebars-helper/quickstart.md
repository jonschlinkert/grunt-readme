## Quickstart
Install the helper with: `npm install {%= name %}`

## Usage with Assemble
If you use [Assemble](http://assemble.io) and Grunt, add `{%= name %}` to the `helpers` property in the [Assemble](http://assemble.io) task or target options in your Gruntfile:

```javascript
grunt.initConfig({
  assemble: {
    options: {
      helpers: ['{%= name %}', 'foo/*.js']
    },
    files: {}
  }
});
```
_Note that the '{%= name %}' module **must also be listed in devDependencies** for Assemble to automatically resolve the helper._

With that completed, you may now use the `{{{%= shortname %}}}` helper in your templates:

```handlebars
{{{%= shortname %} 'foo'}}
```

Please [report any bugs or feature requests](https://github.com/helpers/{%= name %}/issues/new), thanks!
