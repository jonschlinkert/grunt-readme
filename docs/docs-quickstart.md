_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install {%= name %} --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('{%= name %}');
```

If the plugin has been installed correctly, run `grunt readme` at the command line. If the plugin has been installed properly, you should see a success message.

_**That's it!** If you are happy with the defaults, **no additional Gruntfile configuration is required**._