## Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  readme: {
    options: {},
    files: {
      'test/actual/': ['test/fixtures/*.js']
    }
  }
});
```

## Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  readme: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'test/actual/': ['test/fixtures/*.js']
    }
  }
});
```