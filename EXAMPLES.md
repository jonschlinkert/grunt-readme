# Template Examples

> Copy/paste any of these examples into your templates as a starting point.


## Basic readme example

```js
# my-project

> {%= description %}

## Overview
{%= _.include("docs-overview.md") %}

## Options
{%= _.include("docs-options.md") %}

## Examples
{%= _.include("docs-examples.md") %}

## License and Copyright
Copyright (c) 2012-{%= grunt.template.today('yyyy') %} [{%= author.name %}]({%= author.url %})
{%= _.license() %}
```




## Name

```js
{%= name %}
```


## Version

```js
{%= version %}
v{%= version %}
{%= version ? " v" + version : "" %}
{%= version ? " * @version " + version + "\\n" : "" %}
```

## Description

```js
{%= description %}
{%= description ? " * " + description + "\\n" : "" %}
```


## Homepage

```js
{%= homepage ? " | " + homepage : "" %}
{%= homepage ? " * " + homepage + "\n" : "" %}
{%= homepage ? " * @docs " + homepage + "\\n" : "" %}
```


## [AUTHORS](NPM https://npmjs.org/doc/json.html)

> If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional. Lines which start with a # or are blank, will be ignored. **[-- NPM]((NPM https://npmjs.org/doc/json.html)**

To use `author` data from `package.json`:

```js
[{%= author.name %}]({%= author.url %})
// => [Jon schlinkert](http://github.com/jonschlinkert)

{%= author.name ? " * @author " + author.name + "\\n" : "" %}
{%= author.url ? " * @link " + author.url + "\\n" : "" %}
```

Or, if you prefer to use an `AUTHORS` file in the root of the project:

```js
[{%= authors[0].name %}]({%= authors[0].url %})
// =>
// [Jon schlinkert](http://github.com/jonschlinkert)
// [Brian Woodward](http://github.com/doowb)
```


## Time and date

```js
{%= grunt.template.today() %}
// => Tue Sep 17 2013 18:38:42
//
{%= grunt.template.today("yyyy") %}
// => 2013

{%= grunt.template.today("yyyy-mm-dd") %}
// => 2013-09-17
```


## Banner

```js
/*!
 * {%= name %} v{%= version %},  {%= grunt.template.today("yyyy-mm-dd") %}
 * {%= website %}
 * Copyright (c) {%= grunt.template.today("yyyy") %} {%= author %}, contributors.
 * Licensed under the {%= license %}.
 */
```

## Changelog / Release History


```js
{%= _.include("docs-changelog.md") %}
```

Or:

```js
## Release History

 * {%= grunt.template.today('yyyy') %}   v0.1.0   First commit
```


## License

```
Licensed under the [MIT license](./LICENSE-MIT).
```
Results in:

Licensed under the [MIT license](./LICENSE-MIT).


### _.license() mixin

If you maintain a number of projects, some of which might have more than one license, while others only have one, you can use the `_.license()` mixin to automate the process of adding license info:

```js
{%= _.license() %}
{%= _.license("Licensed under the ") %}
{%= _.license("Licensed under the ", "\n") %}
```


## Contributors

```js
{%= _.contributors() %}
```

