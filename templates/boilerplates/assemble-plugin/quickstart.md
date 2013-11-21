In the command line, run:

```bash
npm install assemble-contrib-{%= shortname %} --save
```

Next, register the plugin with Assemble in your project's Gruntfile:

```js
assemble: {
  options: {
    plugin: ['assemble-contrib-{%= shortname %}', 'other/plugins/*.js']
  }
}
```

## Configuration

You can also use the plugin with specific targets:

```js
assemble: {
  foo: {
    options: {
      plugin: ['assemble-contrib-{%= shortname %}']
    },
    files: {'dist/': 'content/*.md'}
  },
  // The plugin won't run on this target since it's
  // not defined at the task level
  bar: {
    files: {'dist/': 'templates/*.hbs'}
  }
}
```

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.