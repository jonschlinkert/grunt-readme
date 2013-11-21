## Helper Options

### cwd
Type: `String` (optional)
Default value: `undefined`

The current working directory, or "cwd", for paths defined in the helper. So instead of writing out `{{{%= shortname %} 'my/book/chapters/*.hbs'}}`, just define `cwd: "my/book"` and now any paths defined in the helper will use the `cwd` as a base, like this: `{{{%= shortname %} 'chapters/*.hbs'}}`

### sep
Type: `String`
Default value: `\n`

The separator to append after each inlined file.

### compare
Type: `Function`
Default value: `compareFn`

Compare function for sorting the {%= shortname %} files.



## Setting options
> Options can be defined in any of the following ways:

### hash options
Set options as hash arguments directly on the helper expressions themselves:

```handlebars
// Append a separator to the content of each included file
{{{%= shortname %} 'my/book/chapters/*.hbs' sep="<!-- Chapter -->"}}

// Override the cwd defined in the task options
{{{%= shortname %} 'my/book/chapters/*.hbs' cwd="./"}}
```
Note that **Options defined in the hash always win**!


### "assemble" task options
> If you use Grunt and [Assemble](http://assemble.io), you can pass options from the `assemble` task in the Gruntfile to the helper.

This helper registers a [custom `{%= shortname %}` property](http://assemble.io/docs/Custom-Helpers.html), in the Assemble options, which enables options for the helper to be defined in the Assemble task or target options, e.g.:

```js
assemble: {
  options: {
    {%= shortname %}: {
      // {%= shortname %} helper options here
    }
  }
}
```

### JSON/YAML
> If you use Grunt and [Assemble](http://assemble.io), you can pass options to `assemble` from a JSON or YAML data file

This option is really useful if you expect to have lots of options defined, or different "options groups" that you want to reuse as needed.

```js
assemble: {
  options: {
    data: ['path/to/{%= shortname %}.json']
  }
}
```
Then inside `foo.json` we might define something like:

```json
{
  "docs": {
    "sep": "<!-- Document -->\n",
    "cwd": "content/docs",
    "sortBy": "num"
  },
  "chapters": {
    "sep": "<!-- Chapter -->\n",
    "cwd": "content/chapters",
    "sortBy": "title"
  },
  "posts": {
    "sep": "<!-- Post -->\n",
    "cwd": "content/posts",
    "sortBy": "foo"
  }
}
```
Then use in templates like this:

```handlebars
{{{%= shortname %} foo.docs}}
{{{%= shortname %} foo.chapters}}
{{{%= shortname %} foo.posts}}
```
