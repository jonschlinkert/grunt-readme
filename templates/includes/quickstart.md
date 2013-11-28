From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install {%= name %} --save-dev
```

_The plugin must be listed in the `devDependencies` of your project.js package.json to be recognized by Assemble!_.

Once that's done, just add `{%= name %}`, the name of this module, to the `plugins` option in the Assemble task:


```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        plugins: ['{%= name %}'],
        {%= shortname %}: {
          // plugin options
        }
      },
      ...
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
};
```

If everything was installed and configured correctly, you should be ready to go!